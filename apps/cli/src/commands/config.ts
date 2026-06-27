import chalk from 'chalk';
import { defineCommand } from 'citty';
import { defineCliCommand } from '../lib/command.js';
import {
  getKeyScope,
  getUserDir,
  readCredentials,
  readProjectConfig,
  readTeamConfig,
  readUserConfig,
  resolveConfig,
  updateProjectConfig,
  updateTeamConfig,
  updateUserConfig,
} from '../lib/config.js';
import { ValidationError } from '../lib/errors.js';
import { formatKeyValue, maskApiKey, output } from '../lib/output.js';
import { parseEnumArg } from '../lib/validators.js';

const KEY_SCOPE_MATRIX: Record<
  string,
  {
    project?: boolean | string;
    team?: boolean | string;
    global?: boolean | string;
    globalField?: string;
  }
> = {
  apiKey: {
    project: true,
    team: 'API keys should not be committed to git. Use --scope project instead.',
    global: "Use 'supermemory login' to authenticate globally.",
  },
  tag: {
    project: true,
    team: true,
    global: 'Tag is project/team scoped. Use --scope project or --scope team.',
  },
  output: {
    project: 'Output format is global only. Use --scope global.',
    team: 'Output format is global only. Use --scope global.',
    global: true,
  },
  apiUrl: {
    project: 'API URL is global only. Use --scope global.',
    team: 'API URL is global only. Use --scope global.',
    global: true,
  },
  consoleUrl: {
    project: 'Console URL is global only. Use --scope global.',
    team: 'Console URL is global only. Use --scope global.',
    global: true,
  },
};

const VALID_SET_KEYS = Object.keys(KEY_SCOPE_MATRIX);
const VALID_SCOPES = ['project', 'team', 'global'] as const;

const configSetCommand = defineCliCommand({
  meta: {
    name: 'set',
    description: 'Set a configuration value',
  },
  noSpan: true,
  args: {
    key: {
      type: 'positional',
      description: `Config key (${VALID_SET_KEYS.join(', ')})`,
      required: true,
    },
    value: {
      type: 'positional',
      description: 'Config value',
      required: true,
    },
    scope: {
      type: 'string',
      description: 'Config scope: project, team, or global',
      default: 'project',
    },
  },
  async handler({ args, flags }) {
    const key = args.key as string;
    const value = args.value as string;
    const scope = parseEnumArg(args.scope as string, 'scope', VALID_SCOPES);
    if (!scope) {
      throw new ValidationError(`Invalid scope. Valid scopes: ${VALID_SCOPES.join(', ')}`);
    }

    const matrix = KEY_SCOPE_MATRIX[key];
    if (!matrix) {
      throw new ValidationError(`Unknown config key "${key}". Valid keys: ${VALID_SET_KEYS.join(', ')}`);
    }
    const scopeRule = matrix[scope];

    if (typeof scopeRule === 'string') {
      throw new ValidationError(scopeRule);
    }
    if (!scopeRule) {
      throw new ValidationError(`Cannot set "${key}" in ${scope} scope.`);
    }

    if (key === 'tag') {
      const keyScope = getKeyScope();
      if (keyScope?.type === 'scoped') {
        throw new ValidationError(
          `Cannot change container tag — your API key is scoped to "${keyScope.tag}". The tag is enforced by the key.`,
        );
      }
    }

    if (key === 'output') {
      parseEnumArg(value, 'output', ['auto', 'json', 'human'] as const);
    }

    const fieldName = scope === 'global' && matrix.globalField ? matrix.globalField : key;

    if (scope === 'project') {
      updateProjectConfig({ [fieldName]: value });
    } else if (scope === 'team') {
      updateTeamConfig({ [fieldName]: value });
    } else {
      updateUserConfig({ [fieldName]: value });
    }

    output({ key, value, scope }, () => `${chalk.green('✓')} Set ${key} = ${value} (${scope} scope)`, flags);
  },
});

const VALID_RESOLVED_KEYS = ['apiKey', 'tag', 'apiUrl', 'consoleUrl', 'output'] as const;

