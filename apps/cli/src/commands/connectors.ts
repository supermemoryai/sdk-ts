import chalk from 'chalk';
import { defineCommand, runCommand } from 'citty';
import { apiRequest } from '../lib/api.js';
import { openBrowser, startOAuthCallbackServer } from '../lib/browser.js';
import { defineCliCommand } from '../lib/command.js';
import {
  EXIT,
  exitWithError,
  formatRelativeTime,
  formatTable,
  isInputInteractive,
  output,
  shouldOutputJson,
  success,
  warn,
} from '../lib/output.js';
import { confirm, multiSelect } from '../lib/prompt.js';
import { parseEnumArg } from '../lib/validators.js';

const VALID_PROVIDERS = [
  'google-drive',
  'notion',
  'onedrive',
  'gmail',
  'github',
  'web-crawler',
  's3',
] as const;

const connectorsListCommand = defineCliCommand({
  meta: {
    name: 'list',
    description: 'List all connected integrations',
  },
  async handler({ flags }) {
    const { data } = await apiRequest<
      {
        id: string;
        provider: string;
        email?: string;
        createdAt: string;
        containerTags?: string[];
      }[]
    >('/v3/connections/list', {
      method: 'POST',
      body: {},
    });

    output(
      data,
      () => {
        const connections = Array.isArray(data) ? data : [];
        if (connections.length === 0) {
          return '  No connectors found.';
        }

        return formatTable(
          ['PROVIDER', 'EMAIL', 'TAGS', 'CONNECTED', 'ID'],
          connections.map((c) => [
            c.provider,
            c.email ?? chalk.dim('--'),
            c.containerTags?.join(', ') || chalk.dim('--'),
            new Date(c.createdAt).toLocaleDateString(),
            c.id,
          ]),
        );
      },
      flags,
    );
  },
});

const connectorsConnectCommand = defineCliCommand({
  meta: {
    name: 'connect',
    description: 'Connect a new integration provider via browser OAuth',
  },
  args: {
    provider: {
      type: 'positional',
      description: `Provider to connect (${VALID_PROVIDERS.join(', ')})`,
      required: true,
    },
    tag: {
      type: 'string',
      description: 'Scope imported documents to a container tag',
    },
    browser: {
      type: 'boolean',
      description: 'Open in browser (use --no-browser to print URL instead)',
      default: true,
    },
    'skip-configure': {
      type: 'boolean',
      description: 'Skip post-OAuth configuration (e.g. repo selection)',
      default: false,
    },
  },
  async handler({ args, flags }) {
    const provider = args.provider as string;
    parseEnumArg(provider, 'provider', VALID_PROVIDERS);

    const { port, waitForCallback, close } = await startOAuthCallbackServer();

    const redirectUrl = `http://127.0.0.1:${port}/callback`;
    const body: Record<string, unknown> = { redirectUrl };
    if (args.tag) {
      body.containerTags = [args.tag];
    }

    const { data: connection } = await apiRequest<{
      authLink: string;
      id: string;
      expiresIn?: number;
    }>(`/v3/connections/${provider}`, {
      method: 'POST',
      body,
    });

    let outputAuthUrlOnly = false;
    if (!args.browser) {
      if (shouldOutputJson(flags)) {
        outputAuthUrlOnly = true;
        output(
          {
            connectionId: connection.id,
            provider,
            tag: args.tag ?? null,
            url: connection.authLink,
            expiresIn: connection.expiresIn ?? null,
          },
          () => '',
          flags,
        );
      } else {
        output(
          { url: connection.authLink },
          () =>
            `  Open this URL to authorize ${chalk.bold(provider)}:\n\n  ${chalk.cyan(connection.authLink)}`,
          flags,
        );
      }
    } else {
      await openBrowser(connection.authLink);
      if (!shouldOutputJson(flags)) {
        process.stderr.write(`  Opened browser for ${chalk.bold(provider)} authorization...\n`);
      }
    }

    try {
      await waitForCallback();
    } finally {
      close();
    }

    success(`${provider} connected!`, flags);

    // Post-OAuth configuration (e.g. GitHub repo selection)
    if (
      provider === 'github' &&
      !args['skip-configure'] &&
      !shouldOutputJson(flags) &&
      isInputInteractive()
    ) {
      const { data: resourceData } = await apiRequest<{
        resources: {
          id: string;
          name: string;
          full_name: string;
          description?: string;
          private: boolean;
          default_branch?: string;
        }[];
        total_count: number;
      }>(`/v3/connections/${connection.id}/resources`, {
        query: { per_page: 100 },
      });

      const repos = resourceData.resources ?? [];
      if (repos.length === 0) {
        warn('No repositories found to configure.', flags);
      } else {
        const selectedNames = await multiSelect({
          label: 'Select repositories to sync',
          items: repos.map((r) => ({
            value: r.full_name,
            label: r.full_name,
            hint: [r.description, r.private ? '(private)' : undefined].filter(Boolean).join(' ') || undefined,
          })),
        });

        const selectedRepos = repos.filter((r) => selectedNames.includes(r.full_name));

        if (selectedRepos.length > 0) {
          const { data: configureResult } = await apiRequest<{
            success: boolean;
            message?: string;
            webhooksRegistered?: number;
          }>(`/v3/connections/${connection.id}/configure`, {
            method: 'POST',
            body: { resources: selectedRepos },
          });

          success(
            `Configured ${selectedRepos.length} repositories${
              configureResult.webhooksRegistered != null ?
                ` with ${configureResult.webhooksRegistered} webhooks`
              : ''
            }`,
            flags,
          );
        }
      }
    }

    if (shouldOutputJson(flags) && !outputAuthUrlOnly) {
      output(
        {
          connectionId: connection.id,
          provider,
          tag: args.tag ?? null,
        },
        () => '',
        flags,
      );
    }
  },
});

