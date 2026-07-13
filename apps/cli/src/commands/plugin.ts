import { spawn, spawnSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import {
  chmodSync,
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import type { AddressInfo } from 'node:net';
import { homedir, tmpdir } from 'node:os';
import { dirname, extname, join } from 'node:path';
import * as clack from '@clack/prompts';
import chalk from 'chalk';
import { getDeviceInfo, openBrowser } from '../lib/browser.js';
import { defineCliCommand } from '../lib/command.js';
import { resolveConfig } from '../lib/config.js';
import { isInputInteractive, isInteractive } from '../lib/output.js';

type PluginId = 'claude' | 'cursor' | 'opencode' | 'codex';
type PluginClientId = 'claude_code' | 'cursor' | 'opencode' | 'codex';
type InstallMode = 'all' | 'custom';

type InstallStatus = 'planned' | 'installed' | 'skipped' | 'failed';

interface PluginTarget {
  id: PluginId;
  label: string;
  hint: string;
  commands: string[];
  paths: string[];
}

interface Detection {
  available: boolean;
  reasons: string[];
}

interface OptionDisplay {
  label: string;
  hint: string;
}

interface InstallResult {
  id: PluginId;
  label: string;
  status: InstallStatus;
  message: string;
  steps: string[];
  log?: string;
}

interface PluginAuthResult {
  id: PluginId;
  label: string;
  status: 'connected' | 'upgrade' | 'failed';
  message: string;
  upgradeUrl?: string;
}

class CommandError extends Error {
  constructor(
    message: string,
    readonly log?: string,
  ) {
    super(message);
  }
}

const CURSOR_PLUGIN_TARGET = join(homedir(), '.cursor', 'plugins', 'local', 'cursor-supermemory');
const PLUGIN_BILLING_URL = 'https://app.supermemory.ai/?settings=billing';

const PLUGIN_AUTH_CLIENTS: Record<PluginId, PluginClientId> = {
  claude: 'claude_code',
  cursor: 'cursor',
  opencode: 'opencode',
  codex: 'codex',
};

const PLUGIN_AUTH_LABELS: Record<PluginClientId, string> = {
  claude_code: 'Claude Code',
  cursor: 'Cursor',
  opencode: 'OpenCode',
  codex: 'Codex',
};

function getCursorDetectionPaths(): string[] {
  const paths = [join(homedir(), '.cursor')];

  if (process.platform === 'darwin') {
    paths.push('/Applications/Cursor.app');
    paths.push(join(homedir(), 'Applications', 'Cursor.app'));
  }

  return paths;
}

const TARGETS: PluginTarget[] = [
  {
    id: 'claude',
    label: 'Claude Code',
    hint: 'Installs the Supermemory Claude plugin through Claude Code',
    commands: ['claude'],
    paths: [],
  },
  {
    id: 'cursor',
    label: 'Cursor',
    hint: 'Installs the local Cursor plugin bundle',
    commands: ['cursor', 'agent'],
    paths: getCursorDetectionPaths(),
  },
  {
    id: 'opencode',
    label: 'OpenCode',
    hint: 'Runs the OpenCode Supermemory installer',
    commands: ['opencode'],
    paths: [join(homedir(), '.config', 'opencode')],
  },
  {
    id: 'codex',
    label: 'Codex',
    hint: 'Runs the Codex Supermemory installer',
    commands: ['codex'],
    paths: [join(homedir(), '.codex')],
  },
];

const ALIASES: Record<string, PluginId> = {
  claude: 'claude',
  'claude-code': 'claude',
  cursor: 'cursor',
  opencode: 'opencode',
  'open-code': 'opencode',
  codex: 'codex',
};

function findCommand(command: string): string | null {
  const result =
    process.platform === 'win32' ?
      spawnSync('where.exe', [command], { encoding: 'utf8' })
    : spawnSync('sh', ['-lc', `command -v ${command}`], {
        encoding: 'utf8',
      });

  if (result.status !== 0) return null;
  const candidates = result.stdout.split(/\r?\n/).filter(Boolean);

  if (process.platform !== 'win32') return candidates[0] ?? null;

  const runnableExtensions = new Set(['.cmd', '.exe', '.bat', '.com']);
  const runnableCandidate = candidates.find((candidate) =>
    runnableExtensions.has(extname(candidate).toLowerCase()),
  );
  if (runnableCandidate) return runnableCandidate;

  for (const candidate of candidates) {
    if (extname(candidate)) return candidate;
    for (const extension of runnableExtensions) {
      const expanded = `${candidate}${extension}`;
      if (existsSync(expanded)) return expanded;
    }
  }

  return null;
}

function commandExists(command: string): boolean {
  return findCommand(command) !== null;
}

function detectTarget(target: PluginTarget): Detection {
  const reasons: string[] = [];

  for (const command of target.commands) {
    if (commandExists(command)) {
      reasons.push(`${command} on PATH`);
      break;
    }
  }

  for (const path of target.paths) {
    if (existsSync(path)) {
      reasons.push(path);
      break;
    }
  }

  return {
    available: reasons.length > 0,
    reasons,
  };
}

function splitDetectionReasons(reasons: string[]): {
  commands: string[];
  hasLocalConfig: boolean;
} {
  const commands: string[] = [];
  let hasLocalConfig = false;
  for (const reason of reasons) {
    if (reason.endsWith(' on PATH')) {
      commands.push(reason.replace(' on PATH', ''));
    } else {
      hasLocalConfig = true;
    }
  }
  return { commands, hasLocalConfig };
}

function formatOptionDisplay(target: PluginTarget, detection: Detection | undefined): OptionDisplay {
  if (detection?.available) {
    return {
      label: `${target.label} ${chalk.green('[ready]')}`,
      hint: target.hint,
    };
  }

  const expected = [
    ...target.commands.map((command) => `${command} on PATH`),
    target.paths.length > 0 ? 'local app config' : null,
  ]
    .filter((source): source is string => Boolean(source))
    .join(' or ');

  return {
    label: `${target.label} ${chalk.red('[missing]')}`,
    hint: expected ? `Expected ${expected}` : 'Required CLI was not found on PATH',
  };
}

function formatDetectionSource(detection: Detection): string {
  const { commands, hasLocalConfig } = splitDetectionReasons(detection.reasons);
  const sources = [
    commands.length > 0 ? `command ${commands.join(', ')}` : null,
    hasLocalConfig ? 'local config' : null,
  ]
    .filter((source): source is string => Boolean(source))
    .join(' or ');

  return sources || 'detected';
}

function printDetectionSummary(detections: Map<PluginId, Detection>) {
  process.stderr.write(`  ${chalk.bold('Detected integrations:')}\n`);
  for (const target of TARGETS) {
    const detection = detections.get(target.id);
    if (detection?.available) {
      process.stderr.write(
        `    ${chalk.green('[ready]')} ${chalk.bold(target.label)} ${chalk.dim(
          formatDetectionSource(detection),
        )}\n`,
      );
    } else {
      process.stderr.write(
        `    ${chalk.red('[missing]')} ${chalk.bold(target.label)} ${chalk.dim('not detected')}\n`,
      );
    }
  }
  process.stderr.write('\n');
}

function parseOnly(value: unknown): PluginId[] {
  if (!value || typeof value !== 'string') return [];
  const ids: PluginId[] = [];
  const unknown: string[] = [];

  for (const raw of value.split(',')) {
    const key = raw.trim().toLowerCase();
    if (!key) continue;
    const id = ALIASES[key];
    if (!id) {
      unknown.push(raw.trim());
      continue;
    }
    if (!ids.includes(id)) ids.push(id);
  }

  if (unknown.length > 0) {
    throw new Error(
      `Unknown plugin selection: ${unknown.join(', ')}. Use claude, cursor, opencode, or codex.`,
    );
  }

  return ids;
}

function quoteWindowsArg(value: string): string {
  if (!/[ \t"&|<>^]/.test(value)) return value;
  return `"${value.replace(/"/g, '""')}"`;
}

function trimLog(stdout: string, stderr: string): string | undefined {
  const combined = `${stdout}${stderr ? `\n${stderr}` : ''}`.trim();
  if (!combined) return undefined;
  const lines = combined.split(/\r?\n/);
  return lines.slice(Math.max(0, lines.length - 20)).join('\n');
}

function runProcess(command: string, args: string[]): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    const resolvedCommand = findCommand(command) ?? command;
    const useCmd =
      process.platform === 'win32' && ['.cmd', '.bat'].includes(extname(resolvedCommand).toLowerCase());

    const child =
      useCmd ?
        spawn(
          process.env.ComSpec ?? 'cmd.exe',
          ['/d', '/s', '/c', [quoteWindowsArg(command), ...args.map(quoteWindowsArg)].join(' ')],
          { stdio: ['ignore', 'pipe', 'pipe'] },
        )
      : spawn(resolvedCommand, args, { stdio: ['ignore', 'pipe', 'pipe'] });

    let stdout = '';
    let stderr = '';
    child.stdout?.on('data', (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr?.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', (err) => {
      reject(err);
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve(trimLog(stdout, stderr));
      } else {
        const log = trimLog(stdout, stderr);
        const message = `${command} ${args.join(' ')} exited with ${code}`;
        reject(new CommandError(message, log));
      }
    });
  });
}

