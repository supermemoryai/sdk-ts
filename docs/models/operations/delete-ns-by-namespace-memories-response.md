# DeleteNsByNamespaceMemoriesResponse

Exact memory forget completed

## Example Usage

```typescript
import { DeleteNsByNamespaceMemoriesResponse } from "supermemory/models/operations";

let value: DeleteNsByNamespaceMemoriesResponse = {
  count: 228552,
  errors: [],
  matches: [],
};
```

## Fields

| Field                                                                                                             | Type                                                                                                              | Required                                                                                                          | Description                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `count`                                                                                                           | *number*                                                                                                          | :heavy_check_mark:                                                                                                | Number of memories matched by this operation                                                                      |
| `errors`                                                                                                          | [operations.DeleteNsByNamespaceMemoriesError](../../models/operations/delete-ns-by-namespace-memories-error.md)[] | :heavy_check_mark:                                                                                                | Per-memory failures for exact-ID requests                                                                         |
| `matches`                                                                                                         | [operations.DeleteNsByNamespaceMemoriesMatch](../../models/operations/delete-ns-by-namespace-memories-match.md)[] | :heavy_check_mark:                                                                                                | Memories selected by the operation, whether previewed or forgotten                                                |