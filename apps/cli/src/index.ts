import { createHash } from 'node:crypto';
import chalk from 'chalk';
import { defineCommand, runCommand, showUsage } from 'citty';
import { addCommand } from './commands/add.js';
import { loginCommand, logoutCommand, whoamiCommand } from './commands/auth.js';
import { billingCommand } from './commands/billing.js';
import { configCommand } from './commands/config.js';
import { connectorsCommand } from './commands/connectors.js';
import { docsCommand } from './commands/docs.js';
import { forgetCommand } from './commands/forget.js';
import { initCommand } from './commands/init.js';
import { keysCommand } from './commands/keys.js';
import { logsCommand } from './commands/logs.js';
import { openCommand } from './commands/open.js';
import { pluginCommand } from './commands/plugin.js';
import { pluginsCommand } from './commands/plugins.js';
import { profileCommand } from './commands/profile.js';
import { rememberCommand } from './commands/remember.js';
import { searchCommand } from './commands/search.js';
import { setupCommand } from './commands/setup.js';
import { statusCommand } from './commands/status.js';
import { tagsCommand } from './commands/tags.js';
import { teamCommand } from './commands/team.js';
import { updateCommand } from './commands/update.js';
import { buildHelpJson, formatHelpText, getCommandSchema } from './help/index.js';
import { validateApiKey } from './lib/api.js';
import {
  getAuthState,
  readScopeCache,
  resolveConfig,
  type ScopeCache,
  writeScopeCache,
} from './lib/config.js';
import { CliError } from './lib/errors.js';
import { initOtel, shutdownOtel } from './lib/otel.js';
import { CLI_VERSION } from './lib/version.js';
import { error as outputError } from './lib/output.js';

async function detectScope(): Promise<{
  mode: 'full' | 'scoped';
  scope?: ScopeCache;
}> {
  const config = resolveConfig();
  if (!config.apiKey) return { mode: 'full' };

  const keyHash = createHash('sha256').update(config.apiKey).digest('hex').slice(0, 16);

  const cached = readScopeCache(keyHash);
  if (cached) {
    return { mode: cached.type, scope: cached };
  }

  try {
    const session = await validateApiKey(config.apiKey, config.apiUrl);
    const tags = session.scope.tags ?? (session.scope.tag ? [session.scope.tag] : undefined);
    const scope: ScopeCache = {
      type: session.scope.type,
      permission: session.scope.permission,
      tag: tags?.[0] ?? session.scope.tag,
      tags,
      rateLimit: session.scope.rateLimit,
      expires: session.scope.expires,
      cachedAt: new Date().toISOString(),
    };
    writeScopeCache(keyHash, scope);
    return { mode: scope.type, scope };
  } catch {
    return { mode: 'full' };
  }
}