function formatStep(command: string, args: string[]): string {
  return [command, ...args].join(' ');
}

function writeSecureJson(path: string, data: unknown): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf-8');
  try {
    chmodSync(path, 0o600);
  } catch {}
}

function removeFileIfExists(path: string): void {
  try {
    if (existsSync(path)) unlinkSync(path);
  } catch {}
}

function pluginCredentialsPath(id: PluginId): string {
  switch (id) {
    case 'claude':
      return join(homedir(), '.supermemory-claude', 'credentials.json');
    case 'cursor':
      return join(homedir(), '.supermemory-cursor', 'credentials.json');
    case 'opencode':
      return join(homedir(), '.supermemory-opencode', 'credentials.json');
    case 'codex':
      return join(homedir(), '.codex', 'supermemory', 'credentials.json');
  }
}

function clearPluginAuthMarkers(id: PluginId): void {
  switch (id) {
    case 'cursor': {
      const dir = join(homedir(), '.supermemory-cursor');
      removeFileIfExists(join(dir, '.auth-attempted'));
      removeFileIfExists(join(dir, '.logged-out'));
      break;
    }
    case 'opencode': {
      const dir = join(homedir(), '.supermemory-opencode');
      removeFileIfExists(join(dir, '.auth-attempted'));
      removeFileIfExists(join(dir, '.logged-out'));
      break;
    }
    case 'codex': {
      const dir = join(homedir(), '.codex', 'supermemory');
      removeFileIfExists(join(dir, '.auth-attempted'));
      removeFileIfExists(join(dir, '.logged-out'));
      break;
    }
    case 'claude':
      break;
  }
}

