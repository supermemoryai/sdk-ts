import chalk from "chalk"
import { defineCommand, runCommand } from "citty"
import { apiRequest } from "../lib/api.js"
import { defineCliCommand } from "../lib/command.js"
import {
	EXIT,
	exitWithError,
	formatKeyValue,
	formatTable,
	output,
} from "../lib/output.js"
import { confirm } from "../lib/prompt.js"

const tagsListCommand = defineCliCommand({
	meta: {
		name: "list",
		description: "List all container tags",
	},
	async handler({ flags }) {
		const { data } = await apiRequest<
			{
				containerTag: string
				name?: string
				documentCount?: number
				memoryCount?: number
				lastActivityAt?: string
			}[]
		>("/v3/container-tags/list")

		output(
			data,
			() => {
				const tags = Array.isArray(data) ? data : []
				if (tags.length === 0) {
					const hints = [
						`${chalk.dim("Create tag:")} supermemory tags create <name>`,
					]
					return `  No container tags found.\n\n${hints.map((h) => `  ${h}`).join("\n")}`
				}
				const table = formatTable(
					["TAG", "DOCS", "MEMORIES", "LAST ACTIVITY"],
					tags.map((t) => [
						t.containerTag,
						String(t.documentCount ?? 0),
						String(t.memoryCount ?? 0),
						t.lastActivityAt
							? new Date(t.lastActivityAt).toLocaleDateString()
							: chalk.dim("never"),
					]),
				)

				const firstTag = tags[0]?.containerTag
				const hints = [
					`${chalk.dim("View docs:")} supermemory docs list --tag ${firstTag}`,
					`${chalk.dim("Tag details:")} supermemory tags info ${firstTag}`,
				]
				return `${table}\n\n${hints.map((h) => `  ${h}`).join("\n")}`
			},
			flags,
		)
	},
})

const tagsInfoCommand = defineCliCommand({
	meta: {
		name: "info",
		description: "Show details about a container tag",
	},
	args: {
		tag: {
			type: "positional",
			description: "Container tag",
			required: true,
		},
	},
	async handler({ args, flags }) {
		const { data } = await apiRequest<{
			containerTag: string
			name?: string
			documentCount?: number
			memoryCount?: number
			createdAt?: string
			lastActivityAt?: string
			context?: string
		}>(`/v3/container-tags/${encodeURIComponent(args.tag as string)}`)

		output(
			data,
			() =>
				formatKeyValue([
					["Tag:", data.containerTag],
					["Name:", data.name ?? chalk.dim("(none)")],
					["Documents:", String(data.documentCount ?? 0)],
					["Memories:", String(data.memoryCount ?? 0)],
					[
						"Created:",
						data.createdAt
							? new Date(data.createdAt).toLocaleDateString()
							: chalk.dim("unknown"),
					],
					[
						"Last Activity:",
						data.lastActivityAt
							? new Date(data.lastActivityAt).toLocaleDateString()
							: chalk.dim("never"),
					],
					["Context:", data.context ?? chalk.dim("(none)")],
				]),
			flags,
		)
	},
})

const tagsCreateCommand = defineCliCommand({
	meta: {
		name: "create",
		description: "Create a new container tag",
	},
	args: {
		tag: {
			type: "positional",
			description: "Container tag identifier",
			required: true,
		},
		name: {
			type: "string",
			description: "Human-readable name for the tag",
		},
	},
	async handler({ args, flags }) {
		const body: Record<string, unknown> = { entityContext: null }
		if (args.name) body.name = args.name

		const { data } = await apiRequest<{
			containerTag: string
			name?: string
		}>(`/v3/container-tags/${encodeURIComponent(args.tag as string)}`, {
			method: "PATCH",
			body,
		})

		output(
			data,
			() =>
				`${chalk.green("✓")} Created container tag ${chalk.bold(data.containerTag)}${data.name ? ` (${data.name})` : ""}`,
			flags,
		)
	},
})

