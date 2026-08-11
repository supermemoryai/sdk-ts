# Documents

## Overview

List, get, and search documents

### Available Operations

* [getV3DocumentsById](#getv3documentsbyid) - Get document
* [postV3DocumentsList](#postv3documentslist) - List documents
* [getV3DocumentsProcessing](#getv3documentsprocessing) - Get processing documents
* [getV3DocumentsByIdChunks](#getv3documentsbyidchunks) - Get document chunks
* [getV3DocumentsByIdFileUrl](#getv3documentsbyidfileurl) - Get presigned file URL
* [postV3Search](#postv3search) - Search documents

## getV3DocumentsById

Get a document by ID

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getV3DocumentsById" method="get" path="/v3/documents/{id}" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.documents.getV3DocumentsById({
    id: "<id>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { documentsGetV3DocumentsById } from "supermemory/funcs/documents-get-v3-documents-by-id.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await documentsGetV3DocumentsById(supermemory, {
    id: "<id>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("documentsGetV3DocumentsById failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetV3DocumentsByIdRequest](../../models/operations/get-v3-documents-by-id-request.md)                                                                              | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetV3DocumentsByIdResponse](../../models/operations/get-v3-documents-by-id-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 401, 404                       | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## postV3DocumentsList

Retrieves a paginated list of documents with their metadata and workflow status

### Example Usage

<!-- UsageSnippet language="typescript" operationID="postV3DocumentsList" method="post" path="/v3/documents/list" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.documents.postV3DocumentsList({
    filters: {
      and: [
        {
          filterType: "metadata",
          key: "group",
          negate: false,
          numericOperator: "=",
          value: "jira_users",
        },
        {
          filterType: "numeric",
          key: "timestamp",
          negate: false,
          numericOperator: ">",
          value: "1742745777",
        },
      ],
    },
    limit: 10,
    page: 1,
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { documentsPostV3DocumentsList } from "supermemory/funcs/documents-post-v3-documents-list.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await documentsPostV3DocumentsList(supermemory, {
    filters: {
      and: [
        {
          filterType: "metadata",
          key: "group",
          negate: false,
          numericOperator: "=",
          value: "jira_users",
        },
        {
          filterType: "numeric",
          key: "timestamp",
          negate: false,
          numericOperator: ">",
          value: "1742745777",
        },
      ],
    },
    limit: 10,
    page: 1,
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("documentsPostV3DocumentsList failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.PostV3DocumentsListRequest](../../models/operations/post-v3-documents-list-request.md)                                                                             | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.PostV3DocumentsListResponse](../../models/operations/post-v3-documents-list-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 400, 401                       | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## getV3DocumentsProcessing

Get documents that are currently being processed

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getV3DocumentsProcessing" method="get" path="/v3/documents/processing" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.documents.getV3DocumentsProcessing();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { documentsGetV3DocumentsProcessing } from "supermemory/funcs/documents-get-v3-documents-processing.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await documentsGetV3DocumentsProcessing(supermemory);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("documentsGetV3DocumentsProcessing failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetV3DocumentsProcessingResponse](../../models/operations/get-v3-documents-processing-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 401                            | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## getV3DocumentsByIdChunks

Get all chunks for a document, ordered by position

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getV3DocumentsByIdChunks" method="get" path="/v3/documents/{id}/chunks" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.documents.getV3DocumentsByIdChunks({
    id: "<id>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { documentsGetV3DocumentsByIdChunks } from "supermemory/funcs/documents-get-v3-documents-by-id-chunks.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await documentsGetV3DocumentsByIdChunks(supermemory, {
    id: "<id>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("documentsGetV3DocumentsByIdChunks failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetV3DocumentsByIdChunksRequest](../../models/operations/get-v3-documents-by-id-chunks-request.md)                                                                 | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetV3DocumentsByIdChunksResponse](../../models/operations/get-v3-documents-by-id-chunks-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 401, 404                       | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## getV3DocumentsByIdFileUrl

Get a fresh presigned URL for a document's file. Returns a time-limited URL (24h) that can be used to download the file.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getV3DocumentsByIdFileUrl" method="get" path="/v3/documents/{id}/file-url" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.documents.getV3DocumentsByIdFileUrl({
    id: "<id>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { documentsGetV3DocumentsByIdFileUrl } from "supermemory/funcs/documents-get-v3-documents-by-id-file-url.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await documentsGetV3DocumentsByIdFileUrl(supermemory, {
    id: "<id>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("documentsGetV3DocumentsByIdFileUrl failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetV3DocumentsByIdFileUrlRequest](../../models/operations/get-v3-documents-by-id-file-url-request.md)                                                              | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetV3DocumentsByIdFileUrlResponse](../../models/operations/get-v3-documents-by-id-file-url-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 401, 404                       | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## postV3Search

Search memories with advanced filtering

### Example Usage

<!-- UsageSnippet language="typescript" operationID="postV3Search" method="post" path="/v3/search" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.documents.postV3Search({
    chunkThreshold: 0.5,
    containerTag: "user_alex",
    q: "what are the API rate limits",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { documentsPostV3Search } from "supermemory/funcs/documents-post-v3-search.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await documentsPostV3Search(supermemory, {
    chunkThreshold: 0.5,
    containerTag: "user_alex",
    q: "what are the API rate limits",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("documentsPostV3Search failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.PostV3SearchRequest](../../models/operations/post-v3-search-request.md)                                                                                            | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.PostV3SearchResponse](../../models/operations/post-v3-search-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 400, 401, 402, 404             | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |