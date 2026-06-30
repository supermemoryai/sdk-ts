import { spawn } from 'node:child_process';
import * as clack from '@clack/prompts';
import chalk from 'chalk';
import { defineCliCommand } from '../lib/command.js';
import { resolveConfig } from '../lib/config.js';
import { detectProject } from '../lib/detect.js';
import { isInputInteractive } from '../lib/output.js';
import {
  AGENT_OPTIONS,
  type AgentType,
  formatDetection,
  generateSetupPrompt,
  getAgentSpawnArgs,
} from '../lib/setup-prompt.js';

export const setupCommand = defineCliCommand({
  meta: {
    name: 'setup',
    description: 'Detect your project and launch a coding agent to integrate Supermemory',
  },
  noSpan: true,
  args: {
    prompt: {
      type: 'boolean',
      description: 'Print integration prompt for AI agents',
    },
  },
  async handler({ args }) {
    if (args.prompt || !isInputInteractive()) {
      runPrompt();
    } else {
      await runInteractive();
    }
  },
});

function runPrompt() {
  const detection = detectProject();
  const config = resolveConfig();

  const prompt = generateSetupPrompt({
    detection,
    config: { tag: config.tag, apiUrl: config.apiUrl },
  });

  process.stdout.write(`${prompt}\n`);
}

function launchAgent(agent: AgentType, prompt: string): Promise<number> {
  const { bin, args, stdin: useStdin } = getAgentSpawnArgs(agent, prompt);
  const label = AGENT_OPTIONS.find((o) => o.value === agent)?.label ?? agent;

  process.stderr.write(`\n  ${chalk.green('✓')} Launching ${label}...\n\n`);

  return new Promise((resolve) => {
    const child =
      useStdin ?
        spawn(bin, args, { stdio: ['pipe', 'inherit', 'inherit'] })
      : spawn(bin, args, { stdio: 'inherit' });

    if (useStdin) {
      child.stdin?.write(prompt);
      child.stdin?.end();
    }

    child.on('close', (code) => resolve(code ?? 0));
    child.on('error', () => {
      process.stderr.write(`\n  ${chalk.red('✗')} "${bin}" not found. Install it first.\n`);
      resolve(1);
    });
  });
}

async function runInteractive() {
  const detection = detectProject();
  const config = resolveConfig();

  process.stderr.write('\n');

  if (detection.framework || detection.aiSdk) {
    process.stderr.write(`  ${chalk.bold('Detected:')} ${formatDetection(detection)}\n`);
    process.stderr.write('\n');
  }

  process.stderr.write(`  ${chalk.dim('tip: AI agents can use')} supermemory setup --prompt\n`);
  process.stderr.write('\n');

  const agentValue = await clack.select({
    message: 'Which coding agent are you using?',
    options: AGENT_OPTIONS.map((o) => ({
      value: o.value,
      label: o.label,
    })),
  });

  if (clack.isCancel(agentValue)) {
    process.exit(0);
  }

  const prompt = generateSetupPrompt({
    detection,
    agent: agentValue,
    config: { tag: config.tag, apiUrl: config.apiUrl },
  });

  const exitCode = await launchAgent(agentValue, prompt);
  process.exit(exitCode);
}