function writePluginCredentials(id: PluginId, apiKey: string): void {
  const timestamp = new Date().toISOString();
  const savedAtPayload = { apiKey, savedAt: timestamp };
  const createdAtPayload = { apiKey, createdAt: timestamp };
  const payload = id === 'cursor' || id === 'opencode' ? createdAtPayload : savedAtPayload;

  writeSecureJson(pluginCredentialsPath(id), payload);
  clearPluginAuthMarkers(id);
}

function decodeBase64UrlJson(value: string): Record<string, string> {
  const parsed = JSON.parse(Buffer.from(value, 'base64url').toString('utf8'));
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('Invalid OAuth callback payload');
  }

  const result: Record<string, string> = {};
  for (const [key, rawValue] of Object.entries(parsed)) {
    if (typeof rawValue === 'string') result[key] = rawValue;
  }
  return result;
}

function startPluginAuthCallbackServer(clients: PluginClientId[]): Promise<{
  callbackUrl: string;
  waitForCallback: () => Promise<{
    keys: Partial<Record<PluginClientId, string>>;
    errors: Partial<Record<PluginClientId, string>>;
  }>;
  close: () => void;
}> {
  return new Promise((resolveServer, rejectServer) => {
    const stateToken = randomBytes(16).toString('hex');
    let resolveCallback: (value: {
      keys: Partial<Record<PluginClientId, string>>;
      errors: Partial<Record<PluginClientId, string>>;
    }) => void;
    let rejectCallback: (err: Error) => void;

    const callbackPromise = new Promise<{
      keys: Partial<Record<PluginClientId, string>>;
      errors: Partial<Record<PluginClientId, string>>;
    }>((resolve, reject) => {
      resolveCallback = resolve;
      rejectCallback = reject;
    });

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const clearAuthTimeout = () => {
      if (timeoutId) clearTimeout(timeoutId);
    };

    const server = createServer((req: IncomingMessage, res: ServerResponse) => {
      const url = new URL(req.url ?? '/', 'http://localhost');

      if (url.pathname !== '/callback') {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      if (url.searchParams.get('state') !== stateToken) {
        res.writeHead(403, { 'Content-Type': 'text/html' });
        res.end(callbackHtml('Authentication Failed', 'Invalid callback state.'));
        clearAuthTimeout();
        rejectCallback(new Error('Invalid OAuth callback state'));
        return;
      }

      try {
        const keysPayload = url.searchParams.get('keys');
        const errorsPayload = url.searchParams.get('errors');
        const singleApiKey = url.searchParams.get('apikey');
        const keysByClient: Partial<Record<PluginClientId, string>> = {};
        const errorsByClient: Partial<Record<PluginClientId, string>> =
          errorsPayload ?
            (decodeBase64UrlJson(errorsPayload) as Partial<Record<PluginClientId, string>>)
          : {};

        if (keysPayload) {
          Object.assign(keysByClient, decodeBase64UrlJson(keysPayload));
        } else if (singleApiKey) {
          for (const client of clients) {
            keysByClient[client] = singleApiKey;
          }
        }

        if (Object.keys(keysByClient).length === 0) {
          throw new Error('No plugin keys received from callback');
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(callbackHtml('Plugins Connected', 'You can close this window and return to the terminal.'));
        clearAuthTimeout();
        resolveCallback({ keys: keysByClient, errors: errorsByClient });
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end(
          callbackHtml(
            'Authentication Failed',
            error instanceof Error ? error.message : 'Invalid callback payload.',
          ),
        );
        clearAuthTimeout();
        rejectCallback(error instanceof Error ? error : new Error('Invalid OAuth callback payload'));
      }
    });

    server.listen(0, '127.0.0.1', () => {
      const addr = server.address();
      if (!addr || typeof addr === 'string') {
        rejectServer(new Error('Failed to start OAuth callback server'));
        return;
      }

      resolveServer({
        callbackUrl: `http://127.0.0.1:${(addr as AddressInfo).port}/callback?state=${stateToken}`,
        waitForCallback: () => callbackPromise,
        close: () => server.close(),
      });
    });

    server.on('error', (error) => {
      clearAuthTimeout();
      rejectServer(error);
    });

    timeoutId = setTimeout(() => {
      rejectCallback(new Error('Authentication timed out'));
      server.close();
    }, 10 * 60_000);
  });
}

function callbackHtml(title: string, message: string): string {
  return `<!DOCTYPE html>
<html>
<head><title>Supermemory Plugins</title></head>
<body style="font-family: system-ui; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
  <div style="text-align: center;">
    <h1>${title}</h1>
    <p>${message}</p>
  </div>
</body>
</html>`;
}

function printPluginAuthSummary(results: PluginAuthResult[]): void {
  if (results.length === 0) return;

  process.stdout.write(`\n${chalk.bold('Supermemory plugin auth summary')}\n\n`);
  for (const result of results) {
    const icon =
      result.status === 'connected' ? chalk.green('[ok]')
      : result.status === 'upgrade' ? chalk.blue('[upgrade]')
      : chalk.red('[fail]');
    process.stdout.write(`${icon} ${chalk.bold(result.label)}: ${result.message}\n`);
    if (result.upgradeUrl) {
      process.stdout.write(`    ${chalk.dim('Upgrade:')} ${chalk.cyan(result.upgradeUrl)}\n`);
    }
  }
  process.stdout.write('\n');
}

function printPluginAuthStart(installed: InstallResult[]): void {
  const labels = installed.map((result) => result.label).join(', ');
  process.stdout.write(`\n${chalk.cyan('┌')} ${chalk.bold('Supermemory OAuth')}\n`);
  process.stdout.write(`${chalk.cyan('│')} ${chalk.bold('One approval')} connects ${chalk.bold(labels)}.\n`);
  process.stdout.write(
    `${chalk.cyan('└')} ${chalk.dim(
      'The same API key will be saved for each plugin your plan can use.',
    )}\n\n`,
  );
}

function isPlanUpgradeMessage(message: string | undefined): boolean {
  return /\b(pro plan|upgrade|requires pro)\b/i.test(message ?? '');
}

function getPluginAuthBaseUrl(consoleUrl: string): string {
  if (process.env.SUPERMEMORY_PLUGIN_AUTH_URL) {
    return process.env.SUPERMEMORY_PLUGIN_AUTH_URL;
  }

  if (process.env.SUPERMEMORY_WEB_URL) {
    return process.env.SUPERMEMORY_WEB_URL;
  }

  try {
    const url = new URL(consoleUrl);
    if (url.hostname === 'console.supermemory.ai') {
      url.hostname = 'app.supermemory.ai';
      return url.origin;
    }
  } catch {}

  return consoleUrl;
}

async function authorizeInstalledPlugins(
  results: InstallResult[],
  options: { dryRun: boolean; noAuth: boolean; json: boolean },
): Promise<boolean> {
  if (options.dryRun || options.noAuth || options.json || !isInputInteractive()) {
    return false;
  }

  const installed = results.filter(
    (result): result is InstallResult & { status: 'installed' } => result.status === 'installed',
  );
  if (installed.length === 0) return false;

  printPluginAuthStart(installed);

  const clients = installed.map((result) => PLUGIN_AUTH_CLIENTS[result.id]);
  const callback = await startPluginAuthCallbackServer(clients);
  const config = resolveConfig();
  const device = getDeviceInfo();
  const params = new URLSearchParams({
    callback: callback.callbackUrl,
    client: clients[0] ?? '',
    clients: clients.join(','),
    hostname: device.hostname,
    os: device.os,
    cwd: device.cwd,
    cli_version: device.cliVersion,
  });
  const authUrl = `${getPluginAuthBaseUrl(config.consoleUrl)}/auth/connect?${params.toString()}`;
  process.stdout.write(`${chalk.dim('Authorize from this browser URL:')} ${chalk.cyan(authUrl)}\n\n`);
  const spinner = isInteractive() ? clack.spinner() : null;

  try {
    spinner?.start('Opening one-click Supermemory OAuth...');
    try {
      await openBrowser(authUrl);
    } catch {
      spinner?.message('Could not open browser automatically.');
      process.stdout.write(`  Open this URL to authorize selected plugins:\n\n  ${chalk.cyan(authUrl)}\n\n`);
    }

    const { keys, errors } = await callback.waitForCallback();
    spinner?.stop('OAuth complete');

    const authResults: PluginAuthResult[] = [];
    for (const result of installed) {
      const client = PLUGIN_AUTH_CLIENTS[result.id];
      const apiKey = keys[client];
      if (apiKey?.startsWith('sm_')) {
        writePluginCredentials(result.id, apiKey);
        authResults.push({
          id: result.id,
          label: result.label,
          status: 'connected',
          message: `credentials saved to ${pluginCredentialsPath(result.id)}`,
        });
      } else {
        const errorMessage = errors[client] ?? `No key returned for ${PLUGIN_AUTH_LABELS[client]}`;
        const isUpgrade = isPlanUpgradeMessage(errorMessage);
        authResults.push({
          id: result.id,
          label: result.label,
          status: isUpgrade ? 'upgrade' : 'failed',
          message: isUpgrade ? `Upgrade to Pro to connect ${result.label}.` : errorMessage,
          upgradeUrl: isUpgrade ? PLUGIN_BILLING_URL : undefined,
        });
      }
    }

    printPluginAuthSummary(authResults);
    return authResults.some((result) => result.status === 'failed');
  } catch (error) {
    spinner?.stop('OAuth failed');
    process.stdout.write(
      `\n${chalk.red('[fail]')} ${chalk.bold('Plugin auth')}: ${
        error instanceof Error ? error.message : String(error)
      }\n\n`,
    );
    process.stdout.write(`  Rerun the command to open a fresh OAuth callback and upgrade link.\n\n`);
    return true;
  } finally {
    callback.close();
  }
}

async function installCursorPlugin(dryRun: boolean): Promise<string[]> {
  const steps = [
    'npm install cursor-supermemory@latest into a temporary directory',
    "copy cursor-supermemory package files into Cursor's local plugin directory",
  ];

  if (dryRun) return steps;

  const tempDir = mkdtempSync(join(tmpdir(), 'supermemory-cursor-plugin-'));
  try {
    await runProcess('npm', [
      'install',
      'cursor-supermemory@latest',
      '--omit=dev',
      '--ignore-scripts',
      '--no-audit',
      '--no-fund',
      '--prefix',
      tempDir,
    ]);

    const packageDir = join(tempDir, 'node_modules', 'cursor-supermemory');
    if (!existsSync(join(packageDir, '.cursor-plugin', 'plugin.json'))) {
      throw new Error('Downloaded cursor-supermemory package is missing .cursor-plugin/plugin.json');
    }

    mkdirSync(dirname(CURSOR_PLUGIN_TARGET), { recursive: true });
    rmSync(CURSOR_PLUGIN_TARGET, { recursive: true, force: true });
    cpSync(packageDir, CURSOR_PLUGIN_TARGET, { recursive: true });
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }

  return steps;
}

function installLine(target: PluginTarget): string {
  switch (target.id) {
    case 'claude':
      return 'Threading Supermemory into Claude Code...';
    case 'cursor':
      return "Packing memories into Cursor's local plugin shelf...";
    case 'opencode':
      return 'Teaching OpenCode where the memory lives...';
    case 'codex':
      return 'Wiring Codex into the Supermemory recall loop...';
  }
}

async function installTarget(target: PluginTarget, dryRun: boolean): Promise<InstallResult> {
  const steps: string[] = [];
  const spinner = !dryRun && isInteractive() ? clack.spinner() : null;

  try {
    spinner?.start(installLine(target));
    let log: string | undefined;

    if (target.id === 'claude') {
      const addMarketplace = ['plugin', 'marketplace', 'add', 'supermemoryai/claude-supermemory'];
      const installPlugin = ['plugin', 'install', 'supermemory@supermemory-plugins', '--scope', 'user'];
      steps.push(formatStep('claude', addMarketplace));
      steps.push(formatStep('claude', installPlugin));
      if (!dryRun) {
        log = await runProcess('claude', addMarketplace);
        log = (await runProcess('claude', installPlugin)) ?? log;
      }
    }

    if (target.id === 'cursor') {
      steps.push(...(await installCursorPlugin(dryRun)));
    }

    if (target.id === 'opencode') {
      const args = ['-y', 'opencode-supermemory@latest', 'install', '--no-tui'];
      steps.push(formatStep('npx', args));
      if (!dryRun) log = (await runProcess('npx', args)) ?? log;
    }

    if (target.id === 'codex') {
      const args = ['-y', 'codex-supermemory@latest', 'install'];
      steps.push(formatStep('npx', args));
      if (!dryRun) log = (await runProcess('npx', args)) ?? log;
    }

    spinner?.stop(`${target.label} installed`);

    return {
      id: target.id,
      label: target.label,
      status: dryRun ? 'planned' : 'installed',
      message:
        target.id === 'cursor' ?
          `Cursor plugin ${
            dryRun ? 'would be installed' : 'installed'
          }. Restart Cursor or run Developer: Reload Window.`
        : `${target.label} ${dryRun ? 'install planned' : 'install complete'}.`,
      steps,
      log,
    };
  } catch (err) {
    spinner?.stop(`${target.label} failed`);
    return {
      id: target.id,
      label: target.label,
      status: 'failed',
      message: err instanceof Error ? err.message : String(err),
      steps,
      log: err instanceof CommandError ? err.log : undefined,
    };
  }
}

function printHumanSummary(results: InstallResult[], dryRun: boolean, noAuth: boolean) {
  const title = dryRun ? 'Supermemory plugin install plan' : 'Supermemory plugin install summary';
  process.stdout.write(`\n${chalk.bold(title)}\n\n`);

  if (results.length === 0) {
    process.stdout.write(`${chalk.yellow('[skip]')} No ready integrations were detected.\n`);
    process.stdout.write(
      `  ${chalk.dim('Install a supported coding agent, or rerun with --only <target> --force.')}\n\n`,
    );
    return;
  }

  for (const result of results) {
    const icon =
      result.status === 'installed' ? chalk.green('[ok]')
      : result.status === 'planned' ? chalk.cyan('[plan]')
      : result.status === 'skipped' ? chalk.yellow('[skip]')
      : chalk.red('[fail]');

    process.stdout.write(`${icon} ${chalk.bold(result.label)}: ${result.message}\n`);
    for (const step of result.steps) {
      process.stdout.write(`  ${chalk.dim(step)}\n`);
    }
    if (result.log && result.status === 'failed') {
      process.stdout.write(`  ${chalk.dim('Last output:')}\n`);
      for (const line of result.log.split(/\r?\n/)) {
        process.stdout.write(`  ${chalk.dim(line)}\n`);
      }
    }
    process.stdout.write('\n');
  }

  const authTargets = results.filter(
    (r) => r.status !== 'skipped' && ['claude', 'cursor', 'opencode', 'codex'].includes(r.id),
  );
  if (authTargets.length > 0 && !dryRun && !noAuth && isInputInteractive()) {
    process.stdout.write(
      `  ${chalk.dim('Auth:')} one browser approval will connect successfully installed plugins.\n\n`,
    );
  }
  if (authTargets.length > 0 && noAuth) {
    process.stdout.write(`  ${chalk.dim('Auth:')} skipped because --no-auth was used.\n\n`);
  }
  if (results.some((r) => r.id === 'claude' && r.status !== 'skipped')) {
    process.stdout.write(
      `  ${chalk.dim('Claude reload:')} run ${chalk.bold(
        '/reload-plugins',
      )} inside any already-open Claude Code session.\n\n`,
    );
  }
}

function getReadyTargetIds(detections: Map<PluginId, Detection>): PluginId[] {
  return TARGETS.filter((target) => detections.get(target.id)?.available).map((target) => target.id);
}

async function chooseTargetsInteractively(detections: Map<PluginId, Detection>): Promise<PluginId[]> {
  process.stderr.write('\n');
  printDetectionSummary(detections);
  process.stderr.write(`  ${chalk.dim('tip: use Up/Down to move, Enter to confirm')}\n`);
  process.stderr.write(
    `  ${chalk.dim('tip: custom selection uses Space to toggle, Esc to return to install mode')}\n`,
  );
  process.stderr.write(`  ${chalk.dim('tip: scripts can use')} supermemory plugin --all\n\n`);

  const readyIds = getReadyTargetIds(detections);
  const modeOptions: { value: InstallMode; label: string; hint?: string }[] = [
    {
      value: 'custom',
      label: 'Custom selection',
      hint: 'pick plugins with Space',
    },
  ];

  if (readyIds.length > 0) {
    modeOptions.unshift({
      value: 'all',
      label: chalk.cyan('Install all ready integrations'),
      hint: `${readyIds.length} ready`,
    });
  }

  const mode = await clack.select({
    message: 'Install mode',
    options: modeOptions,
  });

  if (clack.isCancel(mode)) {
    clack.cancel('Install cancelled.');
    process.exit(0);
  }

  if (mode === 'all') return readyIds;

  const selected = await clack.multiselect({
    message: 'Choose integrations to install',
    required: true,
    options: TARGETS.map((target) => {
      const display = formatOptionDisplay(target, detections.get(target.id));
      return {
        value: target.id,
        label: display.label,
        hint: display.hint,
      };
    }),
  });

  if (clack.isCancel(selected)) {
    return chooseTargetsInteractively(detections);
  }

  return selected.filter((id): id is PluginId => id in ALIASES);
}

export const pluginCommand = defineCliCommand({
  meta: {
    name: 'plugin',
    description: 'Install Supermemory integrations for Claude Code, Cursor, OpenCode, and Codex',
  },
  noSpan: true,
  args: {
    all: {
      type: 'boolean',
      description: 'Install every detected plugin target',
      default: false,
    },
    only: {
      type: 'string',
      description: 'Comma-separated targets: claude,cursor,opencode,codex',
    },
    'dry-run': {
      type: 'boolean',
      description: 'Show what would run without installing anything',
      default: false,
    },
    force: {
      type: 'boolean',
      description: 'Run selected installers even when the target app is not detected',
      default: false,
    },
    'no-auth': {
      type: 'boolean',
      description: 'Skip browser OAuth after installing plugins',
      default: false,
    },
  },
  async handler({ args, flags }) {
    const dryRun = args['dry-run'] === true;
    const force = args.force === true;
    const noAuth = args['no-auth'] === true;
    const detections = new Map<PluginId, Detection>(
      TARGETS.map((target) => [target.id, detectTarget(target)]),
    );

    if (flags.json && !dryRun) {
      throw new Error('--json is only supported with --dry-run for plugin');
    }

    let selectedIds = parseOnly(args.only);
    if (args.all === true) {
      selectedIds = TARGETS.filter((target) => force || detections.get(target.id)?.available).map(
        (target) => target.id,
      );
    }

    if (selectedIds.length === 0 && args.all !== true) {
      if (!isInputInteractive()) {
        throw new Error('Choose targets with --all or --only claude,cursor,opencode,codex');
      }
      selectedIds = await chooseTargetsInteractively(detections);
    }

    const results: InstallResult[] = [];
    for (const id of selectedIds) {
      const target = TARGETS.find((candidate) => candidate.id === id);
      if (!target) continue;

      const detection = detections.get(id);
      if (!force && !detection?.available) {
        results.push({
          id,
          label: target.label,
          status: 'skipped',
          message: 'not detected on this machine; use --force to install anyway',
          steps: [],
        });
        continue;
      }

      results.push(await installTarget(target, dryRun));
    }

    if (flags.json) {
      process.stdout.write(`${JSON.stringify({ results }, null, 2)}\n`);
    } else {
      printHumanSummary(results, dryRun, noAuth);
    }

    const authFailed = await authorizeInstalledPlugins(results, {
      dryRun,
      noAuth,
      json: flags.json === true,
    });

    if (results.some((result) => result.status === 'failed') || authFailed) {
      process.exitCode = 1;
    }
  },
});
