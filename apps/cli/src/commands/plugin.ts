import { spawn, spawnSync } from "node:child_process"
import {
	cpSync,
	existsSync,
	mkdirSync,
	mkdtempSync,
	rmSync,
} from "node:fs"
import { homedir, tmpdir } from "node:os"
import { dirname, extname, join } from "node:path"
import * as clack from "@clack/prompts"
import chalk from "chalk"
import { defineCliCommand } from "../lib/command.js"
import { isInputInteractive, isInteractive } from "../lib/output.js"

type PluginId = "claude" | "cursor" | "opencode" | "codex"
type InstallMode = "all" | "custom"

type InstallStatus = "planned" | "installed" | "skipped" | "failed"

interface PluginTarget {
	id: PluginId
	label: string
	hint: string
	commands: string[]
	paths: string[]
}

interface Detection {
	available: boolean
	reasons: string[]
}

interface OptionDisplay {
	label: string
	hint: string
}

interface InstallResult {
	id: PluginId
	label: string
	status: InstallStatus
	message: string
	steps: string[]
	log?: string
}


class CommandError extends Error {
	constructor(
		message: string,
		readonly log?: string,
	) {
		super(message)
	}
}

const CURSOR_PLUGIN_TARGET = join(
	homedir(),
	".cursor",
	"plugins",
	"local",
	"cursor-supermemory",
)


function getCursorDetectionPaths(): string[] {
	const paths = [join(homedir(), ".cursor")]

	if (process.platform === "darwin") {
		paths.push("/Applications/Cursor.app")
		paths.push(join(homedir(), "Applications", "Cursor.app"))
	}

	return paths
}

const TARGETS: PluginTarget[] = [
	{
		id: "claude",
		label: "Claude Code",
		hint: "Installs the Supermemory Claude plugin through Claude Code",
		commands: ["claude"],
		paths: [],
	},
	{
		id: "cursor",
		label: "Cursor",
		hint: "Installs the local Cursor plugin bundle",
		commands: ["cursor", "agent"],
		paths: getCursorDetectionPaths(),
	},
	{
		id: "opencode",
		label: "OpenCode",
		hint: "Runs the OpenCode Supermemory installer",
		commands: ["opencode"],
		paths: [join(homedir(), ".config", "opencode")],
	},
	{
		id: "codex",
		label: "Codex",
		hint: "Runs the Codex Supermemory installer",
		commands: ["codex"],
		paths: [join(homedir(), ".codex")],
	},
]

const ALIASES: Record<string, PluginId> = {
	claude: "claude",
	"claude-code": "claude",
	cursor: "cursor",
	opencode: "opencode",
	"open-code": "opencode",
	codex: "codex",
}

function findCommand(command: string): string | null {
	const result =
		process.platform === "win32"
			? spawnSync("where.exe", [command], { encoding: "utf8" })
			: spawnSync("sh", ["-lc", `command -v ${command}`], {
					encoding: "utf8",
				})

	if (result.status !== 0) return null
	const candidates = result.stdout.split(/\r?\n/).filter(Boolean)

	if (process.platform !== "win32") return candidates[0] ?? null

	const runnableExtensions = new Set([".cmd", ".exe", ".bat", ".com"])
	const runnableCandidate = candidates.find((candidate) =>
		runnableExtensions.has(extname(candidate).toLowerCase()),
	)
	if (runnableCandidate) return runnableCandidate

	for (const candidate of candidates) {
		if (extname(candidate)) return candidate
		for (const extension of runnableExtensions) {
			const expanded = `${candidate}${extension}`
			if (existsSync(expanded)) return expanded
		}
	}

	return null
}

function commandExists(command: string): boolean {
	return findCommand(command) !== null
}

function detectTarget(target: PluginTarget): Detection {
	const reasons: string[] = []

	for (const command of target.commands) {
		if (commandExists(command)) {
			reasons.push(`${command} on PATH`)
			break
		}
	}

	for (const path of target.paths) {
		if (existsSync(path)) {
			reasons.push(path)
			break
		}
	}

	return {
		available: reasons.length > 0,
		reasons,
	}
}

function splitDetectionReasons(reasons: string[]): {
	commands: string[]
	hasLocalConfig: boolean
} {
	const commands: string[] = []
	let hasLocalConfig = false
	for (const reason of reasons) {
		if (reason.endsWith(" on PATH")) {
			commands.push(reason.replace(" on PATH", ""))
		} else {
			hasLocalConfig = true
		}
	}
	return { commands, hasLocalConfig }
}

