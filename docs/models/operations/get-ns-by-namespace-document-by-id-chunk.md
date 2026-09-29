# GetNsByNamespaceDocumentByIdChunk

A chunk of source content belonging to a document

## Example Usage

```typescript
import { GetNsByNamespaceDocumentByIdChunk } from "supermemory/models/operations";

let value: GetNsByNamespaceDocumentByIdChunk = {
  id: "<id>",
  position: 120536,
  content: "<value>",
  type: "<value>",
  metadata: {
    "key": "<value>",
    "key1": "<value>",
    "key2": "<value>",
  },
  system: {
    createdAt: new Date("2026-11-01T20:05:57.517Z"),
  },
};
```

## Fields

| Field                                                                                                                            | Type                                                                                                                             | Required                                                                                                                         | Description                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                                             | *string*                                                                                                                         | :heavy_check_mark:                                                                                                               | Stable chunk identifier                                                                                                          |
| `position`                                                                                                                       | *number*                                                                                                                         | :heavy_check_mark:                                                                                                               | Zero-based order within the document                                                                                             |
| `content`                                                                                                                        | *string*                                                                                                                         | :heavy_check_mark:                                                                                                               | Chunk text used for retrieval                                                                                                    |
| `type`                                                                                                                           | *string*                                                                                                                         | :heavy_check_mark:                                                                                                               | Chunk content type                                                                                                               |
| `metadata`                                                                                                                       | Record<string, *any*>                                                                                                            | :heavy_check_mark:                                                                                                               | Chunk metadata, when available                                                                                                   |
| `system`                                                                                                                         | [operations.GetNsByNamespaceDocumentByIdChunkSystem](../../models/operations/get-ns-by-namespace-document-by-id-chunk-system.md) | :heavy_check_mark:                                                                                                               | Lifecycle timestamps maintained by Supermemory                                                                                   |