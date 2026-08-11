# MemoryEntry

Memory entry with history and document references

## Example Usage

```typescript
import { MemoryEntry } from "supermemory/models/operations";

let value: MemoryEntry = {
  id: "<id>",
  memory: "<value>",
  version: 5928.56,
  isLatest: false,
  isForgotten: false,
  isStatic: true,
  isInference: false,
  createdAt: "1729845331187",
  updatedAt: "1735627641858",
  spaceId: "<id>",
  orgId: "<id>",
  sourceCount: 2073.32,
  parentMemoryId: "<id>",
  rootMemoryId: "<id>",
  forgetAfter: "<value>",
  forgetReason: "<value>",
  metadata: {
    "key": "<value>",
    "key1": "<value>",
    "key2": "<value>",
  },
  memoryRelations: {},
  temporalContext: {
    "key": "<value>",
  },
  history: [],
  documentIds: [
    "<value 1>",
    "<value 2>",
  ],
};
```

## Fields

| Field                                                                                     | Type                                                                                      | Required                                                                                  | Description                                                                               |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `id`                                                                                      | *string*                                                                                  | :heavy_check_mark:                                                                        | Unique identifier for the memory entry                                                    |
| `memory`                                                                                  | *string*                                                                                  | :heavy_check_mark:                                                                        | The memory content/text                                                                   |
| `version`                                                                                 | *number*                                                                                  | :heavy_check_mark:                                                                        | Version number of this memory                                                             |
| `isLatest`                                                                                | *boolean*                                                                                 | :heavy_check_mark:                                                                        | Whether this is the latest version                                                        |
| `isForgotten`                                                                             | *boolean*                                                                                 | :heavy_check_mark:                                                                        | Whether this memory has been forgotten                                                    |
| `isStatic`                                                                                | *boolean*                                                                                 | :heavy_check_mark:                                                                        | Whether this is a static profile memory                                                   |
| `isInference`                                                                             | *boolean*                                                                                 | :heavy_check_mark:                                                                        | Whether this is an inferred memory                                                        |
| `createdAt`                                                                               | *string*                                                                                  | :heavy_check_mark:                                                                        | ISO timestamp of creation                                                                 |
| `updatedAt`                                                                               | *string*                                                                                  | :heavy_check_mark:                                                                        | ISO timestamp of last update                                                              |
| `spaceId`                                                                                 | *string*                                                                                  | :heavy_check_mark:                                                                        | ID of the space this memory belongs to                                                    |
| `orgId`                                                                                   | *string*                                                                                  | :heavy_check_mark:                                                                        | Organization ID                                                                           |
| `sourceCount`                                                                             | *number*                                                                                  | :heavy_check_mark:                                                                        | Number of source documents for this memory                                                |
| `parentMemoryId`                                                                          | *string*                                                                                  | :heavy_check_mark:                                                                        | ID of the parent memory (previous version)                                                |
| `rootMemoryId`                                                                            | *string*                                                                                  | :heavy_check_mark:                                                                        | ID of the root memory (first version)                                                     |
| `forgetAfter`                                                                             | *string*                                                                                  | :heavy_check_mark:                                                                        | ISO timestamp when memory should be forgotten                                             |
| `forgetReason`                                                                            | *string*                                                                                  | :heavy_check_mark:                                                                        | Reason for forgetting                                                                     |
| `metadata`                                                                                | Record<string, *any*>                                                                     | :heavy_check_mark:                                                                        | Metadata including temporal context and other information                                 |
| `memoryRelations`                                                                         | Record<string, [operations.MemoryRelations](../../models/operations/memory-relations.md)> | :heavy_check_mark:                                                                        | Relations to other memories                                                               |
| `temporalContext`                                                                         | Record<string, *any*>                                                                     | :heavy_check_mark:                                                                        | Temporal context metadata (alias for metadata field)                                      |
| `history`                                                                                 | [operations.History](../../models/operations/history.md)[]                                | :heavy_check_mark:                                                                        | Previous versions of this memory                                                          |
| `documentIds`                                                                             | *string*[]                                                                                | :heavy_check_mark:                                                                        | IDs of source documents for this memory                                                   |