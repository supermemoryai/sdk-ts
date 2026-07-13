import { spawnSync } from 'node:child_process';
import { chmodSync, existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { applyEdits, modify, parse } from 'jsonc-parser/lib/esm/main.js';

export type PluginId = 'claude' | 'cursor' | 'opencode' | 'codex';

export interface InstalledPlugin {
  installed: boolean;
  version?: string;
}

interface PluginInstallState {
  plugins: Partial<Record<PluginId, { version: string; installedAt: string }>>;
}

const CURSOR_PLUGIN_TARGET = join(homedir(), '.cursor', 'plugins', 'local', 'cursor-supermemory');
const PLUGIN_INSTALL_STATE_PATH = join(homedir(), '.supermemory', 'plugin-installs.json');
const OPENCODE_COMMAND_FILES = [
  'supermemory-init.md',
  'supermemory-login.md',
  'supermemory-logout.md',
  'supermemory-status.md',
];
const NPM_PACKAGES: Partial<Record<PluginId, string>> = {
  cursor: 'cursor-supermemory',
  opencode: 'opencode-supermemory',
  codex: 'codex-supermemory',
};

function readInstallState(): PluginInstallState {
  try {
    const value = JSON.parse(readFileSync(PLUGIN_INSTALL_STATE_PATH, 'utf8')) as PluginInstallState;
    return { plugins: value.plugins ?? {} };
  } catch {
    return { plugins: {} };
  }
}

function writeInstallState(state: PluginInstallState): void {
  mkdirSync(dirname(PLUGIN_INSTALL_STATE_PATH), { recursive: true });
  writeFileSync(PLUGIN_INSTALL_STATE_PATH, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
  try {
    chmodSync(PLUGIN_INSTALL_STATE_PATH, 0o600);
  } catch {}
}

export function recordPluginVersion(id: PluginId, version: string): void {
  const state = readInstallState();
  state.plugins[id] = { version, installedAt: new Date().toISOString() };
  writeInstallState(state);
}

export function forgetPluginVersion(id: PluginId): void {
  const state = readInstallState();
  delete state.plugins[id];
  writeInstallState(state);
}

function readPackageVersion(path: string): string | undefined {
  try {
    const value = JSON.parse(readFileSync(path, 'utf8')) as { version?: unknown };
    return typeof value.version === 'string' ? value.version : undefined;
  } catch {
    return undefined;
  }
}

function findClaudePluginVersion(value: unknown): string | undefined {
  if (Array.isArray(value)) {
    for (const item of value) {
      const version = findClaudePluginVersion(item);
      if (version) return version;
    }
    return undefined;
  }
  if (!value || typeof value !== 'object') return undefined;

  const record = value as Record<string, unknown>;
  const identity = [record.id, record.name, record.plugin, record.pluginId, record.source]
    .filter((entry): entry is string => typeof entry === 'string')
    .join(' ');
  if (/supermemory(?:@supermemory-plugins)?/i.test(identity) && typeof record.version === 'string') {
    return record.version;
  }
  for (const child of Object.values(record)) {
    const version = findClaudePluginVersion(child);
    if (version) return version;
  }
  return undefined;
}

export function getOpenCodeConfigPaths(): string[] {
  const directory = join(homedir(), '.config', 'opencode');
  return [join(directory, 'opencode.jsonc'), join(directory, 'opencode.json')];
}

function isOpenCodeSupermemoryEntry(value: unknown): value is string {
  return typeof value === 'string' && /(?:^|[/\\])opencode-supermemory(?:@|[/\\]|$)/i.test(value);
}

function openCodeConfigHasPlugin(path: string): boolean {
  if (!existsSync(path)) return false;
  try {
    const config = parse(readFileSync(path, 'utf8')) as { plugin?: unknown };
    return Array.isArray(config?.plugin) && config.plugin.some(isOpenCodeSupermemoryEntry);
  } catch {
    return false;
  }
}

export function detectInstalledPlugin(id: PluginId): InstalledPlugin {
  const recordedVersion = readInstallState().plugins[id]?.version;

  if (id === 'cursor') {
    return {
      installed: existsSync(join(CURSOR_PLUGIN_TARGET, '.cursor-plugin', 'plugin.json')),
      version: readPackageVersion(join(CURSOR_PLUGIN_TARGET, 'package.json')) ?? recordedVersion,
    };
  }

  if (id === 'opencode') {
    const manifests = [
      join(homedir(), '.cache', 'opencode', 'node_modules', 'opencode-supermemory', 'package.json'),
      join(homedir(), '.config', 'opencode', 'node_modules', 'opencode-supermemory', 'package.json'),
      join(
        process.env.LOCALAPPDATA ?? '',
        'opencode',
        'node_modules',
        'opencode-supermemory',
        'package.json',
      ),
    ];
    return {
      installed: getOpenCodeConfigPaths().some(openCodeConfigHasPlugin),
      version: manifests.map(readPackageVersion).find(Boolean) ?? recordedVersion,
    };
  }

  if (id === 'codex') {
    const hook = join(homedir(), '.codex', 'supermemory', 'session-start.js');
    let version: string | undefined;
    try {
      version = readFileSync(hook, 'utf8').match(/PLUGIN_VERSION\s*=\s*['"]([^'"]+)['"]/)?.[1];
    } catch {}
    return {
      installed: existsSync(hook) || existsSync(join(homedir(), '.codex', 'skills', 'supermemory-search')),
      version: version ?? recordedVersion,
    };
  }

  const executable = process.platform === 'win32' ? process.env.ComSpec ?? 'cmd.exe' : 'claude';
  const args =
    process.platform === 'win32' ?
      ['/d', '/s', '/c', 'claude plugin list --json']
    : ['plugin', 'list', '--json'];
  const result = spawnSync(executable, args, {
    encoding: 'utf8',
    windowsHide: true,
  });
  const output = result.stdout ?? '';
  let version: string | undefined;
  try {
    version = findClaudePluginVersion(JSON.parse(output));
  } catch {}
  return {
    installed: result.status === 0 && /supermemory/i.test(output),
    version: version ?? recordedVersion,
  };
}

export function compareVersions(left: string, right: string): number {
  const parseVersion = (value: string) => {
    const [core, prerelease] = value.trim().replace(/^v/i, '').split('-', 2);
    const numbers = (core ?? '').split('.').map((part) => Number.parseInt(part, 10) || 0);
    return { numbers, prerelease };
  };
  const a = parseVersion(left);
  const b = parseVersion(right);
  for (let index = 0; index < 3; index += 1) {
    const difference = (a.numbers[index] ?? 0) - (b.numbers[index] ?? 0);
    if (difference !== 0) return difference;
  }
  if (a.prerelease === b.prerelease) return 0;
  if (!a.prerelease) return 1;
  if (!b.prerelease) return -1;
  return a.prerelease.localeCompare(b.prerelease, undefined, { numeric: true });
}

export async function getLatestPluginVersion(id: PluginId): Promise<string | undefined> {
  try {
    if (id === 'claude') {
      const response = await fetch(
        'https://raw.githubusercontent.com/supermemoryai/claude-supermemory/main/latest.json',
        { signal: AbortSignal.timeout(5000) },
      );
      if (!response.ok) return undefined;
      const value = (await response.json()) as { version?: unknown };
      return typeof value.version === 'string' ? value.version : undefined;
    }

    const packageName = NPM_PACKAGES[id];
    if (!packageName) return undefined;
    const executable = process.platform === 'win32' ? process.env.ComSpec ?? 'cmd.exe' : 'npm';
    const args =
      process.platform === 'win32' ?
        ['/d', '/s', '/c', `npm view ${packageName} version --json`]
      : ['view', packageName, 'version', '--json'];
    const result = spawnSync(executable, args, {
      encoding: 'utf8',
      windowsHide: true,
      timeout: 10_000,
    });
    if (result.status !== 0) return undefined;
    return result.stdout.match(/\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?/)?.[0];
  } catch {
    return undefined;
  }
}

export function removeOpenCodePlugin(): string[] {
  const steps: string[] = [];
  for (const path of getOpenCodeConfigPaths()) {
    if (!existsSync(path)) continue;
    const content = readFileSync(path, 'utf8');
    const config = parse(content) as { plugin?: unknown };
    if (!Array.isArray(config?.plugin)) continue;
    const plugins = config.plugin.filter((entry) => !isOpenCodeSupermemoryEntry(entry));
    if (plugins.length === config.plugin.length) continue;
    const edits = modify(content, ['plugin'], plugins.length > 0 ? plugins : undefined, {
      formattingOptions: { insertSpaces: true, tabSize: 2 },
    });
    writeFileSync(path, applyEdits(content, edits), 'utf8');
    steps.push(`removed opencode-supermemory from ${path}`);
  }

  const commandDirectory = join(homedir(), '.config', 'opencode', 'command');
  for (const file of OPENCODE_COMMAND_FILES) {
    const path = join(commandDirectory, file);
    if (!existsSync(path)) continue;
    unlinkSync(path);
    steps.push(`removed ${path}`);
  }
  return steps;
}

export { CURSOR_PLUGIN_TARGET };
