# PutNsByNamespaceProfileBucketsRequest

## Example Usage

```typescript
import { PutNsByNamespaceProfileBucketsRequest } from "supermemory/models/operations";

let value: PutNsByNamespaceProfileBucketsRequest = {
  namespace: "user_alex",
  body: {
    buckets: {
      "interests": "Topics the subject actively follows",
    },
  },
};
```

## Fields

| Field                                                                                                                                       | Type                                                                                                                                        | Required                                                                                                                                    | Description                                                                                                                                 | Example                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `namespace`                                                                                                                                 | *string*                                                                                                                                    | :heavy_check_mark:                                                                                                                          | The isolated namespace to search. This can be an ID for your user, a project ID, or any other identifier you wish to use to scope memories. | user_alex                                                                                                                                   |
| `body`                                                                                                                                      | [operations.PutNsByNamespaceProfileBucketsRequestBody](../../models/operations/put-ns-by-namespace-profile-buckets-request-body.md)         | :heavy_check_mark:                                                                                                                          | N/A                                                                                                                                         |                                                                                                                                             |