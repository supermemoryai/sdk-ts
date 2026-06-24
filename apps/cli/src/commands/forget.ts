import chalk from "chalk"
import { apiRequest } from "../lib/api.js"
import { defineCliCommand } from "../lib/command.js"
import { ValidationError } from "../lib/errors.js"
import { exitWithError, output } from "../lib/output.js"

export const forgetCommand = defineCliCommand({
	meta: {
		name: "forget",
		description: "Forget a specific memory",
	},
	args: {
		id: {
			type: "positional",
			description: "Memory ID",
			required: false,
		},
		tag: {
			type: "string",
			description: "Container tag (required)",
		},
		reason: {
			type: "string",
			description: "Reason for forgetting",
		},
		content: {
			type: "string",
			description: "Find and forget by content match (instead of ID)",
		},
	},
	async handler({ args, flags, config, span }) {
		const tag = (args.tag as string) ?? config.tag
		if (!tag) {
			throw new ValidationError("Container tag required. Use --tag <name>")
		}

		if (!args.id && !args.content) {
			exitWithError(
				"validation_error",
				"Either a memory ID or --content is required",
				flags,
			)
		}

		const body: Record<string, unknown> = {}
		body.containerTag = tag
		if (args.id) body.id = args.id
		if (args.reason) body.reason = args.reason
		if (args.content) body.content = args.content

		span.setAttribute("memoryId", (args.id as string) ?? "content-match")

		const { data } = await apiRequest<{
			success: boolean
			id?: string
		}>("/v4/memories", {
			method: "DELETE",
			body,
		})

		output(
			data,
			() =>
				`${chalk.green("✓")} Forgot memory ${chalk.dim(args.id ?? "(by content)")}`,
			flags,
		)
	},
})
