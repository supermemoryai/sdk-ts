# Ingest

## Overview

Ingest documents, files, URLs, conversations, and other content

### Available Operations

* [postV3Documents](#postv3documents) - Add document
* [postV3DocumentsBatch](#postv3documentsbatch) - Batch add documents
* [patchV3DocumentsById](#patchv3documentsbyid) - Update document
* [deleteV3DocumentsById](#deletev3documentsbyid) - Delete document by ID or customId
* [postV3DocumentsFile](#postv3documentsfile) - Upload a file
* [deleteV3DocumentsBulk](#deletev3documentsbulk) - Bulk delete documents
* [postV4Conversations](#postv4conversations) - Ingest or update conversation

## postV3Documents

Add a document with any content type (text, url, file, etc.) and metadata

### Example Usage

<!-- UsageSnippet language="typescript" operationID="postV3Documents" method="post" path="/v3/documents" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.ingest.postV3Documents({
    content: "<value>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { ingestPostV3Documents } from "supermemory/funcs/ingest-post-v3-documents.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await ingestPostV3Documents(supermemory, {
    content: "<value>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("ingestPostV3Documents failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.PostV3DocumentsRequest](../../models/operations/post-v3-documents-request.md)                                                                                      | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.PostV3DocumentsResponse](../../models/operations/post-v3-documents-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 401                            | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## postV3DocumentsBatch

Add multiple documents in a single request. Each document can have any content type (text, url, file, etc.) and metadata

### Example Usage

<!-- UsageSnippet language="typescript" operationID="postV3DocumentsBatch" method="post" path="/v3/documents/batch" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.ingest.postV3DocumentsBatch({
    containerTag: "user_alex",
    metadata: {
      "source": "upload",
      "language": "en",
    },
    taskType: "memory",
    filepath: "/documents/reports/file.pdf",
    filterByMetadata: {
      "department": "engineering",
      "region": "us",
    },
    entityContext: "User's name is {XYZ}",
    dreaming: "instant",
    documents: [
      "Our API rate limits are 100 req/min on free and 1000 on pro. Clients should use exponential backoff on 429s.",
    ],
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { ingestPostV3DocumentsBatch } from "supermemory/funcs/ingest-post-v3-documents-batch.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await ingestPostV3DocumentsBatch(supermemory, {
    containerTag: "user_alex",
    metadata: {
      "source": "upload",
      "language": "en",
    },
    taskType: "memory",
    filepath: "/documents/reports/file.pdf",
    filterByMetadata: {
      "department": "engineering",
      "region": "us",
    },
    entityContext: "User's name is {XYZ}",
    dreaming: "instant",
    documents: [
      "Our API rate limits are 100 req/min on free and 1000 on pro. Clients should use exponential backoff on 429s.",
    ],
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("ingestPostV3DocumentsBatch failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.PostV3DocumentsBatchRequest](../../models/operations/post-v3-documents-batch-request.md)                                                                           | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.PostV3DocumentsBatchResponse](../../models/operations/post-v3-documents-batch-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 401, 402                       | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## patchV3DocumentsById

Update a document with any content type (text, url, file, etc.) and metadata

### Example Usage

<!-- UsageSnippet language="typescript" operationID="patchV3DocumentsById" method="patch" path="/v3/documents/{id}" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.ingest.patchV3DocumentsById({
    id: "<id>",
    body: {
      containerTag: "user_alex",
      content: "Our API rate limits are 100 req/min on free and 1000 on pro. Clients should use exponential backoff on 429s.",
      customId: "doc-api-rate-limits",
      metadata: {
        "source": "upload",
        "language": "en",
      },
      taskType: "memory",
      filepath: "/documents/reports/file.pdf",
      filterByMetadata: {
        "department": "engineering",
        "region": "us",
      },
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
import { ingestPatchV3DocumentsById } from "supermemory/funcs/ingest-patch-v3-documents-by-id.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await ingestPatchV3DocumentsById(supermemory, {
    id: "<id>",
    body: {
      containerTag: "user_alex",
      content: "Our API rate limits are 100 req/min on free and 1000 on pro. Clients should use exponential backoff on 429s.",
      customId: "doc-api-rate-limits",
      metadata: {
        "source": "upload",
        "language": "en",
      },
      taskType: "memory",
      filepath: "/documents/reports/file.pdf",
      filterByMetadata: {
        "department": "engineering",
        "region": "us",
      },
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("ingestPatchV3DocumentsById failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.PatchV3DocumentsByIdRequest](../../models/operations/patch-v3-documents-by-id-request.md)                                                                          | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.PatchV3DocumentsByIdResponse](../../models/operations/patch-v3-documents-by-id-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 401, 404                       | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## deleteV3DocumentsById

Delete a document by ID or customId

### Example Usage

<!-- UsageSnippet language="typescript" operationID="deleteV3DocumentsById" method="delete" path="/v3/documents/{id}" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  await supermemory.ingest.deleteV3DocumentsById({
    id: "<id>",
  });


}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { ingestDeleteV3DocumentsById } from "supermemory/funcs/ingest-delete-v3-documents-by-id.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await ingestDeleteV3DocumentsById(supermemory, {
    id: "<id>",
  });
  if (res.ok) {
    const { value: result } = res;
    
  } else {
    console.log("ingestDeleteV3DocumentsById failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.DeleteV3DocumentsByIdRequest](../../models/operations/delete-v3-documents-by-id-request.md)                                                                        | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<void\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 401, 404                       | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## postV3DocumentsFile

Upload a file to be processed

### Example Usage

<!-- UsageSnippet language="typescript" operationID="postV3DocumentsFile" method="post" path="/v3/documents/file" -->
```typescript
import { openAsBlob } from "node:fs";
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.ingest.postV3DocumentsFile({
    file: await openAsBlob("example.file"),
    containerTag: "user",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { openAsBlob } from "node:fs";
import { SupermemoryCore } from "supermemory/core.js";
import { ingestPostV3DocumentsFile } from "supermemory/funcs/ingest-post-v3-documents-file.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await ingestPostV3DocumentsFile(supermemory, {
    file: await openAsBlob("example.file"),
    containerTag: "user",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("ingestPostV3DocumentsFile failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.PostV3DocumentsFileRequest](../../models/operations/post-v3-documents-file-request.md)                                                                             | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.PostV3DocumentsFileResponse](../../models/operations/post-v3-documents-file-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 401                            | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## deleteV3DocumentsBulk

Bulk delete documents by IDs or container tags

### Example Usage

<!-- UsageSnippet language="typescript" operationID="deleteV3DocumentsBulk" method="delete" path="/v3/documents/bulk" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.ingest.deleteV3DocumentsBulk({
    ids: [
      "acxV5LHMEsG2hMSNb4umbn",
      "bxcV5LHMEsG2hMSNb4umbn",
    ],
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { ingestDeleteV3DocumentsBulk } from "supermemory/funcs/ingest-delete-v3-documents-bulk.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await ingestDeleteV3DocumentsBulk(supermemory, {
    ids: [
      "acxV5LHMEsG2hMSNb4umbn",
      "bxcV5LHMEsG2hMSNb4umbn",
    ],
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("ingestDeleteV3DocumentsBulk failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.DeleteV3DocumentsBulkRequest](../../models/operations/delete-v3-documents-bulk-request.md)                                                                         | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.DeleteV3DocumentsBulkResponse](../../models/operations/delete-v3-documents-bulk-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 400, 401                       | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## postV4Conversations

Ingest or update a conversation

### Example Usage

<!-- UsageSnippet language="typescript" operationID="postV4Conversations" method="post" path="/v4/conversations" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  await supermemory.ingest.postV4Conversations({
    conversationId: "<id>",
    messages: [],
  });


}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { ingestPostV4Conversations } from "supermemory/funcs/ingest-post-v4-conversations.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await ingestPostV4Conversations(supermemory, {
    conversationId: "<id>",
    messages: [],
  });
  if (res.ok) {
    const { value: result } = res;
    
  } else {
    console.log("ingestPostV4Conversations failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.PostV4ConversationsRequest](../../models/operations/post-v4-conversations-request.md)                                                                              | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<void\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |