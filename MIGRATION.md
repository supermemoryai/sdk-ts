# Migrating to `supermemory` v5

Starting with **v5.0.0**, the `supermemory` TypeScript SDK is generated from the
Supermemory **v5 API** (`/v5/openapi`) with [Fern](https://buildwithfern.com)'s
open-source generator. v5 is namespace-first: every content operation is scoped
to a namespace (the replacement for container tags), passed as `namespace` in
the same flat request object as the other fields.

```bash
bun i supermemory@rc   # or npm/pnpm/yarn — same package as before
```

- Coming from **4.x** (Stainless): read from [TL;DR](#tldr).
- Coming from **5.0.0-rc.1 – rc.5** (Speakeasy): see [Upgrading from 5.0.0-rc.5](#upgrading-from-500-rc5).

## TL;DR

| | v4 (Stainless) | v5 |
|---|---|---|
| Import | `import Supermemory from "supermemory"` | unchanged (named export also available) |
| Module format | ESM + CJS | ESM + CJS |
| Auth | `new Supermemory({ apiKey })` / `SUPERMEMORY_API_KEY` | unchanged |
| Scoping | `containerTag` / `containerTags` in the body | `namespace` field (one per call) |
| Call shape | `client.add({ content, containerTag })` | `client.add({ namespace, content })` |
| Search | `client.search.memories({ q })` | `client.search({ namespace, query })` |
| Profile | profile + optional search in one call (`q`) | profile only — run `client.search` alongside it |
| Retries | 2 by default | 2 by default (unchanged) |
| Timeout option | `timeout` (ms) | `timeoutInSeconds` (seconds) |
| Error classes | `BadRequestError`, `RateLimitError`, … per status | `SupermemoryError` + per-status subclasses (`NotFoundError`, …) with `.statusCode` |
| CLI (`npx supermemory`) | bundled | still bundled, unchanged |

## 1. Imports and auth — unchanged

```ts
import Supermemory from "supermemory";     // v4 style — still works
import { Supermemory } from "supermemory"; // also available

const client = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"], // still the default env var
});
```

## 2. Method surface

```ts
await client.add({ namespace: "user_alex", content: "Alex prefers morning meetings.", id: "pref-1" });

const { results } = await client.search({ namespace: "user_alex", query: "when does alex like to meet?", limit: 5 });
```

| v4 call | v5 call | v5 endpoint |
|---|---|---|
| `client.add(...)` / `client.documents.add(...)` | `client.add({ namespace, content })` | `POST /ns/{namespace}/document` |
| `client.search.memories(...)` | `client.search({ namespace, query })` | `POST /ns/{namespace}/search` |
| `client.profile(...)` | `client.profile({ namespace })` (no search — see below) | `POST /ns/{namespace}/profile` |
| `client.documents.list(...)`, `client.memories.list(...)` | `client.list({ namespace, type: "documents" \| "chunks" \| "memories" })` | `POST /ns/{namespace}/list/{type}` |
| `client.documents.get(...)` | `client.documents.get({ namespace, id })` | `GET /ns/{namespace}/document/{id}` |
| `client.documents.update(...)` | `client.documents.update({ namespace, id, ... })` | `PATCH /ns/{namespace}/document/{id}` |
| `client.documents.delete(...)`, `deleteBulk(...)` | `client.documents.delete({ namespace, ids })` | `DELETE /ns/{namespace}/document` |
| `client.documents.batchAdd(...)` | `client.documents.batchAdd({ namespace, documents })` | `POST /ns/{namespace}/document/batch` |
| `client.documents.uploadFile(...)` | `client.documents.uploadFile({ namespace, file })` | `POST /ns/{namespace}/document/file` |
| — | `client.documents.replaceWithFile(...)`, `updateFile(...)` | `POST` / `PATCH /ns/{namespace}/document/file/{id}` |
| `client.memories.forget(...)` | `client.memories.forget({ namespace, ids })` | `DELETE /ns/{namespace}/memories` |
| `client.memories.forgetMatching(...)` | `client.memories.forgetMatching(...)` | `DELETE /ns/{namespace}/memories/semantic` |
| `client.profiles.buckets(...)` | `client.profiles.{getBuckets, setBuckets, deleteBuckets}` | `/ns/{namespace}/profile/buckets` |
| `client.connections.*` | `client.connectors.{listProviders, list, create, get, update, delete, sync}` | `/connectors`, `/ns/{namespace}/connectors…` |
| `client.containerTags.*` | `client.namespaces.{list, get, update, delete}` | `/ns`, `/ns/{namespace}` |
| `client.settings.{get, update}` | `client.organization.{get, update}` (organizational context) | `/organization` |

### Renamed request fields

| v4 | v5 |
|---|---|
| `containerTag` / `containerTags` | `namespace` |
| `customId` | `id` |
| `documentDate` | `date` |
| `entityContext` | `supportingContext` |
| `q` | `query` |
| `filters` | `filter` (typed filter expression) |
| `include` | `attach` |
| search response `timing` / `total` | `searchTime` |

### Profile no longer searches

```ts
const [{ profile }, { results }] = await Promise.all([
  client.profile({ namespace: "user_alex" }),
  client.search({ namespace: "user_alex", query: "upcoming meetings" }),
]);
```

### Removed

These v4 methods have no v5 endpoint yet. Stay on `supermemory@4` if you depend on them:

- `client.settings.{reset, suggestBuckets}` and chunking settings
- `client.conversations.add`
- `client.documents.{listProcessing, chunks, fileUrl, search}` (use `client.search` / `client.list`)
- `client.containerTags.{merge, mergeStatus}`
- `client.memories.{add, updateMemory}`

## 3. Multiple container tags

v5 operations take exactly one namespace. To search across several, fan out and merge:

```ts
const responses = await Promise.all(
  ["user_alex", "team_design"].map((namespace) => client.search({ namespace, query: "roadmap" })),
);
const results = responses.flatMap((r) => r.results);
```

## 4. Error handling

```ts
// v4
if (err instanceof Supermemory.RateLimitError) { /* back off */ }

// v5
import { NotFoundError, SupermemoryError, SupermemoryTimeoutError } from "supermemory";
if (err instanceof NotFoundError) { /* … */ }
if (err instanceof SupermemoryError) {
  err.statusCode;  // e.g. 429
  err.body;        // parsed body
  err.rawResponse; // status, headers, url
}
```

| v4 | v5 |
|---|---|
| `APIError` / status subclasses | `SupermemoryError` + `.statusCode`; typed subclasses for statuses the API documents (`BadRequestError`, `UnauthorizedError`, `ForbiddenError`, `NotFoundError`, `ConflictError`, `PaymentRequiredError`, `InternalServerError`, `ServiceUnavailableError`) |
| `APIConnectionTimeoutError` | `SupermemoryTimeoutError` |
| `APIConnectionError` | `SupermemoryError` without a `statusCode` |

## 5. Timeouts and per-request options

```ts
const client = new Supermemory({ apiKey, timeoutInSeconds: 30, maxRetries: 2 });
await client.add(request, { timeoutInSeconds: 5, maxRetries: 0, headers: { "x-trace": "…" }, abortSignal });
```

## 6. File uploads

Pass a `File`, `Blob`, `ReadableStream`, `Buffer`, `fs.ReadStream`, or `{ path }` (Node) as `file`. `toFile` is gone.

## 7. Raw response access

v4's `.asResponse()` / `.withResponse()` become `.withRawResponse()`:

```ts
const { data, rawResponse } = await client.search({ namespace: "user_alex", query: "…" }).withRawResponse();
```

## 8. CLI and MCP

- The `supermemory` CLI is still bundled: `npx supermemory` / `bunx supermemory`.
- The Stainless-generated `supermemory-mcp` package is no longer produced. Use the hosted MCP server: `https://mcp.supermemory.ai/mcp`.

## Upgrading from 5.0.0-rc.5

rc.1 – rc.5 were generated with Speakeasy. From rc.6 the SDK is generated with Fern; the v5 endpoints and method names are the same, but call shapes and options changed. These are still prereleases on the `rc` npm tag (`latest` remains 4.x).

**Request bodies are flat.** The `body` wrapper is gone; body fields sit next to `namespace` and query params:

```ts
// rc.5
await client.add({ namespace: "user_alex", body: { content: "…", id: "pref-1" } });
await client.search({ namespace: "user_alex", limit: 5, body: { query: "…" } });
await client.memories.forget({ namespace: "user_alex", body: { ids: ["m1"] } });

// rc.6
await client.add({ namespace: "user_alex", content: "…", id: "pref-1" });
await client.search({ namespace: "user_alex", limit: 5, query: "…" });
await client.memories.forget({ namespace: "user_alex", ids: ["m1"] });
```

The one exception is `client.connectors.create({ namespace, body })`, whose body is a union of provider configs and so stays wrapped.

| | rc.5 (Speakeasy) | rc.6+ (Fern) |
|---|---|---|
| Request shape | `{ namespace, …query, body: {…} }` | `{ namespace, …query, …body }` |
| Retries | opt-in via `retryConfig` | **on by default** (2); `maxRetries` |
| Timeout | `timeoutMs` (ms) | `timeoutInSeconds` (seconds) |
| Errors | `SupermemoryError` (+ `HTTPClientError`, `SDKValidationError`, `ResponseValidationError`) from `supermemory/models/errors` | `SupermemoryError`, per-status subclasses and `SupermemoryTimeoutError`, all from `"supermemory"` |
| Response validation | Zod at runtime | none — responses are typed but not validated (unknown fields pass through) |
| Standalone functions | `supermemory/funcs/*` (tree-shakeable) | removed — use client methods |
| Subpath imports | `supermemory/models`, `supermemory/models/operations`, `supermemory/models/errors`, `supermemory/types` | everything is exported from `"supermemory"` |
| Raw response | `err.rawResponse`, custom `httpClient` | `.withRawResponse()` on any call; `err.rawResponse` |
| Custom HTTP | `httpClient` / `debugLogger` | `fetch` option / `logging` option |
| Module format | ESM only | ESM + CJS |
| Dependencies | `zod` | none |
| New | — | `client.connectors.*` |
