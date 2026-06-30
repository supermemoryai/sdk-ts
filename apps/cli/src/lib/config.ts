import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  chmodSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { homedir } from 'node:os';
import { basename, dirname, join, resolve, sep } from 'node:path';
import { maskApiKey } from './output.js';

export interface UserConfig {
  output?: 'auto' | 'json' | 'human';
  apiUrl?: string;
  consoleUrl?: string;
}

export interface Credentials {
  apiKey: string;
  method: 'api-key' | 'browser';
  orgId?: string;
  createdAt: string;
}

export interface TeamConfig {
  tag?: string;
  defaultLimit?: number;
}

export interface ProjectConfig {
  tag?: string;
  apiKey?: string;
}

export interface ResolvedConfig {
  apiKey: string | null;
  tag: string | null;
  apiUrl: string;
  consoleUrl: string;
  output: 'auto' | 'json' | 'human';
}

const USER_DIR = join(homedir(), '.supermemory');
const USER_CONFIG_PATH = join(USER_DIR, 'config.json');
const CREDENTIALS_PATH = join(USER_DIR, 'credentials.json');
const PROJECTS_DIR = join(USER_DIR, 'projects');
const SCOPE_CACHE_DIR = join(USER_DIR, '.scope-cache');

export function getUserDir(): string {
  return USER_DIR;
}

export function getCredentialsPath(): string {
  return CREDENTIALS_PATH;
}

export function getScopeCacheDir(): string {
  return SCOPE_CACHE_DIR;
}

function encodeProjectPath(projectPath: string): string {
  return projectPath.replace(new RegExp(`\\${sep}`, 'g'), '-');
}

export function getProjectDir(): string {
  const cwd = resolve(process.cwd());
  const encoded = encodeProjectPath(cwd);
  return join(PROJECTS_DIR, encoded);
}

function findTeamConfigDir(): string | null {
  let dir = resolve(process.cwd());
  const root = sep;

  while (dir !== root) {
    const candidate = join(dir, '.supermemory', 'config.json');
    if (existsSync(candidate)) {
      return join(dir, '.supermemory');
    }

    if (existsSync(join(dir, '.git'))) {
      return null;
    }

    dir = resolve(dir, '..');
  }
  return null;
}

function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function readJsonFile<T>(path: string): T | null {
  try {
    if (!existsSync(path)) return null;
    const raw = readFileSync(path, 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJsonFile(path: string, data: unknown, secure = false): void {
  ensureDir(dirname(path));
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf-8');
  if (secure) {
    chmodSync(path, 0o600);
  }
}

export function readUserConfig(): UserConfig {
  return readJsonFile<UserConfig>(USER_CONFIG_PATH) ?? {};
}

export function writeUserConfig(config: UserConfig): void {
  writeJsonFile(USER_CONFIG_PATH, config);
}

export function updateUserConfig(updates: Partial<UserConfig>): void {
  const current = readUserConfig();
  writeUserConfig({ ...current, ...updates });
}

export function readCredentials(): Credentials | null {
  return readJsonFile<Credentials>(CREDENTIALS_PATH);
}

export function writeCredentials(creds: Credentials): void {
  writeJsonFile(CREDENTIALS_PATH, creds, true);
}

export function deleteCredentials(): void {
  try {
    if (existsSync(CREDENTIALS_PATH)) {
      unlinkSync(CREDENTIALS_PATH);
    }
  } catch {}
}

export function readTeamConfig(): TeamConfig | null {
  const dir = findTeamConfigDir();
  if (!dir) return null;
  return readJsonFile<TeamConfig>(join(dir, 'config.json'));
}

export function initTeamConfig(config: TeamConfig): void {
  const gitRoot = findGitRoot();
  if (!gitRoot) {
    throw new Error('Not in a git repository. Run this from a git repo.');
  }

  const teamDir = join(gitRoot, '.supermemory');
  writeJsonFile(join(teamDir, 'config.json'), config);
}

export function updateTeamConfig(updates: Partial<TeamConfig>): void {
  const current = readTeamConfig();
  const merged = { ...current, ...updates };
  initTeamConfig(merged);
}

export function findGitRoot(): string | null {
  try {
    return execSync('git rev-parse --show-toplevel', {
      encoding: 'utf-8',
    }).trim();
  } catch {
    return null;
  }
}

export function getDefaultTag(): string {
  return basename(resolve(process.cwd()));
}

export interface ConfigSource {
  value: string | null;
  source: 'env' | 'project' | 'team' | 'global' | 'credentials' | null;
}

export interface AuthState {
  apiKey: ConfigSource & { masked: string | null };
  tag: ConfigSource;
}

export function getAuthState(): AuthState {
  const credentials = readCredentials();
  const teamConfig = readTeamConfig();
  const projectConfig = readProjectConfig();

  let apiKeyValue: string | null = null;
  let apiKeySource: ConfigSource['source'] = null;
  if (process.env.SUPERMEMORY_API_KEY) {
    apiKeyValue = process.env.SUPERMEMORY_API_KEY;
    apiKeySource = 'env';
  } else if (projectConfig?.apiKey) {
    apiKeyValue = projectConfig.apiKey;
    apiKeySource = 'project';
  } else if (credentials?.apiKey) {
    apiKeyValue = credentials.apiKey;
    apiKeySource = 'credentials';
  }

  let tagValue: string | null = null;
  let tagSource: ConfigSource['source'] = null;
  if (process.env.SUPERMEMORY_TAG) {
    tagValue = process.env.SUPERMEMORY_TAG;
    tagSource = 'env';
  } else if (teamConfig?.tag) {
    tagValue = teamConfig.tag;
    tagSource = 'team';
  } else if (projectConfig?.tag) {
    tagValue = projectConfig.tag;
    tagSource = 'project';
  }

  return {
    apiKey: {
      value: apiKeyValue,
      source: apiKeySource,
      masked: apiKeyValue ? maskApiKey(apiKeyValue) : null,
    },
    tag: { value: tagValue, source: tagSource },
  };
}

export function readProjectConfig(): ProjectConfig | null {
  const dir = getProjectDir();
  return readJsonFile<ProjectConfig>(join(dir, 'config.json'));
}

export function writeProjectConfig(config: ProjectConfig): void {
  const dir = getProjectDir();
  writeJsonFile(join(dir, 'config.json'), config, !!config.apiKey);
}

export function updateProjectConfig(updates: Partial<ProjectConfig>): void {
  const current = readProjectConfig();
  writeProjectConfig({ ...current, ...updates });
}

export interface ScopeCache {
  type: 'full' | 'scoped';
  permission?: 'read' | 'write';
  tag?: string;
  tags?: string[];
  rateLimit?: number;
  expires?: string;
  cachedAt: string;
}

export function readScopeCache(keyHash: string): ScopeCache | null {
  ensureDir(SCOPE_CACHE_DIR);
  const cache = readJsonFile<ScopeCache>(join(SCOPE_CACHE_DIR, `${keyHash}.json`));
  if (!cache) return null;

  const cachedAt = new Date(cache.cachedAt).getTime();
  const now = Date.now();
  if (now - cachedAt > 24 * 60 * 60 * 1000) return null;

  return cache;
}

export function writeScopeCache(keyHash: string, scope: ScopeCache): void {
  writeJsonFile(join(SCOPE_CACHE_DIR, `${keyHash}.json`), scope);
}

export function clearScopeCache(): void {
  try {
    if (!existsSync(SCOPE_CACHE_DIR)) return;
    for (const file of readdirSync(SCOPE_CACHE_DIR)) {
      unlinkSync(join(SCOPE_CACHE_DIR, file));
    }
  } catch {}
}

export function getKeyScope(): ScopeCache | null {
  const config = resolveConfig();
  if (!config.apiKey) return null;
  const keyHash = createHash('sha256').update(config.apiKey).digest('hex').slice(0, 16);
  return readScopeCache(keyHash);
}

export function resolveConfig(flags?: { tag?: string }): ResolvedConfig {
  const userConfig = readUserConfig();
  const credentials = readCredentials();
  const teamConfig = readTeamConfig();
  const projectConfig = readProjectConfig();

  const envApiKey = process.env.SUPERMEMORY_API_KEY;
  const storedApiKey = projectConfig?.apiKey ?? credentials?.apiKey;

  if (envApiKey && storedApiKey && envApiKey !== storedApiKey) {
    process.stderr.write(
      '⚠ SUPERMEMORY_API_KEY env var is overriding stored credentials. Run `supermemory whoami` to verify.\n',
    );
  }

  const apiKey = envApiKey ?? storedApiKey ?? null;

  const tag = flags?.tag ?? process.env.SUPERMEMORY_TAG ?? teamConfig?.tag ?? projectConfig?.tag ?? null;

  const apiUrl = process.env.SUPERMEMORY_API_URL ?? userConfig.apiUrl ?? 'https://api.supermemory.ai';

  const consoleUrl =
    process.env.SUPERMEMORY_CONSOLE_URL ?? userConfig.consoleUrl ?? 'https://console.supermemory.ai';

  const output = userConfig.output ?? 'auto';

  return { apiKey, tag, apiUrl, consoleUrl, output };
}
