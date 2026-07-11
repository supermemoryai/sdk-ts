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
import { clearScreenDown, cursorTo, emitKeypressEvents, moveCursor } from 'node:readline';
import type { AddressInfo } from 'node:net';
import { homedir, tmpdir } from 'node:os';
import { dirname, extname, join } from 'node:path';
import * as clack from '@clack/prompts';
import chalk from 'chalk';
import { getDeviceInfo, openBrowser } from '../lib/browser.js';
import { defineCliCommand } from '../lib/command.js';
import { resolveConfig } from '../lib/config.js';
import {
  compareVersions,
  CURSOR_PLUGIN_TARGET,
  detectInstalledPlugin,
  forgetPluginVersion,
  getLatestPluginVersion,
  type PluginId,
  recordPluginVersion,
  removeOpenCodePlugin,
} from './plugin-lifecycle.js';
import { isInputInteractive, isInteractive } from '../lib/output.js';

type PluginClientId = 'claude_code' | 'cursor' | 'opencode' | 'codex';
type InstallMode = 'all' | 'custom';

type InstallStatus = 'planned' | 'installed' | 'current' | 'skipped' | 'failed';

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

interface UninstallResult {
  id: PluginId;
  label: string;
  status: 'planned' | 'removed' | 'skipped' | 'failed';
  message: string;
  steps: string[];
  log?: string;
}

const PROMPT_CANCELLED = Symbol('prompt_cancelled');

type PromptCancel = typeof PROMPT_CANCELLED;

interface ArrowPromptOption<T extends string> {
  value: T;
  label: string;
  hint?: string;
  disabled?: boolean;
}

const SUPERMEMORY_GLYPHS: Record<string, string[]> = {
  S: ['11111', '10000', '11111', '00001', '11111'],
  U: ['10001', '10001', '10001', '10001', '01110'],
  P: ['11110', '10001', '11110', '10000', '10000'],
  E: ['11111', '10000', '11110', '10000', '11111'],
  R: ['11110', '10001', '11110', '10100', '10010'],
  M: ['10001', '11011', '10101', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '01110'],
  Y: ['10001', '01010', '00100', '00100', '00100'],
};

const SUPERMEMORY_WORD = 'SUPERMEMORY';
const BANNER_CELL = '\u2588';
const BANNER_SHADOW_CELL = '\u2591';
const BANNER_FILL_COLORS = ['#D6FBFF', '#67E8F9', '#22D3EE', '#0EA5E9', '#2563EB', '#1D4ED8', '#123B9A'];
const BANNER_SHADOW_COLOR = '#071D82';

function printSupermemoryBanner(): void {
  const glyphWidth = 5;
  const glyphGap = 1;
  const rowCount = 5;
  const columnCount = SUPERMEMORY_WORD.length * (glyphWidth + glyphGap) - glyphGap;
  const isFilled = (row: number, column: number): boolean => {
    if (row < 0 || row >= rowCount || column < 0 || column >= columnCount) return false;
    const glyphIndex = Math.floor(column / (glyphWidth + glyphGap));
    const glyphColumn = column % (glyphWidth + glyphGap);
    if (glyphColumn >= glyphWidth) return false;
    const glyph = SUPERMEMORY_GLYPHS[SUPERMEMORY_WORD[glyphIndex] ?? ''];
    return glyph?.[row]?.[glyphColumn] === '1';
  };

  process.stderr.write('\n');
  for (let row = 0; row < rowCount + 1; row++) {
    let rendered = '  ';
    for (let column = 0; column < columnCount + 1; column++) {
      const main = isFilled(row, column);
      const shadow = !main && isFilled(row - 1, column - 1);
      if (main) {
        const color = BANNER_FILL_COLORS[Math.min(row, BANNER_FILL_COLORS.length - 1)] ?? '#22D3EE';
        rendered += chalk.hex(color)(BANNER_CELL);
      } else if (shadow) {
        rendered += chalk.hex(BANNER_SHADOW_COLOR)(BANNER_SHADOW_CELL);
      } else {
        rendered += ' ';
      }
    }
    process.stderr.write(rendered + '\n');
  }

  const label = chalk.hex('#18BFFF')('>') + chalk.hex('#1775EF').bold(' PLUGINS');
  const labelPadding = Math.max(2, columnCount + 1 - '> PLUGINS'.length);
  process.stderr.write(`${' '.repeat(labelPadding)}${label}\n\n`);
}
function clearRenderedPrompt(renderedLines: number): void {
  if (renderedLines <= 0) return;
  moveCursor(process.stderr, 0, -renderedLines);
  cursorTo(process.stderr, 0);
  clearScreenDown(process.stderr);
}

