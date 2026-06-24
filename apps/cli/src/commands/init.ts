import { join } from "node:path"
import * as clack from "@clack/prompts"
import chalk from "chalk"
import { validateApiKey } from "../lib/api.js"
import { defineCliCommand } from "../lib/command.js"
import {
	findGitRoot,
	getAuthState,
	getDefaultTag,
	getProjectDir,
	initTeamConfig,
	readProjectConfig,
	readTeamConfig,
	resolveConfig,
	updateTeamConfig,
	updateUserConfig,
	writeProjectConfig,
} from "../lib/config.js"
import { exitWithError, isInputInteractive, output } from "../lib/output.js"
import { parseEnumArg } from "../lib/validators.js"

type Scope = "project" | "team" | "global"

export const initCommand = defineCliCommand({
	meta: {
		name: "init",
		description: "Initialize Supermemory configuration for this project",
	},
	noSpan: true,
	args: {
		scope: {
			type: "string",
			description: "Config scope: project, team, global",
		},
		tag: {
			type: "string",
			description: "Container tag",
		},
		"api-key": {
			type: "string",
			description: "API key (project scope only)",
		},
		output: {
			type: "string",
			description: "Output format: auto, json, human (global only)",
		},
		"api-url": {
			type: "string",
			description: "API URL (global only)",
		},
		"console-url": {
			type: "string",
			description: "Console URL (global only)",
		},
	},
	async handler({ args, flags }) {
		const hasFlags =
			args.scope ||
			args.tag ||
			args["api-key"] ||
			args.output ||
			args["api-url"] ||
			args["console-url"]
		const interactive = isInputInteractive() && !hasFlags

		if (interactive) {
			await runInteractive(flags)
		} else {
			await runNonInteractive(args, flags)
		}
	},
})

async function runInteractive(flags: { json?: boolean }) {
	const auth = getAuthState()
	const config = resolveConfig()

	process.stderr.write("\n")
	process.stderr.write(
		`  ${chalk.dim("tip: AI agents can use flags directly — run")} supermemory init --help\n`,
	)
	process.stderr.write("\n")

	process.stderr.write(`  ${chalk.bold("Current config:")}\n`)
	process.stderr.write(
		`    API Key:  ${auth.apiKey.masked ? `${auth.apiKey.masked}  ${chalk.dim(`(${auth.apiKey.source})`)}` : chalk.dim("(not set)")}\n`,
	)
	process.stderr.write(
		`    Tag:      ${auth.tag.value ? `${auth.tag.value}  ${chalk.dim(`(${auth.tag.source})`)}` : chalk.dim("(not set)")}\n`,
	)
	process.stderr.write("\n")

	const scope = await clack.select<Scope>({
		message: "Select scope",
		options: [
			{
				value: "project",
				label: "Project",
				hint: "just this directory, your machine",
			},
			{
				value: "team",
				label: "Team",
				hint: "shared with repo, committed to git",
			},
			{
				value: "global",
				label: "Global",
				hint: "applies everywhere",
			},
		],
	})

	if (clack.isCancel(scope)) {
		process.exit(0)
	}

	if (scope === "project") {
		await runProjectWizard(auth, config, flags)
	} else if (scope === "team") {
		await runTeamWizard(auth, flags)
	} else {
		await runGlobalWizard(config, flags)
	}
}

