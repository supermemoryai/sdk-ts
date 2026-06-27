import chalk from 'chalk';
import { defineCommand, runCommand } from 'citty';
import { apiRequest } from '../lib/api.js';
import { defineCliCommand } from '../lib/command.js';
import { formatKeyValue, formatRelativeTime, formatTable, output, truncate } from '../lib/output.js';
import { parseEnumArg, parseIntArg } from '../lib/validators.js';

function formatStatusCode(code: number): string {
  return code >= 200 && code < 300 ? chalk.green(String(code)) : chalk.red(String(code));
}

const logsListCommand = defineCliCommand({
  meta: {
    name: 'list',
    description: 'List recent API request logs',
  },
  args: {
    period: {
      type: 'string',
      description: 'Time period: 24h, 7d, 30d, or all (default: 24h)',
    },
    type: {
      type: 'string',
      description: 'Filter by request type',
    },
    status: {
      type: 'string',
      description: 'Filter by status: success or error',
    },
    limit: {
      type: 'string',
      description: 'Max results (default: 20)',
    },
    page: {
      type: 'string',
      description: 'Page number (default: 1)',
    },
  },
  async handler({ args, flags }) {
    const query: Record<string, string | number | boolean | undefined> = {};
    query.period = parseEnumArg(args.period as string | undefined, 'period', [
      '24h',
      '7d',
      '30d',
      'all',
    ] as const);
    if (args.type) query.type = args.type as string;
    query.status = parseEnumArg(args.status as string | undefined, 'status', ['success', 'error'] as const);
    query.limit = parseIntArg(args.limit as string | undefined, 'limit', { min: 1 }) ?? 20;
    query.page = parseIntArg(args.page as string | undefined, 'page', { min: 1 }) ?? 1;

    const { data } = await apiRequest<{
      logs: {
        id: string;
        createdAt: string;
        type: string;
        statusCode: number;
        duration: number | null;
        input?: unknown;
      }[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
      };
    }>('/v3/analytics/requests', { query });

    output(
      data,
      () => {
        const logs = data.logs ?? [];
        if (logs.length === 0) {
          return '  No logs found.';
        }

        const pg = data.pagination;
        const header =
          pg ? `  Page ${pg.currentPage} of ${pg.totalPages} (${pg.totalItems} total requests)\n` : '';

        const rows = logs.map((r) => {
          const preview = r.input ? truncate(JSON.stringify(r.input), 60) : chalk.dim('--');
          return [
            formatRelativeTime(r.createdAt),
            r.type,
            formatStatusCode(r.statusCode),
            r.duration != null ? `${r.duration}ms` : chalk.dim('--'),
            preview,
            chalk.dim(r.id),
          ];
        });

        const table = formatTable(['TIMESTAMP', 'TYPE', 'STATUS', 'LATENCY', 'CONTENT', 'ID'], rows);

        const hint = `\n\n  ${chalk.dim('Tip: supermemory logs get <id> --json for full request details.')}`;

        return `${header}${table}${hint}`;
      },
      flags,
    );
  },
});

const logsGetCommand = defineCliCommand({
  meta: {
    name: 'get',
    description: 'Get details for a specific request log',
  },
  args: {
    id: {
      type: 'positional',
      description: 'Request log ID',
      required: true,
    },
  },
  async handler({ args, flags }) {
    const { data } = await apiRequest<{
      logs: {
        id: string;
        createdAt: string;
        type: string;
        statusCode: number;
        duration: number | null;
        input?: unknown;
        output?: unknown;
        keyId?: string;
      }[];
    }>('/v3/analytics/requests', {
      query: { id: args.id as string, limit: 1 },
    });

    const log = (data.logs ?? [])[0];

    output(
      log ?? data,
      () => {
        if (!log) {
          return `  No log found with ID ${args.id}`;
        }

        const pairs: [string, string][] = [
          ['ID:', log.id],
          ['Timestamp:', new Date(log.createdAt).toLocaleString()],
          ['Type:', log.type],
          ['Status:', formatStatusCode(log.statusCode)],
          ['Latency:', log.duration != null ? `${log.duration}ms` : chalk.dim('--')],
        ];

        if (log.keyId) pairs.push(['Key ID:', log.keyId]);

        const lines = [formatKeyValue(pairs)];

        if (log.input) {
          lines.push('');
          lines.push(`  ${chalk.bold('Input:')}`);
          lines.push(`  ${chalk.dim(JSON.stringify(log.input, null, 2).replace(/\n/g, '\n  '))}`);
        }

        if (log.output) {
          lines.push('');
          lines.push(`  ${chalk.bold('Output:')}`);
          lines.push(`  ${chalk.dim(JSON.stringify(log.output, null, 2).replace(/\n/g, '\n  '))}`);
        }

        return lines.join('\n');
      },
      flags,
    );
  },
});

export const logsCommand = defineCommand({
  meta: {
    name: 'logs',
    description: 'View API request logs and analytics',
  },
  subCommands: {
    list: logsListCommand,
    get: logsGetCommand,
  },
  async run({ rawArgs }) {
    const sub = rawArgs.find((a: string) => !a.startsWith('-'));
    if (sub && ['list', 'get'].includes(sub)) return;
    await runCommand(logsListCommand, { rawArgs });
    process.stderr.write(
      `\n  ${chalk.dim('Available commands: list, get. Run supermemory logs --help for details.')}\n`,
    );
  },
});
