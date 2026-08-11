# ContainerTags

## Overview

List and manage container tags (spaces) — settings, merge, and delete

### Available Operations

* [getV3ContainerTagsList](#getv3containertagslist) - List all container tags
* [getV3ContainerTagsByContainerTag](#getv3containertagsbycontainertag) - Get container tag settings
* [patchV3ContainerTagsByContainerTag](#patchv3containertagsbycontainertag) - Update container tag settings
* [deleteV3ContainerTagsByContainerTag](#deletev3containertagsbycontainertag) - Delete container tag
* [postV3ContainerTagsMerge](#postv3containertagsmerge) - Merge container tags
* [getV3ContainerTagsMergeByMergeId](#getv3containertagsmergebymergeid) - Get container tag merge status

## getV3ContainerTagsList

List all container tags with isNova flag

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getV3ContainerTagsList" method="get" path="/v3/container-tags/list" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.containerTags.getV3ContainerTagsList();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { containerTagsGetV3ContainerTagsList } from "supermemory/funcs/container-tags-get-v3-container-tags-list.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await containerTagsGetV3ContainerTagsList(supermemory);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("containerTagsGetV3ContainerTagsList failed:", res.error);
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

**Promise\<[operations.GetV3ContainerTagsListResponse[]](../../models/.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 401                            | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## getV3ContainerTagsByContainerTag

Get settings for a container tag

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getV3ContainerTagsByContainerTag" method="get" path="/v3/container-tags/{containerTag}" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.containerTags.getV3ContainerTagsByContainerTag({
    containerTag: "<value>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { containerTagsGetV3ContainerTagsByContainerTag } from "supermemory/funcs/container-tags-get-v3-container-tags-by-container-tag.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await containerTagsGetV3ContainerTagsByContainerTag(supermemory, {
    containerTag: "<value>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("containerTagsGetV3ContainerTagsByContainerTag failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetV3ContainerTagsByContainerTagRequest](../../models/operations/get-v3-container-tags-by-container-tag-request.md)                                                | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetV3ContainerTagsByContainerTagResponse](../../models/operations/get-v3-container-tags-by-container-tag-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 401, 404                       | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## patchV3ContainerTagsByContainerTag

Update settings for a container tag

### Example Usage

<!-- UsageSnippet language="typescript" operationID="patchV3ContainerTagsByContainerTag" method="patch" path="/v3/container-tags/{containerTag}" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.containerTags.patchV3ContainerTagsByContainerTag({
    containerTag: "<value>",
    body: {
      name: "Research Notes",
      entityContext: "This project contains research papers about machine learning.",
      memoryFilesystemPaths: [
        "/memory/",
        "/user.md",
      ],
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
import { containerTagsPatchV3ContainerTagsByContainerTag } from "supermemory/funcs/container-tags-patch-v3-container-tags-by-container-tag.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await containerTagsPatchV3ContainerTagsByContainerTag(supermemory, {
    containerTag: "<value>",
    body: {
      name: "Research Notes",
      entityContext: "This project contains research papers about machine learning.",
      memoryFilesystemPaths: [
        "/memory/",
        "/user.md",
      ],
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("containerTagsPatchV3ContainerTagsByContainerTag failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.PatchV3ContainerTagsByContainerTagRequest](../../models/operations/patch-v3-container-tags-by-container-tag-request.md)                                            | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.PatchV3ContainerTagsByContainerTagResponse](../../models/operations/patch-v3-container-tags-by-container-tag-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 400, 401, 404                  | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## deleteV3ContainerTagsByContainerTag

Delete a container tag and all its documents and memories. Only organization owners and admins can perform this action.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="deleteV3ContainerTagsByContainerTag" method="delete" path="/v3/container-tags/{containerTag}" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.containerTags.deleteV3ContainerTagsByContainerTag({
    containerTag: "<value>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { containerTagsDeleteV3ContainerTagsByContainerTag } from "supermemory/funcs/container-tags-delete-v3-container-tags-by-container-tag.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await containerTagsDeleteV3ContainerTagsByContainerTag(supermemory, {
    containerTag: "<value>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("containerTagsDeleteV3ContainerTagsByContainerTag failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.DeleteV3ContainerTagsByContainerTagRequest](../../models/operations/delete-v3-container-tags-by-container-tag-request.md)                                          | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.DeleteV3ContainerTagsByContainerTagResponse](../../models/operations/delete-v3-container-tags-by-container-tag-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 401, 403, 404                  | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## postV3ContainerTagsMerge

Merge multiple container tags into a target tag. All documents from the source tags will be updated to reference the target tag, and the source tags will be deleted after successful merge.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="postV3ContainerTagsMerge" method="post" path="/v3/container-tags/merge" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.containerTags.postV3ContainerTagsMerge({
    containerTags: [
      "<value 1>",
    ],
    targetContainerTag: "<value>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { containerTagsPostV3ContainerTagsMerge } from "supermemory/funcs/container-tags-post-v3-container-tags-merge.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await containerTagsPostV3ContainerTagsMerge(supermemory, {
    containerTags: [
      "<value 1>",
    ],
    targetContainerTag: "<value>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("containerTagsPostV3ContainerTagsMerge failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.PostV3ContainerTagsMergeRequest](../../models/operations/post-v3-container-tags-merge-request.md)                                                                  | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.PostV3ContainerTagsMergeResponse](../../models/operations/post-v3-container-tags-merge-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 400, 401, 403, 404             | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## getV3ContainerTagsMergeByMergeId

Get queued container tag merge status

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getV3ContainerTagsMergeByMergeId" method="get" path="/v3/container-tags/merge/{mergeId}" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.containerTags.getV3ContainerTagsMergeByMergeId({
    mergeId: "<id>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { SupermemoryCore } from "supermemory/core.js";
import { containerTagsGetV3ContainerTagsMergeByMergeId } from "supermemory/funcs/container-tags-get-v3-container-tags-merge-by-merge-id.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await containerTagsGetV3ContainerTagsMergeByMergeId(supermemory, {
    mergeId: "<id>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("containerTagsGetV3ContainerTagsMergeByMergeId failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetV3ContainerTagsMergeByMergeIdRequest](../../models/operations/get-v3-container-tags-merge-by-merge-id-request.md)                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetV3ContainerTagsMergeByMergeIdResponse](../../models/operations/get-v3-container-tags-merge-by-merge-id-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 404                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |