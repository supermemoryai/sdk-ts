# GetV3ContainerTagsMergeByMergeIdResponse

Merge job status

## Example Usage

```typescript
import { GetV3ContainerTagsMergeByMergeIdResponse } from "supermemory/models/operations";

let value: GetV3ContainerTagsMergeByMergeIdResponse = {
  id: "<id>",
  status: "db_committing",
  sourceTags: [],
  targetTag: "<value>",
  progress: {},
  lastError: "<value>",
};
```

## Fields

| Field                                                                                                                          | Type                                                                                                                           | Required                                                                                                                       | Description                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `id`                                                                                                                           | *string*                                                                                                                       | :heavy_check_mark:                                                                                                             | N/A                                                                                                                            |
| `status`                                                                                                                       | [operations.GetV3ContainerTagsMergeByMergeIdStatus](../../models/operations/get-v3-container-tags-merge-by-merge-id-status.md) | :heavy_check_mark:                                                                                                             | N/A                                                                                                                            |
| `sourceTags`                                                                                                                   | *string*[]                                                                                                                     | :heavy_check_mark:                                                                                                             | N/A                                                                                                                            |
| `targetTag`                                                                                                                    | *string*                                                                                                                       | :heavy_check_mark:                                                                                                             | N/A                                                                                                                            |
| `progress`                                                                                                                     | [operations.Progress](../../models/operations/progress.md)                                                                     | :heavy_check_mark:                                                                                                             | N/A                                                                                                                            |
| `lastError`                                                                                                                    | *string*                                                                                                                       | :heavy_check_mark:                                                                                                             | N/A                                                                                                                            |