import chalk from 'chalk';
import { defineCommand, runCommand } from 'citty';
import { apiRequest } from '../lib/api.js';
import { defineCliCommand } from '../lib/command.js';
import { formatKeyValue, formatProgressBar, formatTable, output } from '../lib/output.js';

const billingShowCommand = defineCliCommand({
  meta: {
    name: 'show',
    description: 'Show current billing plan and usage summary',
  },
  async handler({ flags }) {
    const { data } = await apiRequest<{
      plan: string;
      usage: {
        tokens: { used: number; limit: number };
        queries: { used: number; limit: number };
      };
      resetDate?: string;
      billingEmail?: string;
    }>('/v3/auth/billing');

    output(
      data,
      () => {
        const usage = data.usage ?? {
          tokens: { used: 0, limit: 0 },
          queries: { used: 0, limit: 0 },
        };

        const pairs: [string, string][] = [['Plan:', chalk.cyan(data.plan ?? 'unknown')]];

        if (data.billingEmail) {
          pairs.push(['Billing Email:', data.billingEmail]);
        }

        pairs.push([
          'Tokens:',
          usage.tokens.limit > 0 ?
            `${usage.tokens.used.toLocaleString()} / ${usage.tokens.limit.toLocaleString()}  ${formatProgressBar(
              usage.tokens.used,
              usage.tokens.limit,
            )}`
          : `${usage.tokens.used.toLocaleString()}`,
        ]);
        pairs.push([
          'Queries:',
          usage.queries.limit > 0 ?
            `${usage.queries.used.toLocaleString()} / ${usage.queries.limit.toLocaleString()}  ${formatProgressBar(
              usage.queries.used,
              usage.queries.limit,
            )}`
          : `${usage.queries.used.toLocaleString()}`,
        ]);

        if (data.resetDate) {
          pairs.push(['Resets On:', new Date(data.resetDate).toLocaleDateString()]);
        }

        return formatKeyValue(pairs);
      },
      flags,
    );
  },
});

const billingUsageCommand = defineCliCommand({
  meta: {
    name: 'usage',
    description: 'Show detailed usage breakdown',
  },
  async handler({ flags }) {
    const { data } = await apiRequest<{
      items: {
        name: string;
        used: number;
        limit: number;
        unit: string;
      }[];
      periodStart?: string;
      periodEnd?: string;
    }>('/v3/auth/billing/usage');

    output(
      data,
      () => {
        const items = data.items ?? [];
        if (items.length === 0) {
          return '  No usage data available.';
        }

        const lines: string[] = [];

        if (data.periodStart && data.periodEnd) {
          lines.push(
            `  Period: ${chalk.dim(
              `${new Date(data.periodStart).toLocaleDateString()} - ${new Date(
                data.periodEnd,
              ).toLocaleDateString()}`,
            )}`,
          );
          lines.push('');
        }

        const rows = items.map((item) => [
          item.name,
          item.used.toLocaleString(),
          item.limit > 0 ? item.limit.toLocaleString() : chalk.dim('unlimited'),
          item.unit,
          item.limit > 0 ? formatProgressBar(item.used, item.limit) : chalk.dim('-'),
        ]);

        lines.push(formatTable(['METRIC', 'USED', 'LIMIT', 'UNIT', 'USAGE'], rows));

        return lines.join('\n');
      },
      flags,
    );
  },
});

const billingInvoicesCommand = defineCliCommand({
  meta: {
    name: 'invoices',
    description: 'List billing invoices',
  },
  async handler({ flags }) {
    const { data } = await apiRequest<{
      invoices: {
        id: string;
        date: string;
        amount: number;
        currency: string;
        status: string;
      }[];
    }>('/v3/auth/billing/invoices');

    output(
      data,
      () => {
        const invoices = data.invoices ?? [];
        if (invoices.length === 0) {
          return '  No invoices found.';
        }

        const rows = invoices.map((inv) => [
          new Date(inv.date).toLocaleDateString(),
          `${(inv.amount / 100).toFixed(2)} ${(inv.currency ?? 'USD').toUpperCase()}`,
          inv.status === 'paid' ? chalk.green(inv.status)
          : inv.status === 'open' ? chalk.yellow(inv.status)
          : chalk.dim(inv.status),
          chalk.dim(inv.id),
        ]);

        return formatTable(['DATE', 'AMOUNT', 'STATUS', 'ID'], rows);
      },
      flags,
    );
  },
});

export const billingCommand = defineCommand({
  meta: {
    name: 'billing',
    description: 'View billing, usage, and invoices',
  },
  subCommands: {
    show: billingShowCommand,
    usage: billingUsageCommand,
    invoices: billingInvoicesCommand,
  },
  async run({ rawArgs }) {
    const sub = rawArgs.find((a: string) => !a.startsWith('-'));
    if (sub && ['show', 'usage', 'invoices'].includes(sub)) return;
    await runCommand(billingShowCommand, { rawArgs });
    process.stderr.write(
      `\n  ${chalk.dim(
        'Available commands: show, usage, invoices. Run supermemory billing --help for details.',
      )}\n`,
    );
  },
});
