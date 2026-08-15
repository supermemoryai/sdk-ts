# Migrating from `supermemory` v4 to v5

Starting with **v5.0.0**, the `supermemory` TypeScript SDK is generated with
[Speakeasy](https://www.speakeasy.com) directly from the Supermemory OpenAPI
spec (v4 was generated with Stainless). The package name, install command, CLI,
resource groups, and method names are unchanged — most code migrates by
changing one import line.

```bash
bun i supermemory   # or npm/pnpm/yarn — same package as before
```

## TL;DR

| | v4 (Stainless) | v5 (Speakeasy) |
|---|---|---|
| Import | `import Supermemory from "supermemory"` | unchanged (named export also available) |
| Auth | `new Supermemory({ apiKey })` / `SUPERMEMORY_API_KEY` | unchanged |
| Method names | `client.add`, `documents.list`, … | unchanged except search: `client.search()` replaces the `search.*` namespace |
| Retries | on by default (2 retries) | **opt-in** via `retryConfig` |
| Timeout option | `timeout` (ms) | `timeoutMs` |
| Error classes | `BadRequestError`, `RateLimitError`, … per status | one `SupermemoryError` with `.statusCode` |
| Response validation | none | Zod-validated at runtime |
| CLI (`npx supermemory`) | bundled | still bundled, unchanged |

## 1. Imports — unchanged

Both import styles work in v5:

```ts
import Supermemory from "supermemory";     // v4 style — still works
import { Supermemory } from "supermemory"; // also available
```

Construction and authentication are unchanged:

```ts
const client = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"], // still the default env var
});
```

## 2. Method surface — unchanged, with two removed aliases

Every v4 resource and method keeps its exact name, including casing:

- `client.add(...)`, `client.profile(...)`
- `client.documents.{add→see below, list, get, update, delete, deleteBulk, uploadFile, batchAdd, listProcessing}`
- `client.memories.{forget, updateMemory}`
- `client.settings.{get, update}`
- `client.connections.{create, getByID, getByTag, deleteByID, deleteByProvider, import, list, listDocuments, configure, resources}`

**Search is restructured** — the `search` namespace is gone in favor of a
top-level method for the flagship memories recall:

| v4 call | Endpoint | v5 call |
|---|---|---|
| `client.search.memories(...)` | `POST /v4/search` | `client.search(...)` |
| `client.search.execute(...)` | `POST /v3/search` | `client.documents.search(...)` |
| `client.search.documents(...)` | `POST /v3/search` | `client.documents.search(...)` |

One other v4 alias collapsed into a single method:

| v4 call | v5 replacement |
|---|---|
| `client.documents.add(...)` | `client.add(...)` |

## 3. New in v5

New endpoints, grouped in the same style:

- `client.memories.{add, list, forgetMatching}`
- `client.settings.{reset, suggestBuckets}`
- `client.documents.{chunks, fileUrl}`
- `client.containerTags.{list, get, update, delete, merge, mergeStatus}`
- `client.conversations.add`
- `client.profiles.buckets`

Plus tree-shakeable standalone functions for every method (see
[FUNCTIONS.md](./FUNCTIONS.md)) — useful for browser and edge bundles.

## 4. Error handling

v4 threw a subclass per HTTP status (`BadRequestError`, `AuthenticationError`,
`RateLimitError`, …). v5 throws a single `SupermemoryError` base (with typed
subclasses for API error bodies) — branch on `statusCode` instead:

```ts
// v4
import Supermemory from "supermemory";
try {
  await client.search.execute({ q: "..." });
} catch (err) {
  if (err instanceof Supermemory.RateLimitError) { /* back off */ }
}

// v5
import { SupermemoryError } from "supermemory/models/errors";
try {
  await client.search({ q: "..." });
} catch (err) {
  if (err instanceof SupermemoryError) {
    err.statusCode;   // e.g. 429
    err.body;         // raw body text
    err.rawResponse;  // the fetch Response
  }
}
```

Mapping for common v4 classes:

| v4 | v5 equivalent |
|---|---|
| `APIError` / status subclasses | `SupermemoryError` + `.statusCode` |
| `APIConnectionError`, `APIConnectionTimeoutError` | `HTTPClientError` family (`supermemory/models/errors`) |
| — (new) | `SDKValidationError` / `ResponseValidationError` when a response doesn't match the documented schema |

## 5. Retries — now opt-in

v4 retried failed requests twice by default. v5 does not retry unless
configured — restore the old behavior globally:

```ts
const client = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"],
  retryConfig: {
    strategy: "backoff",
    backoff: { initialInterval: 500, maxInterval: 60000, exponent: 1.5, maxElapsedTime: 3600000 },
    retryConnectionErrors: true,
  },
});
```

…or per call via the second argument: `client.add(body, { retries: {...} })`.

## 6. Timeouts

`timeout` (v4, constructor + per-request) is now `timeoutMs`, also available in
both places:

```ts
const client = new Supermemory({ apiKey, timeoutMs: 30_000 });
await client.add(body, { timeoutMs: 5_000 });
```

Note: v4 counted retried attempts against the timeout differently; in v5 the
timeout applies per attempt.

## 7. Runtime validation (new behavior)

v5 validates responses against the API schema with Zod. If the server returns
something that doesn't match the documented types, the SDK throws
`SDKValidationError` instead of silently passing malformed data through. Use
`err.pretty()` to see what mismatched. v4 performed no runtime validation, so
code that tolerated undocumented fields may now surface drift explicitly.

## 8. File uploads

`toFile` and the `Uploadable` type are gone. Pass web-standard values directly
(`File`, `Blob`, or a `ReadableStream`) to `client.documents.uploadFile(...)`.
See [RUNTIMES.md](./RUNTIMES.md) for per-runtime specifics.

## 9. Raw response access

v4's `.asResponse()` / `.withResponse()` helpers do not exist. On errors, the
`Response` is on `err.rawResponse`. For successful calls, use the standalone
functions ([FUNCTIONS.md](./FUNCTIONS.md)) or a custom `httpClient` /
`debugLogger` when you need wire-level access.

## 10. CLI and MCP

- The `supermemory` CLI is still bundled: `npx supermemory` / `bunx supermemory`
  work exactly as before, same commands.
- The Stainless-generated `supermemory-mcp` package is no longer produced. Use
  the hosted MCP server instead: `https://mcp.supermemory.ai/mcp`.

## Reporting issues

If something in this guide doesn't match what you see, or a v4 pattern has no
clear v5 equivalent, open an issue: https://github.com/supermemoryai/supermemory
