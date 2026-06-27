import type { ProjectDetection } from './detect.js';

export type AgentType = 'claude-code' | 'codex' | 'cline' | 'aider' | 'opencode' | 'goose' | 'amp';

export const AGENT_OPTIONS: {
  value: AgentType;
  label: string;
}[] = [
  { value: 'claude-code', label: 'Claude Code' },
  { value: 'codex', label: 'Codex' },
  { value: 'cline', label: 'Cline' },
  { value: 'aider', label: 'Aider' },
  { value: 'opencode', label: 'OpenCode' },
  { value: 'goose', label: 'Goose' },
  { value: 'amp', label: 'Amp' },
];

interface AgentCommand {
  bin: string;
  buildArgs: (prompt: string) => string[];
  stdin?: boolean;
}

const AGENT_COMMANDS: Record<AgentType, AgentCommand> = {
  'claude-code': { bin: 'claude', buildArgs: (p) => [p] },
  codex: { bin: 'codex', buildArgs: (p) => [p] },
  cline: { bin: 'cline', buildArgs: (p) => [p] },
  aider: { bin: 'aider', buildArgs: (p) => ['-m', p] },
  opencode: { bin: 'opencode', buildArgs: (p) => ['--prompt', p] },
  goose: { bin: 'goose', buildArgs: (p) => ['run', '-t', p] },
  amp: { bin: 'amp', buildArgs: () => [], stdin: true },
};

export function getAgentSpawnArgs(
  agent: AgentType,
  prompt: string,
): { bin: string; args: string[]; stdin: boolean } {
  const cmd = AGENT_COMMANDS[agent];
  return { bin: cmd.bin, args: cmd.buildArgs(prompt), stdin: !!cmd.stdin };
}

const FRAMEWORK_NAMES: Record<string, string> = {
  nextjs: 'Next.js',
  remix: 'Remix',
  nuxt: 'Nuxt',
  sveltekit: 'SvelteKit',
  astro: 'Astro',
  hono: 'Hono',
  express: 'Express',
  fastify: 'Fastify',
  elysia: 'Elysia',
  fastapi: 'FastAPI',
  flask: 'Flask',
  django: 'Django',
  starlette: 'Starlette',
};

const AI_SDK_NAMES: Record<string, string> = {
  'vercel-ai': 'Vercel AI SDK',
  openai: 'OpenAI SDK',
  anthropic: 'Anthropic SDK',
  langchain: 'LangChain',
  langgraph: 'LangGraph',
  crewai: 'CrewAI',
  mastra: 'Mastra',
  'openai-agents': 'OpenAI Agents SDK',
  agno: 'Agno',
};

const LANGUAGE_NAMES: Record<string, string> = {
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  python: 'Python',
  go: 'Go',
  unknown: 'Unknown',
};

export function formatDetection(detection: ProjectDetection): string {
  const parts: string[] = [];
  parts.push(LANGUAGE_NAMES[detection.language] ?? detection.language);
  if (detection.framework) parts.push(FRAMEWORK_NAMES[detection.framework] ?? detection.framework);
  if (detection.aiSdk) parts.push(AI_SDK_NAMES[detection.aiSdk] ?? detection.aiSdk);
  if (detection.packageManager) parts.push(detection.packageManager);
  return parts.join(', ');
}

const DOCS_BASE = 'https://supermemory.ai/docs';

const SDK_DOCS_MAP: Record<string, string> = {
  'vercel-ai': `${DOCS_BASE}/integrations/ai-sdk`,
  openai: `${DOCS_BASE}/integrations/openai`,
  anthropic: `${DOCS_BASE}/integrations/claude-memory`,
  langchain: `${DOCS_BASE}/integrations/langchain`,
  langgraph: `${DOCS_BASE}/integrations/langgraph`,
  crewai: `${DOCS_BASE}/integrations/crewai`,
  mastra: `${DOCS_BASE}/integrations/mastra`,
  'openai-agents': `${DOCS_BASE}/integrations/openai-agents-sdk`,
  agno: `${DOCS_BASE}/integrations/agno`,
};

function getDocsUrl(aiSdk: string | null): string {
  return SDK_DOCS_MAP[aiSdk ?? ''] ?? `${DOCS_BASE}/integrations/supermemory-sdk`;
}

const SUPPLEMENTARY_DOCS = [
  { label: 'User Profiles', url: `${DOCS_BASE}/concepts/user-profiles` },
  { label: 'Search API', url: `${DOCS_BASE}/search` },
  {
    label: 'Container Tags & Filtering',
    url: `${DOCS_BASE}/concepts/filtering`,
  },
  { label: 'Quickstart', url: `${DOCS_BASE}/quickstart` },
  { label: 'All Integrations', url: `${DOCS_BASE}/integrations` },
];

