import chalk from 'chalk';
import { defineCommand } from 'citty';
import { validateApiKey } from '../lib/api.js';
import { getDeviceInfo, openBrowser, startCallbackServer } from '../lib/browser.js';
import { clearScopeCache, deleteCredentials, resolveConfig, writeCredentials } from '../lib/config.js';
import { withSpan } from '../lib/otel.js';
import {
  EXIT,
  exitWithError,
  formatKeyValue,
  info,
  maskApiKey,
  type OutputFlags,
  output,
} from '../lib/output.js';

function extractOrgIdFromKey(apiKey: string): string | undefined {
  const parts = apiKey.split('_');
  return parts.length >= 3 ? parts[1] : undefined;
}

export const loginCommand = defineCommand({
  meta: {
    name: 'login',
    description: 'Authenticate with Supermemory',
  },
  args: {
    'api-key': {
      type: 'string',
      description: 'Use an API key directly (skips browser flow)',
    },
    browser: {
      type: 'boolean',
      description: 'Open in browser (use --no-browser to show URL instead)',
      default: true,
    },
    json: {
      type: 'boolean',
      description: 'Force JSON output',
      default: false,
    },
  },
  async run({ args }) {
    const flags: OutputFlags = { json: args.json };
    const config = resolveConfig();

    await withSpan('supermemory.command', { commandName: 'login' }, async () => {
      const apiKey = args['api-key'];
      if (apiKey) {
        return loginWithApiKey(apiKey, config.apiUrl, flags);
      }

      return loginWithBrowser(config.consoleUrl, config.apiUrl, !args.browser, flags);
    });
  },
});

async function loginWithApiKey(apiKey: string, apiUrl: string, flags: OutputFlags): Promise<void> {
  try {
    const session = await validateApiKey(apiKey, apiUrl);

    writeCredentials({
      apiKey,
      method: 'api-key',
      orgId: extractOrgIdFromKey(apiKey) ?? session.org?.id,
      createdAt: new Date().toISOString(),
    });

    output(
      {
        user: session.user,
        org: session.org,
        method: 'api-key',
      },
      () => {
        const lines = [`${chalk.green('✓')} Logged in as ${chalk.bold(session.user.email)}`];
        if (session.org) {
          lines.push(`${chalk.green('✓')} Organization: ${session.org.name} (${session.org.slug})`);
        }
        lines.push(`${chalk.green('✓')} Credentials saved to ~/.supermemory/credentials.json`);
        return lines.join('\n');
      },
      flags,
    );
  } catch (err) {
    exitWithError(
      'invalid_api_key',
      err instanceof Error ? err.message : 'Invalid API key',
      flags,
      EXIT.AUTH_REQUIRED,
    );
  }
}

async function loginWithBrowser(
  consoleUrl: string,
  apiUrl: string,
  noBrowser: boolean,
  flags: OutputFlags,
): Promise<void> {
  const device = getDeviceInfo();

  try {
    const server = await startCallbackServer();
    const callbackUrl = `http://localhost:${server.port}/callback`;

    const params = new URLSearchParams({
      callback: callbackUrl,
      hostname: device.hostname,
      os: device.os,
      cwd: device.cwd,
      cli_version: device.cliVersion,
    });

    const authUrl = `${consoleUrl}/auth/agent-connect?${params.toString()}`;

    if (noBrowser) {
      info('Open this URL in your browser to authenticate:', flags);
    } else {
      info('Opening browser for authentication...', flags);
      try {
        await openBrowser(authUrl);
      } catch {
        info('Could not open browser automatically.', flags);
      }
    }
    info(`  ${authUrl}`, flags);

    info('Waiting for authentication...', flags);

    const apiKey = await server.waitForCallback();
    server.close();

    const session = await validateApiKey(apiKey, apiUrl);

    writeCredentials({
      apiKey,
      method: 'browser',
      orgId: extractOrgIdFromKey(apiKey) ?? session.org?.id,
      createdAt: new Date().toISOString(),
    });

    output(
      {
        user: session.user,
        org: session.org,
        method: 'browser',
      },
      () => {
        const lines = ['', `${chalk.green('✓')} Logged in as ${chalk.bold(session.user.email)}`];
        if (session.org) {
          lines.push(`${chalk.green('✓')} Organization: ${session.org.name}`);
        }
        lines.push(`${chalk.green('✓')} Credentials saved to ~/.supermemory/credentials.json`);
        return lines.join('\n');
      },
      flags,
    );
  } catch (err) {
    exitWithError(
      'auth_failed',
      err instanceof Error ? err.message : 'Authentication failed',
      flags,
      EXIT.AUTH_REQUIRED,
    );
  }
}

