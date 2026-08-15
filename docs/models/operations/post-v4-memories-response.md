# PostV4MemoriesResponse

Response after creating memories

## Example Usage

```typescript
import { PostV4MemoriesResponse } from "supermemory/models/operations";

let value: PostV4MemoriesResponse = {
  documentId: "<id>",
  memories: [
    {
      id: "<id>",
      memory: "<value>",
      isStatic: false,
      createdAt: "1731893163139",
      forgetAfter: "<value>",
      forgetReason: "<value>",
      metadata: {
        "key": "<value>",
        "key1": "<value>",
      },
    },
  ],
};
```

## Fields

| Field                                                                                                    | Type                                                                                                     | Required                                                                                                 | Description                                                                                              |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `documentId`                                                                                             | *string*                                                                                                 | :heavy_check_mark:                                                                                       | ID of the source document created                                                                        |
| `memories`                                                                                               | [operations.PostV4MemoriesMemoryResponse](../../models/operations/post-v4-memories-memory-response.md)[] | :heavy_check_mark:                                                                                       | N/A                                                                                                      |