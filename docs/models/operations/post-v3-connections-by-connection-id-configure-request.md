# PostV3ConnectionsByConnectionIdConfigureRequest

## Example Usage

```typescript
import { PostV3ConnectionsByConnectionIdConfigureRequest } from "supermemory/models/operations";

let value: PostV3ConnectionsByConnectionIdConfigureRequest = {
  connectionId: "<id>",
  body: {
    resources: [
      {
        "key": "<value>",
        "key1": "<value>",
      },
    ],
  },
};
```

## Fields

| Field                                                                                                                                                    | Type                                                                                                                                                     | Required                                                                                                                                                 | Description                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `connectionId`                                                                                                                                           | *string*                                                                                                                                                 | :heavy_check_mark:                                                                                                                                       | N/A                                                                                                                                                      |
| `body`                                                                                                                                                   | [operations.PostV3ConnectionsByConnectionIdConfigureRequestBody](../../models/operations/post-v3-connections-by-connection-id-configure-request-body.md) | :heavy_check_mark:                                                                                                                                       | N/A                                                                                                                                                      |