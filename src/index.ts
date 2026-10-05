// Public entry point (hand-written). Everything under ./generated is produced
// by scripts/generate.ts from fern/ — edit fern/overlay.yaml, not generated code.
import { SupermemoryClient } from "./generated/Client.js";

// Request/response types and per-status error classes (NotFoundError, …).
export * from "./generated/api/index.js";
export type { BaseClientOptions, BaseRequestOptions } from "./generated/BaseClient.js";
export { SupermemoryEnvironment } from "./generated/environments.js";
export { SupermemoryError, SupermemoryTimeoutError } from "./generated/errors/index.js";
export * from "./generated/core/exports.js";

// `new Supermemory({ apiKey })`, plus `import Supermemory from "supermemory"`.
export { SupermemoryClient as Supermemory, SupermemoryClient };
export default SupermemoryClient;
