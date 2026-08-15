# supermemory

Developer-friendly & type-safe Typescript SDK specifically catered to leverage *supermemory* API.

[![Built by Speakeasy](https://img.shields.io/badge/Built_by-SPEAKEASY-374151?style=for-the-badge&labelColor=f3f4f6)](https://www.speakeasy.com/?utm_source=supermemory&utm_campaign=typescript)
[![License: MIT](https://img.shields.io/badge/LICENSE_//_MIT-3b5bdb?style=for-the-badge&labelColor=eff6ff)](https://opensource.org/licenses/MIT)


<br /><br />
> [!IMPORTANT]
> This SDK is not yet ready for production use. To complete setup please follow the steps outlined in your [workspace](https://app.speakeasy.com/org/supermemory-hnj/supermemory). Delete this section before > publishing to a package manager.

<!-- Start Summary [summary] -->
## Summary

supermemory API: The Memory API for the AI era. OpenAPI operations include x-codeSamples for the official TypeScript and Python SDKs (Mintlify-compatible).
<!-- End Summary [summary] -->

<!-- Start Table of Contents [toc] -->
## Table of Contents
<!-- $toc-max-depth=2 -->
* [supermemory](#supermemory)
  * [SDK Installation](#sdk-installation)
  * [Requirements](#requirements)
  * [SDK Example Usage](#sdk-example-usage)
  * [Authentication](#authentication)
  * [Available Resources and Operations](#available-resources-and-operations)
  * [Standalone functions](#standalone-functions)
  * [File uploads](#file-uploads)
  * [Retries](#retries)
  * [Error Handling](#error-handling)
  * [Server Selection](#server-selection)
  * [Custom HTTP Client](#custom-http-client)
  * [Debugging](#debugging)
* [Development](#development)
  * [Maturity](#maturity)
  * [Contributions](#contributions)

<!-- End Table of Contents [toc] -->

<!-- Start SDK Installation [installation] -->
## SDK Installation

> [!TIP]
> To finish publishing your SDK to npm and others you must [run your first generation action](https://www.speakeasy.com/docs/github-setup#step-by-step-guide).


The SDK can be installed with either [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), [bun](https://bun.sh/) or [yarn](https://classic.yarnpkg.com/en/) package managers.

### NPM

```bash
npm add <UNSET>
```

### PNPM

```bash
pnpm add <UNSET>
```

### Bun

```bash
bun add <UNSET>
```

### Yarn

```bash
yarn add <UNSET>
```

> [!NOTE]
> This package is published as an ES Module (ESM) only. For applications using
> CommonJS, use `await import()` to import and use this package.
<!-- End SDK Installation [installation] -->

<!-- Start Requirements [requirements] -->
## Requirements

For supported JavaScript runtimes, please consult [RUNTIMES.md](RUNTIMES.md).
<!-- End Requirements [requirements] -->

<!-- Start SDK Example Usage [usage] -->
## SDK Example Usage

### Example

```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.add({
    content: "<value>",
  });

  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->

<!-- Start Authentication [security] -->
## Authentication

### Per-Client Security Schemes

This SDK supports the following security scheme globally:

| Name     | Type | Scheme      | Environment Variable  |
| -------- | ---- | ----------- | --------------------- |
| `apiKey` | http | HTTP Bearer | `SUPERMEMORY_API_KEY` |

To authenticate with the API the `apiKey` parameter must be set when initializing the SDK client instance. For example:
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.add({
    content: "<value>",
  });

  console.log(result);
}

run();

```
<!-- End Authentication [security] -->

<!-- Start Available Resources and Operations [operations] -->
## Available Resources and Operations

<details open>
<summary>Available methods</summary>

### [Supermemory SDK](docs/sdks/supermemory/README.md)

* [add](docs/sdks/supermemory/README.md#add) - Add document
* [profile](docs/sdks/supermemory/README.md#profile) - Get user profile
* [search](docs/sdks/supermemory/README.md#search) - Search memory entries

### [Connections](docs/sdks/connections/README.md)

* [list](docs/sdks/connections/README.md#list) - List connections
* [create](docs/sdks/connections/README.md#create) - Create connection
* [deleteByProvider](docs/sdks/connections/README.md#deletebyprovider) - Delete connection
* [resources](docs/sdks/connections/README.md#resources) - Fetch resources
* [configure](docs/sdks/connections/README.md#configure) - Configure connection
* [getByID](docs/sdks/connections/README.md#getbyid) - Get connection (by id)
* [deleteByID](docs/sdks/connections/README.md#deletebyid) - Delete connection by ID
* [getByTag](docs/sdks/connections/README.md#getbytag) - Get connection (by provider)
* [listDocuments](docs/sdks/connections/README.md#listdocuments) - List documents
* [import](docs/sdks/connections/README.md#import) - Sync connection

### [ContainerTags](docs/sdks/containertags/README.md)

* [list](docs/sdks/containertags/README.md#list) - List all container tags
* [get](docs/sdks/containertags/README.md#get) - Get container tag settings
* [update](docs/sdks/containertags/README.md#update) - Update container tag settings
* [delete](docs/sdks/containertags/README.md#delete) - Delete container tag
* [merge](docs/sdks/containertags/README.md#merge) - Merge container tags
* [mergeStatus](docs/sdks/containertags/README.md#mergestatus) - Get container tag merge status

### [Conversations](docs/sdks/conversations/README.md)

* [add](docs/sdks/conversations/README.md#add) - Ingest or update conversation

### [Documents](docs/sdks/documents/README.md)

* [batchAdd](docs/sdks/documents/README.md#batchadd) - Batch add documents
* [update](docs/sdks/documents/README.md#update) - Update document
* [get](docs/sdks/documents/README.md#get) - Get document
* [delete](docs/sdks/documents/README.md#delete) - Delete document by ID or customId
* [uploadFile](docs/sdks/documents/README.md#uploadfile) - Upload a file
* [list](docs/sdks/documents/README.md#list) - List documents
* [listProcessing](docs/sdks/documents/README.md#listprocessing) - Get processing documents
* [chunks](docs/sdks/documents/README.md#chunks) - Get document chunks
* [fileUrl](docs/sdks/documents/README.md#fileurl) - Get presigned file URL
* [deleteBulk](docs/sdks/documents/README.md#deletebulk) - Bulk delete documents
* [search](docs/sdks/documents/README.md#search) - Search documents

### [Memories](docs/sdks/memories/README.md)

* [add](docs/sdks/memories/README.md#add) - Create memories directly
* [forget](docs/sdks/memories/README.md#forget) - Forget a memory
* [updateMemory](docs/sdks/memories/README.md#updatememory) - Update a memory (creates new version)
* [forgetMatching](docs/sdks/memories/README.md#forgetmatching) - Forget memories matching a prompt/query
* [list](docs/sdks/memories/README.md#list) - List memory entries with history

### [Profiles](docs/sdks/profiles/README.md)

* [buckets](docs/sdks/profiles/README.md#buckets) - Get profile buckets

### [Settings](docs/sdks/settings/README.md)

* [get](docs/sdks/settings/README.md#get) - Get settings
* [update](docs/sdks/settings/README.md#update) - Update settings
* [reset](docs/sdks/settings/README.md#reset) - Reset organization data
* [suggestBuckets](docs/sdks/settings/README.md#suggestbuckets) - Suggest profile buckets

</details>
<!-- End Available Resources and Operations [operations] -->

<!-- Start Standalone functions [standalone-funcs] -->
## Standalone functions

All the methods listed above are available as standalone functions. These
functions are ideal for use in applications running in the browser, serverless
runtimes or other environments where application bundle size is a primary
concern. When using a bundler to build your application, all unused
functionality will be either excluded from the final bundle or tree-shaken away.

To read more about standalone functions, check [FUNCTIONS.md](./FUNCTIONS.md).

<details>

<summary>Available standalone functions</summary>

- [`add`](docs/sdks/supermemory/README.md#add) - Add document
- [`connectionsConfigure`](docs/sdks/connections/README.md#configure) - Configure connection
- [`connectionsCreate`](docs/sdks/connections/README.md#create) - Create connection
- [`connectionsDeleteByID`](docs/sdks/connections/README.md#deletebyid) - Delete connection by ID
- [`connectionsDeleteByProvider`](docs/sdks/connections/README.md#deletebyprovider) - Delete connection
- [`connectionsGetByID`](docs/sdks/connections/README.md#getbyid) - Get connection (by id)
- [`connectionsGetByTag`](docs/sdks/connections/README.md#getbytag) - Get connection (by provider)
- [`connectionsImport`](docs/sdks/connections/README.md#import) - Sync connection
- [`connectionsList`](docs/sdks/connections/README.md#list) - List connections
- [`connectionsListDocuments`](docs/sdks/connections/README.md#listdocuments) - List documents
- [`connectionsResources`](docs/sdks/connections/README.md#resources) - Fetch resources
- [`containerTagsDelete`](docs/sdks/containertags/README.md#delete) - Delete container tag
- [`containerTagsGet`](docs/sdks/containertags/README.md#get) - Get container tag settings
- [`containerTagsList`](docs/sdks/containertags/README.md#list) - List all container tags
- [`containerTagsMerge`](docs/sdks/containertags/README.md#merge) - Merge container tags
- [`containerTagsMergeStatus`](docs/sdks/containertags/README.md#mergestatus) - Get container tag merge status
- [`containerTagsUpdate`](docs/sdks/containertags/README.md#update) - Update container tag settings
- [`conversationsAdd`](docs/sdks/conversations/README.md#add) - Ingest or update conversation
- [`documentsBatchAdd`](docs/sdks/documents/README.md#batchadd) - Batch add documents
- [`documentsChunks`](docs/sdks/documents/README.md#chunks) - Get document chunks
- [`documentsDelete`](docs/sdks/documents/README.md#delete) - Delete document by ID or customId
- [`documentsDeleteBulk`](docs/sdks/documents/README.md#deletebulk) - Bulk delete documents
- [`documentsFileUrl`](docs/sdks/documents/README.md#fileurl) - Get presigned file URL
- [`documentsGet`](docs/sdks/documents/README.md#get) - Get document
- [`documentsList`](docs/sdks/documents/README.md#list) - List documents
- [`documentsListProcessing`](docs/sdks/documents/README.md#listprocessing) - Get processing documents
- [`documentsSearch`](docs/sdks/documents/README.md#search) - Search documents
- [`documentsUpdate`](docs/sdks/documents/README.md#update) - Update document
- [`documentsUploadFile`](docs/sdks/documents/README.md#uploadfile) - Upload a file
- [`memoriesAdd`](docs/sdks/memories/README.md#add) - Create memories directly
- [`memoriesForget`](docs/sdks/memories/README.md#forget) - Forget a memory
- [`memoriesForgetMatching`](docs/sdks/memories/README.md#forgetmatching) - Forget memories matching a prompt/query
- [`memoriesList`](docs/sdks/memories/README.md#list) - List memory entries with history
- [`memoriesUpdateMemory`](docs/sdks/memories/README.md#updatememory) - Update a memory (creates new version)
- [`profile`](docs/sdks/supermemory/README.md#profile) - Get user profile
- [`profilesBuckets`](docs/sdks/profiles/README.md#buckets) - Get profile buckets
- [`search`](docs/sdks/supermemory/README.md#search) - Search memory entries
- [`settingsGet`](docs/sdks/settings/README.md#get) - Get settings
- [`settingsReset`](docs/sdks/settings/README.md#reset) - Reset organization data
- [`settingsSuggestBuckets`](docs/sdks/settings/README.md#suggestbuckets) - Suggest profile buckets
- [`settingsUpdate`](docs/sdks/settings/README.md#update) - Update settings

</details>
<!-- End Standalone functions [standalone-funcs] -->

<!-- Start File uploads [file-upload] -->
## File uploads

Certain SDK methods accept files as part of a multi-part request. It is possible and typically recommended to upload files as a stream rather than reading the entire contents into memory. This avoids excessive memory consumption and potentially crashing with out-of-memory errors when working with very large files. The following example demonstrates how to attach a file stream to a request.

> [!TIP]
>
> Depending on your JavaScript runtime, there are convenient utilities that return a handle to a file without reading the entire contents into memory:
>
> - **Node.js v20+:** Since v20, Node.js comes with a native `openAsBlob` function in [`node:fs`](https://nodejs.org/docs/latest-v20.x/api/fs.html#fsopenasblobpath-options).
> - **Bun:** The native [`Bun.file`](https://bun.sh/docs/api/file-io#reading-files-bun-file) function produces a file handle that can be used for streaming file uploads.
> - **Browsers:** All supported browsers return an instance to a [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) when reading the value from an `<input type="file">` element.
> - **Node.js v18:** A file stream can be created using the `fileFrom` helper from [`fetch-blob/from.js`](https://www.npmjs.com/package/fetch-blob).

```typescript
import { openAsBlob } from "node:fs";
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.documents.uploadFile({
    file: await openAsBlob("example.file"),
    containerTag: "user",
  });

  console.log(result);
}

run();

```
<!-- End File uploads [file-upload] -->

<!-- Start Retries [retries] -->
## Retries

Some of the endpoints in this SDK support retries.  If you use the SDK without any configuration, it will fall back to the default retry strategy provided by the API.  However, the default retry strategy can be overridden on a per-operation basis, or across the entire SDK.

To change the default retry strategy for a single API call, simply provide a retryConfig object to the call:
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.add({
    content: "<value>",
  }, {
    retries: {
      strategy: "backoff",
      backoff: {
        initialInterval: 1,
        maxInterval: 50,
        exponent: 1.1,
        maxElapsedTime: 100,
      },
      retryConnectionErrors: false,
    },
  });

  console.log(result);
}

run();

```

If you'd like to override the default retry strategy for all operations that support retries, you can provide a retryConfig at SDK initialization:
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  retryConfig: {
    strategy: "backoff",
    backoff: {
      initialInterval: 1,
      maxInterval: 50,
      exponent: 1.1,
      maxElapsedTime: 100,
    },
    retryConnectionErrors: false,
  },
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.add({
    content: "<value>",
  });

  console.log(result);
}

run();

```
<!-- End Retries [retries] -->

<!-- Start Error Handling [errors] -->
## Error Handling

[`SupermemoryError`](./src/models/errors/supermemory-error.ts) is the base class for all HTTP error responses. It has the following properties:

| Property            | Type       | Description                                                                             |
| ------------------- | ---------- | --------------------------------------------------------------------------------------- |
| `error.message`     | `string`   | Error message                                                                           |
| `error.statusCode`  | `number`   | HTTP response status code eg `404`                                                      |
| `error.headers`     | `Headers`  | HTTP response headers                                                                   |
| `error.body`        | `string`   | HTTP body. Can be empty string if no body is returned.                                  |
| `error.rawResponse` | `Response` | Raw HTTP response                                                                       |
| `error.data$`       |            | Optional. Some errors may contain structured data. [See Error Classes](#error-classes). |

### Example
```typescript
import { Supermemory } from "supermemory";
import * as errors from "supermemory/models/errors";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  try {
    const result = await supermemory.add({
      content: "<value>",
    });

    console.log(result);
  } catch (error) {
    // The base class for HTTP error responses
    if (error instanceof errors.SupermemoryError) {
      console.log(error.message);
      console.log(error.statusCode);
      console.log(error.body);
      console.log(error.headers);

      // Depending on the method different errors may be thrown
      if (error instanceof errors.ErrorResponse) {
        console.log(error.data$.error); // string
        console.log(error.data$.details); // string
      }
    }
  }
}

run();

```

### Error Classes
**Primary errors:**
* [`SupermemoryError`](./src/models/errors/supermemory-error.ts): The base class for HTTP error responses.
  * [`ErrorResponse`](./src/models/errors/error-response.ts): *

<details><summary>Less common errors (6)</summary>

<br />

**Network errors:**
* [`ConnectionError`](./src/models/errors/http-client-errors.ts): HTTP client was unable to make a request to a server.
* [`RequestTimeoutError`](./src/models/errors/http-client-errors.ts): HTTP request timed out due to an AbortSignal signal.
* [`RequestAbortedError`](./src/models/errors/http-client-errors.ts): HTTP request was aborted by the client.
* [`InvalidRequestError`](./src/models/errors/http-client-errors.ts): Any input used to create a request is invalid.
* [`UnexpectedClientError`](./src/models/errors/http-client-errors.ts): Unrecognised or unexpected error.


**Inherit from [`SupermemoryError`](./src/models/errors/supermemory-error.ts)**:
* [`ResponseValidationError`](./src/models/errors/response-validation-error.ts): Type mismatch between the data returned from the server and the structure expected by the SDK. See `error.rawValue` for the raw value and `error.pretty()` for a nicely formatted multi-line string.

</details>

\* Check [the method documentation](#available-resources-and-operations) to see if the error is applicable.
<!-- End Error Handling [errors] -->

<!-- Start Server Selection [server] -->
## Server Selection

### Override Server URL Per-Client

The default server can be overridden globally by passing a URL to the `serverURL: string` optional parameter when initializing the SDK client instance. For example:
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  serverURL: "https://api.supermemory.ai",
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.add({
    content: "<value>",
  });

  console.log(result);
}

run();

```
<!-- End Server Selection [server] -->

<!-- Start Custom HTTP Client [http-client] -->
## Custom HTTP Client

The TypeScript SDK makes API calls using an `HTTPClient` that wraps the native
[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). This
client is a thin wrapper around `fetch` and provides the ability to attach hooks
around the request lifecycle that can be used to modify the request or handle
errors and response.

The `HTTPClient` constructor takes an optional `fetcher` argument that can be
used to integrate a third-party HTTP client or when writing tests to mock out
the HTTP client and feed in fixtures.

The following example shows how to:
- route requests through a proxy server using [undici](https://www.npmjs.com/package/undici)'s ProxyAgent
- use the `"beforeRequest"` hook to add a custom header and a timeout to requests
- use the `"requestError"` hook to log errors

```typescript
import { Supermemory } from "supermemory";
import { ProxyAgent } from "undici";
import { HTTPClient } from "supermemory/lib/http";

const dispatcher = new ProxyAgent("http://proxy.example.com:8080");

const httpClient = new HTTPClient({
  // 'fetcher' takes a function that has the same signature as native 'fetch'.
  fetcher: (input, init) =>
    // 'dispatcher' is specific to undici and not part of the standard Fetch API.
    fetch(input, { ...init, dispatcher } as RequestInit),
});

httpClient.addHook("beforeRequest", (request) => {
  const nextRequest = new Request(request, {
    signal: request.signal || AbortSignal.timeout(5000)
  });

  nextRequest.headers.set("x-custom-header", "custom value");

  return nextRequest;
});

httpClient.addHook("requestError", (error, request) => {
  console.group("Request Error");
  console.log("Reason:", `${error}`);
  console.log("Endpoint:", `${request.method} ${request.url}`);
  console.groupEnd();
});

const sdk = new Supermemory({ httpClient: httpClient });
```
<!-- End Custom HTTP Client [http-client] -->

<!-- Start Debugging [debug] -->
## Debugging

You can setup your SDK to emit debug logs for SDK requests and responses.

You can pass a logger that matches `console`'s interface as an SDK option.

> [!WARNING]
> Beware that debug logging will reveal secrets, like API tokens in headers, in log messages printed to a console or files. It's recommended to use this feature only during local development and not in production.

```typescript
import { Supermemory } from "supermemory";

const sdk = new Supermemory({ debugLogger: console });
```

You can also enable a default debug logger by setting an environment variable `SUPERMEMORY_DEBUG` to true.
<!-- End Debugging [debug] -->

<!-- Placeholder for Future Speakeasy SDK Sections -->

# Development

## Maturity

This SDK is in beta, and there may be breaking changes between versions without a major version update. Therefore, we recommend pinning usage
to a specific package version. This way, you can install the same version each time without breaking changes unless you are intentionally
looking for the latest version.

## Contributions

While we value open-source contributions to this SDK, this library is generated programmatically. Any manual changes added to internal files will be overwritten on the next generation. 
We look forward to hearing your feedback. Feel free to open a PR or an issue with a proof of concept and we'll do our best to include it in a future release. 

### SDK Created by [Speakeasy](https://www.speakeasy.com/?utm_source=supermemory&utm_campaign=typescript)
