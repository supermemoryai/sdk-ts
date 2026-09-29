# PostNsByNamespaceSearchResponse

Search results

## Example Usage

```typescript
import { PostNsByNamespaceSearchResponse } from "supermemory/models/operations";

let value: PostNsByNamespaceSearchResponse = {
  results: [
    {
      id: "mem_abc123",
      memory: "The user prefers detailed API responses over minimal ones.",
      chunk: "This is a chunk of content from a document...",
      metadata: {
        "source": "conversation",
        "confidence": 0.9,
      },
      similarity: 0.89,
      isLatest: false,
      system: {
        updatedAt: "1735675953549",
      },
    },
  ],
  searchTime: 2874.71,
};
```

## Fields

| Field                                                                                                       | Type                                                                                                        | Required                                                                                                    | Description                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `results`                                                                                                   | [operations.PostNsByNamespaceSearchResult](../../models/operations/post-ns-by-namespace-search-result.md)[] | :heavy_check_mark:                                                                                          | Ranked memories and source chunks matching the query                                                        |
| `searchTime`                                                                                                | *number*                                                                                                    | :heavy_check_mark:                                                                                          | Server-side search duration in milliseconds                                                                 |