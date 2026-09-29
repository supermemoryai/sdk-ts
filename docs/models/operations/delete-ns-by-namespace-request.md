# DeleteNsByNamespaceRequest

## Example Usage

```typescript
import { DeleteNsByNamespaceRequest } from "supermemory/models/operations";

let value: DeleteNsByNamespaceRequest = {
  namespace: "user_alex",
};
```

## Fields

| Field                                                                                                                                         | Type                                                                                                                                          | Required                                                                                                                                      | Description                                                                                                                                   | Example                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `namespace`                                                                                                                                   | *string*                                                                                                                                      | :heavy_check_mark:                                                                                                                            | Namespace identifier. This can be an ID for your user, a project ID, or any other identifier you wish to use to scope documents and memories. | user_alex                                                                                                                                     |
| `body`                                                                                                                                        | [operations.DeleteNsByNamespaceRequestBody](../../models/operations/delete-ns-by-namespace-request-body.md)                                   | :heavy_minus_sign:                                                                                                                            | N/A                                                                                                                                           |                                                                                                                                               |