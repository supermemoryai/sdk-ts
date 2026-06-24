import chalk from "chalk"
import { openBrowser } from "../lib/browser.js"
import { defineCliCommand } from "../lib/command.js"
import { output } from "../lib/output.js"
import { parseEnumArg } from "../lib/validators.js"

const PAGES = [
	"console",
	"billing",
	"graph",
	"connectors",
	"settings",
	"docs",
	"keys",
	"team",
	"agents",
] as const

export const openCommand = defineCliCommand({
	meta: {
		name: "open",
		description: "Open the Supermemory console in your browser",
	},
	noSpan: true,
	args: {
		page: {
			type: "positional",
			description: `Page to open (${PAGES.join(", ")})`,
			required: false,
		},
		browser: {
			type: "boolean",
			description: "Open in browser (use --no-browser to print URL instead)",
			default: true,
		},
	},
	async handler({ args, flags, config }) {
		const page =
			parseEnumArg((args.page as string) ?? "console", "page", PAGES) ??
			"console"

		const path = page === "console" ? "" : `/${page}`
		const url = `${config.consoleUrl}${path}`

		if (!args.browser) {
			output({ url }, () => url, flags)
			return
		}

		await openBrowser(url)

		output(
			{ url },
			() => `${chalk.green("✓")} Opened ${chalk.bold(page)} in browser`,
			flags,
		)
	},
})
