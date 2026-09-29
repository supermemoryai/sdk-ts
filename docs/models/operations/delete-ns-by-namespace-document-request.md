# DeleteNsByNamespaceDocumentRequest

## Example Usage

```typescript
import { DeleteNsByNamespaceDocumentRequest } from "supermemory/models/operations";

let value: DeleteNsByNamespaceDocumentRequest = {
  namespace: "user_alex",
  body: {
    ids: [
      "my-doc-123",
    ],
  },
};
```

## Fields

| Field                                                                                                                              | Type                                                                                                                               | Required                                                                                                                           | Description                                                                                                                        | Example                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `namespace`                                                                                                                        | *string*                                                                                                                           | :heavy_check_mark:                                                                                                                 | The isolated namespace. This can be an ID for your user, a project ID, or any other identifier you wish to use to scope documents. | user_alex                                                                                                                          |
| `body`                                                                                                                             | [operations.DeleteNsByNamespaceDocumentRequestBody](../../models/operations/delete-ns-by-namespace-document-request-body.md)       | :heavy_check_mark:                                                                                                                 | N/A                                                                                                                                |                                                                                                                                    |