function formatOptionDisplay(
	target: PluginTarget,
	detection: Detection | undefined,
): OptionDisplay {
	if (detection?.available) {
		return {
			label: `${target.label} ${chalk.green("[ready]")}`,
			hint: target.hint,
		}
	}

	const expected = [
		...target.commands.map((command) => `${command} on PATH`),
		target.paths.length > 0 ? "local app config" : null,
	]
		.filter((source): source is string => Boolean(source))
		.join(" or ")

	return {
		label: `${target.label} ${chalk.red("[missing]")}`,
		hint: expected
			? `Expected ${expected}`
			: "Required CLI was not found on PATH",
	}
}

function formatDetectionSource(detection: Detection): string {
	const { commands, hasLocalConfig } = splitDetectionReasons(detection.reasons)
	const sources = [
		commands.length > 0 ? `command ${commands.join(", ")}` : null,
		hasLocalConfig ? "local config" : null,
	]
		.filter((source): source is string => Boolean(source))
		.join(" or ")

	return sources || "detected"
}

function printDetectionSummary(detections: Map<PluginId, Detection>) {
	process.stderr.write(`  ${chalk.bold("Detected integrations:")}\n`)
	for (const target of TARGETS) {
		const detection = detections.get(target.id)
		if (detection?.available) {
			process.stderr.write(
				`    ${chalk.green("[ready]")} ${chalk.bold(target.label)} ${chalk.dim(formatDetectionSource(detection))}\n`,
			)
		} else {
			process.stderr.write(
				`    ${chalk.red("[missing]")} ${chalk.bold(target.label)} ${chalk.dim("not detected")}\n`,
			)
		}
	}
	process.stderr.write("\n")
}

function parseOnly(value: unknown): PluginId[] {
	if (!value || typeof value !== "string") return []
	const ids: PluginId[] = []
	const unknown: string[] = []

	for (const raw of value.split(",")) {
		const key = raw.trim().toLowerCase()
		if (!key) continue
		const id = ALIASES[key]
		if (!id) {
			unknown.push(raw.trim())
			continue
		}
		if (!ids.includes(id)) ids.push(id)
	}

	if (unknown.length > 0) {
		throw new Error(
			`Unknown plugin selection: ${unknown.join(", ")}. Use claude, cursor, opencode, or codex.`,
		)
	}

	return ids
}

