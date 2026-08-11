# PostV3ConnectionsByProviderConnectionRequest

## Example Usage

```typescript
import { PostV3ConnectionsByProviderConnectionRequest } from "supermemory/models/operations";

let value: PostV3ConnectionsByProviderConnectionRequest = {
  provider: "onedrive",
  body: {
    containerTags: [
      "user_123",
      "project_123",
    ],
  },
};
```

## Fields

| Field                                                                                                                                             | Type                                                                                                                                              | Required                                                                                                                                          | Description                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`                                                                                                                                        | [operations.PostV3ConnectionsByProviderConnectionProvider](../../models/operations/post-v3-connections-by-provider-connection-provider.md)        | :heavy_check_mark:                                                                                                                                | N/A                                                                                                                                               |
| `body`                                                                                                                                            | [operations.PostV3ConnectionsByProviderConnectionRequestBody](../../models/operations/post-v3-connections-by-provider-connection-request-body.md) | :heavy_check_mark:                                                                                                                                | N/A                                                                                                                                               |