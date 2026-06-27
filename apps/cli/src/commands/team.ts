import chalk from 'chalk';
import { defineCommand, runCommand } from 'citty';
import { apiRequest } from '../lib/api.js';
import { defineCliCommand } from '../lib/command.js';
import { exitWithError, formatTable, output } from '../lib/output.js';
import { confirm } from '../lib/prompt.js';
import { parseEnumArg } from '../lib/validators.js';

const teamListCommand = defineCliCommand({
  meta: {
    name: 'list',
    description: 'List team members in the current organization',
  },
  async handler({ flags }) {
    const { data } = await apiRequest<{
      members: {
        id: string;
        name: string;
        email: string;
        role: string;
        joinedAt: string;
      }[];
    }>('/v3/auth/team/members');

    output(
      data,
      () => {
        const members = data.members ?? [];
        if (members.length === 0) {
          return '  No team members found.';
        }

        return formatTable(
          ['NAME', 'EMAIL', 'ROLE', 'JOINED'],
          members.map((m) => [m.name, m.email, m.role, new Date(m.joinedAt).toLocaleDateString()]),
        );
      },
      flags,
    );
  },
});

const teamInviteCommand = defineCliCommand({
  meta: {
    name: 'invite',
    description: 'Invite a new member to the team',
  },
  args: {
    email: {
      type: 'positional',
      description: 'Email address to invite',
      required: true,
    },
    role: {
      type: 'string',
      description: 'Role to assign: admin or member (default: member)',
    },
  },
  async handler({ args, flags }) {
    const role =
      parseEnumArg(args.role as string | undefined, 'role', ['admin', 'member'] as const) ?? 'member';

    const { data } = await apiRequest<{
      success: boolean;
      email: string;
      role: string;
    }>('/v3/auth/team/invite', {
      method: 'POST',
      body: { email: args.email, role },
    });

    output(
      data,
      () => `${chalk.green('✓')} Invited ${chalk.bold(data.email)} as ${chalk.cyan(data.role)}`,
      flags,
    );
  },
});

const teamRemoveCommand = defineCliCommand({
  meta: {
    name: 'remove',
    description: 'Remove a member from the team',
  },
  args: {
    'member-id': {
      type: 'positional',
      description: 'Member ID to remove',
      required: true,
    },
    yes: {
      type: 'boolean',
      description: 'Skip confirmation (for scripts and agents)',
      default: false,
    },
  },
  async handler({ args, flags }) {
    const memberId = args['member-id'] as string;

    if (!args.yes) {
      const confirmed = await confirm(
        `${chalk.yellow('?')} Remove team member ${chalk.bold(memberId)}? (y/N) `,
      );
      if (!confirmed) {
        exitWithError('cancelled', 'Remove cancelled', flags);
      }
    }

    const { data } = await apiRequest<{
      success: boolean;
      id: string;
    }>(`/v3/auth/team/members/${memberId}`, {
      method: 'DELETE',
    });

    output(data, () => `${chalk.green('✓')} Removed team member ${chalk.dim(memberId)}`, flags);
  },
});

const teamRoleCommand = defineCliCommand({
  meta: {
    name: 'role',
    description: "Change a team member's role",
  },
  args: {
    'member-id': {
      type: 'positional',
      description: 'Member ID to update',
      required: true,
    },
    role: {
      type: 'positional',
      description: 'New role: admin or member',
      required: true,
    },
  },
  async handler({ args, flags }) {
    const memberId = args['member-id'] as string;

    parseEnumArg(args.role as string | undefined, 'role', ['admin', 'member'] as const);

    const { data } = await apiRequest<{
      success: boolean;
      id: string;
      role: string;
    }>(`/v3/auth/team/members/${memberId}/role`, {
      method: 'PUT',
      body: { role: args.role },
    });

    output(
      data,
      () => `${chalk.green('✓')} Updated ${chalk.dim(memberId)} role to ${chalk.cyan(data.role)}`,
      flags,
    );
  },
});

const teamInvitationsCommand = defineCliCommand({
  meta: {
    name: 'invitations',
    description: 'List pending team invitations',
  },
  async handler({ flags }) {
    const { data } = await apiRequest<{
      invitations: {
        email: string;
        role: string;
        invitedAt: string;
        status: string;
      }[];
    }>('/v3/auth/team/invitations');

    output(
      data,
      () => {
        const invitations = data.invitations ?? [];
        if (invitations.length === 0) {
          return '  No pending invitations.';
        }

        return formatTable(
          ['EMAIL', 'ROLE', 'INVITED AT', 'STATUS'],
          invitations.map((inv) => [
            inv.email,
            inv.role,
            new Date(inv.invitedAt).toLocaleDateString(),
            inv.status === 'pending' ? chalk.yellow(inv.status)
            : inv.status === 'accepted' ? chalk.green(inv.status)
            : chalk.dim(inv.status),
          ]),
        );
      },
      flags,
    );
  },
});

export const teamCommand = defineCommand({
  meta: {
    name: 'team',
    description: 'Manage team members and invitations',
  },
  subCommands: {
    list: teamListCommand,
    invite: teamInviteCommand,
    remove: teamRemoveCommand,
    role: teamRoleCommand,
    invitations: teamInvitationsCommand,
  },
  async run({ rawArgs }) {
    const sub = rawArgs.find((a: string) => !a.startsWith('-'));
    if (sub && ['list', 'invite', 'remove', 'role', 'invitations'].includes(sub)) return;
    await runCommand(teamListCommand, { rawArgs });
    process.stderr.write(
      `\n  ${chalk.dim(
        'Available commands: list, invite, remove, role, invitations. Run supermemory team --help for details.',
      )}\n`,
    );
  },
});
