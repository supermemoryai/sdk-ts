# DeleteNsByNamespaceMemoriesSemanticError

## Example Usage

```typescript
import { DeleteNsByNamespaceMemoriesSemanticError } from "supermemory/models/operations";

let value: DeleteNsByNamespaceMemoriesSemanticError = {
  id: "<id>",
  error: "<value>",
};
```

## Fields

| Field                                 | Type                                  | Required                              | Description                           |
| ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- |
| `id`                                  | *string*                              | :heavy_check_mark:                    | Requested memory identifier           |
| `error`                               | *string*                              | :heavy_check_mark:                    | Why the memory could not be forgotten |