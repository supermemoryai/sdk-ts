# GetV3DocumentsByIdMemory

## Example Usage

```typescript
import { GetV3DocumentsByIdMemory } from "supermemory/models/operations";

let value: GetV3DocumentsByIdMemory = {
  id: "<id>",
  memory: "<value>",
  createdAt: "2024-12-31T22:57:31.846Z",
  updatedAt: "1735618361002",
  isLatest: true,
  isForgotten: true,
  isStatic: true,
  isInference: true,
  version: 945556,
  sourceCount: 836471,
  metadata: {
    "key": "<value>",
    "key1": "<value>",
  },
  parentMemoryId: "<id>",
  rootMemoryId: "<id>",
};
```

## Fields

| Field                                         | Type                                          | Required                                      | Description                                   |
| --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| `id`                                          | *string*                                      | :heavy_check_mark:                            | N/A                                           |
| `memory`                                      | *string*                                      | :heavy_check_mark:                            | N/A                                           |
| `createdAt`                                   | *string*                                      | :heavy_check_mark:                            | Creation timestamp                            |
| `updatedAt`                                   | *string*                                      | :heavy_check_mark:                            | Last update timestamp                         |
| `isLatest`                                    | *boolean*                                     | :heavy_check_mark:                            | N/A                                           |
| `isForgotten`                                 | *boolean*                                     | :heavy_check_mark:                            | N/A                                           |
| `isStatic`                                    | *boolean*                                     | :heavy_check_mark:                            | N/A                                           |
| `isInference`                                 | *boolean*                                     | :heavy_check_mark:                            | N/A                                           |
| `version`                                     | *number*                                      | :heavy_check_mark:                            | N/A                                           |
| `sourceCount`                                 | *number*                                      | :heavy_check_mark:                            | N/A                                           |
| `metadata`                                    | *operations.GetV3DocumentsByIdMemoryMetadata* | :heavy_check_mark:                            | N/A                                           |
| `parentMemoryId`                              | *string*                                      | :heavy_check_mark:                            | N/A                                           |
| `rootMemoryId`                                | *string*                                      | :heavy_check_mark:                            | N/A                                           |