# GetV3DocumentsByIdChunksResponse

Response for document chunks endpoint

## Example Usage

```typescript
import { GetV3DocumentsByIdChunksResponse } from "supermemory/models/operations";

let value: GetV3DocumentsByIdChunksResponse = {
  documentId: "<id>",
  chunks: [
    {
      id: "<id>",
      position: 863.16,
      content: "<value>",
      type: "<value>",
      createdAt: "2024-12-31T03:56:08.448Z",
    },
  ],
  total: 1998.59,
};
```

## Fields

| Field                                                                                                        | Type                                                                                                         | Required                                                                                                     | Description                                                                                                  |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `documentId`                                                                                                 | *string*                                                                                                     | :heavy_check_mark:                                                                                           | The document ID                                                                                              |
| `chunks`                                                                                                     | [operations.GetV3DocumentsByIdChunksChunk](../../models/operations/get-v3-documents-by-id-chunks-chunk.md)[] | :heavy_check_mark:                                                                                           | Ordered list of chunks                                                                                       |
| `total`                                                                                                      | *number*                                                                                                     | :heavy_check_mark:                                                                                           | Total number of chunks                                                                                       |