# PostNsByNamespaceDocumentBatchRequestBody

## Example Usage

```typescript
import { PostNsByNamespaceDocumentBatchRequestBody } from "supermemory/models/operations";

let value: PostNsByNamespaceDocumentBatchRequestBody = {
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
};
```

## Fields

| Field                                                                                                                          | Type                                                                                                                           | Required                                                                                                                       | Description                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `documents`                                                                                                                    | [operations.PostNsByNamespaceDocumentBatchDocument](../../models/operations/post-ns-by-namespace-document-batch-document.md)[] | :heavy_check_mark:                                                                                                             | Documents to ingest or append in one request                                                                                   |