const ALL_INTEGRATIONS = [
  'Vercel AI SDK',
  'OpenAI SDK',
  'Anthropic SDK',
  'LangChain',
  'LangGraph',
  'CrewAI',
  'Mastra',
  'OpenAI Agents SDK',
  'Agno',
  'Pipecat',
  'Zapier',
  'n8n',
];

interface InstallInfo {
  command: string;
  packages: string;
}

function getInstallInfo(detection: ProjectDetection): InstallInfo | null {
  const { language, aiSdk, packageManager } = detection;

  const isPython = language === 'python' || packageManager === 'pip' || packageManager === 'poetry';

  if (isPython) {
    const installer = packageManager === 'poetry' ? 'poetry add' : 'pip install';
    const pkgMap: Record<string, string> = {
      langchain: 'langchain langchain-openai supermemory',
      langgraph: 'langgraph langchain-openai supermemory',
      crewai: 'crewai supermemory',
      'openai-agents': 'openai-agents supermemory',
      agno: 'agno supermemory',
      openai: 'supermemory-openai-sdk',
    };
    const packages = pkgMap[aiSdk ?? ''] ?? 'supermemory';
    return { command: installer, packages };
  }

  if (language === 'go') return null;

  const useTools = ['vercel-ai', 'openai', 'anthropic', 'mastra'].includes(aiSdk ?? '');
  const packages = useTools ? '@supermemory/tools' : 'supermemory';

  const installerMap: Record<string, string> = {
    bun: 'bun add',
    pnpm: 'pnpm add',
    yarn: 'yarn add',
    npm: 'npm install',
  };
  const command = installerMap[packageManager ?? ''] ?? 'npm install';

  return { command, packages };
}

interface PromptConfig {
  tag: string | null;
  apiUrl: string;
}

export function generateSetupPrompt(options: {
  detection: ProjectDetection;
  agent?: AgentType;
  config: PromptConfig;
}): string {
  const { detection, config } = options;
  const isPython = detection.language === 'python';
  const docsUrl = getDocsUrl(detection.aiSdk);
  const sdkName = AI_SDK_NAMES[detection.aiSdk ?? ''] ?? (isPython ? 'Python SDK' : 'TypeScript SDK');
  const installInfo = getInstallInfo(detection);

  const lines: string[] = [];

  lines.push('Integrate Supermemory into this project.');
  lines.push('');

  lines.push('## Project');
  lines.push(`- Language: ${LANGUAGE_NAMES[detection.language] ?? detection.language}`);
  if (detection.framework)
    lines.push(`- Framework: ${FRAMEWORK_NAMES[detection.framework] ?? detection.framework}`);
  if (detection.aiSdk) lines.push(`- AI SDK: ${sdkName}`);
  if (detection.packageManager) lines.push(`- Package Manager: ${detection.packageManager}`);
  lines.push(`- Supermemory: ${detection.hasSupermemory ? 'already installed' : 'not installed'}`);
  lines.push('');

  if (!detection.hasSupermemory && installInfo) {
    lines.push('## Install');
    lines.push(`${installInfo.command} ${installInfo.packages}`);
    lines.push('');
  } else if (detection.language === 'go') {
    lines.push('## Install');
    lines.push(`No Go SDK available yet. Use the REST API directly: ${DOCS_BASE}/api-reference`);
    lines.push('');
  }

  if (!detection.hasApiKey) {
    lines.push('## Environment');
    lines.push('Add SUPERMEMORY_API_KEY to .env — get one at https://console.supermemory.ai');
    lines.push('');
  }

  lines.push('## Integration Guide');
  lines.push(`Read and follow this integration guide for ${sdkName}:`);
  lines.push(docsUrl);
  lines.push('');

  const otherIntegrations = ALL_INTEGRATIONS.filter((n) => n !== sdkName);
  lines.push('## Available Integrations');
  lines.push(`Other integrations available if needed: ${otherIntegrations.join(', ')}.`);
  lines.push(`If the user needs a different integration, refer to: ${DOCS_BASE}/integrations`);
  lines.push('');

  lines.push('## Container Tags');
  if (isPython) {
    lines.push('Use container tags to scope memory per user: container_tag=f"user_{user_id}"');
  } else {
    lines.push(
      // biome-ignore lint/suspicious/noTemplateCurlyInString: intentional example code in prompt
      'Use container tags to scope memory per user: containerTag = `user_${userId}`',
    );
  }
  lines.push('Each user of your app gets their own isolated memory space.');
  if (config.tag) {
    lines.push(`Configured tag: "${config.tag}" — use this if scoping to this project.`);
  }
  lines.push('');

  lines.push('## Reference Docs');
  for (const doc of SUPPLEMENTARY_DOCS) {
    lines.push(`- ${doc.label}: ${doc.url}`);
  }

  return lines.join('\n');
}
