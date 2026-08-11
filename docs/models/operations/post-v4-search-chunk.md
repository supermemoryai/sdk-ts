# PostV4SearchChunk

## Example Usage

```typescript
import { PostV4SearchChunk } from "supermemory/models/operations";

let value: PostV4SearchChunk = {
  content: "This is a chunk of content from the document...",
  score: 0.85,
  position: 0,
  documentId: "doc_xyz789",
};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     | Example                                         |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `content`                                       | *string*                                        | :heavy_check_mark:                              | Content of the chunk                            | This is a chunk of content from the document... |
| `score`                                         | *number*                                        | :heavy_check_mark:                              | Similarity score between the query and chunk    | 0.85                                            |
| `position`                                      | *number*                                        | :heavy_check_mark:                              | Position of chunk in the document (0-indexed)   | 0                                               |
| `documentId`                                    | *string*                                        | :heavy_check_mark:                              | ID of the document this chunk belongs to        | doc_xyz789                                      |