export const logoutCommand = defineCommand({
  meta: {
    name: 'logout',
    description: 'Remove stored credentials',
  },
  args: {
    json: {
      type: 'boolean',
      description: 'Force JSON output',
      default: false,
    },
  },
  async run({ args }) {
    const flags: OutputFlags = { json: args.json };

    deleteCredentials();
    clearScopeCache();

    output({ loggedOut: true }, () => `${chalk.green('✓')} Logged out. Credentials removed.`, flags);
  },
});

export const whoamiCommand = defineCommand({
  meta: {
    name: 'whoami',
    description: 'Show current authentication status',
  },
  args: {
    json: {
      type: 'boolean',
      description: 'Force JSON output',
      default: false,
    },
  },
  async run({ args }) {
    const flags: OutputFlags = { json: args.json };
    const config = resolveConfig();

    if (!config.apiKey) {
      exitWithError(
        'not_authenticated',
        'Not authenticated. Run `supermemory login` first.',
        flags,
        EXIT.AUTH_REQUIRED,
      );
      return;
    }

    const apiKey = config.apiKey;

    await withSpan('supermemory.command', { commandName: 'whoami' }, async () => {
      try {
        const session = await validateApiKey(apiKey, config.apiUrl);

        const scopeData =
          session.scope.type === 'scoped' ?
            {
              type: 'scoped' as const,
              tag: session.scope.tag,
              rateLimit: session.scope.rateLimit,
              expires: session.scope.expires,
              permission: session.scope.permission,
            }
          : { type: 'full' as const };

        const whoamiData = {
          user: session.user,
          org: session.org,
          plan: session.plan,
          auth: {
            method: 'api-key',
            keyPrefix: maskApiKey(apiKey),
          },
          scope: scopeData,
        };

        output(
          whoamiData,
          () => {
            const lines: [string, string][] = [
              ['User:', whoamiData.user.email],
              ['Org:', `${whoamiData.org.name} (${whoamiData.org.id})`],
              ['Plan:', whoamiData.plan],
              [
                'Auth:',
                `${whoamiData.auth.method} (${whoamiData.auth.keyPrefix}) ${
                  whoamiData.scope.type === 'scoped' ? chalk.yellow('[scoped]') : chalk.dim('[full access]')
                }`,
              ],
            ];

            if (whoamiData.scope.type === 'scoped') {
              lines.push(['Scope:', `scoped to ${whoamiData.scope.tag} (enforced)`]);
              if (whoamiData.scope.permission) lines.push(['Permission:', whoamiData.scope.permission]);
              if (whoamiData.scope.rateLimit)
                lines.push(['Rate Limit:', `${whoamiData.scope.rateLimit} req/min`]);
              if (whoamiData.scope.expires) lines.push(['Expires:', whoamiData.scope.expires]);
            }

            return formatKeyValue(lines);
          },
          flags,
        );
      } catch (err) {
        exitWithError(
          'not_authenticated',
          err instanceof Error ? err.message : 'Authentication failed',
          flags,
          EXIT.AUTH_REQUIRED,
        );
      }
    });
  },
});
