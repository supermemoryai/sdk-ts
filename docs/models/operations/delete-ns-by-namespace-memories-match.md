# DeleteNsByNamespaceMemoriesMatch

## Example Usage

```typescript
import { DeleteNsByNamespaceMemoriesMatch } from "supermemory/models/operations";

let value: DeleteNsByNamespaceMemoriesMatch = {
  id: "<id>",
  memory: "<value>",
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `id`                                    | *string*                                | :heavy_check_mark:                      | Stable identifier of the matched memory |
| `memory`                                | *string*                                | :heavy_check_mark:                      | Matched memory text                     |