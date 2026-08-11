# PostV4SearchResponse

Memory search results

## Example Usage

```typescript
import { PostV4SearchResponse } from "supermemory/models/operations";

let value: PostV4SearchResponse = {
  results: [
    {
      id: "mem_abc123",
      memory: "The user prefers detailed API responses over minimal ones.",
      chunk: "This is a chunk of content from a document...",
      metadata: {
        "source": "conversation",
        "confidence": 0.9,
      },
      updatedAt: "2024-12-31T19:50:29.412Z",
      similarity: 0.89,
      version: 3,
      context: {
        parents: [
          {
            relation: "updates",
            version: -1,
            memory:
              "Earlier version: API rate limit is 50 req/min on the free tier.",
            updatedAt: "2024-12-31T13:50:00.600Z",
          },
        ],
        children: [
          {
            relation: "extends",
            version: 1,
            memory:
              "Later version: API rate limit increased to 100 req/min on the free tier.",
            updatedAt: "2024-12-31T14:40:59.603Z",
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
          summary: "API rate limit policy: 100 req/min free, 1000 req/min pro.",
          createdAt: "2024-12-31T23:53:16.419Z",
          updatedAt: "2024-12-31T22:17:12.566Z",
        },
      ],
      chunks: [
        {
          content: "This is a chunk of content from the document...",
          score: 0.85,
          position: 0,
          documentId: "doc_xyz789",
        },
      ],
      isAggregated: false,
    },
  ],
  timing: 245,
  total: 5,
};
```

## Fields

| Field                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Required                                                                                                                                                                                                                                                                                                                                                                                                                                                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                             | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `results`                                                                                                                                                                                                                                                                                                                                                                                                                                               | [operations.PostV4SearchResult](../../models/operations/post-v4-search-result.md)[]                                                                                                                                                                                                                                                                                                                                                                     | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                                                                      | Array of matching memory entries and chunks with similarity scores. Contains memory results when searchMode='memories', both memory and chunk results when searchMode='hybrid', or only chunk results when searchMode='documents'. Memory results have 'memory' field, chunk results have 'chunk' field. BACKWARD COMPATIBILITY: When using deprecated include.chunks=true, only memory results are returned with chunks embedded in them (old format). |                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `timing`                                                                                                                                                                                                                                                                                                                                                                                                                                                | *number*                                                                                                                                                                                                                                                                                                                                                                                                                                                | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                                                                      | Search execution time in milliseconds                                                                                                                                                                                                                                                                                                                                                                                                                   | 245                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `total`                                                                                                                                                                                                                                                                                                                                                                                                                                                 | *number*                                                                                                                                                                                                                                                                                                                                                                                                                                                | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                                                                      | Total number of results returned                                                                                                                                                                                                                                                                                                                                                                                                                        | 5                                                                                                                                                                                                                                                                                                                                                                                                                                                       |