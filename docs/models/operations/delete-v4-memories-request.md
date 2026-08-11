# DeleteV4MemoriesRequest

## Example Usage

```typescript
import { DeleteV4MemoriesRequest } from "supermemory/models/operations";

let value: DeleteV4MemoriesRequest = {
  id: "mem_abc123",
  content: "John prefers dark mode",
  containerTag: "user_123",
  reason: "outdated information",
};
```

## Fields

| Field                                                                                       | Type                                                                                        | Required                                                                                    | Description                                                                                 | Example                                                                                     |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `id`                                                                                        | *string*                                                                                    | :heavy_minus_sign:                                                                          | ID of the memory entry to operate on                                                        | mem_abc123                                                                                  |
| `content`                                                                                   | *string*                                                                                    | :heavy_minus_sign:                                                                          | Exact content match of the memory entry to operate on. Use this when you don't have the ID. | John prefers dark mode                                                                      |
| `containerTag`                                                                              | *string*                                                                                    | :heavy_check_mark:                                                                          | Container tag / space identifier. Required to scope the operation.                          | user_123                                                                                    |
| `reason`                                                                                    | *string*                                                                                    | :heavy_minus_sign:                                                                          | Optional reason for forgetting this memory                                                  | outdated information                                                                        |