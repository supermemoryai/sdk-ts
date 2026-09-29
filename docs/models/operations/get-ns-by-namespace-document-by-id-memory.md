# GetNsByNamespaceDocumentByIdMemory

A memory formed from documents in this namespace

## Example Usage

```typescript
import { GetNsByNamespaceDocumentByIdMemory } from "supermemory/models/operations";

let value: GetNsByNamespaceDocumentByIdMemory = {
  id: "<id>",
  memory: "<value>",
  metadata: {
    "key": "<value>",
  },
  isStatic: true,
  isInference: false,
  isLatest: true,
  isForgotten: false,
  version: 768578,
  system: {
    createdAt: new Date("2026-04-19T20:35:25.300Z"),
    updatedAt: new Date("2024-01-13T19:38:50.785Z"),
  },
};
```

## Fields

| Field                                                                                                                              | Type                                                                                                                               | Required                                                                                                                           | Description                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                                               | *string*                                                                                                                           | :heavy_check_mark:                                                                                                                 | Stable memory identifier                                                                                                           |
| `memory`                                                                                                                           | *string*                                                                                                                           | :heavy_check_mark:                                                                                                                 | Learned fact or context extracted from the document                                                                                |
| `metadata`                                                                                                                         | Record<string, *any*>                                                                                                              | :heavy_check_mark:                                                                                                                 | Memory metadata, including temporal context when available                                                                         |
| `isStatic`                                                                                                                         | *boolean*                                                                                                                          | :heavy_check_mark:                                                                                                                 | Whether the memory belongs to the stable profile section                                                                           |
| `isInference`                                                                                                                      | *boolean*                                                                                                                          | :heavy_check_mark:                                                                                                                 | Whether the memory was inferred rather than explicitly stated                                                                      |
| `isLatest`                                                                                                                         | *boolean*                                                                                                                          | :heavy_check_mark:                                                                                                                 | Whether this is the newest version in its memory chain                                                                             |
| `isForgotten`                                                                                                                      | *boolean*                                                                                                                          | :heavy_check_mark:                                                                                                                 | Whether this memory has been excluded from normal recall                                                                           |
| `version`                                                                                                                          | *number*                                                                                                                           | :heavy_check_mark:                                                                                                                 | Version number within the memory chain                                                                                             |
| `system`                                                                                                                           | [operations.GetNsByNamespaceDocumentByIdMemorySystem](../../models/operations/get-ns-by-namespace-document-by-id-memory-system.md) | :heavy_check_mark:                                                                                                                 | Lifecycle timestamps maintained by Supermemory                                                                                     |