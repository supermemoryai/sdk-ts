# supermemory

[![npm](https://img.shields.io/npm/v/supermemory/rc.svg)](https://www.npmjs.com/package/supermemory)

The official TypeScript library for the [Supermemory](https://supermemory.ai) v5 API. Typed requests and responses, ESM + CommonJS builds, and no runtime dependencies. Runs on Node 18+, Bun, Deno, browsers and edge runtimes.

> Upgrading from 4.x or from an earlier 5.0.0 release candidate? See [MIGRATION.md](MIGRATION.md).

## Install

```sh
npm i supermemory   # or: bun add / pnpm add / yarn add supermemory
```

The package also ships the `supermemory` CLI (`npx supermemory`, `bunx supermemory`).

## Quickstart

```ts
import { Supermemory } from "supermemory";

const client = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"], // the default; can be omitted
});

// Remember something about a user.
await client.add("user_alex", { content: "Alex prefers morning meetings.", id: "pref-1", dreaming: "instant" });

// Recall it later.
const { results } = await client.search("user_alex", { query: "when does alex like to meet?", limit: 5 });

// Or read the maintained profile.
const { profile } = await client.profile("user_alex");
console.log(profile.static, results);
```

Every content operation is scoped to a **namespace** (a user ID, project ID, or anything you isolate memories by). The rule for every call: URL values first as positional arguments, then one object with everything else (query parameters and the request body together).

## API

| Call | Endpoint |
|---|---|
| `client.add(namespace, { content, ... })` | `POST /ns/{namespace}/document` |
| `client.search(namespace, { query, ... })` | `POST /ns/{namespace}/search` |
| `client.profile(namespace, { filter?, buckets? })` | `POST /ns/{namespace}/profile` |
| `client.profileMarkdown(namespace, { filter?, buckets? })` | same, as a markdown string (`Accept: text/markdown`) |
| `client.list(namespace, type, { page?, limit?, filter?, ... })` | `POST /ns/{namespace}/list/{type}` |
| `client.documents.{get, update, delete, batchAdd, uploadFile, replaceWithFile, updateFile}` | `/ns/{namespace}/document…` |
| `client.memories.{forget, forgetMatching}` | `/ns/{namespace}/memories…` |
| `client.profiles.{getBuckets, setBuckets, deleteBuckets}` | `/ns/{namespace}/profile/buckets` |
| `client.connectors.{listAll, list, create, get, update, delete, sync}` | `/connectors`, `/ns/{namespace}/connectors…` |
| `client.namespaces.{list, get, update, delete}` | `/ns`, `/ns/{namespace}` |
| `client.organization.{get, update}` | `/organization` |

```ts
import { Supermemory } from "supermemory";

const client = new Supermemory();

const doc = await client.documents.get("user_alex", "pref-1", { include: ["chunks", "memories"] });
const page = await client.list("user_alex", "documents", { limit: 20, filter: { field: "source", operator: "eq", value: "chat" } });
const setup = await client.connectors.create("user_alex", { provider: "notion", redirectUrl: "https://app.example.com/back" });
await client.connectors.delete("user_alex", setup.id, { deleteDocuments: false });
await client.organization.update({ organizationalContext: "Acme builds billing software for dental clinics." });
```

Request and response types are exported from the package root, for example `SearchResponse`, `Document`, `Connector`.

### File uploads

`file` takes a `File`/`Blob`, a Node stream, or a `Uint8Array`:

```ts
import { Supermemory } from "supermemory";
import { openAsBlob } from "node:fs";

const client = new Supermemory();

await client.documents.uploadFile("user_alex", { file: await openAsBlob("notes.pdf") });
await client.documents.uploadFile("user_alex", { file: new File(["# Notes"], "notes.md"), metadata: JSON.stringify({ source: "upload" }) });
```

## Errors

Non-2xx responses throw a typed error for the status (`BadRequestError`, `UnauthorizedError`, `PaymentRequiredError`, `ForbiddenError`, `NotFoundError`, `ConflictError`, `InternalServerError`, `ServiceUnavailableError`). All of them extend `SupermemoryError`, which carries `statusCode`, `body` and `rawResponse`. Timeouts throw `SupermemoryTimeoutError`; a failed connection throws a plain `SupermemoryError` with no status code.

```ts
import { Supermemory, NotFoundError, SupermemoryError, SupermemoryTimeoutError } from "supermemory";

const client = new Supermemory();

try {
  await client.documents.get("user_alex", "missing");
} catch (err) {
  if (err instanceof NotFoundError) console.log("no such document", err.body);
  else if (err instanceof SupermemoryTimeoutError) console.log("timed out");
  else if (err instanceof SupermemoryError) console.log(err.statusCode, err.body);
  else throw err;
}
```

## Retries and timeouts

Requests that fail with 408, 429 or 5xx, or whose connection fails, are retried twice with exponential backoff (honoring `Retry-After`). The default timeout is 60 seconds. Both can be set on the client or per call:

```ts
import { Supermemory } from "supermemory";

const client = new Supermemory({ maxRetries: 3, timeoutInSeconds: 120 });

await client.search("user_alex", { query: "meetings" }, { maxRetries: 0, timeoutInSeconds: 5 });
```

Per-call options also take `abortSignal`, extra `headers` and `queryParams`.

## Custom base URL and fetch

```ts
import { Supermemory } from "supermemory";

const client = new Supermemory({
  baseUrl: "https://memory.internal.example.com", // self-hosted
  headers: { "x-request-source": "billing-worker" },
  fetch: (input, init) => fetch(input, { ...init, keepalive: true }),
});
```

## Debugging

Pass `logging: { level: "debug" }` to log every request and response, or your own logger with `debug`/`info`/`warn`/`error` methods.

## Development

### How this SDK is generated

- `fern/openapi.json` is the live spec from `https://api.supermemory.ai/v5/openapi`.
- `fern/overlay.yaml` names the methods and groups (`x-fern-sdk-group-name`, `x-fern-sdk-method-name`).
- [Fern](https://buildwithfern.com)'s open-source TypeScript generator, run locally in Docker, writes `src/generated/`. No hosted account is involved.
- `src/index.ts` is the only hand-written source: it exports the client and flattens the one request body Fern cannot inline (`connectors.create`).

Don't edit `src/generated` — change the inputs and regenerate:

```sh
bun run generate          # fetch the live spec and run Fern (needs Docker)
bun run check-types       # src and the examples in this README and MIGRATION.md
bun run build && bun test
```

New endpoints need nothing: the **Generate SDK** workflow regenerates daily and on an `openapi-updated` repository dispatch from the API deploy, bumps the version when the SDK changed, and opens a PR. Merging it to `main` publishes to npm (`rc` tag for prereleases, `latest` otherwise).
