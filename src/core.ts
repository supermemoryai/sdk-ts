/*
 * A minimal client for the standalone functions in ./funcs, e.g.
 * `import { search } from "supermemory/funcs/search.js"`.
 */

import { ClientSDK } from "./lib/sdks.js";

/**
 * A minimal client to use when calling standalone SDK functions. Typically, an
 * instance of this class would be instantiated once at the start of an
 * application and passed around through some dependency injection mechanism to
 * parts of an application that need to make SDK calls.
 */
export class SupermemoryCore extends ClientSDK {}
