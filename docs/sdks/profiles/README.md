# Profiles

## Overview

### Available Operations

* [getBuckets](#getbuckets) - Get profile buckets
* [setBuckets](#setbuckets) - Add or update profile buckets
* [deleteBuckets](#deletebuckets) - Delete profile buckets

## getBuckets

Inspect the profile taxonomy active in this namespace. The response combines organization-wide buckets with namespace-owned additions as a concise name-to-description map.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getNsByNamespaceProfileBuckets" method="get" path="/ns/{namespace}/profile/buckets" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.profiles.getBuckets({
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
import { profilesGetBuckets } from "supermemory/funcs/profiles-get-buckets.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await profilesGetBuckets(supermemory, {
    namespace: "user_alex",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("profilesGetBuckets failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetNsByNamespaceProfileBucketsRequest](../../models/operations/get-ns-by-namespace-profile-buckets-request.md)                                                     | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.GetNsByNamespaceProfileBucketsResponse](../../models/operations/get-ns-by-namespace-profile-buckets-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 400                            | application/json               |
| errors.ValidationErrorResponse | 400                            | application/json               |
| errors.ErrorResponse           | 401, 403                       | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## setBuckets

Teach Supermemory new ways to organize this namespace's profile, or refine how existing namespace-owned buckets are classified. Omitted buckets remain unchanged and organization-wide buckets stay protected.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="putNsByNamespaceProfileBuckets" method="put" path="/ns/{namespace}/profile/buckets" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.profiles.setBuckets({
    namespace: "user_alex",
    body: {
      buckets: {
        "interests": "Topics the subject actively follows",
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
import { profilesSetBuckets } from "supermemory/funcs/profiles-set-buckets.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await profilesSetBuckets(supermemory, {
    namespace: "user_alex",
    body: {
      buckets: {
        "interests": "Topics the subject actively follows",
      },
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("profilesSetBuckets failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.PutNsByNamespaceProfileBucketsRequest](../../models/operations/put-ns-by-namespace-profile-buckets-request.md)                                                     | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.PutNsByNamespaceProfileBucketsResponse](../../models/operations/put-ns-by-namespace-profile-buckets-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 400                            | application/json               |
| errors.ValidationErrorResponse | 400                            | application/json               |
| errors.ErrorResponse           | 401, 403, 404, 409             | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |

## deleteBuckets

Remove profile categories created specifically for this namespace. Unknown names are safely ignored, while organization-wide buckets remain protected.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="deleteNsByNamespaceProfileBuckets" method="delete" path="/ns/{namespace}/profile/buckets" -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.profiles.deleteBuckets({
    namespace: "user_alex",
    body: {
      buckets: [
        "interests",
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
import { profilesDeleteBuckets } from "supermemory/funcs/profiles-delete-buckets.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await profilesDeleteBuckets(supermemory, {
    namespace: "user_alex",
    body: {
      buckets: [
        "interests",
      ],
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("profilesDeleteBuckets failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.DeleteNsByNamespaceProfileBucketsRequest](../../models/operations/delete-ns-by-namespace-profile-buckets-request.md)                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.DeleteNsByNamespaceProfileBucketsResponse](../../models/operations/delete-ns-by-namespace-profile-buckets-response.md)\>**

### Errors

| Error Type                     | Status Code                    | Content Type                   |
| ------------------------------ | ------------------------------ | ------------------------------ |
| errors.ErrorResponse           | 400                            | application/json               |
| errors.ValidationErrorResponse | 400                            | application/json               |
| errors.ErrorResponse           | 401, 403, 404, 409             | application/json               |
| errors.ErrorResponse           | 500                            | application/json               |
| errors.SupermemoryDefaultError | 4XX, 5XX                       | \*/\*                          |