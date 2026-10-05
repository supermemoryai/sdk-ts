// Source: docs/models/operations/post-ns-by-namespace-list-by-type-response.md @ 4d5333e (block 0)
import { PostNsByNamespaceListByTypeResponse } from "supermemory/models/operations";

let value: PostNsByNamespaceListByTypeResponse = {
  documents: [
    {
      id: "<id>",
      title: "<value>",
      type: "<value>",
      summary: "<value>",
      metadata: {
        "key": "<value>",
        "key1": "<value>",
      },
      url: "https://well-off-punctuation.com",
      system: {
        status: "<value>",
        createdAt: new Date("2026-08-21T03:45:30.453Z"),
        updatedAt: new Date("2026-09-16T22:28:41.174Z"),
      },
    },
  ],
  chunks: [],
  memories: [
    {
      id: "<id>",
      memory: "<value>",
      metadata: {
        "key": "<value>",
        "key1": "<value>",
      },
      isStatic: true,
      isInference: false,
      isLatest: false,
      isForgotten: true,
      version: 398532,
      system: {
        createdAt: new Date("2026-09-07T22:32:53.664Z"),
        updatedAt: new Date("2025-01-22T18:35:30.988Z"),
      },
    },
  ],
  pagination: {
    currentPage: 217.58,
    totalItems: 3461.89,
    totalPages: 3025.84,
  },
};

export {};
