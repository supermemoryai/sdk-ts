import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import chalk from 'chalk';
import { defineCommand, runCommand } from 'citty';
import { apiRequest } from '../lib/api.js';
import { defineCliCommand } from '../lib/command.js';
import { EXIT, exitWithError, formatKeyValue, formatTable, maskApiKey, output } from '../lib/output.js';
import { confirm } from '../lib/prompt.js';

const PLUGIN_CONFIG_PATHS: Record<string, string> = {
  'claude-code': join(homedir(), '.claude', 'settings.json'),
  cursor: join(homedir(), '.cursor', 'settings.json'),
  opencode: join(homedir(), '.opencode', 'config.json'),
  openclaw: join(homedir(), '.openclaw', 'config.json'),
  codex: join(homedir(), '.codex', 'hooks.json'),
};

const KNOWN_PLUGINS = ['claude-code', 'cursor', 'opencode', 'openclaw', 'codex'];

const pluginsListCommand = defineCliCommand({
  meta: {
    name: 'list',
    description: 'List all plugins and their connection status',
  },
  async handler({ flags }) {
    const { data } = await apiRequest<{
      keys: {
        id: string;
        name: string;
        key?: string;
        createdAt: string;
        lastRequest?: string;
        enabled: boolean;
        metadata?: string;
      }[];
    }>('/v3/auth/keys');

    output(
      data,
      () => {
        const plugins = (data.keys ?? [])
          .filter((k) => {
            if (!k.metadata) return false;
            try {
              return JSON.parse(k.metadata).sm_type === 'plugin_auth';
            } catch {
              return false;
            }
          })
          .map((k) => {
            const meta = JSON.parse(k.metadata as string);
            return {
              pluginId: meta.sm_client ?? k.name,
              keyPrefix: k.key,
              lastUsed: k.lastRequest,
              createdAt: k.createdAt,
            };
          });

        if (plugins.length === 0) {
          return '  No plugins connected.';
        }

        return formatTable(
          ['PLUGIN', 'KEY PREFIX', 'LAST USED', 'CONNECTED'],
          plugins.map((p) => [
            p.pluginId,
            p.keyPrefix ? maskApiKey(p.keyPrefix) : chalk.dim('--'),
            p.lastUsed ? new Date(p.lastUsed).toLocaleDateString() : chalk.dim('never'),
            new Date(p.createdAt).toLocaleDateString(),
          ]),
        );
      },
      flags,
    );
  },
});

const pluginsConnectCommand = defineCliCommand({
  meta: {
    name: 'connect',
    description: 'Connect a plugin and generate an API key',
  },
  args: {
    id: {
      type: 'positional',
      description: 'Plugin ID (claude-code, cursor, opencode, openclaw)',
      required: true,
    },
    'auto-configure': {
      type: 'boolean',
      description: 'Show config file path and key for auto-configuration',
      default: false,
    },
  },
  async handler({ args, flags }) {
    if (!KNOWN_PLUGINS.includes(args.id as string)) {
      exitWithError(
        'validation_error',
        `Unknown plugin "${args.id}". Available plugins: ${KNOWN_PLUGINS.join(', ')}`,
        flags,
      );
    }

    const { data } = await apiRequest<{
      pluginId: string;
      key: string;
      name?: string;
      createdAt?: string;
    }>('/v3/auth/agent-key', {
      method: 'POST',
      body: {
        name: `plugin-${args.id}`,
        pluginId: args.id,
        permission: 'write',
      },
    });

    output(
      data,
      () => {
        const lines: string[] = [];

        lines.push(`${chalk.green('✓')} Connected plugin ${chalk.bold(data.pluginId)}`);
        lines.push('');
        lines.push(`  ${chalk.yellow('WARNING:')} This key will only be shown once. Copy it now.`);
        lines.push('');
        lines.push(`  ${chalk.bold(data.key)}`);

        if (args['auto-configure']) {
          const configPath = PLUGIN_CONFIG_PATHS[args.id as string];
          if (configPath) {
            lines.push('');
            lines.push(chalk.dim('  ── Auto-configure ──'));
            lines.push(`  Config path: ${chalk.cyan(configPath)}`);
            lines.push(`  Exists:      ${existsSync(configPath) ? chalk.green('yes') : chalk.dim('no')}`);
            lines.push('');
            lines.push(`  Add the following key to your ${chalk.bold(args.id as string)} configuration:`);
            lines.push(`  ${chalk.bold(data.key)}`);
          }
        }

        return lines.join('\n');
      },
      flags,
    );
  },
});

