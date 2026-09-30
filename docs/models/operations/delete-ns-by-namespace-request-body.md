# DeleteNsByNamespaceRequestBody

## Example Usage

```typescript
import { DeleteNsByNamespaceRequestBody } from "supermemory/models/operations";

let value: DeleteNsByNamespaceRequestBody = {
  moveTo: "project_archive",
};
```

## Fields

| Field                                                                                                                       | Type                                                                                                                        | Required                                                                                                                    | Description                                                                                                                 | Example                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `moveTo`                                                                                                                    | *string*                                                                                                                    | :heavy_minus_sign:                                                                                                          | Destination namespace that should receive this namespace's content before deletion. Omit to permanently delete the content. | project_archive                                                                                                             |