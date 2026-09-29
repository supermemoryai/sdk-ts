# GetNsByNamespaceDocumentByIdRequest

## Example Usage

```typescript
import { GetNsByNamespaceDocumentByIdRequest } from "supermemory/models/operations";

let value: GetNsByNamespaceDocumentByIdRequest = {
  namespace: "user_alex",
  id: "my-doc-123",
};
```

## Fields

| Field                                                                                                                              | Type                                                                                                                               | Required                                                                                                                           | Description                                                                                                                        | Example                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `namespace`                                                                                                                        | *string*                                                                                                                           | :heavy_check_mark:                                                                                                                 | The isolated namespace. This can be an ID for your user, a project ID, or any other identifier you wish to use to scope documents. | user_alex                                                                                                                          |
| `id`                                                                                                                               | *string*                                                                                                                           | :heavy_check_mark:                                                                                                                 | The public document ID                                                                                                             | my-doc-123                                                                                                                         |
| `attach`                                                                                                                           | [operations.GetNsByNamespaceDocumentByIdAttach](../../models/operations/get-ns-by-namespace-document-by-id-attach.md)[]            | :heavy_minus_sign:                                                                                                                 | Child resources to include. Repeat the parameter to attach chunks, memories, or both.                                              |                                                                                                                                    |