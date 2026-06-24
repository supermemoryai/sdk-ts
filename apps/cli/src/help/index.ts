import chalk from "chalk"
import type { AuthState } from "../lib/config.js"

interface CommandSchema {
	description: string
	usage: string
	arguments?: Record<string, { required: boolean; description: string }>
	options?: Record<
		string,
		{ type: string; default?: unknown; description: string }
	>
	examples?: string[]
}

interface HelpSchema {
	name: string
	version: string
	description: string
	mode?: "full" | "scoped"
	scope?: {
		tag?: string
		tags?: string[]
		rateLimit?: number
		expires?: string
	}
	currentConfig?: {
		apiKey: { value: string | null; source: string | null }
		tag: { value: string | null; source: string | null }
	}
	commands: Record<string, CommandSchema>
	globalOptions: Record<string, string>
	envVars: Record<string, string>
}

const FULL_COMMANDS: Record<string, CommandSchema> = {
	add: {
		description: "Ingest content and extract memories into a container tag",
		usage: "supermemory add <content|file|url> [options]",
		arguments: {
			content: { required: true, description: "Text, file path, or URL" },
		},
		options: {
			"--tag": { type: "string", description: "Container tag" },
			"--stdin": {
				type: "boolean",
				default: false,
				description: "Read from stdin",
			},
			"--title": { type: "string", description: "Document title" },
			"--metadata": { type: "json", description: "JSON metadata" },
			"--id": { type: "string", description: "Custom document ID" },
			"--batch": {
				type: "boolean",
				default: false,
				description: "Batch mode from stdin",
			},
		},
		examples: [
			'supermemory add "User prefers TypeScript"',
			"supermemory add ./notes.pdf --tag meetings",
			"cat file.txt | supermemory add --stdin",
		],
	},
	search: {
		description: "Search memories in a container tag",
		usage: "supermemory search <query> [options]",
		arguments: {
			query: { required: true, description: "Search query text" },
		},
		options: {
			"--tag": { type: "string", description: "Filter by container tag" },
			"--limit": { type: "number", default: 10, description: "Max results" },
			"--threshold": {
				type: "number",
				default: 0,
				description: "Similarity threshold 0-1",
			},
			"--rerank": {
				type: "boolean",
				default: false,
				description: "Enable reranking",
			},
			"--rewrite": {
				type: "boolean",
				default: false,
				description: "Rewrite query",
			},
			"--mode": {
				type: "string",
				default: "memories",
				description: "memories|hybrid|documents",
			},
			"--include": {
				type: "string",
				description: "Fields: summary,chunks,memories,document",
			},
			"--filter": { type: "json", description: "Metadata filter" },
		},
		examples: [
			'supermemory search "authentication patterns"',
			'supermemory search "auth" --tag api --limit 5 --rerank',
		],
	},
	remember: {
		description: "Store a specific memory directly into a container tag",
		usage: "supermemory remember <content> [options]",
		arguments: {
			content: { required: true, description: "Memory content text" },
		},
		options: {
			"--tag": { type: "string", description: "Container tag" },
			"--static": {
				type: "boolean",
				default: false,
				description: "Mark as permanent memory",
			},
			"--metadata": { type: "json", description: "JSON metadata" },
		},
		examples: [
			'supermemory remember "User prefers dark mode" --static',
			'supermemory remember "Discussed Q3 roadmap" --tag meetings',
		],
	},
	forget: {
		description: "Forget a specific memory",
		usage: "supermemory forget <id> [options]",
		arguments: {
			id: { required: false, description: "Memory ID" },
		},
		options: {
			"--tag": { type: "string", description: "Container tag" },
			"--reason": { type: "string", description: "Reason for forgetting" },
			"--content": { type: "string", description: "Forget by content match" },
		},
		examples: [
			"supermemory forget mem_abc123 --tag default",
			'supermemory forget --content "outdated" --tag default',
		],
	},
	update: {
		description: "Update an existing memory",
		usage: "supermemory update <id> <content> [options]",
		arguments: {
			id: { required: true, description: "Memory ID" },
			content: { required: true, description: "New content text" },
		},
		options: {
			"--tag": { type: "string", description: "Container tag" },
			"--metadata": { type: "json", description: "Updated metadata" },
			"--reason": { type: "string", description: "Reason for update" },
		},
		examples: ['supermemory update mem_123 "Updated preference: prefers Bun"'],
	},
	profile: {
		description: "Get the user profile for a container tag",
		usage: "supermemory profile [tag] [options]",
		arguments: {
			tag: { required: false, description: "Container tag" },
		},
		options: {
			"--query": { type: "string", description: "Search within the profile" },
		},
		examples: ["supermemory profile default"],
	},
	login: {
		description: "Authenticate with Supermemory",
		usage: "supermemory login [options]",
		options: {
			"--api-key": { type: "string", description: "Use an API key directly" },
			"--no-browser": {
				type: "boolean",
				default: false,
				description: "Show URL instead of opening browser",
			},
		},
		examples: ["supermemory login", "supermemory login --api-key sm_abc_xxx"],
	},
	logout: {
		description: "Remove stored credentials",
		usage: "supermemory logout",
		examples: ["supermemory logout"],
	},
	whoami: {
		description: "Show current authentication status",
		usage: "supermemory whoami [--json]",
		examples: ["supermemory whoami"],
	},
	config: {
		description: "View and manage CLI configuration",
		usage: "supermemory config [set|get]",
		examples: [
			"supermemory config",
			"supermemory config set tag my-project",
			"supermemory config set verbose true",
		],
	},
	keys: {
		description: "Manage API keys",
		usage: "supermemory keys <list|create|revoke|toggle>",
		options: {
			"--name": { type: "string", description: "Key name (for create)" },
			"--permission": {
				type: "string",
				default: "write",
				description: "read|write (for create)",
			},
			"--tag": {
				type: "string",
				description: "Scope to container tag (for create)",
			},
			"--expires": {
				type: "number",
				description: "Expiration in days (for create)",
			},
			"--yes": {
				type: "boolean",
				default: false,
				description: "Skip confirmation",
			},
		},
		examples: [
			"supermemory keys list",
			"supermemory keys create --name my-agent --permission write",
			"supermemory keys revoke key_abc123",
		],
	},
	tags: {
		description: "Manage container tags",
		usage: "supermemory tags <list|info|create|delete|context|merge>",
		options: {
			"--set": {
				type: "string",
				description: "Set context text (for context)",
			},
			"--clear": {
				type: "boolean",
				default: false,
				description: "Clear context (for context)",
			},
			"--into": { type: "string", description: "Target tag for merge" },
			"--yes": {
				type: "boolean",
				default: false,
				description: "Skip confirmation",
			},
		},
		examples: [
			"supermemory tags list",
			"supermemory tags info default",
			"supermemory tags context default --set 'User preferences'",
			"supermemory tags merge old-tag --into new-tag",
		],
	},
	docs: {
		description: "Manage documents",
		usage: "supermemory docs <list|get|delete|chunks|status>",
		options: {
			"--tag": { type: "string", description: "Filter by container tag" },
			"--limit": { type: "number", default: 20, description: "Max results" },
			"--page": { type: "number", description: "Page number" },
			"--yes": {
				type: "boolean",
				default: false,
				description: "Skip confirmation",
			},
		},
		examples: [
			"supermemory docs list --tag default",
			"supermemory docs get doc_abc123",
			"supermemory docs status doc_abc123",
		],
	},
	status: {
		description: "Show account overview dashboard",
		usage: "supermemory status [options]",
		options: {
			"--period": {
				type: "string",
				default: "all",
				description: "Time period: 24h, 7d, 30d, all",
			},
		},
		examples: ["supermemory status", "supermemory status --period 7d"],
	},
	logs: {
		description: "View request logs",
		usage: "supermemory logs [options]",
		options: {
			"--period": {
				type: "string",
				default: "24h",
				description: "Time period: 24h|7d|30d|all",
			},
			"--type": { type: "string", description: "Filter by request type" },
			"--status": { type: "string", description: "Filter: success|error" },
			"--limit": { type: "number", default: 20, description: "Max results" },
		},
		examples: [
			"supermemory logs",
			"supermemory logs --period 7d --status error",
			"supermemory logs get req_abc123",
		],
	},
	billing: {
		description: "View billing and usage information",
		usage: "supermemory billing [usage|invoices]",
		examples: [
			"supermemory billing",
			"supermemory billing usage",
			"supermemory billing invoices",
		],
	},
	plugins: {
		description: "Manage plugin connections (Claude Code, Cursor, etc.)",
		usage: "supermemory plugins <list|connect|revoke|status>",
		options: {
			"--auto-configure": {
				type: "boolean",
				default: false,
				description: "Auto-detect and configure plugin",
			},
			"--yes": {
				type: "boolean",
				default: false,
				description: "Skip confirmation",
			},
		},
		examples: [
			"supermemory plugins list",
			"supermemory plugins connect claude-code --auto-configure",
			"supermemory plugins revoke claude-code",
		],
	},
	connectors: {
		description: "Manage external data connectors",
		usage:
			"supermemory connectors <list|connect|sync|history|disconnect|resources>",
		options: {
			"--tag": { type: "string", description: "Scope imported docs to tag" },
			"--no-browser": {
				type: "boolean",
				default: false,
				description: "Print URL instead of opening browser",
			},
			"--limit": { type: "number", description: "Max results for history" },
			"--yes": {
				type: "boolean",
				default: false,
				description: "Skip confirmation",
			},
		},
		examples: [
			"supermemory connectors list",
			"supermemory connectors connect google-drive --tag docs",
			"supermemory connectors sync conn_abc123",
			"supermemory connectors resources conn_abc123",
		],
	},
	open: {
		description: "Open Supermemory console in browser",
		usage: "supermemory open [page]",
		arguments: {
			page: {
				required: false,
				description:
					"Page: console, billing, graph, connectors, settings, docs, keys, team, agents",
			},
		},
		options: {
			"--no-browser": {
				type: "boolean",
				default: false,
				description: "Print URL instead",
			},
		},
		examples: [
			"supermemory open",
			"supermemory open graph",
			"supermemory open billing",
		],
	},
	team: {
		description: "Manage team members and invitations",
		usage: "supermemory team <list|invite|remove|role|invitations>",
		options: {
			"--role": {
				type: "string",
				default: "member",
				description: "Role: admin or member",
			},
			"--yes": {
				type: "boolean",
				default: false,
				description: "Skip confirmation",
			},
		},
		examples: [
			"supermemory team list",
			"supermemory team invite user@example.com --role admin",
			"supermemory team remove member_123",
		],
	},
	init: {
		description:
			"Initialize Supermemory configuration (interactive wizard or flags)",
		usage: "supermemory init [--scope <project|team|global>] [options]",
		options: {
			"--scope": {
				type: "string",
				description:
					"Config scope: project (local machine), team (committed to git), global (all projects)",
			},
			"--tag": { type: "string", description: "Container tag" },
			"--api-key": {
				type: "string",
				description: "API key (project scope only)",
			},
			"--output": {
				type: "string",
				description: "Output format: auto, json, human (global only)",
			},
			"--api-url": {
				type: "string",
				description: "API URL (global only)",
			},
			"--console-url": {
				type: "string",
				description: "Console URL (global only)",
			},
		},
		examples: [
			"supermemory init",
			"supermemory init --scope project --tag meetings-bot",
			"supermemory init --scope team --tag my-project",
			"supermemory init --scope global --output json",
		],
	},
	setup: {
		description:
			"Detect your project and launch a coding agent to integrate Supermemory",
		usage: "supermemory setup [--prompt]",
		options: {
			"--prompt": {
				type: "boolean",
				default: false,
				description: "Print integration prompt for AI agents",
			},
		},
		examples: ["supermemory setup", "supermemory setup --prompt"],
	},
	plugin: {
		description:
			"Install Supermemory integrations for Claude Code, Cursor, OpenCode, and Codex",
		usage: "supermemory plugin [--all|--only <targets>] [options]",
		options: {
			"--all": {
				type: "boolean",
				default: false,
				description: "Install every detected plugin target",
			},
			"--only": {
				type: "string",
				description: "Comma-separated targets: claude,cursor,opencode,codex",
			},
			"--dry-run": {
				type: "boolean",
				default: false,
				description: "Show what would run without installing anything",
			},
			"--force": {
				type: "boolean",
				default: false,
				description:
					"Run selected installers even if the target app is not detected",
			},
			"--no-auth": {
				type: "boolean",
				default: false,
				description: "Skip browser OAuth after installing plugins",
			},
		},
		examples: [
			"supermemory plugin",
			"supermemory plugin --all",
			"supermemory plugin --all --no-auth",
			"supermemory plugin --only claude,cursor --dry-run",
		],
	},
}

