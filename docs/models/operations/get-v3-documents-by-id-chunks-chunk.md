# GetV3DocumentsByIdChunksChunk

A single chunk of a document

## Example Usage

```typescript
import { GetV3DocumentsByIdChunksChunk } from "supermemory/models/operations";

let value: GetV3DocumentsByIdChunksChunk = {
  id: "<id>",
  position: 7731.64,
  content: "<value>",
  type: "<value>",
  createdAt: "2024-12-31T19:58:44.292Z",
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `id`                                    | *string*                                | :heavy_check_mark:                      | Unique identifier of the chunk          |
| `position`                              | *number*                                | :heavy_check_mark:                      | Sequential position within the document |
| `content`                               | *string*                                | :heavy_check_mark:                      | Chunk text content                      |
| `type`                                  | *string*                                | :heavy_check_mark:                      | Chunk type (text or image)              |
| `metadata`                              | Record<string, *any*>                   | :heavy_minus_sign:                      | Optional metadata attached to the chunk |
| `createdAt`                             | *string*                                | :heavy_check_mark:                      | Creation timestamp                      |