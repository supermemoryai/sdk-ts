# DeleteNsByNamespaceMemoriesSemanticRequest

## Example Usage

```typescript
import { DeleteNsByNamespaceMemoriesSemanticRequest } from "supermemory/models/operations";

let value: DeleteNsByNamespaceMemoriesSemanticRequest = {
  namespace: "user_alex",
  body: {
    query: "everything about the old pricing plans",
    dryRun: true,
  },
};
```

## Fields

| Field                                                                                                                                                  | Type                                                                                                                                                   | Required                                                                                                                                               | Description                                                                                                                                            | Example                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `namespace`                                                                                                                                            | *string*                                                                                                                                               | :heavy_check_mark:                                                                                                                                     | Namespace containing the memories to forget. This can be an ID for your user, a project ID, or any other identifier you wish to use to scope memories. | user_alex                                                                                                                                              |
| `body`                                                                                                                                                 | [operations.DeleteNsByNamespaceMemoriesSemanticRequestBody](../../models/operations/delete-ns-by-namespace-memories-semantic-request-body.md)          | :heavy_check_mark:                                                                                                                                     | N/A                                                                                                                                                    |                                                                                                                                                        |