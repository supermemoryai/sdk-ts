import chalk from "chalk"
import { defineCommand, runCommand } from "citty"
import { apiRequest, getConfig } from "../lib/api.js"
import { defineCliCommand } from "../lib/command.js"
import { ValidationError } from "../lib/errors.js"
import {
	exitWithError,
	formatKeyValue,
	formatRelativeTime,
	formatTable,
	output,
	truncate,
} from "../lib/output.js"
import { confirm } from "../lib/prompt.js"
import { parseIntArg } from "../lib/validators.js"

const PIPELINE_STAGES = [
	"queued",
	"extracting",
	"chunking",
	"embedding",
	"indexing",
	"done",
] as const

const docsListCommand = defineCliCommand({
	meta: {
		name: "list",
		description: "List documents",
	},
	args: {
		tag: {
			type: "string",
			description: "Filter by container tag",
		},
		limit: {
			type: "string",
			description: "Max results (default: 20)",
		},
		page: {
			type: "string",
			description: "Page number for pagination",
		},
	},
	async handler({ args, flags }) {
		const explicitTag = args.tag as string | undefined
		const tag = explicitTag || getConfig().tag
		if (!tag) {
			throw new ValidationError(
				"Container tag is required. Use --tag <name> or set a default with: supermemory config set tag <name>",
			)
		}
		const tagSource = explicitTag ? "flag" : "config"

		const limit = parseIntArg(args.limit as string | undefined, "limit", {
			min: 1,
		})
		const page = parseIntArg(args.page as string | undefined, "page", {
			min: 1,
		})

		const { data } = await apiRequest<{
			documents: {
				id: string
				title?: string
				status: string
				createdAt: string
			}[]
			pagination: {
				currentPage: number
				totalPages: number
				totalItems: number
			}
		}>("/v3/documents/documents", {
			method: "POST",
			body: {
				containerTags: [tag],
				page,
				limit,
				sort: "updatedAt",
				order: "desc",
			},
		})

		output(
			data,
			() => {
				const tagLabel = `  ${chalk.dim("Container tag:")} ${chalk.bold(tag)} ${chalk.dim(`(from ${tagSource})`)}`
				const results = data.documents ?? []
				if (results.length === 0) {
					const hints = [
						`${chalk.dim("Add content:")} supermemory add <url-or-text> --tag ${tag}`,
					]
					return `${tagLabel}\n\n  No documents found.\n\n${hints.map((h) => `  ${h}`).join("\n")}`
				}

				const table = formatTable(
					["ID", "TITLE", "STATUS", "CREATED"],
					results.map((doc) => {
						return [
							doc.id,
							truncate(doc.title ?? "", 40),
							doc.status,
							formatRelativeTime(doc.createdAt),
						]
					}),
				)

				const lines: string[] = [tagLabel, "", table]

				const { pagination } = data
				if (pagination && pagination.totalPages > 1) {
					lines.push(
						`\n  Page ${pagination.currentPage} of ${pagination.totalPages} (${pagination.totalItems} total)`,
					)
				}

				const hints: string[] = []
				if (pagination && pagination.currentPage < pagination.totalPages) {
					hints.push(
						`${chalk.dim("Next page:")} supermemory docs list --tag ${tag} --page ${pagination.currentPage + 1}`,
					)
				}
				const processing = results.find(
					(d) => d.status !== "done" && d.status !== "failed",
				)
				if (processing) {
					hints.push(
						`${chalk.dim("Check pipeline:")} supermemory docs status ${processing.id}`,
					)
				}
				hints.push(`${chalk.dim("View details:")} supermemory docs get <id>`)

				lines.push(`\n${hints.map((h) => `  ${h}`).join("\n")}`)
				return lines.join("\n")
			},
			flags,
		)
	},
})

const docsGetCommand = defineCliCommand({
	meta: {
		name: "get",
		description: "Get a document by ID",
	},
	args: {
		id: {
			type: "positional",
			description: "Document ID",
			required: true,
		},
	},
	async handler({ args, flags }) {
		const { data } = await apiRequest<{
			id: string
			title?: string
			status: string
			containerTag?: string
			content?: string
			createdAt: string
			updatedAt?: string
		}>(`/v3/documents/${args.id}`)

		output(
			data,
			() => {
				const contentPreview = data.content ? truncate(data.content, 200) : ""

				return formatKeyValue([
					["ID:", data.id],
					["Title:", data.title ?? ""],
					["Status:", data.status],
					["Container Tag:", data.containerTag ?? ""],
					["Content:", contentPreview],
					["Created:", formatRelativeTime(data.createdAt)],
					[
						"Updated:",
						data.updatedAt ? formatRelativeTime(data.updatedAt) : "",
					],
				])
			},
			flags,
		)
	},
})

