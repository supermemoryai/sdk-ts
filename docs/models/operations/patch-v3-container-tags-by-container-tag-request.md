# PatchV3ContainerTagsByContainerTagRequest

## Example Usage

```typescript
import { PatchV3ContainerTagsByContainerTagRequest } from "supermemory/models/operations";

let value: PatchV3ContainerTagsByContainerTagRequest = {
  containerTag: "<value>",
  body: {
    name: "Research Notes",
    entityContext:
      "This project contains research papers about machine learning.",
    memoryFilesystemPaths: [
      "/memory/",
      "/user.md",
    ],
  },
};
```

## Fields

| Field                                                                                                                                        | Type                                                                                                                                         | Required                                                                                                                                     | Description                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `containerTag`                                                                                                                               | *string*                                                                                                                                     | :heavy_check_mark:                                                                                                                           | N/A                                                                                                                                          |
| `body`                                                                                                                                       | [operations.PatchV3ContainerTagsByContainerTagRequestBody](../../models/operations/patch-v3-container-tags-by-container-tag-request-body.md) | :heavy_check_mark:                                                                                                                           | N/A                                                                                                                                          |