# History

Historical version of a memory entry

## Example Usage

```typescript
import { History } from "supermemory/models/operations";

let value: History = {
  id: "<id>",
  memory: "<value>",
  version: 4164.1,
  createdAt: "1731950809821",
  updatedAt: "1735656784619",
  parentMemoryId: "<id>",
  rootMemoryId: "<id>",
  isLatest: true,
  isForgotten: false,
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `id`               | *string*           | :heavy_check_mark: | N/A                |
| `memory`           | *string*           | :heavy_check_mark: | N/A                |
| `version`          | *number*           | :heavy_check_mark: | N/A                |
| `createdAt`        | *string*           | :heavy_check_mark: | N/A                |
| `updatedAt`        | *string*           | :heavy_check_mark: | N/A                |
| `parentMemoryId`   | *string*           | :heavy_check_mark: | N/A                |
| `rootMemoryId`     | *string*           | :heavy_check_mark: | N/A                |
| `isLatest`         | *boolean*          | :heavy_check_mark: | N/A                |
| `isForgotten`      | *boolean*          | :heavy_check_mark: | N/A                |