const docsDeleteCommand = defineCliCommand({
	meta: {
		name: "delete",
		description: "Delete a document by ID",
	},
	args: {
		id: {
			type: "positional",
			description: "Document ID",
			required: true,
		},
		yes: {
			type: "boolean",
			description: "Skip confirmation",
			default: false,
		},
	},
	async handler({ args, flags, span }) {
		if (!args.yes) {
			const confirmed = await confirm(
				`${chalk.yellow("?")} Delete document ${chalk.bold(args.id as string)}? (y/N) `,
			)
			if (!confirmed) {
				exitWithError("cancelled", "Delete cancelled", flags)
			}
		}

		span.setAttribute("documentId", args.id as string)

		const { data } = await apiRequest<{
			success: boolean
			id?: string
		}>(`/v3/documents/${args.id}`, { method: "DELETE" })

		output(
			data,
			() =>
				`${chalk.green("\u2713")} Deleted document ${chalk.dim(args.id as string)}`,
			flags,
		)
	},
})

const docsChunksCommand = defineCliCommand({
	meta: {
		name: "chunks",
		description: "List chunks for a document",
	},
	args: {
		id: {
			type: "positional",
			description: "Document ID",
			required: true,
		},
	},
	async handler({ args, flags }) {
		const { data } = await apiRequest<{
			chunks: {
				index: number
				content: string
			}[]
		}>(`/v3/documents/${args.id}/chunks`)

		output(
			data,
			() => {
				const chunks = data.chunks ?? []
				if (chunks.length === 0) {
					return "  No chunks found."
				}

				return chunks
					.map((chunk) => {
						const preview = truncate(chunk.content, 100)
						return `  ${chalk.dim(`${chunk.index}.`)} ${preview}`
					})
					.join("\n\n")
			},
			flags,
		)
	},
})

const docsStatusCommand = defineCliCommand({
	meta: {
		name: "status",
		description: "Show document pipeline status",
	},
	args: {
		id: {
			type: "positional",
			description: "Document ID",
			required: true,
		},
	},
	async handler({ args, flags }) {
		const { data } = await apiRequest<{
			id: string
			status: string
		}>(`/v3/documents/${args.id}`)

		const isFailed = data.status === "failed"
		const isUnknown = data.status === "unknown"

		const currentIndex = PIPELINE_STAGES.indexOf(
			data.status as (typeof PIPELINE_STAGES)[number],
		)
		const progress = isFailed
			? 0
			: currentIndex >= 0
				? Math.round(((currentIndex + 1) / PIPELINE_STAGES.length) * 100)
				: 0

		output(
			{ id: data.id, status: data.status, progress },
			() => {
				if (isFailed) {
					const lines = PIPELINE_STAGES.map(
						(stage) => `  ${chalk.dim("\u25CB")} ${chalk.dim(stage)}`,
					)
					return `  Document ${chalk.bold(data.id)}\n\n${lines.join("\n")}\n\n  ${chalk.red("\u2717")} Processing failed`
				}

				if (isUnknown) {
					return `  Document ${chalk.bold(data.id)}\n\n  ${chalk.yellow("?")} Status unknown`
				}

				const lines = PIPELINE_STAGES.map((stage, i) => {
					if (i < currentIndex) {
						return `  ${chalk.green("\u2713")} ${stage}`
					}
					if (i === currentIndex) {
						return `  ${chalk.cyan("\u25B6")} ${chalk.bold(stage)}`
					}
					return `  ${chalk.dim("\u25CB")} ${chalk.dim(stage)}`
				})

				return `  Document ${chalk.bold(data.id)}\n\n${lines.join("\n")}`
			},
			flags,
		)
	},
})

export const docsCommand = defineCommand({
	meta: {
		name: "docs",
		description: "Manage documents",
	},
	subCommands: {
		list: docsListCommand,
		get: docsGetCommand,
		delete: docsDeleteCommand,
		chunks: docsChunksCommand,
		status: docsStatusCommand,
	},
	async run({ rawArgs }) {
		const sub = rawArgs.find((a: string) => !a.startsWith("-"))
		if (sub && ["list", "get", "delete", "chunks", "status"].includes(sub))
			return
		await runCommand(docsListCommand, { rawArgs })
		process.stderr.write(
			`\n  ${chalk.dim("Available commands: list, get, delete, chunks, status. Run supermemory docs --help for details.")}\n`,
		)
	},
})
