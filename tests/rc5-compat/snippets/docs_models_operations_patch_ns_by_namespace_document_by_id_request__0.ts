// Source: docs/models/operations/patch-ns-by-namespace-document-by-id-request.md @ 4d5333e (block 0)
import { Supermemory } from "supermemory"; // prelude: names from earlier doc blocks
import { PatchNsByNamespaceDocumentByIdRequest } from "supermemory/models/operations";

let value: PatchNsByNamespaceDocumentByIdRequest = {
  namespace: "user_alex",
  id: "my-doc-123",
  body: {
    content: "Supermemory turns unstructured content into evolving memory.",
    supportingContext: "Focus on product decisions, dates, and owners.",
    metadata: {
      "source": "api-docs",
    },
    date: "2026-01-15",
  },
};

export {};
