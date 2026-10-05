# supermemory

[![npm](https://img.shields.io/npm/v/supermemory/rc.svg)](https://www.npmjs.com/package/supermemory)

The official TypeScript library for the [Supermemory](https://supermemory.ai) v5 API. Typed requests and responses, runtime validation, and ESM + CommonJS builds that run on Node 18+, Bun, Deno, browsers and edge runtimes.

> Upgrading from 4.x? See [MIGRATION.md](MIGRATION.md). From 5.0.0-rc.5, there's nothing to change.

## Install

```sh
bun add supermemory@rc   # or: npm i supermemory@rc / pnpm add supermemory@rc / yarn add supermemory@rc
```

The package also ships the `supermemory` CLI (`npx supermemory`, `bunx supermemory`).

## Quickstart

```ts
import Supermemory from "supermemory";

const client = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"], // the default; can be omitted
});

// Remember something about a user.
await client.add({
  namespace: "user_alex",
  body: { content: "Alex prefers morning meetings.", id: "pref-1" },
});

// Recall it later.
const { results } = await client.search({
  namespace: "user_alex",
  limit: 5,
  body: { query: "when does alex like to meet?" },
});

// Or get the maintained profile (JSON, or a markdown string if the server answers in markdown).
const profile = await client.profile({ namespace: "user_alex" });
if (typeof profile !== "string") console.log(profile.profile.static, results);
```

Every content operation is scoped to a **namespace** (a user ID, project ID, or anything you isolate memories by). Path and query parameters sit at the top level of the request; the request payload goes under `body`.

## API

| Call | Endpoint |
|---|---|
| `client.add({ namespace, body })` | `POST /ns/{namespace}/document` |
| `client.search({ namespace, limit?, searchMode?, body })` | `POST /ns/{namespace}/search` |
| `client.profile({ namespace, body? })` | `POST /ns/{namespace}/profile` |
| `client.list({ namespace, type, page?, limit?, sort?, order?, body? })` | `POST /ns/{namespace}/list/{type}` |
| `client.documents.{get, update, delete, batchAdd, uploadFile, replaceWithFile, updateFile}` | `/ns/{namespace}/document…` |
| `client.memories.{forget, forgetMatching}` | `/ns/{namespace}/memories…` |
| `client.profiles.{getBuckets, setBuckets, deleteBuckets}` | `/ns/{namespace}/profile/buckets` |
| `client.connectors.{listProviders, list, create, get, update, delete, sync}` | `/connectors`, `/ns/{namespace}/connectors…` |
| `client.namespaces.{list, get, update, delete}` | `/ns`, `/ns/{namespace}` |
| `client.organization.{get, update}` | `/organization` |

Request and response types are exported from `supermemory/models/operations` (e.g. `PostNsByNamespaceSearchRequest`, `PostNsByNamespaceSearchResponse`), shared models from `supermemory/models`, and errors from `supermemory/models/errors`.

### File uploads

`file` takes a `File`/`Blob`, or `{ fileName, content }` where `content` is a `ReadableStream`, `Blob`, `ArrayBuffer` or `Uint8Array`:

```ts
import { Supermemory } from "supermemory";
import { openAsBlob } from "node:fs";

const client = new Supermemory();

await client.documents.uploadFile({
  namespace: "user_alex",
  body: { file: await openAsBlob("notes.pdf") },
});

await client.documents.uploadFile({
  namespace: "user_alex",
  body: { file: { fileName: "notes.md", content: new TextEncoder().encode("# Notes") } },
});
```

### Standalone functions

Every method is also a tree-shakeable function that returns a `Result` instead of throwing — useful for browser and edge bundles:

```ts
import { SupermemoryCore } from "supermemory/core.js";
import { search } from "supermemory/funcs/search.js";

const core = new SupermemoryCore({ apiKey: process.env["SUPERMEMORY_API_KEY"] });

const res = await search(core, { namespace: "user_alex", body: { query: "meetings" } });
if (res.ok) console.log(res.value.results);
else console.error(res.error);
```

## Errors

HTTP errors are subclasses of `SupermemoryError`, with `statusCode`, `body` (raw text), `headers` and `rawResponse`. Documented error bodies are parsed into typed classes — `ErrorResponse` (`data$.error`, `data$.details`) and `ValidationErrorResponse` (`data$.error[]` with `message` and `path`).

```ts
import { Supermemory } from "supermemory";
import * as errors from "supermemory/models/errors";

const client = new Supermemory();

try {
  await client.documents.get({ namespace: "user_alex", id: "missing" });
} catch (err) {
  if (err instanceof errors.ErrorResponse) {
    console.log(err.statusCode, err.data$.error); // 404 "Document not found"
  } else if (err instanceof errors.ValidationErrorResponse) {
    console.log(err.data$.error.map((e) => e.message));
  } else if (err instanceof errors.SupermemoryError) {
    console.log(err.statusCode, err.body);
  } else if (err instanceof errors.ConnectionError || err instanceof errors.RequestTimeoutError) {
    console.log("network problem", err.cause);
  }
}
```

| Error | When |
|---|---|
| `ErrorResponse`, `ValidationErrorResponse` | documented error responses (subclasses of `SupermemoryError`) |
| `SupermemoryDefaultError` | any other non-2xx response |
| `ResponseValidationError` | a 2xx response didn't match the documented schema (`err.pretty()` explains) |
| `SDKValidationError` | your request didn't match the documented schema; nothing was sent |
| `ConnectionError`, `RequestTimeoutError`, `RequestAbortedError`, `InvalidRequestError`, `UnexpectedClientError` | the request couldn't be completed (all extend `HTTPClientError`) |

## Retries and timeouts

Requests aren't retried unless you opt in. Configure a backoff policy for the whole client or per call; `retryCodes` (default `["429", "500", "502", "503", "504"]`) chooses which statuses retry, and `Retry-After` headers are honoured.

```ts
import { Supermemory } from "supermemory";

const client = new Supermemory({
  retryConfig: {
    strategy: "backoff",
    backoff: { initialInterval: 500, maxInterval: 60_000, exponent: 1.5, maxElapsedTime: 300_000 },
    retryConnectionErrors: true,
  },
  timeoutMs: 30_000, // per attempt; no timeout by default
});

// Per call: options are the second argument.
await client.search(
  { namespace: "user_alex", body: { query: "meetings" } },
  { timeoutMs: 5_000, retries: { strategy: "none" }, headers: { "x-request-source": "cron" } },
);
```

Per-call options also accept `serverURL`, `retryCodes`, `signal`, and any other `fetch` `RequestInit` option.

## Custom fetch and HTTP client

All requests go through an `HTTPClient` wrapping `fetch`. Pass your own `fetcher` (a proxy, a test double, a different runtime's fetch) and hook into the request lifecycle:

```ts
import { Supermemory } from "supermemory";
import { HTTPClient } from "supermemory/lib/http";

const httpClient = new HTTPClient({
  fetcher: (input, init) => fetch(input, init),
});

httpClient.addHook("beforeRequest", (request) => {
  const next = new Request(request, { signal: request.signal || AbortSignal.timeout(10_000) });
  next.headers.set("x-custom-header", "value");
  return next;
});

httpClient.addHook("requestError", (error, request) => {
  console.error(`${request.method} ${request.url} failed`, error);
});

const client = new Supermemory({ httpClient });
```

Use `serverURL` to point the client at another deployment (`new Supermemory({ serverURL: "http://localhost:8787" })`).

## Debugging

Pass `debugLogger: console` (or set `SUPERMEMORY_DEBUG=true`) to log every request and response. Logs include headers, so don't enable this in production.

## Development

### How this SDK is generated

```
fern/openapi.json ─┬─► Fern (fern generate --local) ─► src/generated/   HTTP client: routing, URL & body encoding
                   └─► scripts/surface/generate.ts  ─► src/models/, src/funcs/, src/sdk/   the public API
```

- **`src/generated/`**: [Fern](https://buildwithfern.com)'s open-source TypeScript generator, run locally in Docker. No hosted account is involved.
- **`src/models`, `src/funcs`, `src/sdk`**: generated from the same spec by `scripts/surface/generate.ts`: request/response types, zod schemas, typed errors, standalone functions and SDK classes.
- **`src/lib/invoke.ts`** (hand-written, not tied to any endpoint) runs each call: validates the request, hands it to the Fern client, and applies retries, timeouts, `HTTPClient` hooks and response/error matching.
- **`src/lib`, `src/types`, `src/models/errors/{supermemory-error,…}`**: hand-maintained runtime helpers, independent of the spec.

Don't edit generated files (they start with a `DO NOT EDIT` header) — change the inputs and regenerate:

```sh
bun run generate          # fetch the live spec, run Fern (needs Docker), regenerate the surface
bun run check-types       # src + rc.5 type/doc compatibility checks
bun run build && bun test # includes request-for-request comparison with 5.0.0-rc.5
```

### Changing the syntax

| To change… | Edit |
|---|---|
| method names and groups (`client.documents.batchAdd`) | `fern/overlay.yaml` (`x-fern-sdk-group-name`, `x-fern-sdk-method-name`) |
| a type's exported name | `fern/surface-names.json` (spec location → name; rc.5's names are pinned here) |
| request/response/error handling for every call | `src/lib/invoke.ts` |
| how types and functions are emitted | `scripts/surface/generate.ts` |

New endpoints need nothing: the **Generate SDK** workflow regenerates daily and on an `openapi-updated` repository dispatch from the API deploy, bumps the version when the SDK changed, and opens a PR. Merging it to `main` publishes to npm (`rc` tag for prereleases, `latest` otherwise).
