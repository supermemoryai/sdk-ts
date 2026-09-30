# PostNsByNamespaceListByTypeChunk

## Example Usage

```typescript
import { PostNsByNamespaceListByTypeChunk } from "supermemory/models/operations";

let value: PostNsByNamespaceListByTypeChunk = {
  id: "<id>",
  position: 13043,
  content: "<value>",
  type: "<value>",
  metadata: null,
  system: {
    createdAt: new Date("2024-08-25T11:36:47.204Z"),
  },
  documentId: "<id>",
};
```

## Fields

| Field                                                                                                                          | Type                                                                                                                           | Required                                                                                                                       | Description                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `id`                                                                                                                           | *string*                                                                                                                       | :heavy_check_mark:                                                                                                             | Stable chunk identifier                                                                                                        |
| `position`                                                                                                                     | *number*                                                                                                                       | :heavy_check_mark:                                                                                                             | Zero-based order within the document                                                                                           |
| `content`                                                                                                                      | *string*                                                                                                                       | :heavy_check_mark:                                                                                                             | Chunk text used for retrieval                                                                                                  |
| `type`                                                                                                                         | *string*                                                                                                                       | :heavy_check_mark:                                                                                                             | Chunk content type                                                                                                             |
| `metadata`                                                                                                                     | Record<string, *any*>                                                                                                          | :heavy_check_mark:                                                                                                             | Chunk metadata, when available                                                                                                 |
| `system`                                                                                                                       | [operations.PostNsByNamespaceListByTypeChunkSystem](../../models/operations/post-ns-by-namespace-list-by-type-chunk-system.md) | :heavy_check_mark:                                                                                                             | Lifecycle timestamps maintained by Supermemory                                                                                 |
| `documentId`                                                                                                                   | *string*                                                                                                                       | :heavy_check_mark:                                                                                                             | ID of the chunk's parent document                                                                                              |