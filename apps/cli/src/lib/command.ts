import type { Span } from "@opentelemetry/api"
import { defineCommand } from "citty"
import { getConfig } from "./api.js"
import type { ResolvedConfig } from "./config.js"
import { withSpan } from "./otel.js"
import type { OutputFlags } from "./output.js"

const noopSpan = {
	setAttribute: () => noopSpan,
	setAttributes: () => noopSpan,
	addEvent: () => noopSpan,
	setStatus: () => noopSpan,
	updateName: () => noopSpan,
	end: () => {},
	isRecording: () => false,
	recordException: () => {},
	spanContext: () => ({ traceId: "", spanId: "", traceFlags: 0 }),
} as unknown as Span

export interface CommandContext {
	args: Record<string, unknown>
	flags: OutputFlags
	config: ResolvedConfig
	span: Span
}

export function defineCliCommand(options: {
	meta: { name: string; description: string }
	args?: Record<
		string,
		{
			type: string
			description?: string
			required?: boolean
			default?: unknown
		}
	>
	noSpan?: boolean
	handler: (ctx: CommandContext) => Promise<void>
}) {
	const allArgs = {
		...(options.args ?? {}),
		json: {
			type: "boolean" as const,
			description: "Force JSON output",
			default: false,
		},
	}

	return defineCommand({
		meta: options.meta,
		args: allArgs,
		async run({ args }) {
			const flags: OutputFlags = { json: args.json as boolean }
			const config = getConfig({
				tag: args.tag as string | undefined,
			})

			const runHandler = async (span: Span) => {
				await options.handler({
					args: args as Record<string, unknown>,
					flags,
					config,
					span,
				})
			}

			if (options.noSpan) {
				await runHandler(noopSpan)
			} else {
				await withSpan(
					"supermemory.command",
					{ commandName: options.meta.name },
					runHandler,
				)
			}
		},
	})
}
