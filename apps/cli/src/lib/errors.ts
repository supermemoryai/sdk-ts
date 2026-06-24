import { EXIT } from "./output.js"

export class CliError extends Error {
	constructor(
		public code: string,
		message: string,
		public exitCode: number = EXIT.ERROR,
		public hint?: string,
	) {
		super(message)
		this.name = "CliError"
	}
}

export class AuthError extends CliError {
	constructor(message: string, hint?: string) {
		super(
			"not_authenticated",
			message,
			EXIT.AUTH_REQUIRED,
			hint ?? "Run `supermemory login` or check your API key",
		)
	}
}

export class PermissionError extends CliError {
	constructor(message: string, hint?: string) {
		super(
			"permission_denied",
			message,
			EXIT.PERMISSION_DENIED,
			hint ?? "This may require a full-access API key, not a scoped key",
		)
	}
}

export class NotFoundError extends CliError {
	constructor(message: string, hint?: string) {
		super(
			"not_found",
			message,
			EXIT.NOT_FOUND,
			hint ?? "Check the ID with `supermemory search <query>`",
		)
	}
}

export class ValidationError extends CliError {
	constructor(message: string, hint?: string) {
		super("validation_error", message, EXIT.ERROR, hint)
	}
}

export function httpErrorToCliError(
	status: number,
	body: { error?: string; message?: string } | null,
): CliError {
	const rawMessage = body?.message ?? body?.error
	const message =
		typeof rawMessage === "string"
			? rawMessage
			: rawMessage
				? JSON.stringify(rawMessage)
				: `HTTP ${status}`

	switch (status) {
		case 401:
			return new AuthError(message)
		case 403:
			return new PermissionError(message)
		case 404:
			return new NotFoundError(message)
		case 429:
			return new CliError(
				"rate_limited",
				message,
				EXIT.ERROR,
				"Rate limited. Wait a moment and try again",
			)
		default:
			return new CliError("api_error", message, EXIT.ERROR)
	}
}
