import chalk from "chalk"
import { apiRequest } from "../lib/api.js"
import { defineCliCommand } from "../lib/command.js"
import { ValidationError } from "../lib/errors.js"
import { formatRelativeTime, output } from "../lib/output.js"
import {
	parseEnumArg,
	parseFloatArg,
	parseIntArg,
	parseJsonArg,
} from "../lib/validators.js"

export const searchCommand = defineCliCommand({
	meta: {
		name: "search",
		description: "Search memories in a container tag",
	},
	args: {
		query: {
			type: "positional",
			description: "Search query text",
			required: true,
		},
		tag: {
			type: "string",
			description: "Filter by container tag",
		},
		limit: {
			type: "string",
			description: "Max results (default: 10)",
		},
		threshold: {
			type: "string",
			description: "Similarity threshold 0-1 (default: 0.6)",
		},
		rerank: {
			type: "boolean",
			description: "Enable reranking for better accuracy",
			default: false,
		},
		rewrite: {
			type: "boolean",
			description: "Rewrite query for better retrieval",
			default: false,
		},
		mode: {
			type: "string",
			description:
				"Search mode: memories, hybrid, or documents (default: memories)",
		},
		include: {
			type: "string",
			description:
				"Comma-separated: summaries,documents,relatedMemories,forgottenMemories",
		},
		filter: {
			type: "string",
			description: "Metadata filter (JSON)",
		},
	},
	async handler({ args, flags, config, span }) {
		const tag = (args.tag as string) ?? config.tag
		if (!tag) {
			throw new ValidationError("Container tag required. Use --tag <name>")
		}

		const body: Record<string, unknown> = {
			q: args.query,
		}

		body.containerTag = tag
		body.limit = parseIntArg(args.limit as string | undefined, "limit", {
			min: 1,
			max: 100,
		})
		body.threshold = parseFloatArg(
			args.threshold as string | undefined,
			"threshold",
			{ min: 0, max: 1 },
		)
		if (args.rerank) body.rerank = true
		if (args.rewrite) body.rewriteQuery = true
		body.searchMode = parseEnumArg(args.mode as string | undefined, "mode", [
			"memories",
			"hybrid",
			"documents",
		] as const)

		if (args.include) {
			const validFields = [
				"summaries",
				"documents",
				"relatedMemories",
				"forgottenMemories",
			] as const
			const fields = (args.include as string).split(",").map((s) => s.trim())
			const include: Record<string, boolean> = {}
			for (const f of fields) {
				if ((validFields as readonly string[]).includes(f)) {
					include[f] = true
				}
			}
			body.include = include
		}

		const filter = parseJsonArg(args.filter as string | undefined, "filter")
		if (filter) body.filters = filter

		const start = Date.now()
		const { data } = await apiRequest<{
			results: {
				id: string
				memory?: string
				chunk?: string
				resultType: "memory" | "chunk"
				similarity: number
				updatedAt: string
				metadata: Record<string, unknown> | null
				version?: number | null
				rootMemoryId?: string | null
				context?: {
					parents: {
						relation: string
						memory: string
						updatedAt: string
					}[]
					children: {
						relation: string
						memory: string
						updatedAt: string
					}[]
				}
				documents?: {
					id: string
					title?: string
					type?: string
					summary?: string | null
				}[]
				chunks?: {
					content: string
					score: number
					position: number
					documentId: string
				}[]
			}[]
			timing: number
			total: number
		}>("/v4/search", {
			method: "POST",
			body,
		})

		const timing = Date.now() - start
		span.setAttribute("resultCount", data.results?.length ?? 0)
		span.setAttribute("latencyMs", timing)

		output(
			{ ...data, clientTiming: timing },
			() => {
				const results = data.results ?? []
				if (results.length === 0) {
					return "  No results found."
				}

				const header = `  ${results.length} result${results.length === 1 ? "" : "s"} ${chalk.dim(`(${data.timing ?? timing}ms)`)}`
				const items = results.map((r) => {
					const lines: string[] = []

					const displayText = r.memory ?? r.chunk ?? r.id
					lines.push(`"${displayText}"`)

					if (r.memory && r.chunk) {
						lines.push(`     ${chalk.dim("chunk:")} ${r.chunk}`)
					}

					const meta = [`Score: ${chalk.bold(r.similarity.toFixed(2))}`]
					if (r.resultType === "chunk") meta.push("chunk")
					if (r.version) meta.push(`v${r.version}`)
					if (r.updatedAt)
						meta.push(`Updated: ${formatRelativeTime(r.updatedAt)}`)

					if (r.documents?.length) {
						meta.push(
							`${r.documents.length} doc${r.documents.length > 1 ? "s" : ""}`,
						)
					}

					lines.push(`     ${meta.join(` ${chalk.dim("·")} `)}`)

					return lines.join("\n")
				})

				const numbered = items
					.map((item, i) => `  ${chalk.dim(`${i + 1}.`)} ${item}`)
					.join("\n\n")

				const hints: string[] = []
				const firstWithDoc = results.find((r) => r.documents?.length)
				if (firstWithDoc?.documents?.[0]) {
					hints.push(
						`${chalk.dim("View source doc:")} supermemory docs get ${firstWithDoc.documents[0].id}`,
					)
				}
				hints.push(
					`${chalk.dim("Try hybrid mode:")} supermemory search "${args.query}" --tag ${tag} --mode hybrid`,
				)

				return `${header}\n\n${numbered}\n\n${hints.map((h) => `  ${h}`).join("\n")}`
			},
			flags,
		)
	},
})