const TUI_TOP = '\u250C';
const TUI_BAR = '\u2502';
const TUI_BOTTOM = '\u2514';
const TUI_SUBMIT = '\u25C7';
const TUI_POINTER = '\u276F';
const TUI_RADIO_ACTIVE = '\u25CF';
const TUI_RADIO_INACTIVE = '\u25CB';

function finishArrowPrompt(message: string, value: string): void {
  process.stderr.write(`${chalk.cyan(TUI_SUBMIT)}  ${message}\n`);
  process.stderr.write(`${chalk.cyan(TUI_BAR)}  ${value}\n`);
  process.stderr.write(`${chalk.cyan(TUI_BAR)}\n`);
}

function withRawKeypress<T>(render: () => number, onKey: (key: { name?: string; ctrl?: boolean }) => T | undefined): Promise<T> {
  const input = process.stdin as NodeJS.ReadStream & { setRawMode?: (mode: boolean) => void };
  const hadRawMode = Boolean(input.isRaw);
  let renderedLines = 0;

  return new Promise<T>((resolve) => {
    const cleanup = (result: T) => {
      input.off('keypress', handler);
      if (input.setRawMode && !hadRawMode) input.setRawMode(false);
      process.stderr.write('\u001B[?25h');
      resolve(result);
    };

    const rerender = () => {
      clearRenderedPrompt(renderedLines);
      renderedLines = render();
    };

    const handler = (_input: string, key: { name?: string; ctrl?: boolean }) => {
      if (key.ctrl && key.name === 'c') {
        clearRenderedPrompt(renderedLines);
        cleanup(PROMPT_CANCELLED as T);
        return;
      }
      const result = onKey(key);
      if (result !== undefined) {
        clearRenderedPrompt(renderedLines);
        cleanup(result);
        return;
      }
      rerender();
    };

    emitKeypressEvents(input);
    if (input.setRawMode) input.setRawMode(true);
    input.on('keypress', handler);
    process.stderr.write('\u001B[?25l');
    rerender();
  });
}

function nextEnabledIndex<T extends string>(
  options: ArrowPromptOption<T>[],
  current: number,
  direction: 1 | -1,
): number {
  if (options.length === 0) return 0;
  let next = current;
  for (let i = 0; i < options.length; i++) {
    next = (next + direction + options.length) % options.length;
    if (!options[next]?.disabled) return next;
  }
  return current;
}

