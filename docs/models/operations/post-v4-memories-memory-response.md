# PostV4MemoriesMemoryResponse

## Example Usage

```typescript
import { PostV4MemoriesMemoryResponse } from "supermemory/models/operations";

let value: PostV4MemoriesMemoryResponse = {
  id: "<id>",
  memory: "<value>",
  isStatic: false,
  createdAt: "1707641006893",
  forgetAfter: "<value>",
  forgetReason: "<value>",
  metadata: {},
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `id`                                                                               | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |
| `memory`                                                                           | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |
| `isStatic`                                                                         | *boolean*                                                                          | :heavy_check_mark:                                                                 | N/A                                                                                |
| `createdAt`                                                                        | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |
| `forgetAfter`                                                                      | *string*                                                                           | :heavy_check_mark:                                                                 | ISO datetime when this memory expires                                              |
| `forgetReason`                                                                     | *string*                                                                           | :heavy_check_mark:                                                                 | Reason for scheduled forgetting                                                    |
| `metadata`                                                                         | Record<string, *any*>                                                              | :heavy_check_mark:                                                                 | Arbitrary key-value metadata attached to this memory, or null if none was provided |