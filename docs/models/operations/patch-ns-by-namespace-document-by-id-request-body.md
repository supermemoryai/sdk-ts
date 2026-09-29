# PatchNsByNamespaceDocumentByIdRequestBody

## Example Usage

```typescript
import { PatchNsByNamespaceDocumentByIdRequestBody } from "supermemory/models/operations";

let value: PatchNsByNamespaceDocumentByIdRequestBody = {
  content: "Supermemory turns unstructured content into evolving memory.",
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
| `content`                                                                           | *string*                                                                            | :heavy_minus_sign:                                                                  | The content to process. This may be plaintext or a URL to supported rich content.   | Supermemory turns unstructured content into evolving memory.                        |
| `supportingContext`                                                                 | *string*                                                                            | :heavy_minus_sign:                                                                  | Context used to guide memory extraction within this namespace. Max 1500 characters. | Focus on product decisions, dates, and owners.                                      |
| `metadata`                                                                          | Record<string, *operations.PatchNsByNamespaceDocumentByIdMetadata*>                 | :heavy_minus_sign:                                                                  | Arbitrary metadata attached to the document and derived data                        | {<br/>"source": "api-docs"<br/>}                                                    |
| `group`                                                                             | Record<string, *operations.PatchNsByNamespaceDocumentByIdGroup*>                    | :heavy_minus_sign:                                                                  | Metadata values that isolate related context within the namespace                   |                                                                                     |
| `date`                                                                              | *string*                                                                            | :heavy_minus_sign:                                                                  | When the source content is from, in ISO 8601 format                                 | 2026-01-15                                                                          |