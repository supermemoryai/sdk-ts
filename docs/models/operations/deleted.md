# Deleted

## Example Usage

```typescript
import { Deleted } from "supermemory/models/operations";

let value: Deleted = {
  success: true,
  status: "deleted",
  namespace: "<value>",
  deletedDocumentsCount: 399741,
  deletedMemoriesCount: 142389,
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `success`                               | *true*                                  | :heavy_check_mark:                      | Confirms the namespace was deleted      |
| `status`                                | *"deleted"*                             | :heavy_check_mark:                      | The namespace and its content are gone  |
| `namespace`                             | *string*                                | :heavy_check_mark:                      | Deleted namespace identifier            |
| `deletedDocumentsCount`                 | *number*                                | :heavy_check_mark:                      | Number of documents permanently removed |
| `deletedMemoriesCount`                  | *number*                                | :heavy_check_mark:                      | Number of memories permanently removed  |