const SCOPED_COMMAND_NAMES = [
	"search",
	"add",
	"remember",
	"forget",
	"update",
	"profile",
	"whoami",
]

const CORE_COMMAND_NAMES = [
	"add",
	"search",
	"remember",
	"forget",
	"update",
	"profile",
	"whoami",
	"config",
	"tags",
	"docs",
	"setup",
	"plugin",
]

export function buildHelpJson(
	mode: "full" | "scoped" = "full",
	scope?: {
		tag?: string
		tags?: string[]
		rateLimit?: number
		expires?: string
	},
	authState?: AuthState,
): HelpSchema {
	const commands: Record<string, CommandSchema> =
		mode === "scoped"
			? Object.fromEntries(
					SCOPED_COMMAND_NAMES.flatMap((name) => {
						const cmd = FULL_COMMANDS[name]
						return cmd ? [[name, cmd]] : []
					}),
				)
			: FULL_COMMANDS

	const currentConfig = authState
		? {
				apiKey: {
					value: authState.apiKey.masked,
					source: authState.apiKey.source,
				},
				tag: {
					value: authState.tag.value,
					source: authState.tag.source,
				},
			}
		: undefined

	return {
		name: "supermemory",
		version: "0.1.0",
		description: "supermemory — memory layer for AI agents",
		mode,
		...(scope ? { scope } : {}),
		...(currentConfig ? { currentConfig } : {}),
		commands,
		globalOptions: {
			"--json": "Force JSON output",
			...(mode === "full"
				? {
						"--tag": "Override default container tag",
					}
				: {}),
			"--help": "Show help",
		},
		envVars: {
			SUPERMEMORY_API_KEY: "API key for authentication",
			...(mode === "full"
				? {
						SUPERMEMORY_TAG: "Override default container tag",
					}
				: {}),
			OTEL_EXPORTER_OTLP_ENDPOINT: "OpenTelemetry collector endpoint",
		},
	}
}

