import chalk from "chalk"
import { apiRequest } from "../lib/api.js"
import { defineCliCommand } from "../lib/command.js"
import { ValidationError } from "../lib/errors.js"
import { output } from "../lib/output.js"
import { parseJsonArg } from "../lib/validators.js"

export const updateCommand = defineCliCommand({
	meta: {
		name: "update",
		description: "Update an existing memory",
	},
	args: {
		id: {
			type: "positional",
			description: "Memory ID",
			required: true,
		},
		content: {
			type: "positional",
			description: "New content text",
			required: true,
		},
		tag: {
			type: "string",
			description: "Container tag",
		},
		metadata: {
			type: "string",
			description: "Updated metadata (JSON)",
		},
		reason: {
			type: "string",
			description: "Reason for update (creates version chain)",
		},
	},
	async handler({ args, flags, config }) {
		const tag = (args.tag as string) ?? config.tag
		if (!tag) {
			throw new ValidationError("Container tag required. Use --tag <name>")
		}

		const body: Record<string, unknown> = {
			id: args.id,
			newContent: args.content,
		}

		body.containerTag = tag
		if (args.reason) body.reason = args.reason

		const metadata = parseJsonArg(
			args.metadata as string | undefined,
			"metadata",
		)
		if (metadata) body.metadata = metadata

		const { data } = await apiRequest<{
			id: string
			content: string
			version?: number
			parentId?: string
			rootId?: string
		}>("/v4/memories", {
			method: "PATCH",
			body,
		})

		output(
			data,
			() => {
				const lines = [
					`${chalk.green("✓")} Updated memory ${chalk.dim(data.id)}`,
				]
				if (data.version) {
					lines.push(
						`  Version: ${data.version}${data.parentId ? ` (parent: ${chalk.dim(data.parentId)})` : ""}`,
					)
				}
				return lines.join("\n")
			},
			flags,
		)
	},
})
