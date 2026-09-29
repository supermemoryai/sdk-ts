# GetNsByNamespaceDocumentByIdResponse

Namespace-scoped document. Attachment keys are omitted unless requested and are empty arrays when requested without results.

## Example Usage

```typescript
import { GetNsByNamespaceDocumentByIdResponse } from "supermemory/models/operations";

let value: GetNsByNamespaceDocumentByIdResponse = {
  id: "doc_xyz789",
  title: "API Rate Limiting Policy",
  type: "text",
  summary: "<value>",
  content: "Our API rate limits are 100 req/min on free and 1000 on pro.",
  metadata: {
    "source": "api-docs",
  },
  system: {
    status: "<value>",
    createdAt: new Date("2024-03-24T05:23:21.971Z"),
    updatedAt: new Date("2026-05-25T22:34:20.143Z"),
  },
};
```

## Fields

| Field                                                                                                                   | Type                                                                                                                    | Required                                                                                                                | Description                                                                                                             | Example                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                                    | *string*                                                                                                                | :heavy_check_mark:                                                                                                      | Stable document identifier                                                                                              | doc_xyz789                                                                                                              |
| `title`                                                                                                                 | *string*                                                                                                                | :heavy_check_mark:                                                                                                      | Extracted or caller-provided document title                                                                             | API Rate Limiting Policy                                                                                                |
| `type`                                                                                                                  | *string*                                                                                                                | :heavy_check_mark:                                                                                                      | Detected source or content type                                                                                         | text                                                                                                                    |
| `summary`                                                                                                               | *string*                                                                                                                | :heavy_check_mark:                                                                                                      | Generated summary of the document, when available                                                                       |                                                                                                                         |
| `content`                                                                                                               | *string*                                                                                                                | :heavy_check_mark:                                                                                                      | Canonical extracted text used for processing and recall                                                                 | Our API rate limits are 100 req/min on free and 1000 on pro.                                                            |
| `metadata`                                                                                                              | Record<string, *any*>                                                                                                   | :heavy_check_mark:                                                                                                      | Caller metadata with internal fields removed                                                                            | {<br/>"source": "api-docs"<br/>}                                                                                        |
| `system`                                                                                                                | [operations.GetNsByNamespaceDocumentByIdSystem](../../models/operations/get-ns-by-namespace-document-by-id-system.md)   | :heavy_check_mark:                                                                                                      | Processing status, lifecycle timestamps, and storage path maintained by Supermemory                                     |                                                                                                                         |
| `chunks`                                                                                                                | [operations.GetNsByNamespaceDocumentByIdChunk](../../models/operations/get-ns-by-namespace-document-by-id-chunk.md)[]   | :heavy_minus_sign:                                                                                                      | Ordered document chunks; included only when requested                                                                   |                                                                                                                         |
| `memories`                                                                                                              | [operations.GetNsByNamespaceDocumentByIdMemory](../../models/operations/get-ns-by-namespace-document-by-id-memory.md)[] | :heavy_minus_sign:                                                                                                      | Memories derived from the document; included only when requested                                                        |                                                                                                                         |