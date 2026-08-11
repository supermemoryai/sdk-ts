# PostV3ContainerTagsMergeResponse

Merge queued successfully

## Example Usage

```typescript
import { PostV3ContainerTagsMergeResponse } from "supermemory/models/operations";

let value: PostV3ContainerTagsMergeResponse = {
  success: false,
  status: "queued",
  mergeId: "<id>",
  targetTag: "<value>",
  sourceTags: [
    "<value 1>",
    "<value 2>",
  ],
};
```

## Fields

| Field                                                                                                       | Type                                                                                                        | Required                                                                                                    | Description                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `success`                                                                                                   | *boolean*                                                                                                   | :heavy_check_mark:                                                                                          | Whether the merge job was queued successfully.                                                              |
| `status`                                                                                                    | [operations.PostV3ContainerTagsMergeStatus](../../models/operations/post-v3-container-tags-merge-status.md) | :heavy_check_mark:                                                                                          | The queued status of the merge job.                                                                         |
| `mergeId`                                                                                                   | *string*                                                                                                    | :heavy_check_mark:                                                                                          | Identifier for the queued merge job.                                                                        |
| `targetTag`                                                                                                 | *string*                                                                                                    | :heavy_check_mark:                                                                                          | The target container tag that documents will be merged into.                                                |
| `sourceTags`                                                                                                | *string*[]                                                                                                  | :heavy_check_mark:                                                                                          | List of source container tags queued for merge.                                                             |