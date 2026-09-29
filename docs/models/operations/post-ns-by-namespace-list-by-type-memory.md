# PostNsByNamespaceListByTypeMemory

A memory formed from documents in this namespace

## Example Usage

```typescript
import { PostNsByNamespaceListByTypeMemory } from "supermemory/models/operations";

let value: PostNsByNamespaceListByTypeMemory = {
  id: "<id>",
  memory: "<value>",
  metadata: {
    "key": "<value>",
    "key1": "<value>",
    "key2": "<value>",
  },
  isStatic: false,
  isInference: false,
  isLatest: true,
  isForgotten: true,
  version: 371189,
  system: {
    createdAt: new Date("2026-09-07T22:32:53.664Z"),
    updatedAt: new Date("2025-01-22T18:35:30.988Z"),
  },
};
```

## Fields

| Field                                                                                                                            | Type                                                                                                                             | Required                                                                                                                         | Description                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                                             | *string*                                                                                                                         | :heavy_check_mark:                                                                                                               | Stable memory identifier                                                                                                         |
| `memory`                                                                                                                         | *string*                                                                                                                         | :heavy_check_mark:                                                                                                               | Learned fact or context extracted from the document                                                                              |
| `metadata`                                                                                                                       | Record<string, *any*>                                                                                                            | :heavy_check_mark:                                                                                                               | Memory metadata, including temporal context when available                                                                       |
| `isStatic`                                                                                                                       | *boolean*                                                                                                                        | :heavy_check_mark:                                                                                                               | Whether the memory belongs to the stable profile section                                                                         |
| `isInference`                                                                                                                    | *boolean*                                                                                                                        | :heavy_check_mark:                                                                                                               | Whether the memory was inferred rather than explicitly stated                                                                    |
| `isLatest`                                                                                                                       | *boolean*                                                                                                                        | :heavy_check_mark:                                                                                                               | Whether this is the newest version in its memory chain                                                                           |
| `isForgotten`                                                                                                                    | *boolean*                                                                                                                        | :heavy_check_mark:                                                                                                               | Whether this memory has been excluded from normal recall                                                                         |
| `version`                                                                                                                        | *number*                                                                                                                         | :heavy_check_mark:                                                                                                               | Version number within the memory chain                                                                                           |
| `system`                                                                                                                         | [operations.PostNsByNamespaceListByTypeMemorySystem](../../models/operations/post-ns-by-namespace-list-by-type-memory-system.md) | :heavy_check_mark:                                                                                                               | Lifecycle timestamps maintained by Supermemory                                                                                   |