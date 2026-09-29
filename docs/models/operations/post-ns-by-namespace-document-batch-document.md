# PostNsByNamespaceDocumentBatchDocument

## Example Usage

```typescript
import { PostNsByNamespaceDocumentBatchDocument } from "supermemory/models/operations";

let value: PostNsByNamespaceDocumentBatchDocument = {
  content: "Supermemory turns unstructured content into evolving memory.",
  id: "my-doc-123",
  supportingContext: "Focus on product decisions, dates, and owners.",
  metadata: {
    "source": "api-docs",
  },
  date: "2026-01-15",
};
```

## Fields

| Field                                                                               | Type                                                                                | Required                                                                            | Description                                                                         | Example                                                                             |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `content`                                                                           | *string*                                                                            | :heavy_check_mark:                                                                  | The content to process. This may be plaintext or a URL to supported rich content.   | Supermemory turns unstructured content into evolving memory.                        |
| `id`                                                                                | *string*                                                                            | :heavy_minus_sign:                                                                  | An optional caller-defined document ID                                              | my-doc-123                                                                          |
| `supportingContext`                                                                 | *string*                                                                            | :heavy_minus_sign:                                                                  | Context used to guide memory extraction within this namespace. Max 1500 characters. | Focus on product decisions, dates, and owners.                                      |
| `metadata`                                                                          | Record<string, *operations.PostNsByNamespaceDocumentBatchMetadata*>                 | :heavy_minus_sign:                                                                  | Arbitrary metadata attached to the document and derived data                        | {<br/>"source": "api-docs"<br/>}                                                    |
| `group`                                                                             | Record<string, *operations.PostNsByNamespaceDocumentBatchGroup*>                    | :heavy_minus_sign:                                                                  | Metadata values that isolate related context within the namespace                   |                                                                                     |
| `date`                                                                              | *string*                                                                            | :heavy_minus_sign:                                                                  | When the source content is from, in ISO 8601 format                                 | 2026-01-15                                                                          |