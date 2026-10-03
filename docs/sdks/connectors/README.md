# Connectors

## Overview

Sync external sources such as Google Drive, Notion and GitHub into a namespace

### Available Operations

* [getConnectors](#getconnectors) - List all connectors
* [postNsByNamespaceConnectors](#postnsbynamespaceconnectors) - Create connector
* [getNsByNamespaceConnectors](#getnsbynamespaceconnectors) - List connectors
* [getNsByNamespaceConnectorsById](#getnsbynamespaceconnectorsbyid) - Get connector
* [patchNsByNamespaceConnectorsById](#patchnsbynamespaceconnectorsbyid) - Update connector
* [deleteNsByNamespaceConnectorsById](#deletensbynamespaceconnectorsbyid) - Delete connector
* [postNsByNamespaceConnectorsByIdSync](#postnsbynamespaceconnectorsbyidsync) - Sync connector

## getConnectors

List connectors across every namespace this key can read. Use it for admin views that span users or projects.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getConnectors" method="get" path="/connectors" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.connectors.getConnectors({});

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { connectorsGetConnectors } from "supermemory/funcs/connectors-get-connectors.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await connectorsGetConnectors(supermemory, {});
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("connectorsGetConnectors failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetConnectorsRequest](../../models/operations/get-connectors-request.md)                                                                                           | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetConnectorsResponse](../../models/operations/get-connectors-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 400                            | application/json               |
| errors.ValidationErrorResponse | 400                            | application/json               |
| errors.ErrorResponse           | 401, 403                       | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## postNsByNamespaceConnectors

Connect an external source to this namespace. OAuth providers return an authUrl to send the user to; providers that authenticate with config start syncing right away.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="postNsByNamespaceConnectors" method="post" path="/ns/{namespace}/connectors" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.connectors.postNsByNamespaceConnectors({
    namespace: "user_alex",
    body: {
      provider: "github",
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { connectorsPostNsByNamespaceConnectors } from "supermemory/funcs/connectors-post-ns-by-namespace-connectors.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await connectorsPostNsByNamespaceConnectors(supermemory, {
    namespace: "user_alex",
    body: {
      provider: "github",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("connectorsPostNsByNamespaceConnectors failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.PostNsByNamespaceConnectorsRequest](../../models/operations/post-ns-by-namespace-connectors-request.md)                                                            | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.PostNsByNamespaceConnectorsResponse](../../models/operations/post-ns-by-namespace-connectors-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 400                            | application/json               |
| errors.ValidationErrorResponse | 400                            | application/json               |
| errors.ErrorResponse           | 401, 402, 403                  | application/json               |
| errors.ErrorResponse           | 500, 503                       | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## getNsByNamespaceConnectors

List the connectors that sync into this namespace.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getNsByNamespaceConnectors" method="get" path="/ns/{namespace}/connectors" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.connectors.getNsByNamespaceConnectors({
    namespace: "user_alex",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { connectorsGetNsByNamespaceConnectors } from "supermemory/funcs/connectors-get-ns-by-namespace-connectors.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await connectorsGetNsByNamespaceConnectors(supermemory, {
    namespace: "user_alex",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("connectorsGetNsByNamespaceConnectors failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetNsByNamespaceConnectorsRequest](../../models/operations/get-ns-by-namespace-connectors-request.md)                                                              | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetNsByNamespaceConnectorsResponse](../../models/operations/get-ns-by-namespace-connectors-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 400                            | application/json               |
| errors.ValidationErrorResponse | 400                            | application/json               |
| errors.ErrorResponse           | 401, 403                       | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## getNsByNamespaceConnectorsById

Read one connector. Add attach=syncs to include its recent sync runs and the items that failed. attach=picker needs an admin with write access, since the link changes what syncs.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getNsByNamespaceConnectorsById" method="get" path="/ns/{namespace}/connectors/{id}" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.connectors.getNsByNamespaceConnectorsById({
    namespace: "user_alex",
    id: "PTzGiUYei7pgzg5buzZHgA",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { connectorsGetNsByNamespaceConnectorsById } from "supermemory/funcs/connectors-get-ns-by-namespace-connectors-by-id.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await connectorsGetNsByNamespaceConnectorsById(supermemory, {
    namespace: "user_alex",
    id: "PTzGiUYei7pgzg5buzZHgA",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("connectorsGetNsByNamespaceConnectorsById failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetNsByNamespaceConnectorsByIdRequest](../../models/operations/get-ns-by-namespace-connectors-by-id-request.md)                                                    | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetNsByNamespaceConnectorsByIdResponse](../../models/operations/get-ns-by-namespace-connectors-by-id-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 400                            | application/json               |
| errors.ValidationErrorResponse | 400                            | application/json               |
| errors.ErrorResponse           | 401, 403, 404                  | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## patchNsByNamespaceConnectorsById

Change what a connector syncs. A new selection replaces the old one and starts a sync.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="patchNsByNamespaceConnectorsById" method="patch" path="/ns/{namespace}/connectors/{id}" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.connectors.patchNsByNamespaceConnectorsById({
    namespace: "user_alex",
    id: "PTzGiUYei7pgzg5buzZHgA",
    body: {},
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { connectorsPatchNsByNamespaceConnectorsById } from "supermemory/funcs/connectors-patch-ns-by-namespace-connectors-by-id.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await connectorsPatchNsByNamespaceConnectorsById(supermemory, {
    namespace: "user_alex",
    id: "PTzGiUYei7pgzg5buzZHgA",
    body: {},
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("connectorsPatchNsByNamespaceConnectorsById failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.PatchNsByNamespaceConnectorsByIdRequest](../../models/operations/patch-ns-by-namespace-connectors-by-id-request.md)                                                | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.PatchNsByNamespaceConnectorsByIdResponse](../../models/operations/patch-ns-by-namespace-connectors-by-id-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 400                            | application/json               |
| errors.ValidationErrorResponse | 400                            | application/json               |
| errors.ErrorResponse           | 401, 403, 404                  | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## deleteNsByNamespaceConnectorsById

Disconnect a connector and stop its webhooks. Its imported documents are deleted too unless deleteDocuments is false.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="deleteNsByNamespaceConnectorsById" method="delete" path="/ns/{namespace}/connectors/{id}" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.connectors.deleteNsByNamespaceConnectorsById({
    namespace: "user_alex",
    id: "PTzGiUYei7pgzg5buzZHgA",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { connectorsDeleteNsByNamespaceConnectorsById } from "supermemory/funcs/connectors-delete-ns-by-namespace-connectors-by-id.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await connectorsDeleteNsByNamespaceConnectorsById(supermemory, {
    namespace: "user_alex",
    id: "PTzGiUYei7pgzg5buzZHgA",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("connectorsDeleteNsByNamespaceConnectorsById failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.DeleteNsByNamespaceConnectorsByIdRequest](../../models/operations/delete-ns-by-namespace-connectors-by-id-request.md)                                              | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.DeleteNsByNamespaceConnectorsByIdResponse](../../models/operations/delete-ns-by-namespace-connectors-by-id-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 400                            | application/json               |
| errors.ValidationErrorResponse | 400                            | application/json               |
| errors.ErrorResponse           | 401, 403, 404                  | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## postNsByNamespaceConnectorsByIdSync

Start a sync now. Returns 409 while a sync for this connector is already running.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="postNsByNamespaceConnectorsByIdSync" method="post" path="/ns/{namespace}/connectors/{id}/sync" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.connectors.postNsByNamespaceConnectorsByIdSync({
    namespace: "user_alex",
    id: "PTzGiUYei7pgzg5buzZHgA",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { connectorsPostNsByNamespaceConnectorsByIdSync } from "supermemory/funcs/connectors-post-ns-by-namespace-connectors-by-id-sync.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await connectorsPostNsByNamespaceConnectorsByIdSync(supermemory, {
    namespace: "user_alex",
    id: "PTzGiUYei7pgzg5buzZHgA",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("connectorsPostNsByNamespaceConnectorsByIdSync failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.PostNsByNamespaceConnectorsByIdSyncRequest](../../models/operations/post-ns-by-namespace-connectors-by-id-sync-request.md)                                         | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.PostNsByNamespaceConnectorsByIdSyncResponse](../../models/operations/post-ns-by-namespace-connectors-by-id-sync-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 400                            | application/json               |
| errors.ValidationErrorResponse | 400                            | application/json               |
| errors.ErrorResponse           | 401, 402, 403, 404, 409        | application/json               |
| errors.ErrorResponse           | 500, 503                       | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |