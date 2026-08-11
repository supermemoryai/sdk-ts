# DeleteV3DocumentsBulkRequest

Request body for bulk deleting documents by IDs or container tags

## Example Usage

```typescript
import { DeleteV3DocumentsBulkRequest } from "supermemory/models/operations";

let value: DeleteV3DocumentsBulkRequest = {
  ids: [
    "acxV5LHMEsG2hMSNb4umbn",
    "bxcV5LHMEsG2hMSNb4umbn",
  ],
};
```

## Fields

| Field                                                                                                                                                                                                | Type                                                                                                                                                                                                 | Required                                                                                                                                                                                             | Description                                                                                                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ids`                                                                                                                                                                                                | *string*[]                                                                                                                                                                                           | :heavy_minus_sign:                                                                                                                                                                                   | Array of document IDs to delete (max 100 at once)                                                                                                                                                    |
| ~~`containerTags`~~                                                                                                                                                                                  | *string*[]                                                                                                                                                                                           | :heavy_minus_sign:                                                                                                                                                                                   | : warning: ** DEPRECATED **: This will be removed in a future release, please migrate away from it as soon as possible.<br/><br/>Array of container tags - all documents in these containers will be deleted |
| `filepath`                                                                                                                                                                                           | *string*                                                                                                                                                                                             | :heavy_minus_sign:                                                                                                                                                                                   | Delete documents matching this filepath. Exact match for full paths, prefix match if ending with /                                                                                                   |