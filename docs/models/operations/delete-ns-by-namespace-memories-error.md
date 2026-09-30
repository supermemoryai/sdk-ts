# DeleteNsByNamespaceMemoriesError

## Example Usage

```typescript
import { DeleteNsByNamespaceMemoriesError } from "supermemory/models/operations";

let value: DeleteNsByNamespaceMemoriesError = {
  id: "<id>",
  error: "<value>",
};
```

## Fields

| Field                                 | Type                                  | Required                              | Description                           |
| ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- |
| `id`                                  | *string*                              | :heavy_check_mark:                    | Requested memory identifier           |
| `error`                               | *string*                              | :heavy_check_mark:                    | Why the memory could not be forgotten |