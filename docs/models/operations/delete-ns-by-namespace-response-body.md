# DeleteNsByNamespaceResponseBody

Namespace permanently deleted

## Example Usage

```typescript
import { DeleteNsByNamespaceResponseBody } from "supermemory/models/operations";

let value: DeleteNsByNamespaceResponseBody = {
  success: true,
  namespace: "<value>",
  deletedDocumentsCount: 822702,
  deletedMemoriesCount: 815582,
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `success`                               | *true*                                  | :heavy_check_mark:                      | Confirms the namespace was deleted      |
| `namespace`                             | *string*                                | :heavy_check_mark:                      | Deleted namespace identifier            |
| `deletedDocumentsCount`                 | *number*                                | :heavy_check_mark:                      | Number of documents permanently removed |
| `deletedMemoriesCount`                  | *number*                                | :heavy_check_mark:                      | Number of memories permanently removed  |