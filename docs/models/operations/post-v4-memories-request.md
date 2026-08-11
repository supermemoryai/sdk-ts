# PostV4MemoriesRequest

## Example Usage

```typescript
import { PostV4MemoriesRequest } from "supermemory/models/operations";

let value: PostV4MemoriesRequest = {
  memories: [],
  containerTag: "user_123",
};
```

## Fields

| Field                                                                   | Type                                                                    | Required                                                                | Description                                                             | Example                                                                 |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `memories`                                                              | [operations.MemoryRequest](../../models/operations/memory-request.md)[] | :heavy_check_mark:                                                      | Array of memories to create                                             |                                                                         |
| `containerTag`                                                          | *string*                                                                | :heavy_check_mark:                                                      | The space / container tag these memories belong to.                     | user_123                                                                |