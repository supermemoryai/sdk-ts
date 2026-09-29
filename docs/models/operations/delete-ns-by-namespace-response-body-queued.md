# DeleteNsByNamespaceResponseBodyQueued

Namespace move queued

## Example Usage

```typescript
import { DeleteNsByNamespaceResponseBodyQueued } from "supermemory/models/operations";

let value: DeleteNsByNamespaceResponseBodyQueued = {
  success: true,
  status: "queued",
  operationId: "<id>",
  namespace: "<value>",
  moveTo: "<value>",
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `success`                                                | *true*                                                   | :heavy_check_mark:                                       | Confirms the namespace move was accepted                 |
| `status`                                                 | *"queued"*                                               | :heavy_check_mark:                                       | The move continues asynchronously after this response    |
| `operationId`                                            | *string*                                                 | :heavy_check_mark:                                       | Identifier used to trace the asynchronous move operation |
| `namespace`                                              | *string*                                                 | :heavy_check_mark:                                       | Source namespace being removed                           |
| `moveTo`                                                 | *string*                                                 | :heavy_check_mark:                                       | Destination namespace receiving the content              |