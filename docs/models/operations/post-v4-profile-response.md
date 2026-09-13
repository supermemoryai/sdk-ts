# PostV4ProfileResponse

User profile with optional search results

## Example Usage

```typescript
import { PostV4ProfileResponse } from "supermemory/models/operations";

let value: PostV4ProfileResponse = {
  profile: {},
  searchResults: {
    results: [
      {
        id: "mem_abc123",
        memory: "The user prefers detailed API responses over minimal ones.",
        chunk: "This is a chunk of content from a document...",
        metadata: {
          "source": "conversation",
          "confidence": 0.9,
        },
        updatedAt: "2024-12-31T12:36:47.363Z",
        similarity: 0.89,
        version: 3,
        rootMemoryId: "mem_abc123",
        context: {
          parents: [
            {
              relation: "updates",
              version: -1,
              memory:
                "Earlier version: API rate limit is 50 req/min on the free tier.",
              updatedAt: "2024-12-31T12:34:13.373Z",
            },
          ],
          children: [
            {
              relation: "extends",
              version: 1,
              memory:
                "Later version: API rate limit increased to 100 req/min on the free tier.",
              updatedAt: "2024-12-31T03:30:47.916Z",
            },
          ],
        },
        documents: [
          {
            id: "doc_xyz789",
            title: "API Rate Limiting Policy",
            type: "web",
            metadata: {
              "source": "upload",
              "language": "en",
            },
            summary:
              "API rate limit policy: 100 req/min free, 1000 req/min pro.",
            createdAt: "2024-12-31T04:51:58.484Z",
            updatedAt: "2024-12-31T02:56:20.180Z",
          },
        ],
        chunks: [
          {
            content: "This is a chunk of content from the document...",
            position: 0,
            documentId: "doc_xyz789",
          },
        ],
        isAggregated: false,
      },
    ],
    total: 3300.06,
    timing: 8816.07,
  },
};
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `profile`                                                             | [operations.Profile](../../models/operations/profile.md)              | :heavy_check_mark:                                                    | N/A                                                                   |
| `searchResults`                                                       | [operations.SearchResults](../../models/operations/search-results.md) | :heavy_minus_sign:                                                    | Search results if a search query was provided                         |