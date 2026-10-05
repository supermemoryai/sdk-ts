// Source: docs/models/operations/post-ns-by-namespace-document-batch-request.md @ 4d5333e (block 0)
import { Supermemory } from "supermemory"; // prelude: names from earlier doc blocks
import { PostNsByNamespaceDocumentBatchRequest } from "supermemory/models/operations";

let value: PostNsByNamespaceDocumentBatchRequest = {
  namespace: "user_alex",
  body: {
    documents: [
      {
        content: "Supermemory turns unstructured content into evolving memory.",
        id: "my-doc-123",
        supportingContext: "Focus on product decisions, dates, and owners.",
        metadata: {
          "source": "api-docs",
        },
        date: "2026-01-15",
      },
    ],
  },
};

export {};
