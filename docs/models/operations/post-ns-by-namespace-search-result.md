# PostNsByNamespaceSearchResult

## Example Usage

```typescript
import { PostNsByNamespaceSearchResult } from "supermemory/models/operations";

let value: PostNsByNamespaceSearchResult = {
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
};
```

## Fields

| Field                                                                                                     | Type                                                                                                      | Required                                                                                                  | Description                                                                                               | Example                                                                                                   |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                      | *string*                                                                                                  | :heavy_check_mark:                                                                                        | Stable identifier for the matching result                                                                 | mem_abc123                                                                                                |
| `memory`                                                                                                  | *string*                                                                                                  | :heavy_minus_sign:                                                                                        | Learned fact or context returned by memory search (only present for memory results)                       | The user prefers detailed API responses over minimal ones.                                                |
| `chunk`                                                                                                   | *string*                                                                                                  | :heavy_minus_sign:                                                                                        | Source passage returned by chunk search (only present for chunk results from hybrid search)               | This is a chunk of content from a document...                                                             |
| `metadata`                                                                                                | Record<string, *any*>                                                                                     | :heavy_check_mark:                                                                                        | Public metadata attached to the result                                                                    | {<br/>"source": "conversation",<br/>"confidence": 0.9<br/>}                                               |
| `similarity`                                                                                              | *number*                                                                                                  | :heavy_check_mark:                                                                                        | Normalized relevance score used to rank the result, from 0 to 1                                           | 0.89                                                                                                      |
| `isLatest`                                                                                                | *boolean*                                                                                                 | :heavy_check_mark:                                                                                        | Whether the memory is its latest version; false for recalled forgotten memories                           |                                                                                                           |
| `system`                                                                                                  | [operations.PostNsByNamespaceSearchSystem](../../models/operations/post-ns-by-namespace-search-system.md) | :heavy_check_mark:                                                                                        | Lifecycle and filesystem details for the result                                                           |                                                                                                           |
| `included`                                                                                                | [operations.Included](../../models/operations/included.md)                                                | :heavy_minus_sign:                                                                                        | Requested supporting context for the result                                                               |                                                                                                           |