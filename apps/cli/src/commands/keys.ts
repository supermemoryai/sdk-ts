import chalk from 'chalk';
import { defineCommand, runCommand } from 'citty';
import { apiRequest } from '../lib/api.js';
import { defineCliCommand } from '../lib/command.js';
import { EXIT, exitWithError, formatKeyValue, formatTable, maskApiKey, output } from '../lib/output.js';
import { confirm } from '../lib/prompt.js';
import { parseEnumArg, parseIntArg } from '../lib/validators.js';

const keysListCommand = defineCliCommand({
  meta: {
    name: 'list',
    description: 'List all API keys for the current organization',
  },
  async handler({ flags }) {
    const { data } = await apiRequest<{
      keys: {
        id: string;
        name: string;
        key?: string;
        start?: string;
        permission: string;
        containerTag?: string;
        containerTags?: string[];
        createdAt: string;
        lastUsedAt?: string;
        lastRequest?: string;
        enabled: boolean;
        metadata?: string;
      }[];
    }>('/v3/auth/keys');

    output(
      data,
      () => {
        const keys = (data.keys ?? []).filter((k) => {
          if (!k.metadata) return true;
          try {
            const meta = JSON.parse(k.metadata);
            return meta.sm_type !== 'agent_cli' && meta.sm_type !== 'plugin_auth';
          } catch {
            return true;
          }
        });
        if (keys.length === 0) {
          return '  No API keys found.';
        }

        return formatTable(
          ['PREFIX', 'NAME', 'TYPE', 'PERMISSION', 'CREATED'],
          keys.map((k) => [
            k.key ? maskApiKey(k.key) : chalk.dim('--'),
            k.name,
            k.containerTags?.length ? `scoped (${k.containerTags.join(', ')})`
            : k.containerTag ? `scoped (${k.containerTag})`
            : 'full',
            k.permission,
            new Date(k.createdAt).toLocaleDateString(),
          ]),
        );
      },
      flags,
    );
  },
});

const keysCreateCommand = defineCliCommand({
  meta: {
    name: 'create',
    description: 'Create a new API key',
  },
  args: {
    name: {
      type: 'string',
      description: 'Label for the key',
      required: true,
    },
    permission: {
      type: 'string',
      description: 'Permission level: read or write (default: write)',
    },
    tag: {
      type: 'string',
      description: 'Scope key to container tag(s), comma-separated for multiple',
    },
    expires: {
      type: 'string',
      description: 'Expiration in days',
    },
  },
  async handler({ args, flags }) {
    const permission =
      parseEnumArg(args.permission as string | undefined, 'permission', ['read', 'write'] as const) ??
      'write';

    const expires = parseIntArg(args.expires as string | undefined, 'expires', {
      min: 1,
    });

    const body: Record<string, unknown> = {
      name: args.name,
      permission,
    };
    if (args.tag) {
      const tags = (args.tag as string)
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
      body.containerTags = tags;
    }
    if (expires !== undefined) body.expiresInDays = expires;

    const { data } = await apiRequest<{
      id: string;
      name: string;
      key: string;
      permission: string;
      containerTag?: string;
      containerTags?: string[];
      expiresAt?: string;
    }>('/v3/auth/agent-key', {
      method: 'POST',
      body,
    });

    output(
      data,
      () => {
        const lines: string[] = [];

        lines.push(`${chalk.green('✓')} Created API key ${chalk.bold(data.name)}`);
        lines.push('');
        lines.push(`  ${chalk.yellow('WARNING:')} This key will only be shown once. Copy it now.`);
        lines.push('');
        lines.push(`  ${chalk.bold(data.key)}`);
        lines.push('');
        lines.push(
          formatKeyValue([
            ['Name:', data.name],
            ['ID:', data.id],
            ['Permission:', data.permission],
            [
              'Scope:',
              data.containerTags?.length ? `scoped (${data.containerTags.join(', ')})`
              : data.containerTag ? `scoped (${data.containerTag})`
              : 'full',
            ],
            ['Expires:', data.expiresAt ? new Date(data.expiresAt).toLocaleDateString() : 'never'],
          ]),
        );

        return lines.join('\n');
      },
      flags,
    );
  },
});

const keysRevokeCommand = defineCliCommand({
  meta: {
    name: 'revoke',
    description: 'Revoke an API key',
  },
  args: {
    id: {
      type: 'positional',
      description: 'Key ID to revoke',
      required: true,
    },
    yes: {
      type: 'boolean',
      description: 'Skip confirmation (for scripts and agents)',
      default: false,
    },
  },
  async handler({ args, flags }) {
    if (!args.yes) {
      const confirmed = await confirm(
        `${chalk.yellow('⚠')} Revoke API key ${chalk.bold(
          args.id as string,
        )}? This cannot be undone. [y/N] `,
      );
      if (!confirmed) {
        exitWithError('cancelled', 'Revocation cancelled.', flags, EXIT.SUCCESS);
      }
    }

    const { data } = await apiRequest<{
      success: boolean;
      id: string;
    }>(`/v3/auth/scoped-key/${args.id}`, {
      method: 'DELETE',
    });

    output(data, () => `${chalk.green('✓')} Revoked API key ${chalk.dim(args.id as string)}`, flags);
  },
});

const keysToggleCommand = defineCliCommand({
  meta: {
    name: 'toggle',
    description: 'Enable or disable an API key',
  },
  args: {
    id: {
      type: 'positional',
      description: 'Key ID to toggle',
      required: true,
    },
  },
  async handler({ args, flags }) {
    const { data } = await apiRequest<{
      id: string;
      enabled: boolean;
    }>(`/v3/auth/keys/${args.id}/toggle`, {
      method: 'PUT',
    });

    output(
      data,
      () =>
        `${chalk.green('✓')} Key ${chalk.dim(args.id as string)} is now ${
          data.enabled ? chalk.green('enabled') : chalk.red('disabled')
        }`,
      flags,
    );
  },
});

export const keysCommand = defineCommand({
  meta: {
    name: 'keys',
    description: 'Manage API keys',
  },
  subCommands: {
    list: keysListCommand,
    create: keysCreateCommand,
    revoke: keysRevokeCommand,
    toggle: keysToggleCommand,
  },
  async run({ rawArgs }) {
    const sub = rawArgs.find((a: string) => !a.startsWith('-'));
    if (sub && ['list', 'create', 'revoke', 'toggle'].includes(sub)) return;
    await runCommand(keysListCommand, { rawArgs });
    process.stderr.write(
      `\n  ${chalk.dim(
        'Available commands: list, create, revoke, toggle. Run supermemory keys --help for details.',
      )}\n`,
    );
  },
});
