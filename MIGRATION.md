# Migrating from `supermemory` v4 to v5

Starting with **v5.0.0**, the `supermemory` TypeScript SDK is generated with
[Speakeasy](https://www.speakeasy.com) from the Supermemory **v5 API**
(`/v5/openapi`). v5 is namespace-first: every content operation is scoped to a
namespace (the replacement for container tags) passed as `namespace`, with the
request payload under `body`.

```bash
bun i supermemory@rc   # or npm/pnpm/yarn — same package as before
```

## TL;DR

| | v4 (Stainless) | v5 (Speakeasy) |
|---|---|---|
| Import | `import Supermemory from "supermemory"` | unchanged (named export also available) |
| Auth | `new Supermemory({ apiKey })` / `SUPERMEMORY_API_KEY` | unchanged |
| Scoping | `containerTag` / `containerTags` in the body | `namespace` argument (one per call) |
| Call shape | `client.add({ content, containerTag })` | `client.add({ namespace, body: { content } })` |
| Search | `client.search.memories({ q })` | `client.search({ namespace, body: { query } })` |
| Profile | profile + optional search in one call (`q`) | profile only — run `client.search` alongside it |
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

## 2. Method surface

```ts
await client.add({
  namespace: "user_alex",
  body: { content: "Alex prefers morning meetings.", id: "pref-1" },
});

const { results } = await client.search({
  namespace: "user_alex",
  limit: 5,
  body: { query: "when does alex like to meet?" },
});
```

| v4 call | v5 call | v5 endpoint |
|---|---|---|
| `client.add(...)` / `client.documents.add(...)` | `client.add(...)` | `POST /ns/{namespace}/document` |
| `client.search.memories(...)` | `client.search(...)` | `POST /ns/{namespace}/search` |
| `client.profile(...)` | `client.profile(...)` (no search — see below) | `POST /ns/{namespace}/profile` |
| `client.documents.list(...)`, `client.memories.list(...)` | `client.list({ namespace, type: "documents" \| "chunks" \| "memories" })` | `POST /ns/{namespace}/list/{type}` |
| `client.documents.get(...)` | `client.documents.get(...)` | `GET /ns/{namespace}/document/{id}` |
| `client.documents.update(...)` | `client.documents.update(...)` | `PATCH /ns/{namespace}/document/{id}` |
| `client.documents.delete(...)`, `deleteBulk(...)` | `client.documents.delete({ namespace, body: { ids } })` | `DELETE /ns/{namespace}/document` |
| `client.documents.batchAdd(...)` | `client.documents.batchAdd(...)` | `POST /ns/{namespace}/document/batch` |
| `client.documents.uploadFile(...)` | `client.documents.uploadFile(...)` | `POST /ns/{namespace}/document/file` |
| — | `client.documents.replaceWithFile(...)`, `updateFile(...)` | `POST` / `PATCH /ns/{namespace}/document/file/{id}` |
| `client.memories.forget(...)` | `client.memories.forget({ namespace, body: { ids } })` | `DELETE /ns/{namespace}/memories` |
| `client.memories.forgetMatching(...)` | `client.memories.forgetMatching(...)` | `DELETE /ns/{namespace}/memories/semantic` |
| `client.profiles.buckets(...)` | `client.profiles.{getBuckets, setBuckets, deleteBuckets}` | `/ns/{namespace}/profile/buckets` |
| `client.containerTags.*` | `client.namespaces.{list, get, update, delete}` | `/ns`, `/ns/{namespace}` |
| `client.settings.{get, update}` | `client.organization.{get, update}` (organizational context) | `/organization` |

### Renamed request fields

| v4 | v5 |
|---|---|
| `containerTag` / `containerTags` | `namespace` (path) |
| `customId` | `id` |
| `documentDate` | `date` |
| `entityContext` | `supportingContext` |
| `q` | `query` |
| `filters` | `filter` (typed filter expression) |
| `include` | `attach` |
| search response `timing` / `total` | `searchTime` |

### Profile no longer searches

v4's `client.profile({ containerTag, q })` returned the profile plus
`searchResults` in one call. In v5 the profile endpoint returns only the
profile. Call `client.search` next to it — in parallel, so it costs no extra
latency:

```ts
const [{ profile }, { results }] = await Promise.all([
  client.profile({ namespace: "user_alex" }),
  client.search({ namespace: "user_alex", body: { query: "upcoming meetings" } }),
]);
```

### Removed

These v4 methods have no v5 endpoint yet and are not in this SDK:

- `client.connections.*` (Google Drive, Notion, OneDrive, GitHub connectors)
- `client.settings.{reset, suggestBuckets}` and connector/chunking settings
- `client.conversations.add`
- `client.documents.{listProcessing, chunks, fileUrl, search}` (use `client.search` / `client.list`)
- `client.containerTags.{merge, mergeStatus}`
- `client.memories.{add, updateMemory}`

Stay on `supermemory@4` if you depend on these.

Every method is also exported as a tree-shakeable standalone function (see
[FUNCTIONS.md](./FUNCTIONS.md)) — useful for browser and edge bundles.

## 3. Multiple container tags

v4 search and add accepted several `containerTags` at once. v5 operations take
exactly one namespace. To search across several, fan out and merge:

```ts
const namespaces = ["user_alex", "team_design"];
const responses = await Promise.all(
  namespaces.map((namespace) =>
    client.search({ namespace, body: { query: "roadmap" } }),
  ),
);
const results = responses.flatMap((r) => r.results);
```

## 4. Error handling

v4 threw a subclass per HTTP status (`BadRequestError`, `AuthenticationError`,
`RateLimitError`, …). v5 throws a single `SupermemoryError` base (with typed
subclasses for API error bodies) — branch on `statusCode` instead:

```ts
// v4
import Supermemory from "supermemory";
try {
  await client.search.memories({ q: "..." });
} catch (err) {
  if (err instanceof Supermemory.RateLimitError) { /* back off */ }
}

// v5
import { SupermemoryError } from "supermemory/models/errors";
try {
  await client.search({ namespace: "user_alex", body: { query: "..." } });
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

…or per call via the second argument: `client.add(request, { retries: {...} })`.

## 6. Timeouts

`timeout` (v4, constructor + per-request) is now `timeoutMs`, also available in
both places:

```ts
const client = new Supermemory({ apiKey, timeoutMs: 30_000 });
await client.add(request, { timeoutMs: 5_000 });
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
