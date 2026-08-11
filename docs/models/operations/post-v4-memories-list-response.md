# PostV4MemoriesListResponse

List of memory entries with their history and source documents

## Example Usage

```typescript
import { PostV4MemoriesListResponse } from "supermemory/models/operations";

let value: PostV4MemoriesListResponse = {
  memoryEntries: [
    {
      id: "<id>",
      memory: "<value>",
      version: 4724.03,
      isLatest: false,
      isForgotten: false,
      isStatic: false,
      isInference: false,
      createdAt: "1725834380538",
      updatedAt: "1735659978296",
      spaceId: "<id>",
      orgId: "<id>",
      sourceCount: 3609.57,
      parentMemoryId: "<id>",
      rootMemoryId: "<id>",
      forgetAfter: "<value>",
      forgetReason: "<value>",
      metadata: {},
      memoryRelations: {
        "key": "updates",
      },
      temporalContext: {
        "key": "<value>",
      },
      history: [],
      documentIds: [],
    },
  ],
  pagination: {
    currentPage: 1,
    totalItems: 100,
    totalPages: 10,
  },
};
```

## Fields

| Field                                                                                                  | Type                                                                                                   | Required                                                                                               | Description                                                                                            | Example                                                                                                |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `memoryEntries`                                                                                        | [operations.MemoryEntry](../../models/operations/memory-entry.md)[]                                    | :heavy_check_mark:                                                                                     | N/A                                                                                                    |                                                                                                        |
| `pagination`                                                                                           | [operations.PostV4MemoriesListPagination](../../models/operations/post-v4-memories-list-pagination.md) | :heavy_check_mark:                                                                                     | Pagination metadata                                                                                    | {<br/>"currentPage": 1,<br/>"limit": 10,<br/>"totalItems": 100,<br/>"totalPages": 10<br/>}             |