async function arrowSelect<T extends string>(opts: {
  message: string;
  options: ArrowPromptOption<T>[];
  footer?: string;
}): Promise<T | PromptCancel> {
  let active = Math.max(
    0,
    opts.options.findIndex((option) => !option.disabled),
  );

  const result = await withRawKeypress<T | PromptCancel>(
    () => {
      const lines = [`${chalk.cyan(TUI_TOP)} ${chalk.bold(opts.message)}`, `${chalk.cyan(TUI_BAR)}`];
      for (let i = 0; i < opts.options.length; i++) {
        const option = opts.options[i];
        if (!option) continue;
        const pointer = i === active ? chalk.cyan(TUI_POINTER) : ' ';
        const marker = i === active ? chalk.cyan(TUI_RADIO_ACTIVE) : chalk.dim(TUI_RADIO_INACTIVE);
        const label = option.disabled ? chalk.dim(option.label) : option.label;
        const hint = option.hint ? ` ${chalk.dim(option.hint)}` : '';
        lines.push(`${chalk.cyan(TUI_BAR)} ${pointer} ${marker} ${label}${hint}`);
      }
      lines.push(`${chalk.cyan(TUI_BAR)}`);
      lines.push(`${chalk.cyan(TUI_BOTTOM)} ${chalk.dim(opts.footer ?? 'Up/Down move, Enter confirm, Esc cancel')}`);
      process.stderr.write(lines.join('\n') + '\n');
      return lines.length;
    },
    (key) => {
      if (key.name === 'escape') return PROMPT_CANCELLED;
      if (key.name === 'up' || key.name === 'k') active = nextEnabledIndex(opts.options, active, -1);
      if (key.name === 'down' || key.name === 'j') active = nextEnabledIndex(opts.options, active, 1);
      if (key.name === 'return' || key.name === 'enter') return opts.options[active]?.value;
      return undefined;
    },
  );

  if (result !== PROMPT_CANCELLED) {
    const label = opts.options.find((option) => option.value === result)?.label ?? String(result);
    finishArrowPrompt(opts.message, label);
  }
  return result;
}