async function main() {
  process.on('exit', () => {
    if (process.stdin.isTTY && process.stdin.isRaw) {
      process.stdin.setRawMode(false);
    }
  });

  await initOtel();

  const { mode, scope } = await detectScope();

  const subCommands: Record<string, ReturnType<typeof defineCommand>> = {
    login: loginCommand,
    logout: logoutCommand,
    whoami: whoamiCommand,
    add: addCommand,
    search: searchCommand,
    remember: rememberCommand,
    forget: forgetCommand,
    update: updateCommand,
    profile: profileCommand,
    config: configCommand,
    keys: keysCommand,
    tags: tagsCommand,
    docs: docsCommand,
    status: statusCommand,
    logs: logsCommand,
    billing: billingCommand,
    plugins: pluginsCommand,
    connectors: connectorsCommand,
    open: openCommand,
    team: teamCommand,
    init: initCommand,
    plugin: pluginCommand,
    setup: setupCommand,
  } as Record<string, ReturnType<typeof defineCommand>>;

  subCommands.help = defineCommand({
    meta: {
      name: 'help',
      description: 'Show help information',
    },
    args: {
      json: {
        type: 'boolean',
        description: 'Machine-readable help (for LLM agents)',
        default: false,
      },
      all: {
        type: 'boolean',
        description: 'Show all commands including management commands',
        default: false,
      },
    },
    async run({ args }) {
      const authState = getAuthState();
      if (args.json) {
        const helpData = buildHelpJson(
          mode,
          scope ?
            {
              tag: scope.tag,
              tags: scope.tags,
              rateLimit: scope.rateLimit,
              expires: scope.expires,
            }
          : undefined,
          authState,
        );
        process.stdout.write(`${JSON.stringify(helpData, null, 2)}\n`);
      } else {
        process.stdout.write(
          formatHelpText(mode, authState, {
            all: true,
            scope: scope ? { tag: scope.tag, permission: scope.permission } : undefined,
          }),
        );
      }
    },
  }) as ReturnType<typeof defineCommand>;

  if (mode === 'scoped' && scope?.tag) {
    const enforcedTags = scope.tags?.length ? scope.tags : [scope.tag];
    process.env.SUPERMEMORY_ENFORCED_TAG = enforcedTags[0] ?? scope.tag;
    process.env.SUPERMEMORY_ENFORCED_TAGS = enforcedTags.join(',');
    if (!process.env.SUPERMEMORY_TAG) {
      process.env.SUPERMEMORY_TAG = enforcedTags[0] ?? scope.tag;
    }
    if (enforcedTags.length > 1) {
      process.env.SUPERMEMORY_TAGS = enforcedTags.join(',');
    }
  }

  const rawArgs = process.argv.slice(2);

  if (rawArgs.includes('--help') && rawArgs.includes('--json')) {
    const commandName = rawArgs.find((a) => !a.startsWith('--') && a in subCommands);
    if (commandName) {
      const schema = getCommandSchema(commandName);
      if (schema) {
        process.stdout.write(`${JSON.stringify({ name: commandName, ...schema }, null, 2)}\n`);
        await shutdownOtel();
        return;
      }
    }
  }

  const cli = defineCommand({
    meta: {
      name: 'supermemory',
      version: CLI_VERSION,
      description: 'supermemory — memory layer for AI agents',
    },
    subCommands,
  });

  if (rawArgs.includes('--help') || rawArgs.includes('-h')) {
    const nonFlags = rawArgs.filter((a) => !a.startsWith('-'));
    let resolved: ReturnType<typeof defineCommand> | undefined;
    let parent: ReturnType<typeof defineCommand> | undefined;
    const firstArg = nonFlags[0];
    const secondArg = nonFlags[1];
    if (firstArg) {
      resolved = subCommands[firstArg];
      if (resolved && secondArg) {
        const subs = (
          resolved as {
            subCommands?: Record<string, ReturnType<typeof defineCommand>>;
          }
        ).subCommands;
        if (subs?.[secondArg]) {
          parent = resolved;
          resolved = subs[secondArg];
        }
      }
    }
    if (resolved) {
      await showUsage(resolved, parent);
    } else {
      const authState = getAuthState();
      const showAll = rawArgs.includes('--all');
      process.stdout.write(
        formatHelpText(mode, authState, {
          all: showAll,
          scope: scope ? { tag: scope.tag, tags: scope.tags, permission: scope.permission } : undefined,
        }),
      );
    }
    await shutdownOtel();
    return;
  }

  if (rawArgs.length === 0) {
    const authState = getAuthState();
    process.stdout.write(
      formatHelpText(mode, authState, {
        scope: scope ? { tag: scope.tag, permission: scope.permission } : undefined,
      }),
    );
    await shutdownOtel();
    return;
  }

  if (rawArgs.length === 1 && rawArgs[0] === '--version') {
    process.stdout.write(`${CLI_VERSION}\n`);
    await shutdownOtel();
    return;
  }

  const errorFlags = {
    json: rawArgs.includes('--json'),
    output: resolveConfig().output,
  };

  const firstNonFlag = rawArgs.find((a) => !a.startsWith('-'));
  if (firstNonFlag && !(firstNonFlag in subCommands)) {
    outputError(
      'E_UNKNOWN_COMMAND',
      `Unknown command: ${firstNonFlag}`,
      errorFlags,
      'Run `supermemory help` to see available commands.',
    );
    process.exitCode = 1;
    await shutdownOtel();
    return;
  }

  try {
    await runCommand(cli, { rawArgs });
  } catch (err) {
    if (err instanceof CliError) {
      outputError(err.code, err.message, errorFlags, err.hint);
      process.exitCode = err.exitCode;
    } else if (err instanceof Error && 'code' in err && typeof err.code === 'string') {
      const hint =
        err.code === 'E_UNKNOWN_COMMAND' ? 'Run `supermemory help` to see available commands.'
        : err.code === 'EARG' ? 'Run the command with `--help` for usage details.'
        : undefined;
      outputError(err.code, err.message, errorFlags, hint);
      process.exitCode = 1;
    } else {
      outputError('unexpected_error', err instanceof Error ? err.message : String(err), errorFlags);
      if (!errorFlags.json && errorFlags.output !== 'json' && err instanceof Error && err.stack) {
        process.stderr.write(`${chalk.dim(err.stack)}\n`);
      }
      process.exitCode = 1;
    }
  } finally {
    await shutdownOtel();
  }

  if (process.exitCode) {
    process.exit(process.exitCode);
  }
}

main().catch((err) => {
  process.stderr.write(`${chalk.red('✗')} ${err.message ?? err}\n`);
  process.exit(1);
});
