# DeleteNsByNamespaceDocumentResponse

Document deletion completed

## Example Usage

```typescript
import { DeleteNsByNamespaceDocumentResponse } from "supermemory/models/operations";

let value: DeleteNsByNamespaceDocumentResponse = {
  deletedCount: 881172,
  errors: [],
};
```

## Fields

| Field                                                                                                             | Type                                                                                                              | Required                                                                                                          | Description                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `deletedCount`                                                                                                    | *number*                                                                                                          | :heavy_check_mark:                                                                                                | Number of documents successfully deleted                                                                          |
| `errors`                                                                                                          | [operations.DeleteNsByNamespaceDocumentError](../../models/operations/delete-ns-by-namespace-document-error.md)[] | :heavy_check_mark:                                                                                                | Per-document failures; successful deletions are not rolled back                                                   |