function quoteWindowsArg(value: string): string {
	if (!/[ \t"&|<>^]/.test(value)) return value
	return `"${value.replace(/"/g, '""')}"`
}

function trimLog(stdout: string, stderr: string): string | undefined {
	const combined = `${stdout}${stderr ? `\n${stderr}` : ""}`.trim()
	if (!combined) return undefined
	const lines = combined.split(/\r?\n/)
	return lines.slice(Math.max(0, lines.length - 20)).join("\n")
}

function runProcess(
	command: string,
	args: string[],
): Promise<string | undefined> {
	return new Promise((resolve, reject) => {
		const resolvedCommand = findCommand(command) ?? command
		const useCmd =
			process.platform === "win32" &&
			[".cmd", ".bat"].includes(extname(resolvedCommand).toLowerCase())

		const child = useCmd
			? spawn(
					process.env.ComSpec ?? "cmd.exe",
					[
						"/d",
						"/s",
						"/c",
						[quoteWindowsArg(command), ...args.map(quoteWindowsArg)].join(" "),
					],
					{ stdio: ["ignore", "pipe", "pipe"] },
				)
			: spawn(resolvedCommand, args, { stdio: ["ignore", "pipe", "pipe"] })

		let stdout = ""
		let stderr = ""
		child.stdout?.on("data", (chunk) => {
			stdout += chunk.toString()
		})
		child.stderr?.on("data", (chunk) => {
			stderr += chunk.toString()
		})

		child.on("error", (err) => {
			reject(err)
		})

		child.on("close", (code) => {
			if (code === 0) {
				resolve(trimLog(stdout, stderr))
			} else {
				const log = trimLog(stdout, stderr)
				const message = `${command} ${args.join(" ")} exited with ${code}`
				reject(new CommandError(message, log))
			}
		})
	})
}

function formatStep(command: string, args: string[]): string {
	return [command, ...args].join(" ")
}

async function installCursorPlugin(dryRun: boolean): Promise<string[]> {
	const steps = [
		"npm install cursor-supermemory@latest into a temporary directory",
		"copy cursor-supermemory package files into Cursor's local plugin directory",
	]

	if (dryRun) return steps

	const tempDir = mkdtempSync(join(tmpdir(), "supermemory-cursor-plugin-"))
	try {
		await runProcess("npm", [
			"install",
			"cursor-supermemory@latest",
			"--omit=dev",
			"--ignore-scripts",
			"--no-audit",
			"--no-fund",
			"--prefix",
			tempDir,
		])

		const packageDir = join(tempDir, "node_modules", "cursor-supermemory")
		if (!existsSync(join(packageDir, ".cursor-plugin", "plugin.json"))) {
			throw new Error(
				"Downloaded cursor-supermemory package is missing .cursor-plugin/plugin.json",
			)
		}

		mkdirSync(dirname(CURSOR_PLUGIN_TARGET), { recursive: true })
		rmSync(CURSOR_PLUGIN_TARGET, { recursive: true, force: true })
		cpSync(packageDir, CURSOR_PLUGIN_TARGET, { recursive: true })
	} finally {
		rmSync(tempDir, { recursive: true, force: true })
	}

	return steps
}

function installLine(target: PluginTarget): string {
	switch (target.id) {
		case "claude":
			return "Threading Supermemory into Claude Code..."
		case "cursor":
			return "Packing memories into Cursor's local plugin shelf..."
		case "opencode":
			return "Teaching OpenCode where the memory lives..."
		case "codex":
			return "Wiring Codex into the Supermemory recall loop..."
	}
}

async function installTarget(
	target: PluginTarget,
	dryRun: boolean,
): Promise<InstallResult> {
	const steps: string[] = []
	const spinner = !dryRun && isInteractive() ? clack.spinner() : null

	try {
		spinner?.start(installLine(target))
		let log: string | undefined

		if (target.id === "claude") {
			const addMarketplace = [
				"plugin",
				"marketplace",
				"add",
				"supermemoryai/claude-supermemory",
			]
			const installPlugin = [
				"plugin",
				"install",
				"supermemory@supermemory-plugins",
				"--scope",
				"user",
			]
			steps.push(formatStep("claude", addMarketplace))
			steps.push(formatStep("claude", installPlugin))
			if (!dryRun) {
				log = await runProcess("claude", addMarketplace)
				log = (await runProcess("claude", installPlugin)) ?? log
			}
		}

		if (target.id === "cursor") {
			steps.push(...(await installCursorPlugin(dryRun)))
		}

		if (target.id === "opencode") {
			const args = ["-y", "opencode-supermemory@latest", "install", "--no-tui"]
			steps.push(formatStep("npx", args))
			if (!dryRun) log = (await runProcess("npx", args)) ?? log
		}

		if (target.id === "codex") {
			const args = ["-y", "codex-supermemory@latest", "install"]
			steps.push(formatStep("npx", args))
			if (!dryRun) log = (await runProcess("npx", args)) ?? log
		}

		spinner?.stop(`${target.label} installed`)

		return {
			id: target.id,
			label: target.label,
			status: dryRun ? "planned" : "installed",
			message:
				target.id === "cursor"
					? `Cursor plugin ${dryRun ? "would be installed" : "installed"}. Restart Cursor or run Developer: Reload Window.`
					: `${target.label} ${dryRun ? "install planned" : "install complete"}.`,
			steps,
			log,
		}
	} catch (err) {
		spinner?.stop(`${target.label} failed`)
		return {
			id: target.id,
			label: target.label,
			status: "failed",
			message: err instanceof Error ? err.message : String(err),
			steps,
			log: err instanceof CommandError ? err.log : undefined,
		}
	}
}

function printHumanSummary(results: InstallResult[], dryRun: boolean) {
	const title = dryRun
		? "Supermemory plugin install plan"
		: "Supermemory plugin install summary"
	process.stdout.write(`\n${chalk.bold(title)}\n\n`)

	if (results.length === 0) {
		process.stdout.write(
			`${chalk.yellow("[skip]")} No ready integrations were detected.\n`,
		)
		process.stdout.write(
			`  ${chalk.dim("Install a supported coding agent, or rerun with --only <target> --force.")}\n\n`,
		)
		return
	}

	for (const result of results) {
		const icon =
			result.status === "installed"
				? chalk.green("[ok]")
				: result.status === "planned"
					? chalk.cyan("[plan]")
					: result.status === "skipped"
						? chalk.yellow("[skip]")
						: chalk.red("[fail]")

		process.stdout.write(
			`${icon} ${chalk.bold(result.label)}: ${result.message}\n`,
		)
		for (const step of result.steps) {
			process.stdout.write(`  ${chalk.dim(step)}\n`)
		}
		if (result.log && result.status === "failed") {
			process.stdout.write(`  ${chalk.dim("Last output:")}\n`)
			for (const line of result.log.split(/\r?\n/)) {
				process.stdout.write(`  ${chalk.dim(line)}\n`)
			}
		}
		process.stdout.write("\n")
	}

	if (results.some((r) => r.id === "claude" && r.status !== "skipped")) {
		process.stdout.write(
			`  ${chalk.dim("Claude reload:")} run ${chalk.bold("/reload-plugins")} inside any already-open Claude Code session.\n\n`,
		)
	}
}

function getReadyTargetIds(detections: Map<PluginId, Detection>): PluginId[] {
	return TARGETS.filter((target) => detections.get(target.id)?.available).map(
		(target) => target.id,
	)
}

async function chooseTargetsInteractively(
	detections: Map<PluginId, Detection>,
): Promise<PluginId[]> {
	process.stderr.write("\n")
	printDetectionSummary(detections)
	process.stderr.write(
		`  ${chalk.dim("tip: use Up/Down to move, Enter to confirm")}\n`,
	)
	process.stderr.write(
		`  ${chalk.dim("tip: custom selection uses Space to toggle, Esc to return to install mode")}\n`,
	)
	process.stderr.write(
		`  ${chalk.dim("tip: scripts can use")} supermemory plugin --all\n\n`,
	)

	const readyIds = getReadyTargetIds(detections)
	const modeOptions: { value: InstallMode; label: string; hint?: string }[] = [
		{
			value: "custom",
			label: "Custom selection",
			hint: "pick plugins with Space",
		},
	]

	if (readyIds.length > 0) {
		modeOptions.unshift({
			value: "all",
			label: chalk.cyan("Install all ready integrations"),
			hint: `${readyIds.length} ready`,
		})
	}

	const mode = await clack.select({
		message: "Install mode",
		options: modeOptions,
	})

	if (clack.isCancel(mode)) {
		clack.cancel("Install cancelled.")
		process.exit(0)
	}

	if (mode === "all") return readyIds

	const selected = await clack.multiselect({
		message: "Choose integrations to install",
		required: true,
		options: TARGETS.map((target) => {
			const display = formatOptionDisplay(target, detections.get(target.id))
			return {
				value: target.id,
				label: display.label,
				hint: display.hint,
			}
		}),
	})

	if (clack.isCancel(selected)) {
		return chooseTargetsInteractively(detections)
	}

	return selected.filter((id): id is PluginId => id in ALIASES)
}

export const pluginCommand = defineCliCommand({
	meta: {
		name: "plugin",
		description:
			"Install Supermemory integrations for Claude Code, Cursor, OpenCode, and Codex",
	},
	noSpan: true,
	args: {
		all: {
			type: "boolean",
			description: "Install every detected plugin target",
			default: false,
		},
		only: {
			type: "string",
			description: "Comma-separated targets: claude,cursor,opencode,codex",
		},
		"dry-run": {
			type: "boolean",
			description: "Show what would run without installing anything",
			default: false,
		},
		force: {
			type: "boolean",
			description:
				"Run selected installers even when the target app is not detected",
			default: false,
		},
	},
	async handler({ args, flags }) {
		const dryRun = args["dry-run"] === true
		const force = args.force === true
		const detections = new Map<PluginId, Detection>(
			TARGETS.map((target) => [target.id, detectTarget(target)]),
		)

		if (flags.json && !dryRun) {
			throw new Error("--json is only supported with --dry-run for plugin")
		}

		let selectedIds = parseOnly(args.only)
		if (args.all === true) {
			selectedIds = TARGETS.filter(
				(target) => force || detections.get(target.id)?.available,
			).map((target) => target.id)
		}

		if (selectedIds.length === 0 && args.all !== true) {
			if (!isInputInteractive()) {
				throw new Error(
					"Choose targets with --all or --only claude,cursor,opencode,codex",
				)
			}
			selectedIds = await chooseTargetsInteractively(detections)
		}

		const results: InstallResult[] = []
		for (const id of selectedIds) {
			const target = TARGETS.find((candidate) => candidate.id === id)
			if (!target) continue

			const detection = detections.get(id)
			if (!force && !detection?.available) {
				results.push({
					id,
					label: target.label,
					status: "skipped",
					message:
						"not detected on this machine; use --force to install anyway",
					steps: [],
				})
				continue
			}

			results.push(await installTarget(target, dryRun))
		}

		if (flags.json) {
			process.stdout.write(`${JSON.stringify({ results }, null, 2)}\n`)
		} else {
			printHumanSummary(results, dryRun)
		}

		if (results.some((result) => result.status === "failed")) {
			process.exitCode = 1
		}
	},
})
