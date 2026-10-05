/*
 * Public entry point. Same exports as 5.0.0-rc.5:
 *
 *   import Supermemory from "supermemory";
 *   import { Supermemory, HTTPClient, SDKOptions } from "supermemory";
 *
 * Models and errors live at "supermemory/models", "supermemory/models/operations"
 * and "supermemory/models/errors"; standalone functions at "supermemory/funcs/*".
 */

export * from "./lib/config.js";
export * as files from "./lib/files.js";
export { HTTPClient } from "./lib/http.js";
export type { Fetcher, HTTPClientOptions } from "./lib/http.js";
export * from "./sdk/sdk.js";

// Default export, as in the v4 (Stainless) SDK: `import Supermemory from "supermemory"`.
import { Supermemory } from "./sdk/sdk.js";
export default Supermemory;
