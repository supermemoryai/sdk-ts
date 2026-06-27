import chalk from 'chalk';

export interface OutputFlags {
  json?: boolean;
}

export const EXIT = {
  SUCCESS: 0,
  ERROR: 1,
  AUTH_REQUIRED: 2,
  PERMISSION_DENIED: 3,
  NOT_FOUND: 4,
} as const;

export function isInteractive(): boolean {
  return process.stdout.isTTY === true;
}

export function isInputInteractive(): boolean {
  return process.stdin.isTTY === true;
}

export function shouldOutputJson(flags: OutputFlags): boolean {
  if (flags.json) return true;
  return !isInteractive();
}

export function output(data: unknown, humanFormatter: (data: unknown) => string, flags: OutputFlags): void {
  if (shouldOutputJson(flags)) {
    process.stdout.write(`${JSON.stringify(data, null, 2)}\n`);
  } else {
    process.stdout.write(`${humanFormatter(data)}\n`);
  }
}

export function outputJson(data: unknown, _flags: OutputFlags): void {
  process.stdout.write(`${JSON.stringify(data, null, 2)}\n`);
}

export function success(message: string, flags: OutputFlags): void {
  if (shouldOutputJson(flags)) return;
  process.stdout.write(`${chalk.green('✓')} ${message}\n`);
}

export function warn(message: string, flags: OutputFlags): void {
  if (shouldOutputJson(flags)) return;
  process.stderr.write(`${chalk.yellow('⚠')} ${message}\n`);
}

export function info(message: string, flags: OutputFlags): void {
  if (shouldOutputJson(flags)) return;
  process.stdout.write(`  ${message}\n`);
}

export function error(code: string, message: string, flags: OutputFlags, hint?: string): void {
  if (shouldOutputJson(flags)) {
    process.stderr.write(`${JSON.stringify({ error: code, message, ...(hint ? { hint } : {}) })}\n`);
  } else {
    process.stderr.write(`${chalk.red('✗')} Error: ${message}\n`);
    if (hint) {
      process.stderr.write(`  ${chalk.dim(`hint: ${hint}`)}\n`);
    }
  }
}

export function exitWithError(
  code: string,
  message: string,
  flags: OutputFlags,
  exitCode: number = EXIT.ERROR,
  hint?: string,
): never {
  error(code, message, flags, hint);
  process.exit(exitCode);
}

// biome-ignore lint/suspicious/noControlCharactersInRegex: ANSI escape stripping requires matching the ESC control character
const ANSI_RE = /\x1B\[[0-9;]*m/g;

function visualLength(str: string): number {
  return str.replace(ANSI_RE, '').length;
}

export function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return `${str.slice(0, max - 1)}…`;
}

export function formatTable(headers: string[], rows: string[][], columnWidths?: number[]): string {
  const cellLengths = rows.map((row) => row.map((cell) => visualLength(cell ?? '')));

  const widths =
    columnWidths ?? headers.map((h, i) => Math.max(h.length, ...cellLengths.map((lens) => lens[i] ?? 0)));

  const headerLine = headers.map((h, i) => h.padEnd(widths[i] ?? 0)).join('  ');
  const lines = rows.map((row, rowIdx) =>
    row
      .map((cell, i) => {
        const c = cell ?? '';
        const pad = (widths[i] ?? 0) - (cellLengths[rowIdx]?.[i] ?? 0);
        return pad > 0 ? c + ' '.repeat(pad) : c;
      })
      .join('  '),
  );

  return `  ${chalk.dim(headerLine)}\n${lines.map((l) => `  ${l}`).join('\n')}`;
}

export function formatKeyValue(pairs: [string, string][]): string {
  const maxKeyLen = Math.max(...pairs.map(([k]) => k.length));
  return pairs.map(([key, value]) => `  ${chalk.dim(key.padEnd(maxKeyLen + 1))} ${value}`).join('\n');
}

export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = Date.now();
  const diff = now - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'just now';
}

export function formatProgressBar(current: number, total: number, width = 13): string {
  const ratio = Math.min(current / total, 1);
  const filled = Math.round(ratio * width);
  const empty = width - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  const pct = Math.round(ratio * 100);
  return `${bar}  ${pct}%`;
}

export function maskApiKey(key: string): string {
  if (key.length < 12) return '****';
  const prefix = key.slice(0, key.indexOf('_', 3) + 1);
  const start = key.slice(prefix.length, prefix.length + 4);
  return `${prefix}${start}****`;
}

export function formatNumberedList(items: { title: string; subtitle?: string }[]): string {
  return items
    .map(
      (item, i) =>
        `  ${chalk.dim(`${i + 1}.`)} ${item.title}${
          item.subtitle ? `\n     ${chalk.dim(item.subtitle)}` : ''
        }`,
    )
    .join('\n\n');
}
