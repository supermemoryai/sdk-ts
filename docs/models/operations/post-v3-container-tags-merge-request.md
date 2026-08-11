# PostV3ContainerTagsMergeRequest

## Example Usage

```typescript
import { PostV3ContainerTagsMergeRequest } from "supermemory/models/operations";

let value: PostV3ContainerTagsMergeRequest = {
  containerTags: [
    "<value 1>",
    "<value 2>",
    "<value 3>",
  ],
  targetContainerTag: "<value>",
};
```

## Fields

| Field                                                                                                           | Type                                                                                                            | Required                                                                                                        | Description                                                                                                     |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `containerTags`                                                                                                 | *string*[]                                                                                                      | :heavy_check_mark:                                                                                              | List of container tags to merge (min: 2, max: 2). All documents from these tags will be merged into the target. |
| `targetContainerTag`                                                                                            | *string*                                                                                                        | :heavy_check_mark:                                                                                              | N/A                                                                                                             |