const connectorsSyncCommand = defineCliCommand({
  meta: {
    name: 'sync',
    description: 'Trigger a sync for a connection',
  },
  args: {
    id: {
      type: 'positional',
      description: 'Connection ID to sync',
      required: true,
    },
  },
  async handler({ args, flags }) {
    const { data: connections } = await apiRequest<{ id: string; provider: string }[]>(
      '/v3/connections/list',
      { method: 'POST', body: {} },
    );

    const connection = (Array.isArray(connections) ? connections : []).find((c) => c.id === args.id);

    if (!connection) {
      exitWithError('not_found', `Connection "${args.id}" not found.`, flags);
    }

    await apiRequest(`/v3/connections/${connection.provider}/import`, {
      method: 'POST',
      body: {},
    });

    output(
      { success: true },
      () => `${chalk.green('✓')} Sync started for ${chalk.bold(connection.provider)}`,
      flags,
    );
  },
});

const connectorsHistoryCommand = defineCliCommand({
  meta: {
    name: 'history',
    description: 'Show sync history for a connection',
  },
  args: {
    id: {
      type: 'positional',
      description: 'Connection ID',
      required: true,
    },
  },
  async handler({ args, flags }) {
    const { data } = await apiRequest<
      {
        id: string;
        connectionId: string;
        status: string;
        startedAt: string;
        completedAt: string | null;
        itemsProcessed: number;
        itemsFailed: number;
        triggerType: string;
        error: string | null;
      }[]
    >(`/v3/connections/${args.id}/sync-runs`);

    output(
      data,
      () => {
        const runs = Array.isArray(data) ? data : [];
        if (runs.length === 0) {
          return '  No sync history found.';
        }

        return formatTable(
          ['STARTED', 'STATUS', 'TRIGGER', 'PROCESSED', 'FAILED'],
          runs.map((r) => [
            formatRelativeTime(r.startedAt),
            r.status,
            r.triggerType,
            String(r.itemsProcessed ?? 0),
            String(r.itemsFailed ?? 0),
          ]),
        );
      },
      flags,
    );
  },
});

const connectorsDisconnectCommand = defineCliCommand({
  meta: {
    name: 'disconnect',
    description: 'Disconnect an integration',
  },
  args: {
    id: {
      type: 'positional',
      description: 'Connection ID to disconnect',
      required: true,
    },
    yes: {
      type: 'boolean',
      description: 'Skip confirmation prompt',
      default: false,
    },
  },
  async handler({ args, flags }) {
    if (!args.yes) {
      const confirmed = await confirm(
        `${chalk.yellow('⚠')} Disconnect connection ${chalk.bold(
          args.id as string,
        )}? This cannot be undone. [y/N] `,
      );
      if (!confirmed) {
        exitWithError('cancelled', 'Disconnect cancelled.', flags, EXIT.SUCCESS);
      }
    }

    const { data } = await apiRequest<{ id: string; provider: string }>(`/v3/connections/${args.id}`, {
      method: 'DELETE',
    });

    output(
      data,
      () => `${chalk.green('✓')} Disconnected ${chalk.bold(data.provider)} connection ${chalk.dim(data.id)}`,
      flags,
    );
  },
});

const connectorsResourcesCommand = defineCliCommand({
  meta: {
    name: 'resources',
    description: 'List resources for a connection',
  },
  args: {
    id: {
      type: 'positional',
      description: 'Connection ID',
      required: true,
    },
  },
  async handler({ args, flags }) {
    const { data } = await apiRequest<{
      resources: {
        id: number;
        name: string;
        full_name: string;
        description?: string;
        private: boolean;
        default_branch?: string;
        updated_at?: string;
      }[];
      total_count?: number;
    }>(`/v3/connections/${args.id}/resources`);

    output(
      data,
      () => {
        const resources = data.resources ?? [];
        if (resources.length === 0) {
          return '  No resources found.';
        }

        return formatTable(
          ['NAME', 'VISIBILITY', 'BRANCH', 'UPDATED'],
          resources.map((r) => [
            r.full_name,
            r.private ? 'private' : 'public',
            r.default_branch ?? chalk.dim('--'),
            r.updated_at ? formatRelativeTime(r.updated_at) : chalk.dim('--'),
          ]),
        );
      },
      flags,
    );
  },
});

export const connectorsCommand = defineCommand({
  meta: {
    name: 'connectors',
    description: 'Manage external service connectors',
  },
  subCommands: {
    list: connectorsListCommand,
    connect: connectorsConnectCommand,
    sync: connectorsSyncCommand,
    history: connectorsHistoryCommand,
    disconnect: connectorsDisconnectCommand,
    resources: connectorsResourcesCommand,
  },
  async run({ rawArgs }) {
    const sub = rawArgs.find((a: string) => !a.startsWith('-'));
    if (sub && ['list', 'connect', 'sync', 'history', 'disconnect', 'resources'].includes(sub)) return;
    await runCommand(connectorsListCommand, { rawArgs });
    process.stderr.write(
      `\n  ${chalk.dim(
        'Available commands: list, connect, sync, history, disconnect, resources. Run supermemory connectors --help for details.',
      )}\n`,
    );
  },
});
