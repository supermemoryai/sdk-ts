# DeleteV3ContainerTagsByContainerTagResponse

Response after successfully deleting a container tag and all its associated data

## Example Usage

```typescript
import { DeleteV3ContainerTagsByContainerTagResponse } from "supermemory/models/operations";

let value: DeleteV3ContainerTagsByContainerTagResponse = {
  success: true,
  containerTag: "<value>",
  deletedDocumentsCount: 1503.06,
  deletedMemoriesCount: 7067.66,
};
```

## Fields

| Field                                  | Type                                   | Required                               | Description                            |
| -------------------------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- |
| `success`                              | *boolean*                              | :heavy_check_mark:                     | Whether the deletion was successful    |
| `containerTag`                         | *string*                               | :heavy_check_mark:                     | The deleted container tag              |
| `deletedDocumentsCount`                | *number*                               | :heavy_check_mark:                     | Number of documents deleted            |
| `deletedMemoriesCount`                 | *number*                               | :heavy_check_mark:                     | Number of memories marked as forgotten |