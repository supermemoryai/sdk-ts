# DeleteNsByNamespaceMemoriesRequest

## Example Usage

```typescript
import { DeleteNsByNamespaceMemoriesRequest } from "supermemory/models/operations";

let value: DeleteNsByNamespaceMemoriesRequest = {
  namespace: "user_alex",
  body: {
    ids: [
      "mem_abc123",
    ],
  },
};
```

## Fields

| Field                                                                                                                                                  | Type                                                                                                                                                   | Required                                                                                                                                               | Description                                                                                                                                            | Example                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `namespace`                                                                                                                                            | *string*                                                                                                                                               | :heavy_check_mark:                                                                                                                                     | Namespace containing the memories to forget. This can be an ID for your user, a project ID, or any other identifier you wish to use to scope memories. | user_alex                                                                                                                                              |
| `body`                                                                                                                                                 | [operations.DeleteNsByNamespaceMemoriesRequestBody](../../models/operations/delete-ns-by-namespace-memories-request-body.md)                           | :heavy_check_mark:                                                                                                                                     | N/A                                                                                                                                                    |                                                                                                                                                        |