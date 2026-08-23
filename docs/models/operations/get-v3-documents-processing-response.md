# GetV3DocumentsProcessingResponse

List of documents currently being processed

## Example Usage

```typescript
import { GetV3DocumentsProcessingResponse } from "supermemory/models/operations";

let value: GetV3DocumentsProcessingResponse = {
  documents: [
    {
      id: "doc_123",
      customId: "doc-api-rate-limits",
      title: "My Document",
      type: "text",
      status: "extracting",
      summary: "API rate limit policy: 100 req/min free, 1000 req/min pro.",
      connectionId: "conn_gdrive_8f2k",
      createdAt: "2024-12-27T12:00:00Z",
      updatedAt: "2024-12-27T12:01:00Z",
      metadata: {
        "source": "upload",
        "language": "en",
      },
    },
  ],
  totalCount: 5,
};
```

## Fields

| Field                                                                                                            | Type                                                                                                             | Required                                                                                                         | Description                                                                                                      | Example                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `documents`                                                                                                      | [operations.GetV3DocumentsProcessingDocument](../../models/operations/get-v3-documents-processing-document.md)[] | :heavy_check_mark:                                                                                               | N/A                                                                                                              |                                                                                                                  |
| `totalCount`                                                                                                     | *number*                                                                                                         | :heavy_check_mark:                                                                                               | Total number of processing documents                                                                             | 5                                                                                                                |