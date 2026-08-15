# DeleteV4MemoriesResponse

Response after forgetting a memory

## Example Usage

```typescript
import { DeleteV4MemoriesResponse } from "supermemory/models/operations";

let value: DeleteV4MemoriesResponse = {
  id: "mem_abc123",
  forgotten: true,
};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     | Example                                         |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `id`                                            | *string*                                        | :heavy_check_mark:                              | ID of the memory that was forgotten             | mem_abc123                                      |
| `forgotten`                                     | *boolean*                                       | :heavy_check_mark:                              | Indicates the memory was successfully forgotten | true                                            |