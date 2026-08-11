# DeleteV3ConnectionsByProviderRequest

## Example Usage

```typescript
import { DeleteV3ConnectionsByProviderRequest } from "supermemory/models/operations";

let value: DeleteV3ConnectionsByProviderRequest = {
  provider: "gmail",
  body: {
    containerTags: [
      "user_123",
      "project_123",
    ],
  },
};
```

## Fields

| Field                                                                                                                            | Type                                                                                                                             | Required                                                                                                                         | Description                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `provider`                                                                                                                       | [operations.DeleteV3ConnectionsByProviderProvider](../../models/operations/delete-v3-connections-by-provider-provider.md)        | :heavy_check_mark:                                                                                                               | N/A                                                                                                                              |
| `body`                                                                                                                           | [operations.DeleteV3ConnectionsByProviderRequestBody](../../models/operations/delete-v3-connections-by-provider-request-body.md) | :heavy_check_mark:                                                                                                               | N/A                                                                                                                              |