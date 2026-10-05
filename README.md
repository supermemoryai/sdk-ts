# supermemory

[![npm](https://img.shields.io/npm/v/supermemory/rc.svg)](https://www.npmjs.com/package/supermemory)

The official TypeScript library for the [Supermemory](https://supermemory.ai) v5 API. Works in Node 18+, Bun, Deno, browsers and edge runtimes, and ships as both ESM and CommonJS.

> **Upgrading from 4.x or 5.0.0-rc.5?** See [MIGRATION.md](MIGRATION.md).

## Installation

```sh
bun add supermemory@rc   # or npm / pnpm / yarn
```

## Usage

```ts
import Supermemory from "supermemory";

const client = new Supermemory(); // reads SUPERMEMORY_API_KEY; or new Supermemory({ apiKey })

await client.add({ namespace: "user_alex", content: "Alex prefers morning meetings.", id: "pref-1" });

const { results } = await client.search({ namespace: "user_alex", query: "when does alex like to meet?", limit: 5 });
```

Every content operation is scoped to a **namespace** (a user ID, project ID, or anything you want to isolate memories by). Path parameters, query parameters and body fields all go in the same request object.

## API surface

| Call | Endpoint |
|---|---|
| `client.add({ namespace, content, … })` | `POST /ns/{namespace}/document` |
| `client.search({ namespace, query, … })` | `POST /ns/{namespace}/search` |
| `client.profile({ namespace })` | `POST /ns/{namespace}/profile` |
| `client.list({ namespace, type })` | `POST /ns/{namespace}/list/{type}` |
| `client.documents.{get, update, delete, batchAdd, uploadFile, replaceWithFile, updateFile}` | `/ns/{namespace}/document…` |
| `client.memories.{forget, forgetMatching}` | `/ns/{namespace}/memories…` |
| `client.profiles.{getBuckets, setBuckets, deleteBuckets}` | `/ns/{namespace}/profile/buckets` |
| `client.connectors.{listProviders, list, create, get, update, delete, sync}` | `/connectors`, `/ns/{namespace}/connectors…` |
| `client.namespaces.{list, get, update, delete}` | `/ns`, `/ns/{namespace}` |
| `client.organization.{get, update}` | `/organization` |

## File uploads

`file` accepts a `File`, `Blob`, `ReadableStream`, `Buffer`, `fs.ReadStream`, or `{ path }` (Node):

```ts
await client.documents.uploadFile({ namespace: "user_alex", file: new File([bytes], "notes.pdf") });
```

## Errors

Non-2xx responses throw a `SupermemoryError` subclass (`NotFoundError`, `BadRequestError`, …) with `statusCode`, `body` and `rawResponse`. Timeouts throw `SupermemoryTimeoutError`.

```ts
import { NotFoundError, SupermemoryError } from "supermemory";

try {
  await client.documents.get({ namespace: "user_alex", id: "missing" });
} catch (err) {
  if (err instanceof NotFoundError) { /* … */ }
  else if (err instanceof SupermemoryError) console.log(err.statusCode, err.body);
}
```

## Retries, timeouts, headers

Failed requests (408, 429, 5xx, network errors) are retried twice with exponential backoff, and requests time out after 60 seconds. Set these on the client or per call:

```ts
const client = new Supermemory({ maxRetries: 5, timeoutInSeconds: 20 });

await client.search({ namespace: "user_alex", query: "…" }, { maxRetries: 0, timeoutInSeconds: 5, abortSignal });
```

## Raw responses

```ts
const { data, rawResponse } = await client.search({ namespace: "user_alex", query: "…" }).withRawResponse();
```

## CLI

The `supermemory` CLI is bundled: `npx supermemory` / `bunx supermemory`.

## Development

The SDK is generated with [Fern](https://buildwithfern.com)'s open-source TypeScript generator from the live v5 OpenAPI spec. Fern runs locally in Docker, so no hosted account is involved. Don't edit `src/generated` by hand. Change `fern/overlay.yaml` (method names and groups) or `fern/generators.yml` (generator options), then regenerate:

```sh
bun run generate   # needs Docker
bun run check-types && bun run build && bun test
```

`src/index.ts` is the hand-written entry point (default export, `Supermemory` name).

The **Generate SDK** workflow regenerates daily, and also when the API deploy sends an `openapi-updated` repository dispatch. When the SDK changed, it bumps the version and opens a PR. Merging to `main` publishes to npm (`rc` for prereleases, `latest` otherwise).
