import chalk from "chalk"
import { apiRequest } from "../lib/api.js"
import { defineCliCommand } from "../lib/command.js"
import { ValidationError } from "../lib/errors.js"
import { output } from "../lib/output.js"
import { parseJsonArg } from "../lib/validators.js"

export const rememberCommand = defineCliCommand({
	meta: {
		name: "remember",
		description: "Store a specific memory directly into a container tag",
	},
	args: {
		content: {
			type: "positional",
			description: "Memory content text",
			required: true,
		},
		tag: {
			type: "string",
			description: "Container tag",
		},
		static: {
			type: "boolean",
			description: "Mark as permanent/static memory (long-term fact)",
			default: false,
		},
		metadata: {
			type: "string",
			description: "JSON metadata to attach",
		},
	},
	async handler({ args, flags, config, span }) {
		const containerTag = (args.tag as string) ?? config.tag
		if (!containerTag) {
			throw new ValidationError("Container tag required. Use --tag <name>")
		}

		const memory: Record<string, unknown> = {
			content: args.content,
		}

		if (args.static) memory.isStatic = true

		const metadata = parseJsonArg(
			args.metadata as string | undefined,
			"metadata",
		)
		if (metadata) memory.metadata = metadata

		const { data } = await apiRequest<{
			documentId: string | null
			memories: {
				id: string
				memory: string
				isStatic: boolean
				createdAt: string
			}[]
		}>("/v4/memories", {
			method: "POST",
			body: {
				memories: [memory],
				containerTag,
			},
		})

		const created = data.memories[0]
		span.setAttribute("memoryId", created?.id ?? "")

		output(
			data,
			() => {
				if (!created) return `${chalk.green("✓")} Memory stored`
				const lines = [
					`${chalk.green("✓")} Remembered ${chalk.dim(created.id)}${created.isStatic ? chalk.dim(" (static)") : ""}`,
					`  Tag: ${containerTag}`,
				]
				return lines.join("\n")
			},
			flags,
		)
	},
})
