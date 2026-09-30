# DeleteNsByNamespaceProfileBucketsRequest

## Example Usage

```typescript
import { DeleteNsByNamespaceProfileBucketsRequest } from "supermemory/models/operations";

let value: DeleteNsByNamespaceProfileBucketsRequest = {
  namespace: "user_alex",
  body: {
    buckets: [
      "interests",
    ],
  },
};
```

## Fields

| Field                                                                                                                                       | Type                                                                                                                                        | Required                                                                                                                                    | Description                                                                                                                                 | Example                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `namespace`                                                                                                                                 | *string*                                                                                                                                    | :heavy_check_mark:                                                                                                                          | The isolated namespace to search. This can be an ID for your user, a project ID, or any other identifier you wish to use to scope memories. | user_alex                                                                                                                                   |
| `body`                                                                                                                                      | [operations.DeleteNsByNamespaceProfileBucketsRequestBody](../../models/operations/delete-ns-by-namespace-profile-buckets-request-body.md)   | :heavy_check_mark:                                                                                                                          | N/A                                                                                                                                         |                                                                                                                                             |