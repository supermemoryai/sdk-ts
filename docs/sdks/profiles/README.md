# Profiles

## Overview

Entity profiles for users, participants, or any entity — includes profile search

### Available Operations

* [postV4Profile](#postv4profile) - Get user profile
* [postV4ProfileBuckets](#postv4profilebuckets) - Get profile buckets

## postV4Profile

Get user profile with optional search results

### Example Usage

<!-- UsageSnippet language="typescript" operationID="postV4Profile" method="post" path="/v4/profile" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.profiles.postV4Profile({
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
import { profilesPostV4Profile } from "supermemory/funcs/profiles-post-v4-profile.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await profilesPostV4Profile(supermemory, {
    containerTag: "<value>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("profilesPostV4Profile failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.PostV4ProfileRequest](../../models/operations/post-v4-profile-request.md)                                                                                          | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.PostV4ProfileResponse](../../models/operations/post-v4-profile-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 400, 401, 402                  | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## postV4ProfileBuckets

Returns the effective profile bucket definitions for a given container tag — org-level buckets merged with any container-tag-level additions.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="postV4ProfileBuckets" method="post" path="/v4/profile/buckets" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.profiles.postV4ProfileBuckets({
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
import { profilesPostV4ProfileBuckets } from "supermemory/funcs/profiles-post-v4-profile-buckets.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const res = await profilesPostV4ProfileBuckets(supermemory, {
    containerTag: "<value>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("profilesPostV4ProfileBuckets failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.PostV4ProfileBucketsRequest](../../models/operations/post-v4-profile-buckets-request.md)                                                                           | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.PostV4ProfileBucketsResponse](../../models/operations/post-v4-profile-buckets-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 401                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |