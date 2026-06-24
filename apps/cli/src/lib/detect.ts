import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

export interface ProjectDetection {
	language: "typescript" | "javascript" | "python" | "go" | "unknown"
	framework: string | null
	aiSdk: string | null
	packageManager: string | null
	hasSupermemory: boolean
	hasApiKey: boolean
}

const FRAMEWORK_MAP: Record<string, string> = {
	next: "nextjs",
	"@remix-run/node": "remix",
	"@remix-run/react": "remix",
	nuxt: "nuxt",
	"@sveltejs/kit": "sveltekit",
	svelte: "sveltekit",
	astro: "astro",
	hono: "hono",
	express: "express",
	fastify: "fastify",
	elysia: "elysia",
	"@elysiajs/core": "elysia",
}

const AI_SDK_MAP: Record<string, string> = {
	ai: "vercel-ai",
	"@ai-sdk/openai": "vercel-ai",
	"@ai-sdk/anthropic": "vercel-ai",
	"@ai-sdk/google": "vercel-ai",
	openai: "openai",
	"@anthropic-ai/sdk": "anthropic",
	langchain: "langchain",
	"@langchain/core": "langchain",
	"@langchain/openai": "langchain",
	crewai: "crewai",
	"@mastra/core": "mastra",
	langgraph: "langgraph",
}

const PY_FRAMEWORK_MAP: Record<string, string> = {
	fastapi: "fastapi",
	flask: "flask",
	django: "django",
	starlette: "starlette",
}

const PY_AI_SDK_MAP: Record<string, string> = {
	"openai-agents": "openai-agents",
	"langchain-openai": "langchain",
	"langchain-core": "langchain",
	langchain: "langchain",
	langgraph: "langgraph",
	openai: "openai",
	anthropic: "anthropic",
	crewai: "crewai",
	agno: "agno",
}

function readFileSafe(path: string): string | null {
	try {
		return readFileSync(path, "utf-8")
	} catch {
		return null
	}
}

function parseJsonSafe<T>(raw: string | null): T | null {
	if (!raw) return null
	try {
		return JSON.parse(raw) as T
	} catch {
		return null
	}
}

function detectPackageManager(
	cwd: string,
	pyprojectContent?: string | null,
): string | null {
	if (existsSync(join(cwd, "bun.lockb")) || existsSync(join(cwd, "bun.lock")))
		return "bun"
	if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm"
	if (existsSync(join(cwd, "yarn.lock"))) return "yarn"
	if (existsSync(join(cwd, "package-lock.json"))) return "npm"

	const pyproject =
		pyprojectContent ?? readFileSafe(join(cwd, "pyproject.toml"))
	if (pyproject?.includes("[tool.poetry]")) return "poetry"
	if (existsSync(join(cwd, "requirements.txt")) || pyproject) return "pip"

	if (existsSync(join(cwd, "go.mod"))) return "go"
	return null
}

function detectNodeProject(cwd: string): Omit<ProjectDetection, "hasApiKey"> {
	const pkg = parseJsonSafe<{
		dependencies?: Record<string, string>
		devDependencies?: Record<string, string>
	}>(readFileSafe(join(cwd, "package.json")))

	if (!pkg) {
		return {
			language: "unknown",
			framework: null,
			aiSdk: null,
			packageManager: detectPackageManager(cwd),
			hasSupermemory: false,
		}
	}

	const allDeps = new Set([
		...Object.keys(pkg.dependencies ?? {}),
		...Object.keys(pkg.devDependencies ?? {}),
	])

	const language =
		existsSync(join(cwd, "tsconfig.json")) || allDeps.has("typescript")
			? "typescript"
			: "javascript"

	let framework: string | null = null
	for (const [dep, name] of Object.entries(FRAMEWORK_MAP)) {
		if (allDeps.has(dep)) {
			framework = name
			break
		}
	}

	let aiSdk: string | null = null
	for (const [dep, name] of Object.entries(AI_SDK_MAP)) {
		if (allDeps.has(dep)) {
			aiSdk = name
			break
		}
	}
	if (!aiSdk) {
		for (const dep of allDeps) {
			if (dep.startsWith("@ai-sdk/")) {
				aiSdk = "vercel-ai"
				break
			}
			if (dep.startsWith("@langchain/")) {
				aiSdk = "langchain"
				break
			}
		}
	}

	const hasSupermemory =
		allDeps.has("supermemory") || allDeps.has("@supermemory/tools")

	return {
		language,
		framework,
		aiSdk,
		packageManager: detectPackageManager(cwd),
		hasSupermemory,
	}
}

function detectPythonProject(cwd: string): Omit<ProjectDetection, "hasApiKey"> {
	const pyproject = readFileSafe(join(cwd, "pyproject.toml"))
	const requirements = readFileSafe(join(cwd, "requirements.txt"))
	const content = `${pyproject ?? ""}\n${requirements ?? ""}`.toLowerCase()

	let framework: string | null = null
	for (const [pkg, name] of Object.entries(PY_FRAMEWORK_MAP)) {
		if (content.includes(pkg)) {
			framework = name
			break
		}
	}

	let aiSdk: string | null = null
	for (const [pkg, name] of Object.entries(PY_AI_SDK_MAP)) {
		if (content.includes(pkg)) {
			aiSdk = name
			break
		}
	}

	const hasSupermemory = content.includes("supermemory")

	return {
		language: "python",
		framework,
		aiSdk,
		packageManager: detectPackageManager(cwd, pyproject),
		hasSupermemory,
	}
}

const API_KEY_PREFIX = "SUPERMEMORY_API_KEY="

function detectApiKey(cwd: string): boolean {
	if (process.env.SUPERMEMORY_API_KEY) return true

	for (const file of [".env", ".env.local"]) {
		const content = readFileSafe(join(cwd, file))
		if (content) {
			const hasKey = content
				.split("\n")
				.some(
					(line) =>
						line.startsWith(API_KEY_PREFIX) &&
						line.slice(API_KEY_PREFIX.length).trim().length > 0,
				)
			if (hasKey) return true
		}
	}

	return false
}

export function detectProject(): ProjectDetection {
	const cwd = process.cwd()

	let result: Omit<ProjectDetection, "hasApiKey">

	if (existsSync(join(cwd, "package.json"))) {
		result = detectNodeProject(cwd)
	} else if (
		existsSync(join(cwd, "pyproject.toml")) ||
		existsSync(join(cwd, "requirements.txt"))
	) {
		result = detectPythonProject(cwd)
	} else if (existsSync(join(cwd, "go.mod"))) {
		result = {
			language: "go",
			framework: null,
			aiSdk: null,
			packageManager: "go",
			hasSupermemory: false,
		}
	} else {
		result = {
			language: "unknown",
			framework: null,
			aiSdk: null,
			packageManager: null,
			hasSupermemory: false,
		}
	}

	return {
		...result,
		hasApiKey: detectApiKey(cwd),
	}
}
