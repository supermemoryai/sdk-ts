# DeleteNsByNamespaceMemoriesSemanticResponse

Semantic memory forget completed or previewed

## Example Usage

```typescript
import { DeleteNsByNamespaceMemoriesSemanticResponse } from "supermemory/models/operations";

let value: DeleteNsByNamespaceMemoriesSemanticResponse = {
  count: 130443,
  errors: [],
  matches: [
    {
      id: "<id>",
      memory: "<value>",
    },
  ],
};
```

## Fields

| Field                                                                                                                              | Type                                                                                                                               | Required                                                                                                                           | Description                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `count`                                                                                                                            | *number*                                                                                                                           | :heavy_check_mark:                                                                                                                 | Number of memories matched by this operation                                                                                       |
| `errors`                                                                                                                           | [operations.DeleteNsByNamespaceMemoriesSemanticError](../../models/operations/delete-ns-by-namespace-memories-semantic-error.md)[] | :heavy_check_mark:                                                                                                                 | Per-memory failures for exact-ID requests                                                                                          |
| `matches`                                                                                                                          | [operations.DeleteNsByNamespaceMemoriesSemanticMatch](../../models/operations/delete-ns-by-namespace-memories-semantic-match.md)[] | :heavy_check_mark:                                                                                                                 | Memories selected by the operation, whether previewed or forgotten                                                                 |