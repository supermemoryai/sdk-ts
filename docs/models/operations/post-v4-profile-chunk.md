# PostV4ProfileChunk

## Example Usage

```typescript
import { PostV4ProfileChunk } from "supermemory/models/operations";

let value: PostV4ProfileChunk = {
  content: "This is a chunk of content from the document...",
  position: 0,
  documentId: "doc_xyz789",
};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     | Example                                         |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `content`                                       | *string*                                        | :heavy_check_mark:                              | Content of the chunk                            | This is a chunk of content from the document... |
| `position`                                      | *number*                                        | :heavy_check_mark:                              | Position of chunk in the document (0-indexed)   | 0                                               |
| `documentId`                                    | *string*                                        | :heavy_check_mark:                              | ID of the document this chunk belongs to        | doc_xyz789                                      |