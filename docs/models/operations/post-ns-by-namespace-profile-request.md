# PostNsByNamespaceProfileRequest

## Example Usage

```typescript
import { PostNsByNamespaceProfileRequest } from "supermemory/models/operations";

let value: PostNsByNamespaceProfileRequest = {
  namespace: "user_alex",
};
```

## Fields

| Field                                                                                                                                       | Type                                                                                                                                        | Required                                                                                                                                    | Description                                                                                                                                 | Example                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `namespace`                                                                                                                                 | *string*                                                                                                                                    | :heavy_check_mark:                                                                                                                          | The isolated namespace to search. This can be an ID for your user, a project ID, or any other identifier you wish to use to scope memories. | user_alex                                                                                                                                   |
| `body`                                                                                                                                      | [operations.PostNsByNamespaceProfileRequestBody](../../models/operations/post-ns-by-namespace-profile-request-body.md)                      | :heavy_minus_sign:                                                                                                                          | N/A                                                                                                                                         |                                                                                                                                             |