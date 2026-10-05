// Source: docs/models/operations/post-ns-by-namespace-search-response.md @ 4d5333e (block 0)
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

export {};
