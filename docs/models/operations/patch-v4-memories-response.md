# PatchV4MemoriesResponse

Response after updating a memory

## Example Usage

```typescript
import { PatchV4MemoriesResponse } from "supermemory/models/operations";

let value: PatchV4MemoriesResponse = {
  id: "mem_xyz789",
  memory: "John now prefers light mode",
  version: 2,
  parentMemoryId: "mem_abc123",
  rootMemoryId: "mem_abc123",
  createdAt: "2024-12-31T06:35:10.403Z",
  forgetAfter: null,
  forgetReason: null,
  metadata: {
    "key": "<value>",
    "key1": "<value>",
    "key2": "<value>",
  },
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        | Example                                                                            |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `id`                                                                               | *string*                                                                           | :heavy_check_mark:                                                                 | ID of the newly created memory version                                             | mem_xyz789                                                                         |
| `memory`                                                                           | *string*                                                                           | :heavy_check_mark:                                                                 | The content of the new memory version                                              | John now prefers light mode                                                        |
| `version`                                                                          | *number*                                                                           | :heavy_check_mark:                                                                 | Version number of this memory entry                                                | 2                                                                                  |
| `parentMemoryId`                                                                   | *string*                                                                           | :heavy_check_mark:                                                                 | ID of the memory this version updates                                              | mem_abc123                                                                         |
| `rootMemoryId`                                                                     | *string*                                                                           | :heavy_check_mark:                                                                 | ID of the first memory in this version chain                                       | mem_abc123                                                                         |
| `createdAt`                                                                        | *string*                                                                           | :heavy_check_mark:                                                                 | When this memory version was created                                               |                                                                                    |
| `forgetAfter`                                                                      | *string*                                                                           | :heavy_check_mark:                                                                 | When this memory will be auto-forgotten, or null if no expiry                      |                                                                                    |
| `forgetReason`                                                                     | *string*                                                                           | :heavy_check_mark:                                                                 | Reason for the scheduled forgetting, or null                                       |                                                                                    |
| `metadata`                                                                         | Record<string, *any*>                                                              | :heavy_check_mark:                                                                 | Arbitrary key-value metadata attached to this memory, or null if none was provided |                                                                                    |