async function arrowMultiselect<T extends string>(opts: {
  message: string;
  options: ArrowPromptOption<T>[];
  initialValues?: T[];
  footer?: string;
}): Promise<T[] | PromptCancel> {
  let active = Math.max(
    0,
    opts.options.findIndex((option) => !option.disabled),
  );
  let error = '';
  const selected = new Set<T>(opts.initialValues ?? []);

  const result = await withRawKeypress<T[] | PromptCancel>(
    () => {
      const lines = [`${chalk.cyan(TUI_TOP)} ${chalk.bold(opts.message)}`, `${chalk.cyan(TUI_BAR)}`];
      for (let i = 0; i < opts.options.length; i++) {
        const option = opts.options[i];
        if (!option) continue;
        const checked = selected.has(option.value);
        const pointer = i === active ? chalk.cyan(TUI_POINTER) : ' ';
        const marker = checked ? chalk.green(TUI_RADIO_ACTIVE) : chalk.dim(TUI_RADIO_INACTIVE);
        const label = option.disabled ? chalk.dim(option.label) : option.label;
        const hint = option.hint ? ` ${chalk.dim(option.hint)}` : '';
        lines.push(`${chalk.cyan(TUI_BAR)} ${pointer} ${marker} ${label}${hint}`);
      }
      if (error) lines.push(`${chalk.yellow(TUI_BAR)} ${chalk.yellow(error)}`);
      lines.push(`${chalk.cyan(TUI_BAR)}`);
      lines.push(`${chalk.cyan(TUI_BOTTOM)} ${chalk.dim(opts.footer ?? 'Up/Down move, Space select, Enter confirm, Esc back')}`);
      process.stderr.write(lines.join('\n') + '\n');
      return lines.length;
    },
    (key) => {
      if (key.name === 'escape') return PROMPT_CANCELLED;
      if (key.name === 'up' || key.name === 'k') active = nextEnabledIndex(opts.options, active, -1);
      if (key.name === 'down' || key.name === 'j') active = nextEnabledIndex(opts.options, active, 1);
      if (key.name === 'space') {
        const option = opts.options[active];
        if (!option || option.disabled) return undefined;
        error = '';
        if (selected.has(option.value)) selected.delete(option.value);
        else selected.add(option.value);
      }
      if (key.name === 'return' || key.name === 'enter') {
        if (selected.size === 0) {
          error = 'Select at least one integration.';
          return undefined;
        }
        return [...selected];
      }
      return undefined;
    },
  );

  if (result !== PROMPT_CANCELLED) {
    const labels = opts.options
      .filter((option) => result.includes(option.value))
      .map((option) => option.label)
      .join(', ');
    finishArrowPrompt(opts.message, labels);
  }
  return result;
}
class CommandError extends Error {
  constructor(
    message: string,
    readonly log?: string,
  ) {
    super(message);
  }
}

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
  process.stderr.write(`${chalk.cyan(TUI_TOP)} ${chalk.bold('Supermemory plugin')}\n`);
  process.stderr.write(`${chalk.cyan(TUI_BAR)} ${chalk.bold('Detected integrations')}\n`);
  for (const target of TARGETS) {
    const detection = detections.get(target.id);
    if (detection?.available) {
      process.stderr.write(
        `${chalk.cyan(TUI_BAR)}   ${chalk.green('[ready]')} ${chalk.bold(target.label)} ${chalk.dim(
          formatDetectionSource(detection),
        )}\n`,
      );
    } else {
      process.stderr.write(
        `${chalk.cyan(TUI_BAR)}   ${chalk.red('[missing]')} ${chalk.bold(target.label)} ${chalk.dim('not detected')}\n`,
      );
    }
  }
  process.stderr.write(`${chalk.cyan(TUI_BOTTOM)} ${chalk.dim('scripts can use supermemory plugin --all')}\n\n`);
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

        if (Object.keys(keysByClient).length === 0 && Object.keys(errorsByClient).length === 0) {
          throw new Error('No plugin keys or errors received from callback');
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

function printPluginAuthStart(targets: Array<{ id: PluginId; label: string }>): void {
  const labels = targets.map((target) => target.label).join(', ');
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

async function authorizePlugins(
  targets: Array<{ id: PluginId; label: string }>,
  options: { dryRun?: boolean; noAuth?: boolean; json?: boolean; noBrowser?: boolean },
): Promise<boolean> {
  if (options.dryRun || options.noAuth || options.json || !isInputInteractive()) {
    return false;
  }

  if (targets.length === 0) return false;

  printPluginAuthStart(targets);

  const clients = targets.map((target) => PLUGIN_AUTH_CLIENTS[target.id]);
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
    if (options.noBrowser) {
      process.stdout.write(`  Open this URL to authorize selected plugins:\n\n  ${chalk.cyan(authUrl)}\n\n`);
    } else {
      spinner?.start('Opening one-click Supermemory OAuth...');
      try {
        await openBrowser(authUrl);
      } catch {
        spinner?.message('Could not open browser automatically.');
        process.stdout.write(`  Open this URL to authorize selected plugins:\n\n  ${chalk.cyan(authUrl)}\n\n`);
      }
    }

    const { keys, errors } = await callback.waitForCallback();
    spinner?.stop('OAuth complete');

    const authResults: PluginAuthResult[] = [];
    for (const result of targets) {
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
      : result.status === 'current' ? chalk.green('[ok]')
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
    (r) =>
      (r.status === 'installed' || r.status === 'current') &&
      ['claude', 'cursor', 'opencode', 'codex'].includes(r.id),
  );
  if (authTargets.length > 0 && !dryRun && !noAuth && isInputInteractive()) {
    const authLabels = authTargets.map((target) => target.label).join(', ');
    process.stdout.write(
      `  ${chalk.dim('OAuth:')} install is ready; continuing to browser approval for ${authLabels}.\n\n`,
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
  printSupermemoryBanner();
  printDetectionSummary(detections);

  const readyIds = getReadyTargetIds(detections);
  const modeOptions: ArrowPromptOption<InstallMode>[] = [
    {
      value: 'custom',
      label: 'Custom selection',
      hint: 'pick integrations with Space',
    },
  ];

  if (readyIds.length > 0) {
    modeOptions.unshift({
      value: 'all',
      label: chalk.cyan('Install all ready integrations'),
      hint: `${readyIds.length} ready`,
    });
  }

  while (true) {
    const mode = await arrowSelect({
      message: 'Which integrations should Supermemory install?',
      options: modeOptions,
    });

    if (mode === PROMPT_CANCELLED) {
      clack.cancel('Install cancelled.');
      process.exit(0);
    }

    if (mode === 'all') return readyIds;

    const selected = await arrowMultiselect({
      message: 'Select integrations',
      footer: 'Up/Down move, Space select, Enter confirm, Esc return to install mode',
      options: TARGETS.map((target) => {
        const detection = detections.get(target.id);
        const display = formatOptionDisplay(target, detection);
        return {
          value: target.id,
          label: display.label,
          hint: display.hint,
          disabled: !detection?.available,
        };
      }),
      initialValues: readyIds.length === 1 ? readyIds : [],
    });

    if (selected === PROMPT_CANCELLED) continue;

    return selected.filter((id): id is PluginId => id in ALIASES);
  }
}
function installedTargets(): PluginTarget[] {
  return TARGETS.filter((target) => detectInstalledPlugin(target.id).installed);
}

async function chooseInstalledTargetIds(action: 'connect' | 'remove'): Promise<PluginId[]> {
  const targets = installedTargets();
  const states = new Map(targets.map((target) => [target.id, detectInstalledPlugin(target.id)]));
  if (targets.length === 0) return [];

  printSupermemoryBanner();
  const selected = await arrowMultiselect({
    message: action === 'connect' ? 'Select plugins to connect' : 'Select plugins to remove',
    options: targets.map((target) => ({
      value: target.id,
      label: target.label,
      hint: states.get(target.id)?.version ? 'v' + states.get(target.id)?.version : 'installed',
    })),
  });

  if (selected === PROMPT_CANCELLED) {
    clack.cancel(action === 'connect' ? 'Login cancelled.' : 'Uninstall cancelled.');
    process.exit(0);
  }
  return selected.filter((id): id is PluginId => TARGETS.some((target) => target.id === id));
}

export async function loginInstalledPlugins(options: {
  all?: boolean;
  only?: unknown;
  noBrowser?: boolean;
  json?: boolean;
}): Promise<boolean> {
  const targets = installedTargets();
  if (targets.length === 0) return false;
  if (options.json) throw new Error('--json is not supported for browser OAuth');

  let selectedIds = parseOnly(options.only);
  if (options.all) selectedIds = targets.map((target) => target.id);
  if (selectedIds.length === 0) {
    if (!isInputInteractive()) return false;
    selectedIds = await chooseInstalledTargetIds('connect');
  }

  const missing = selectedIds.filter((id) => !targets.some((target) => target.id === id));
  if (missing.length > 0) {
    throw new Error(
      'Not installed: ' +
        missing.map((id) => TARGETS.find((target) => target.id === id)?.label ?? id).join(', ') +
        '. Run supermemory plugin first.',
    );
  }

  const selected = targets
    .filter((target) => selectedIds.includes(target.id))
    .map(({ id, label }) => ({ id, label }));
  const failed = await authorizePlugins(selected, { noBrowser: options.noBrowser });
  if (failed) process.exitCode = 1;
  return true;
}

async function handlePluginLogin(options: {
  all: boolean;
  only: unknown;
  noBrowser: boolean;
  json: boolean;
}): Promise<void> {
  const handled = await loginInstalledPlugins(options);
  if (!handled) {
    throw new Error('No installed Supermemory plugins found. Run supermemory plugin first.');
  }
}

export const pluginLoginCommand = defineCliCommand({
  meta: {
    name: 'login',
    description: 'Connect installed Supermemory plugins with browser OAuth',
  },
  noSpan: true,
  args: {
    all: {
      type: 'boolean',
      description: 'Connect every installed Supermemory plugin',
      default: false,
    },
    only: {
      type: 'string',
      description: 'Comma-separated targets: claude,cursor,opencode,codex',
    },
    browser: {
      type: 'boolean',
      description: 'Open the OAuth page in a browser (use --no-browser to show the URL)',
      default: true,
    },
  },
  async handler({ args, flags }) {
    await handlePluginLogin({
      all: args.all === true,
      only: args.only,
      noBrowser: args.browser !== true,
      json: flags.json === true,
    });
  },
});

async function uninstallTarget(target: PluginTarget, dryRun: boolean): Promise<UninstallResult> {
  const steps: string[] = [];
  try {
    let log: string | undefined;
    if (target.id === 'claude') {
      const args = ['plugin', 'uninstall', 'supermemory@supermemory-plugins', '--scope', 'user'];
      steps.push(formatStep('claude', args));
      if (!dryRun) log = await runProcess('claude', args);
    }
    if (target.id === 'cursor') {
      steps.push('remove ' + CURSOR_PLUGIN_TARGET);
      if (!dryRun) rmSync(CURSOR_PLUGIN_TARGET, { recursive: true, force: true });
    }
    if (target.id === 'opencode') {
      steps.push('remove opencode-supermemory from OpenCode config and generated commands');
      if (!dryRun) steps.splice(0, steps.length, ...removeOpenCodePlugin());
    }
    if (target.id === 'codex') {
      const args = ['-y', 'codex-supermemory@latest', 'uninstall'];
      steps.push(formatStep('npx', args));
      if (!dryRun) log = await runProcess('npx', args);
    }

    if (!dryRun) forgetPluginVersion(target.id);
    return {
      id: target.id,
      label: target.label,
      status: dryRun ? 'planned' : 'removed',
      message: dryRun ? 'would be removed' : 'removed; credentials and memories were kept',
      steps,
      log,
    };
  } catch (error) {
    return {
      id: target.id,
      label: target.label,
      status: 'failed',
      message: error instanceof Error ? error.message : String(error),
      steps,
      log: error instanceof CommandError ? error.log : undefined,
    };
  }
}

function printUninstallSummary(results: UninstallResult[], dryRun: boolean): void {
  const title = dryRun ? 'Supermemory uninstall plan' : 'Supermemory uninstall summary';
  process.stdout.write('\n' + chalk.bold(title) + '\n\n');
  for (const result of results) {
    const icon =
      result.status === 'removed' ? chalk.green('[ok]')
      : result.status === 'planned' ? chalk.cyan('[plan]')
      : result.status === 'skipped' ? chalk.yellow('[skip]')
      : chalk.red('[fail]');
    process.stdout.write(icon + ' ' + chalk.bold(result.label) + ': ' + result.message + '\n');
    for (const step of result.steps) process.stdout.write('  ' + chalk.dim(step) + '\n');
    if (result.log && result.status === 'failed') {
      process.stdout.write('  ' + chalk.dim(result.log) + '\n');
    }
    process.stdout.write('\n');
  }
}

async function handlePluginUninstall(
  args: Record<string, unknown>,
  flags: { json?: boolean },
): Promise<void> {
  const dryRun = args['dry-run'] === true;
  const installed = installedTargets();
  let selectedIds = parseOnly(args.only);
  if (args.all === true) selectedIds = installed.map((target) => target.id);

  if (selectedIds.length === 0 && args.all !== true) {
    if (!isInputInteractive() || flags.json) {
      throw new Error('Choose targets with --all or --only claude,cursor,opencode,codex');
    }
    selectedIds = await chooseInstalledTargetIds('remove');
  }
  if (selectedIds.length === 0) {
    process.stdout.write('\n' + chalk.yellow('[skip]') + ' No installed Supermemory plugins found.\n\n');
    return;
  }

  const results: UninstallResult[] = [];
  for (const id of selectedIds) {
    const target = TARGETS.find((candidate) => candidate.id === id);
    if (!target) continue;
    if (!installed.some((candidate) => candidate.id === id)) {
      results.push({
        id,
        label: target.label,
        status: 'skipped',
        message: 'not installed',
        steps: [],
      });
      continue;
    }
    results.push(await uninstallTarget(target, dryRun));
  }

  if (flags.json) process.stdout.write(JSON.stringify({ results }, null, 2) + '\n');
  else printUninstallSummary(results, dryRun);
  if (results.some((result) => result.status === 'failed')) process.exitCode = 1;
}

export const uninstallCommand = defineCliCommand({
  meta: {
    name: 'uninstall',
    description: 'Remove selected Supermemory plugin integrations',
  },
  noSpan: true,
  args: {
    all: {
      type: 'boolean',
      description: 'Remove every installed Supermemory plugin',
      default: false,
    },
    only: {
      type: 'string',
      description: 'Comma-separated targets: claude,cursor,opencode,codex',
    },
    'dry-run': {
      type: 'boolean',
      description: 'Show what would be removed without changing anything',
      default: false,
    },
  },
  async handler({ args, flags }) {
    const dryRun = args['dry-run'] === true;
    const installed = installedTargets();
    let selectedIds = parseOnly(args.only);
    if (args.all === true) selectedIds = installed.map((target) => target.id);

    if (selectedIds.length === 0 && args.all !== true) {
      if (!isInputInteractive() || flags.json) {
        throw new Error('Choose targets with --all or --only claude,cursor,opencode,codex');
      }
      selectedIds = await chooseInstalledTargetIds('remove');
    }
    if (selectedIds.length === 0) {
      process.stdout.write('\n' + chalk.yellow('[skip]') + ' No installed Supermemory plugins found.\n\n');
      return;
    }

    const results: UninstallResult[] = [];
    for (const id of selectedIds) {
      const target = TARGETS.find((candidate) => candidate.id === id);
      if (!target) continue;
      if (!installed.some((candidate) => candidate.id === id)) {
        results.push({
          id,
          label: target.label,
          status: 'skipped',
          message: 'not installed',
          steps: [],
        });
        continue;
      }
      results.push(await uninstallTarget(target, dryRun));
    }

    if (flags.json) process.stdout.write(JSON.stringify({ results }, null, 2) + '\n');
    else printUninstallSummary(results, dryRun);
    if (results.some((result) => result.status === 'failed')) process.exitCode = 1;
  },
});


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
  async handler({ args, flags, rawArgs }) {
    const action = rawArgs.find((arg) => !arg.startsWith('-'));
    if (action === 'login') {
      await handlePluginLogin({
        all: args.all === true,
        only: args.only,
        noBrowser: rawArgs.includes('--no-browser'),
        json: flags.json === true,
      });
      return;
    }
    if (action === 'uninstall') {
      await handlePluginUninstall(args, flags);
      return;
    }

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

      const installed = detectInstalledPlugin(id);
      const latestVersion = await getLatestPluginVersion(id);
      const shouldInstall =
        force ||
        !installed.installed ||
        Boolean(
          installed.version &&
            latestVersion &&
            compareVersions(installed.version, latestVersion) < 0,
        );

      if (!shouldInstall) {
        results.push({
          id,
          label: target.label,
          status: 'current',
          message:
            installed.version && latestVersion ?
              'already up to date (v' + installed.version + ')' + (dryRun || noAuth ? '' : '; continuing to OAuth')
            : 'already installed; version could not be verified, use --force to reinstall',
          steps: [],
        });
        continue;
      }

      const result = await installTarget(target, dryRun);
      results.push(result);
      if (!dryRun && result.status === 'installed') {
        const detectedVersion =
          latestVersion ?? detectInstalledPlugin(id).version ?? installed.version;
        if (detectedVersion) recordPluginVersion(id, detectedVersion);
      }
    }

    if (flags.json) {
      process.stdout.write(`${JSON.stringify({ results }, null, 2)}\n`);
    } else {
      printHumanSummary(results, dryRun, noAuth);
    }

    const oauthTargets = results
      .filter((result) => result.status === 'installed' || result.status === 'current')
      .map(({ id, label }) => ({ id, label }));
    const authFailed = await authorizePlugins(oauthTargets, {
      dryRun,
      noAuth,
      json: flags.json === true,
    });

    if (results.some((result) => result.status === 'failed') || authFailed) {
      process.exitCode = 1;
    }
  },
});
