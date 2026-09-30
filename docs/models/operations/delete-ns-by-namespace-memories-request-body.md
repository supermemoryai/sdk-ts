# DeleteNsByNamespaceMemoriesRequestBody

## Example Usage

```typescript
import { DeleteNsByNamespaceMemoriesRequestBody } from "supermemory/models/operations";

let value: DeleteNsByNamespaceMemoriesRequestBody = {
  ids: [
    "mem_abc123",
  ],
};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     | Example                                         |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `ids`                                           | *string*[]                                      | :heavy_check_mark:                              | Memory identifiers to remove from normal recall | [<br/>"mem_abc123"<br/>]                        |