const configGetCommand = defineCliCommand({
  meta: {
    name: 'get',
    description: 'Get a resolved configuration value',
  },
  noSpan: true,
  args: {
    key: {
      type: 'positional',
      description: `Config key (${VALID_RESOLVED_KEYS.join(', ')})`,
      required: true,
    },
  },
  async handler({ args, flags }) {
    parseEnumArg(args.key as string, 'key', VALID_RESOLVED_KEYS);

    const resolved = resolveConfig();
    const value = (resolved as unknown as Record<string, unknown>)[args.key as string];

    const displayValue =
      args.key === 'apiKey' && typeof value === 'string' ? maskApiKey(value) : String(value ?? '(none)');

    output({ key: args.key, value }, () => displayValue, flags);
  },
});

export const configCommand = defineCommand({
  meta: {
    name: 'config',
    description: 'View and manage CLI configuration',
  },
  args: {
    json: {
      type: 'boolean',
      default: false,
      description: 'Force JSON output',
    },
  },
  subCommands: {
    set: configSetCommand,
    get: configGetCommand,
  },
  async run({ rawArgs, args }) {
    const firstArg = rawArgs.find((a: string) => !a.startsWith('-'));
    if (firstArg === 'set' || firstArg === 'get') return;

    const flags = { json: args.json as boolean };
    const userConfig = readUserConfig();
    const teamConfig = readTeamConfig();
    const projectConfig = readProjectConfig();
    const credentials = readCredentials();
    const resolved = resolveConfig();

    const data = {
      resolved: {
        apiKey: resolved.apiKey ? maskApiKey(resolved.apiKey) : null,
        tag: resolved.tag,
        apiUrl: resolved.apiUrl,
        consoleUrl: resolved.consoleUrl,
        output: resolved.output,
      },
      scopes: {
        user: {
          path: getUserDir(),
          config: userConfig,
          hasCredentials: !!credentials,
        },
        team: teamConfig ? { config: teamConfig } : null,
        project: projectConfig ?? null,
      },
    };

    output(
      data,
      () => {
        const lines = [`  ${chalk.bold('Resolved Configuration')} (highest precedence wins)`, ''];

        const keyScope = getKeyScope();
        const scopeLabel =
          keyScope?.type === 'scoped' ? chalk.yellow('[scoped]') : chalk.dim('[full access]');

        const pairs: [string, string][] = [
          [
            'API Key:',
            resolved.apiKey ? `${maskApiKey(resolved.apiKey)} ${scopeLabel}` : chalk.dim('(none)'),
          ],
          ['Tag:', resolved.tag ?? chalk.dim('(none)')],
          ['API URL:', resolved.apiUrl],
          ['Console URL:', resolved.consoleUrl],
          ['Output:', resolved.output],
        ];
        lines.push(formatKeyValue(pairs));
        lines.push('');

        lines.push(`  ${chalk.bold('User Scope')} ${chalk.dim('(~/.supermemory/)')}`);
        if (Object.keys(userConfig).length > 0) {
          for (const [key, value] of Object.entries(userConfig)) {
            lines.push(`    ${chalk.dim(key)}: ${value}`);
          }
        } else {
          lines.push(`    ${chalk.dim('(empty)')}`);
        }
        lines.push(`    Credentials: ${credentials ? chalk.green('stored') : chalk.dim('none')}`);
        lines.push('');

        lines.push(`  ${chalk.bold('Team Scope')} ${chalk.dim('(.supermemory/ in repo)')}`);
        if (teamConfig) {
          for (const [key, value] of Object.entries(teamConfig)) {
            lines.push(`    ${chalk.dim(key)}: ${value}`);
          }
        } else {
          lines.push(`    ${chalk.dim('(not found — run supermemory init to create)')}`);
        }
        lines.push('');

        lines.push(`  ${chalk.bold('Project Scope')} ${chalk.dim('(~/.supermemory/projects/-path-/)')}`);
        if (projectConfig) {
          for (const [key, value] of Object.entries(projectConfig)) {
            const displayValue =
              key === 'apiKey' && typeof value === 'string' ? maskApiKey(value) : String(value);
            lines.push(`    ${chalk.dim(key)}: ${displayValue}`);
          }
        } else {
          lines.push(`    ${chalk.dim('(empty)')}`);
        }

        return lines.join('\n');
      },
      flags,
    );
  },
});
