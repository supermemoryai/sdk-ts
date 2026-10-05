# Migrating to `supermemory` v5

v5 of the TypeScript SDK is generated from the Supermemory **v5 API** (`/v5/openapi`). v5 is namespace-first: every content operation is scoped to a namespace, the replacement for container tags.

```sh
npm i supermemory@rc   # same package as before
```

## The one rule

URL values first as positional arguments, then one object with everything else. Query parameters and the request body share that object.

```ts
await client.add("user_alex", { content: "...", dreaming: "instant" });
await client.documents.get("user_alex", "doc-1", { attach: ["chunks"] });
await client.connectors.delete("user_alex", "conn_1", { deleteDocuments: "false" });
await client.organization.update({ organizationalContext: "..." }); // no URL values, so just the object
```

This is the same order as the Python SDK: `client.add("user_alex", content="...", dreaming="instant")`.

## From 5.0.0-rc.5 or rc.6

Those release candidates took a single object with `namespace` inside it and the body under `body`. Move the namespace (and any other path value such as `id` or `type`) out as positional arguments and drop the `body` wrapper:

```ts
// rc.5 (does not compile against this version)
await client.add({ namespace: "user_alex", dreaming: "instant", body: { content: "..." } });
await client.documents.get({ namespace: "user_alex", id: "doc-1", attach: ["chunks"] });
await client.search({ namespace: "user_alex", searchMode: "chunks", body: { query: "..." } });
```

```ts
await client.add("user_alex", { content: "...", dreaming: "instant" });
await client.documents.get("user_alex", "doc-1", { attach: ["chunks"] });
await client.search("user_alex", { query: "...", searchMode: "chunks" });
```

Client options and errors also changed, see below. `supermemory/models`, `supermemory/funcs` and `supermemory/core.js` are gone: everything is exported from the package root.

## From 4.x

### Methods

| 4.x | v5 |
|---|---|
| `client.add({ content, containerTag, customId, metadata })` | `client.add(namespace, { content, id, metadata })` |
| `client.documents.batchAdd({ documents, containerTag })` | `client.documents.batchAdd(namespace, { documents })` |
| `client.documents.uploadFile({ file, containerTag })` | `client.documents.uploadFile(namespace, { file })` |
| `client.documents.get(id)` | `client.documents.get(namespace, id, { attach? })` |
| `client.documents.update(id, {...})` | `client.documents.update(namespace, id, {...})` |
| `client.documents.delete(id)` / `deleteBulk({ ids })` | `client.documents.delete(namespace, { ids })` |
| `client.documents.list({ containerTags })` | `client.list(namespace, "documents", { filter? })` |
| `client.memories.list(...)` | `client.list(namespace, "memories")` |
| `client.search.execute({ q, containerTags })` / `search.documents` | `client.search(namespace, { query, searchMode: "chunks" })` |
| `client.search.memories({ q, containerTag })` | `client.search(namespace, { query, searchMode: "memories" })` |
| `client.profile({ containerTag, q })` | `client.profile(namespace)` then `client.search(namespace, { query })` |
| `client.memories.forget({ id })` | `client.memories.forget(namespace, { ids })` |
| `client.memories.forgetMatching({ query })` | `client.memories.forgetMatching(namespace, { query, dryRun })` |
| `client.settings.get()` / `update()` | `client.organization.get()` / `update({ organizationalContext })` |
| `client.connections.create(provider, { containerTags, redirectUrl })` | `client.connectors.create(namespace, { provider, redirectUrl })` |
| `client.connections.list()` | `client.connectors.list(namespace)` or `client.connectors.listAll()` |
| `client.connections.get(id)` / `delete(id)` / `import(provider)` | `client.connectors.get(namespace, id)` / `delete(namespace, id)` / `sync(namespace, id)` |
| `client.memories.add(...)`, `memories.updateMemory(...)` | removed: ingest or update the source document |

### Fields

| 4.x | v5 |
|---|---|
| `containerTag` / `containerTags` | the `namespace` argument |
| `customId` | `id` |
| `entityContext` | `supportingContext` |
| `filterByMetadata` | `group` |
| `documentDate` | `date` |
| `q` | `query` |
| `filters` (JSON string) | `filter` (typed expression: `{ field, operator, value }` or `{ operator: "and" \| "or", operands }`) |
| `include` | `attach` |
| `rerank: true` + `aggregate` | `rerank: "none" \| "order" \| "aggregate"` |
| search mode `documents` | `searchMode: "chunks"` |

Defaults changed too: search `threshold` is `0.3` (was `0.6`) and `searchMode` is `hybrid` (was memories). Memories appear within a minute or so after `add` only with `dreaming: "instant"`; the default `dynamic` batches extraction.

### Client options

| 4.x | v5 |
|---|---|
| `baseURL` | `baseUrl` |
| `timeout` (ms) | `timeoutInSeconds` |
| `maxRetries` | `maxRetries` (unchanged, default 2) |
| `fetch` | `fetch` (unchanged) |
| `defaultHeaders` | `headers` |

Per-call options are the optional last argument: `{ timeoutInSeconds, maxRetries, abortSignal, headers, queryParams }`.

### Errors

| 4.x | v5 |
|---|---|
| `APIError` | `SupermemoryError` (`statusCode`, `body`, `rawResponse`) |
| `NotFoundError`, `BadRequestError`, `AuthenticationError`, `RateLimitError`, ... | `NotFoundError`, `BadRequestError`, `UnauthorizedError`, `PaymentRequiredError`, `ForbiddenError`, `ConflictError`, `InternalServerError`, `ServiceUnavailableError`; others are a `SupermemoryError` with the status code |
| `APITimeoutError` | `SupermemoryTimeoutError` |
| `APIConnectionError` | `SupermemoryError` without a `statusCode` |

```ts
import { Supermemory, NotFoundError, SupermemoryError } from "supermemory";

const client = new Supermemory();

try {
  await client.documents.get("user_alex", "missing");
} catch (err) {
  if (err instanceof NotFoundError) console.log("gone");
  else if (err instanceof SupermemoryError) console.log(err.statusCode, err.body);
  else throw err;
}
```