const pluginsRevokeCommand = defineCliCommand({
  meta: {
    name: 'revoke',
    description: 'Revoke the API key for a plugin',
  },
  args: {
    id: {
      type: 'positional',
      description: 'Plugin ID to revoke',
      required: true,
    },
    yes: {
      type: 'boolean',
      description: 'Skip confirmation (for scripts and agents)',
      default: false,
    },
  },
  async handler({ args, flags }) {
    const pluginName = args.id as string;

    const { data: keysData } = await apiRequest<{
      keys: {
        id: string;
        name: string;
        metadata?: string;
      }[];
    }>('/v3/auth/keys');

    const pluginKey = (keysData.keys ?? []).find((k) => {
      if (!k.metadata) return false;
      try {
        const meta = JSON.parse(k.metadata);
        return meta.sm_type === 'plugin_auth' && meta.sm_client === pluginName;
      } catch {
        return false;
      }
    });

    if (!pluginKey) {
      exitWithError('not_found', `No connected plugin found for "${pluginName}"`, flags);
    }

    if (!args.yes) {
      const confirmed = await confirm(
        `${chalk.yellow('⚠')} Revoke API key for plugin ${chalk.bold(pluginName)}? [y/N] `,
      );
      if (!confirmed) {
        exitWithError('cancelled', 'Revocation cancelled.', flags, EXIT.SUCCESS);
      }
    }

    const { data } = await apiRequest<{
      success: boolean;
    }>(`/v3/auth/scoped-key/${pluginKey.id}`, {
      method: 'DELETE',
    });

    output(data, () => `${chalk.green('✓')} Revoked API key for plugin ${chalk.dim(pluginName)}`, flags);
  },
});

const pluginsStatusCommand = defineCliCommand({
  meta: {
    name: 'status',
    description: 'Show detailed status of all plugins',
  },
  async handler({ flags }) {
    const { data } = await apiRequest<{
      keys: {
        id: string;
        name: string;
        key?: string;
        createdAt: string;
        lastRequest?: string;
        enabled: boolean;
        metadata?: string;
      }[];
    }>('/v3/auth/keys');

    output(
      data,
      () => {
        const plugins = (data.keys ?? [])
          .filter((k) => {
            if (!k.metadata) return false;
            try {
              return JSON.parse(k.metadata).sm_type === 'plugin_auth';
            } catch {
              return false;
            }
          })
          .map((k) => {
            const meta = JSON.parse(k.metadata as string);
            return {
              pluginId: meta.sm_client ?? k.name,
              keyPrefix: k.key,
              lastUsed: k.lastRequest,
              createdAt: k.createdAt,
            };
          });

        if (plugins.length === 0) {
          return '  No plugins connected.';
        }

        const sections = plugins.map((p) =>
          formatKeyValue([
            ['Plugin:', chalk.bold(p.pluginId)],
            ['Key Prefix:', p.keyPrefix ? maskApiKey(p.keyPrefix) : chalk.dim('--')],
            ['Last Used:', p.lastUsed ? new Date(p.lastUsed).toLocaleDateString() : chalk.dim('never')],
            ['Connected:', new Date(p.createdAt).toLocaleDateString()],
            [
              'Config Path:',
              PLUGIN_CONFIG_PATHS[p.pluginId] ? chalk.cyan(PLUGIN_CONFIG_PATHS[p.pluginId]) : chalk.dim('--'),
            ],
            [
              'Config Exists:',
              PLUGIN_CONFIG_PATHS[p.pluginId] ?
                existsSync(PLUGIN_CONFIG_PATHS[p.pluginId] as string) ? chalk.green('yes')
                : chalk.dim('no')
              : chalk.dim('--'),
            ],
          ]),
        );

        return sections.join(`\n\n${chalk.dim('  ──────────────────────────────────')}\n\n`);
      },
      flags,
    );
  },
});

export const pluginsCommand = defineCommand({
  meta: {
    name: 'plugins',
    description: 'Manage plugin connections',
  },
  subCommands: {
    list: pluginsListCommand,
    connect: pluginsConnectCommand,
    revoke: pluginsRevokeCommand,
    status: pluginsStatusCommand,
  },
  async run({ rawArgs }) {
    const sub = rawArgs.find((a: string) => !a.startsWith('-'));
    if (sub && ['list', 'connect', 'revoke', 'status'].includes(sub)) return;
    await runCommand(pluginsListCommand, { rawArgs });
    process.stderr.write(
      `\n  ${chalk.dim(
        'Available commands: list, connect, revoke, status. Run supermemory plugins --help for details.',
      )}\n`,
    );
  },
});
