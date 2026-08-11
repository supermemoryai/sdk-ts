# DeleteV3ConnectionsByConnectionIdRequest

## Example Usage

```typescript
import { DeleteV3ConnectionsByConnectionIdRequest } from "supermemory/models/operations";

let value: DeleteV3ConnectionsByConnectionIdRequest = {
  connectionId: "<id>",
};
```

## Fields

| Field                                                                           | Type                                                                            | Required                                                                        | Description                                                                     |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `connectionId`                                                                  | *string*                                                                        | :heavy_check_mark:                                                              | N/A                                                                             |
| `deleteDocuments`                                                               | *string*                                                                        | :heavy_minus_sign:                                                              | Whether to also delete documents imported by this connection. Defaults to true. |