import chalk from 'chalk';
import { apiRequest } from '../lib/api.js';
import { defineCliCommand } from '../lib/command.js';
import { ValidationError } from '../lib/errors.js';
import { output } from '../lib/output.js';

export const profileCommand = defineCliCommand({
  meta: {
    name: 'profile',
    description: 'Get the user profile for a container tag',
  },
  args: {
    tag: {
      type: 'string',
      description: 'Container tag (e.g., "default" resolves to "sm_project_default")',
    },
    query: {
      type: 'string',
      description: 'Also run a search within the profile',
    },
  },
  async handler({ args, flags, config, span }) {
    const tag = (args.tag as string) ?? config.tag;
    if (!tag) {
      throw new ValidationError('Container tag required. Use --tag');
    }

    const body: Record<string, unknown> = {
      containerTag: tag,
    };
    if (args.query) body.q = args.query;

    const { data } = await apiRequest<{
      profile: {
        static: string[];
        dynamic: string[];
      };
      searchResults?: {
        results: unknown[];
        total: number;
        timing: number;
      };
    }>('/v4/profile', {
      method: 'POST',
      body,
    });

    span.setAttribute('staticCount', data.profile?.static?.length ?? 0);
    span.setAttribute('dynamicCount', data.profile?.dynamic?.length ?? 0);

    output(
      data,
      () => {
        const lines = [`  Profile for ${chalk.bold(tag)}`];
        lines.push('');

        const staticMems = data.profile?.static ?? [];
        const dynamicMems = data.profile?.dynamic ?? [];

        if (staticMems.length > 0) {
          lines.push(`  ${chalk.bold('Static Memories')} (long-term):`);
          for (const mem of staticMems) {
            lines.push(`    ${chalk.dim('•')} ${mem}`);
          }
          lines.push('');
        }

        if (dynamicMems.length > 0) {
          lines.push(`  ${chalk.bold('Dynamic Memories')} (recent):`);
          for (const mem of dynamicMems) {
            lines.push(`    ${chalk.dim('•')} ${mem}`);
          }
        }

        if (staticMems.length === 0 && dynamicMems.length === 0) {
          lines.push('  No memories found for this tag.');
        }

        return lines.join('\n');
      },
      flags,
    );
  },
});