async function runProjectWizard(
	auth: ReturnType<typeof getAuthState>,
	config: ReturnType<typeof resolveConfig>,
	flags: { json?: boolean },
) {
	const existing = readProjectConfig()

	const apiKeyAnswer = await clack.text({
		message: "API Key",
		defaultValue: auth.apiKey.masked ?? undefined,
		placeholder: auth.apiKey.masked ?? "your API key",
	})

	if (clack.isCancel(apiKeyAnswer)) {
		process.exit(0)
	}

	let newApiKey: string | undefined
	if (apiKeyAnswer && apiKeyAnswer !== auth.apiKey.masked) {
		try {
			await validateApiKey(apiKeyAnswer, config.apiUrl)
			newApiKey = apiKeyAnswer
		} catch {
			exitWithError(
				"invalid_api_key",
				"API key validation failed. Check your key and try again.",
				flags,
			)
		}
	}

	const tagAnswer = await clack.text({
		message: "Container Tag",
		defaultValue: auth.tag.value ?? getDefaultTag(),
		placeholder: auth.tag.value ?? getDefaultTag(),
	})

	if (clack.isCancel(tagAnswer)) {
		process.exit(0)
	}

	const projectUpdates: { tag?: string; apiKey?: string } = {}
	if (newApiKey) projectUpdates.apiKey = newApiKey
	if (tagAnswer && tagAnswer !== (existing?.tag ?? ""))
		projectUpdates.tag = tagAnswer

	if (Object.keys(projectUpdates).length > 0 || !existing) {
		writeProjectConfig({ ...existing, ...projectUpdates })
	}

	const projectDir = getProjectConfigPath()

	output(
		{
			scope: "project",
			tag: tagAnswer || null,
			apiKey: newApiKey ? "updated" : "unchanged",
			path: projectDir,
		},
		() => {
			const lines = ["", `${chalk.green("✓")} Configured (project scope)`]
			if (tagAnswer) lines.push(`  Tag: ${tagAnswer}`)
			if (newApiKey) lines.push("  API Key: updated")
			lines.push(`  Saved to ${chalk.dim(projectDir)}`)
			return lines.join("\n")
		},
		flags,
	)
}

async function runTeamWizard(
	auth: ReturnType<typeof getAuthState>,
	flags: { json?: boolean },
) {
	const gitRoot = findGitRoot()
	if (!gitRoot) {
		exitWithError(
			"not_git_repo",
			"Not in a git repository. Team config requires a git repo.",
			flags,
		)
	}

	const existing = readTeamConfig()

	const tagAnswer = await clack.text({
		message: "Container Tag",
		defaultValue: auth.tag.value ?? getDefaultTag(),
		placeholder: auth.tag.value ?? getDefaultTag(),
	})

	if (clack.isCancel(tagAnswer)) {
		process.exit(0)
	}

	const updates: { tag?: string } = {}
	if (tagAnswer) updates.tag = tagAnswer

	if (existing) {
		updateTeamConfig(updates)
	} else {
		initTeamConfig(updates)
	}

	const configPath = `${gitRoot}/.supermemory/config.json`

	output(
		{
			scope: "team",
			tag: tagAnswer || null,
			path: configPath,
		},
		() => {
			const lines = ["", `${chalk.green("✓")} Configured (team scope)`]
			if (tagAnswer) lines.push(`  Tag: ${tagAnswer}`)
			lines.push(`  Saved to ${chalk.dim(configPath)}`)
			lines.push(
				`  ${chalk.dim("Commit .supermemory/ to share config with your team.")}`,
			)
			return lines.join("\n")
		},
		flags,
	)
}

async function runGlobalWizard(
	config: ReturnType<typeof resolveConfig>,
	flags: { json?: boolean },
) {
	const outputAnswer = await clack.text({
		message: "Output format",
		defaultValue: config.output,
		placeholder: "auto, json, human",
	})
	if (clack.isCancel(outputAnswer)) {
		process.exit(0)
	}

	const apiUrlAnswer = await clack.text({
		message: "API URL",
		defaultValue: config.apiUrl,
		placeholder: config.apiUrl,
	})
	if (clack.isCancel(apiUrlAnswer)) {
		process.exit(0)
	}

	const consoleUrlAnswer = await clack.text({
		message: "Console URL",
		defaultValue: config.consoleUrl,
		placeholder: config.consoleUrl,
	})
	if (clack.isCancel(consoleUrlAnswer)) {
		process.exit(0)
	}

	const updates: Record<string, string> = {}
	if (outputAnswer && ["auto", "json", "human"].includes(outputAnswer))
		updates.output = outputAnswer
	if (apiUrlAnswer) updates.apiUrl = apiUrlAnswer
	if (consoleUrlAnswer) updates.consoleUrl = consoleUrlAnswer

	if (Object.keys(updates).length > 0) {
		updateUserConfig(updates)
	}

	output(
		{
			scope: "global",
			output: outputAnswer || null,
			apiUrl: apiUrlAnswer || null,
			consoleUrl: consoleUrlAnswer || null,
			path: "~/.supermemory/config.json",
		},
		() => {
			const lines = ["", `${chalk.green("✓")} Configured (global scope)`]
			if (outputAnswer) lines.push(`  Output: ${outputAnswer}`)
			if (apiUrlAnswer) lines.push(`  API URL: ${apiUrlAnswer}`)
			if (consoleUrlAnswer) lines.push(`  Console URL: ${consoleUrlAnswer}`)
			lines.push(`  Saved to ${chalk.dim("~/.supermemory/config.json")}`)
			return lines.join("\n")
		},
		flags,
	)
}