export function getCommandSchema(commandName: string): CommandSchema | null {
	return FULL_COMMANDS[commandName] ?? null
}

export function formatHelpText(
	mode: "full" | "scoped" = "full",
	authState?: AuthState,
	options?: {
		all?: boolean
		scope?: { tag?: string; tags?: string[]; permission?: string }
	},
): string {
	const lines = [
		"",
		`${chalk.bold("supermemory")} — memory layer for AI agents`,
		"",
	]

	const showAll = options?.all
	let commandNames: string[]

	if (mode === "scoped" && !showAll) {
		commandNames = SCOPED_COMMAND_NAMES
	} else if (showAll) {
		commandNames = Object.keys(FULL_COMMANDS)
	} else {
		commandNames = [...CORE_COMMAND_NAMES]
		if (authState && !authState.apiKey.value) {
			if (!commandNames.includes("login")) commandNames.push("login")
			if (!commandNames.includes("init")) commandNames.push("init")
		}
	}

	const commandDescriptions: [string, string][] = commandNames
		.filter((name) => name in FULL_COMMANDS)
		.map((name) => {
			const cmd = FULL_COMMANDS[name]
			return [`  supermemory ${name}`, cmd?.description ?? ""]
		})

	const maxLen = Math.max(...commandDescriptions.map(([cmd]) => cmd.length))

	for (const [cmd, desc] of commandDescriptions) {
		lines.push(`${cmd.padEnd(maxLen + 2)} ${chalk.dim(desc)}`)
	}

	lines.push("")
	lines.push(
		`  ${chalk.dim("supermemory <command> --help")}  Get help for a command`,
	)
	lines.push(
		`  ${chalk.dim("supermemory help --json")}      Machine-readable help (for LLM agents)`,
	)

	if (!showAll) {
		lines.push("")
		lines.push(`  Run ${chalk.dim("supermemory help --all")} for all commands`)
	}

	if (authState) {
		lines.push("")
		lines.push(`  ${chalk.bold("Current config:")}`)
		lines.push(
			`    API Key   ${authState.apiKey.masked ?? chalk.dim("—")}   ${authState.apiKey.source ? chalk.dim(`(${authState.apiKey.source})`) : chalk.dim("(not set)")}  ${mode === "scoped" ? chalk.yellow("[scoped]") : chalk.dim("[full access]")}`,
		)
		if (mode === "scoped" && options?.scope?.tag) {
			const scopeDisplay =
				options.scope.tags && options.scope.tags.length > 1
					? options.scope.tags.map((t) => `"${t}"`).join(", ")
					: `"${options.scope.tag}"`
			lines.push(
				`    Container Tag   Scoped to ${scopeDisplay}   ${chalk.dim(`(${options.scope.permission ?? "write"})`)}`,
			)
		} else {
			lines.push(
				`    Container Tag   ${authState.tag.value ?? chalk.dim("—")}   ${authState.tag.source ? chalk.dim(`(${authState.tag.source})`) : chalk.dim("(not set)")}`,
			)
		}
	}

	lines.push("")

	return lines.join("\n")
}
