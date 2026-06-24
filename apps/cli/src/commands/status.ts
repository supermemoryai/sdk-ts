import chalk from "chalk"
import { apiRequest } from "../lib/api.js"
import { defineCliCommand } from "../lib/command.js"
import { formatKeyValue, output } from "../lib/output.js"

const VALID_PERIODS = ["24h", "7d", "30d", "all"] as const
type Period = (typeof VALID_PERIODS)[number]

export const statusCommand = defineCliCommand({
	meta: {
		name: "status",
		description: "Show an overview dashboard of your organization",
	},
	args: {
		period: {
			type: "string",
			description: "Time period: 24h, 7d, 30d, all",
			default: "all",
		},
	},
	async handler({ args, flags }) {
		const period = (
			VALID_PERIODS.includes(args.period as Period) ? args.period : "all"
		) as Period

		const { data } = await apiRequest<{
			totalMemories: number
			searchQueries: number
			totalConnections: number
			memoriesGrowth: number
			searchGrowth: number
			connectionsGrowth: number
			totalMemoryEntries: number
			memoryEntriesGrowth: number
			totalContainerTags: number
			containerTagsGrowth: number
		}>("/v3/analytics/memory", { query: { period } })

		const periodLabel = period === "all" ? "all time" : `last ${period}`

		output(
			data,
			() => {
				const delta = (n?: number) =>
					n != null && n > 0 ? chalk.green(` ↑${n}`) : ""

				const lines: string[] = []

				lines.push(
					`  ${chalk.bold("Overview")} ${chalk.dim(`(${periodLabel})`)}`,
				)
				lines.push("")

				const pairs: [string, string][] = [
					[
						"Documents:",
						`${data.totalMemories ?? 0}${delta(data.memoriesGrowth)}`,
					],
					[
						"Memories:",
						`${data.totalMemoryEntries ?? 0}${delta(data.memoryEntriesGrowth)}`,
					],
					[
						"Searches:",
						`${data.searchQueries ?? 0}${delta(data.searchGrowth)}`,
					],
					[
						"Connectors:",
						`${data.totalConnections ?? 0}${delta(data.connectionsGrowth)}`,
					],
					[
						"Container Tags:",
						`${data.totalContainerTags ?? 0}${delta(data.containerTagsGrowth)}`,
					],
				]

				lines.push(formatKeyValue(pairs))
				lines.push("")
				lines.push(
					`  ${chalk.dim("Tip: supermemory status --period [24h|7d|30d|all]")}`,
				)

				return lines.join("\n")
			},
			flags,
		)
	},
})