async function runNonInteractive(
	args: Record<string, unknown>,
	flags: { json?: boolean },
) {
	const scope = parseEnumArg(args.scope as string | undefined, "scope", [
		"project",
		"team",
		"global",
	] as const)

	if (!scope) {
		exitWithError(
			"missing_scope",
			"--scope is required in non-interactive mode (project, team, global)",
			flags,
		)
	}

	if (args["api-key"] && scope !== "project") {
		exitWithError(
			"invalid_flag",
			"--api-key is only valid with --scope project (cannot commit secrets)",
			flags,
		)
	}
	if (
		(args.output || args["api-url"] || args["console-url"]) &&
		scope !== "global"
	) {
		exitWithError(
			"invalid_flag",
			"--output, --api-url, and --console-url are only valid with --scope global",
			flags,
		)
	}

	if (scope === "project") {
		const existing = readProjectConfig()
		const updates: { tag?: string; apiKey?: string } = {}

		if (args.tag) updates.tag = args.tag as string
		if (args["api-key"]) {
			const config = resolveConfig()
			try {
				await validateApiKey(args["api-key"] as string, config.apiUrl)
			} catch {
				exitWithError("invalid_api_key", "API key validation failed.", flags)
			}
			updates.apiKey = args["api-key"] as string
		}

		writeProjectConfig({ ...existing, ...updates })

		const projectDir = getProjectConfigPath()
		output(
			{ scope: "project", ...updates, path: projectDir },
			() => {
				const lines = [`${chalk.green("✓")} Configured (project scope)`]
				if (updates.tag) lines.push(`  Tag: ${updates.tag}`)
				if (updates.apiKey) lines.push("  API Key: updated")
				lines.push(`  Saved to ${chalk.dim(projectDir)}`)
				return lines.join("\n")
			},
			flags,
		)
	} else if (scope === "team") {
		const gitRoot = findGitRoot()
		if (!gitRoot) {
			exitWithError(
				"not_git_repo",
				"Not in a git repository. Team config requires a git repo.",
				flags,
			)
		}

		const existing = readTeamConfig()
		if (existing && !args.tag && !args["api-key"]) {
			exitWithError(
				"already_initialized",
				"Team config already exists. Use `supermemory config set` to update, or pass flags to override.",
				flags,
			)
		}

		const updates: { tag?: string } = {}
		if (args.tag) updates.tag = args.tag as string

		if (existing) {
			updateTeamConfig(updates)
		} else {
			initTeamConfig(updates)
		}

		const configPath = `${gitRoot}/.supermemory/config.json`
		output(
			{ scope: "team", ...updates, path: configPath },
			() => {
				const lines = [`${chalk.green("✓")} Configured (team scope)`]
				if (updates.tag) lines.push(`  Tag: ${updates.tag}`)
				lines.push(`  Saved to ${chalk.dim(configPath)}`)
				return lines.join("\n")
			},
			flags,
		)
	} else {
		const updates: Record<string, string> = {}
		if (args.output) {
			parseEnumArg(args.output as string, "output", [
				"auto",
				"json",
				"human",
			] as const)
			updates.output = args.output as string
		}
		if (args["api-url"]) updates.apiUrl = args["api-url"] as string
		if (args["console-url"]) updates.consoleUrl = args["console-url"] as string

		updateUserConfig(updates)

		output(
			{ scope: "global", ...updates, path: "~/.supermemory/config.json" },
			() => {
				const lines = [`${chalk.green("✓")} Configured (global scope)`]
				if (updates.output) lines.push(`  Output: ${updates.output}`)
				if (updates.apiUrl) lines.push(`  API URL: ${updates.apiUrl}`)
				if (updates.consoleUrl)
					lines.push(`  Console URL: ${updates.consoleUrl}`)
				lines.push(`  Saved to ${chalk.dim("~/.supermemory/config.json")}`)
				return lines.join("\n")
			},
			flags,
		)
	}
}

function getProjectConfigPath(): string {
	return join(getProjectDir(), "config.json")
}
