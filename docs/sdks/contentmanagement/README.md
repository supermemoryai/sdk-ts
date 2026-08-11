# ContentManagement

## Overview

### Available Operations

* [createMemories](#creatememories) - Create memories directly
* [forgetMemory](#forgetmemory) - Forget a memory
* [updateMemory](#updatememory) - Update a memory (creates new version)
* [forgetMatchingMemories](#forgetmatchingmemories) - Forget memories matching a prompt/query
* [listMemories](#listmemories) - List memory entries with history

## createMemories

Create memories directly, bypassing the document ingestion workflow. Generates embeddings and makes them immediately searchable.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="postV4Memories" method="post" path="/v4/memories" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.contentManagement.createMemories({
    memories: [
      {
        content: "John prefers dark mode",
        isStatic: false,
        forgetAfter: "2026-06-01T00:00:00Z",
        forgetReason: "temporary project deadline",
      },
    ],
    containerTag: "user_123",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { contentManagementCreateMemories } from "supermemory/funcs/content-management-create-memories.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await contentManagementCreateMemories(supermemory, {
    memories: [
      {
        content: "John prefers dark mode",
        isStatic: false,
        forgetAfter: "2026-06-01T00:00:00Z",
        forgetReason: "temporary project deadline",
      },
    ],
    containerTag: "user_123",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("contentManagementCreateMemories failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.PostV4MemoriesRequest](../../models/operations/post-v4-memories-request.md)                                                                                        | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.PostV4MemoriesResponse](../../models/operations/post-v4-memories-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 400, 401, 404                  | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## forgetMemory

Forget (soft delete) a memory entry. The memory is marked as forgotten but not permanently deleted.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="deleteV4Memories" method="delete" path="/v4/memories" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.contentManagement.forgetMemory({
    id: "mem_abc123",
    content: "John prefers dark mode",
    containerTag: "user_123",
    reason: "outdated information",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { contentManagementForgetMemory } from "supermemory/funcs/content-management-forget-memory.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await contentManagementForgetMemory(supermemory, {
    id: "mem_abc123",
    content: "John prefers dark mode",
    containerTag: "user_123",
    reason: "outdated information",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("contentManagementForgetMemory failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.DeleteV4MemoriesRequest](../../models/operations/delete-v4-memories-request.md)                                                                                    | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.DeleteV4MemoriesResponse](../../models/operations/delete-v4-memories-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 400, 401, 404, 409             | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## updateMemory

Update a memory by creating a new version. The original memory is preserved with isLatest=false.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="patchV4Memories" method="patch" path="/v4/memories" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.contentManagement.updateMemory({
    id: "mem_abc123",
    content: "John prefers dark mode",
    containerTag: "user_123",
    newContent: "John now prefers light mode",
    forgetAfter: "2026-06-01T00:00:00Z",
    forgetReason: "temporary project deadline",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { contentManagementUpdateMemory } from "supermemory/funcs/content-management-update-memory.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await contentManagementUpdateMemory(supermemory, {
    id: "mem_abc123",
    content: "John prefers dark mode",
    containerTag: "user_123",
    newContent: "John now prefers light mode",
    forgetAfter: "2026-06-01T00:00:00Z",
    forgetReason: "temporary project deadline",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("contentManagementUpdateMemory failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.PatchV4MemoriesRequest](../../models/operations/patch-v4-memories-request.md)                                                                                      | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.PatchV4MemoriesResponse](../../models/operations/patch-v4-memories-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 400, 401, 404                  | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## forgetMatchingMemories

Agentic mass-forget. Given a prompt or query, a tool-calling agent searches the container's memories and soft-deletes everything matching the target. Use dryRun to preview first.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="postV4MemoriesForgetMatching" method="post" path="/v4/memories/forget-matching" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.contentManagement.forgetMatchingMemories({
    query: "forget everything about Project Titan",
    ids: [
      "abc123",
      "def456",
    ],
    containerTag: "user_123",
    reason: "project cancelled",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { contentManagementForgetMatchingMemories } from "supermemory/funcs/content-management-forget-matching-memories.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await contentManagementForgetMatchingMemories(supermemory, {
    query: "forget everything about Project Titan",
    ids: [
      "abc123",
      "def456",
    ],
    containerTag: "user_123",
    reason: "project cancelled",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("contentManagementForgetMatchingMemories failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.PostV4MemoriesForgetMatchingRequest](../../models/operations/post-v4-memories-forget-matching-request.md)                                                          | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.PostV4MemoriesForgetMatchingResponse](../../models/operations/post-v4-memories-forget-matching-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 400, 401                       | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## listMemories

List all latest memory entries from specified container tags with their update history and source documents

### Example Usage

<!-- UsageSnippet language="typescript" operationID="postV4MemoriesList" method="post" path="/v4/memories/list" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.contentManagement.listMemories({
    containerTags: [
      "<value 1>",
      "<value 2>",
      "<value 3>",
    ],
    limit: "10",
    page: "1",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { contentManagementListMemories } from "supermemory/funcs/content-management-list-memories.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await contentManagementListMemories(supermemory, {
    containerTags: [
      "<value 1>",
      "<value 2>",
      "<value 3>",
    ],
    limit: "10",
    page: "1",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("contentManagementListMemories failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.PostV4MemoriesListRequest](../../models/operations/post-v4-memories-list-request.md)                                                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.PostV4MemoriesListResponse](../../models/operations/post-v4-memories-list-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 400, 401                       | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |