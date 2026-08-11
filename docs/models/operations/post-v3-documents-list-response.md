# PostV3DocumentsListResponse

List of documents

## Example Usage

```typescript
import { PostV3DocumentsListResponse } from "supermemory/models/operations";

let value: PostV3DocumentsListResponse = {
  memories: [
    {
      connectionId: "conn_gdrive_8f2k",
      createdAt: "2025-04-15T09:30:00.000Z",
      customId: "doc-api-rate-limits",
      filepath: "/var/tmp/however_till.xlm",
      id: "acxV5LHMEsG2hMSNb4umbn",
      metadata: {
        "source": "upload",
        "language": "en",
      },
      status: "done",
      summary: "API rate limit policy: 100 req/min free, 1000 req/min pro.",
      title: "API Rate Limiting Policy",
      type: "text",
      updatedAt: "2025-04-15T09:31:00.000Z",
    },
  ],
  pagination: {
    currentPage: 1,
    totalItems: 100,
    totalPages: 10,
  },
};
```

## Fields

| Field                                                                                                    | Type                                                                                                     | Required                                                                                                 | Description                                                                                              | Example                                                                                                  |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `memories`                                                                                               | [operations.PostV3DocumentsListMemory](../../models/operations/post-v3-documents-list-memory.md)[]       | :heavy_check_mark:                                                                                       | N/A                                                                                                      |                                                                                                          |
| `pagination`                                                                                             | [operations.PostV3DocumentsListPagination](../../models/operations/post-v3-documents-list-pagination.md) | :heavy_check_mark:                                                                                       | Pagination metadata                                                                                      | {<br/>"currentPage": 1,<br/>"limit": 10,<br/>"totalItems": 100,<br/>"totalPages": 10<br/>}               |