const tagsDeleteCommand = defineCliCommand({
	meta: {
		name: "delete",
		description: "Delete a container tag",
	},
	args: {
		tag: {
			type: "positional",
			description: "Container tag to delete",
			required: true,
		},
		yes: {
			type: "boolean",
			description: "Skip confirmation prompt",
			default: false,
		},
	},
	async handler({ args, flags }) {
		if (!args.yes) {
			const confirmed = await confirm(
				`${chalk.yellow("⚠")} Delete container tag ${chalk.bold(args.tag as string)}? This cannot be undone. [y/N] `,
			)
			if (!confirmed) {
				exitWithError("cancelled", "Deletion cancelled.", flags, EXIT.SUCCESS)
			}
		}

		const { data } = await apiRequest<{ success: boolean }>(
			`/v3/container-tags/${encodeURIComponent(args.tag as string)}`,
			{ method: "DELETE" },
		)

		output(
			data,
			() =>
				`${chalk.green("✓")} Deleted container tag ${chalk.bold(args.tag as string)}`,
			flags,
		)
	},
})

const tagsContextCommand = defineCliCommand({
	meta: {
		name: "context",
		description: "Get or set entity context for a container tag",
	},
	args: {
		tag: {
			type: "positional",
			description: "Container tag",
			required: true,
		},
		set: {
			type: "string",
			description: "Set context to this text",
		},
		clear: {
			type: "boolean",
			description: "Clear the context",
			default: false,
		},
	},
	async handler({ args, flags }) {
		const endpoint = `/v3/container-tags/${encodeURIComponent(args.tag as string)}`

		if (args.clear) {
			const { data } = await apiRequest<{ containerTag: string }>(endpoint, {
				method: "PATCH",
				body: { entityContext: null },
			})

			output(
				data,
				() =>
					`${chalk.green("✓")} Cleared context for ${chalk.bold(args.tag as string)}`,
				flags,
			)
		} else if (args.set) {
			const { data } = await apiRequest<{
				containerTag: string
				entityContext?: string
			}>(endpoint, {
				method: "PATCH",
				body: { entityContext: args.set },
			})

			output(
				data,
				() =>
					`${chalk.green("✓")} Updated context for ${chalk.bold(args.tag as string)}`,
				flags,
			)
		} else {
			const { data } = await apiRequest<{
				containerTag: string
				entityContext?: string | null
			}>(endpoint)

			output(
				data,
				() => {
					if (!data.entityContext) {
						return `  No context set for ${chalk.bold(args.tag as string)}.`
					}
					return `  ${chalk.bold("Context for")} ${chalk.bold(args.tag as string)}:\n\n  ${data.entityContext}`
				},
				flags,
			)
		}
	},
})

const tagsMergeCommand = defineCliCommand({
	meta: {
		name: "merge",
		description: "Merge a source container tag into a target",
	},
	args: {
		source: {
			type: "positional",
			description: "Source container tag to merge from",
			required: true,
		},
		into: {
			type: "string",
			description: "Target container tag to merge into",
			required: true,
		},
	},
	async handler({ args, flags }) {
		if (!args.into) {
			exitWithError("validation_error", "--into <target> is required", flags)
		}

		const { data } = await apiRequest<{
			success: boolean
			mergedCount?: number
		}>("/v3/container-tags/merge", {
			method: "POST",
			body: {
				containerTags: [args.source as string, args.into as string],
				targetContainerTag: args.into,
			},
		})

		output(
			data,
			() =>
				`${chalk.green("✓")} Merged ${chalk.bold(args.source as string)} into ${chalk.bold(args.into as string)}${data.mergedCount != null ? ` (${data.mergedCount} items)` : ""}`,
			flags,
		)
	},
})

export const tagsCommand = defineCommand({
	meta: {
		name: "tags",
		description: "Manage container tags",
	},
	subCommands: {
		list: tagsListCommand,
		info: tagsInfoCommand,
		create: tagsCreateCommand,
		delete: tagsDeleteCommand,
		context: tagsContextCommand,
		merge: tagsMergeCommand,
	},
	async run({ rawArgs }) {
		const sub = rawArgs.find((a: string) => !a.startsWith("-"))
		if (
			sub &&
			["list", "info", "create", "delete", "context", "merge"].includes(sub)
		)
			return
		await runCommand(tagsListCommand, { rawArgs })
		process.stderr.write(
			`\n  ${chalk.dim("Available commands: list, info, create, delete, context, merge. Run supermemory tags --help for details.")}\n`,
		)
	},
})
