# PostV4SearchResult

## Example Usage

```typescript
import { PostV4SearchResult } from "supermemory/models/operations";

let value: PostV4SearchResult = {
  id: "mem_abc123",
  memory: "The user prefers detailed API responses over minimal ones.",
  chunk: "This is a chunk of content from a document...",
  metadata: {
    "source": "conversation",
    "confidence": 0.9,
  },
  updatedAt: "2024-12-31T08:55:10.610Z",
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
        updatedAt: "2024-12-31T18:00:24.934Z",
      },
    ],
    children: [
      {
        relation: "extends",
        version: 1,
        memory:
          "Later version: API rate limit increased to 100 req/min on the free tier.",
        updatedAt: "2024-12-31T17:38:23.428Z",
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
      position: 0,
      documentId: "doc_xyz789",
    },
  ],
  isAggregated: false,
};
```

## Fields

| Field                                                                                                                                                                                   | Type                                                                                                                                                                                    | Required                                                                                                                                                                                | Description                                                                                                                                                                             | Example                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                                                                                                    | *string*                                                                                                                                                                                | :heavy_check_mark:                                                                                                                                                                      | Memory entry ID or chunk ID                                                                                                                                                             | mem_abc123                                                                                                                                                                              |
| `memory`                                                                                                                                                                                | *string*                                                                                                                                                                                | :heavy_minus_sign:                                                                                                                                                                      | The memory content (only present for memory results)                                                                                                                                    | The user prefers detailed API responses over minimal ones.                                                                                                                              |
| `chunk`                                                                                                                                                                                 | *string*                                                                                                                                                                                | :heavy_minus_sign:                                                                                                                                                                      | The chunk content (only present for chunk results from hybrid search)                                                                                                                   | This is a chunk of content from a document...                                                                                                                                           |
| `metadata`                                                                                                                                                                              | Record<string, *any*>                                                                                                                                                                   | :heavy_check_mark:                                                                                                                                                                      | Memory metadata                                                                                                                                                                         | {<br/>"source": "conversation",<br/>"confidence": 0.9<br/>}                                                                                                                             |
| `updatedAt`                                                                                                                                                                             | *string*                                                                                                                                                                                | :heavy_check_mark:                                                                                                                                                                      | Memory last update date                                                                                                                                                                 |                                                                                                                                                                                         |
| `similarity`                                                                                                                                                                            | *number*                                                                                                                                                                                | :heavy_check_mark:                                                                                                                                                                      | Similarity score between the query and memory entry                                                                                                                                     | 0.89                                                                                                                                                                                    |
| `filepath`                                                                                                                                                                              | *string*                                                                                                                                                                                | :heavy_minus_sign:                                                                                                                                                                      | Filepath of the source document this memory or chunk came from                                                                                                                          |                                                                                                                                                                                         |
| `version`                                                                                                                                                                               | *number*                                                                                                                                                                                | :heavy_minus_sign:                                                                                                                                                                      | Version number of this memory entry                                                                                                                                                     | 3                                                                                                                                                                                       |
| `rootMemoryId`                                                                                                                                                                          | *string*                                                                                                                                                                                | :heavy_minus_sign:                                                                                                                                                                      | ID of the root (first version) memory entry this one descends from. Null for memories that have never been superseded. Only present on memory results, not on standalone chunk results. | mem_abc123                                                                                                                                                                              |
| `context`                                                                                                                                                                               | [operations.PostV4SearchContext](../../models/operations/post-v4-search-context.md)                                                                                                     | :heavy_minus_sign:                                                                                                                                                                      | Object containing version history (parents/children via updates) and related memories (extends/derives)                                                                                 |                                                                                                                                                                                         |
| `documents`                                                                                                                                                                             | [operations.PostV4SearchDocument](../../models/operations/post-v4-search-document.md)[]                                                                                                 | :heavy_minus_sign:                                                                                                                                                                      | Associated documents for this memory entry                                                                                                                                              |                                                                                                                                                                                         |
| `chunks`                                                                                                                                                                                | [operations.PostV4SearchChunk](../../models/operations/post-v4-search-chunk.md)[]                                                                                                       | :heavy_minus_sign:                                                                                                                                                                      | Relevant chunks from associated documents (only included when chunks=true)                                                                                                              |                                                                                                                                                                                         |
| `isAggregated`                                                                                                                                                                          | *boolean*                                                                                                                                                                               | :heavy_minus_sign:                                                                                                                                                                      | Indicates if this memory was created by aggregating multiple source memories                                                                                                            | false                                                                                                                                                                                   |