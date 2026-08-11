# PostV3ConnectionsByProviderDocumentsRequest

## Example Usage

```typescript
import { PostV3ConnectionsByProviderDocumentsRequest } from "supermemory/models/operations";

let value: PostV3ConnectionsByProviderDocumentsRequest = {
  provider: "web-crawler",
  body: {
    containerTags: [
      "user_123",
      "project_123",
    ],
  },
};
```

## Fields

| Field                                                                                                                                           | Type                                                                                                                                            | Required                                                                                                                                        | Description                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`                                                                                                                                      | [operations.PostV3ConnectionsByProviderDocumentsProvider](../../models/operations/post-v3-connections-by-provider-documents-provider.md)        | :heavy_check_mark:                                                                                                                              | N/A                                                                                                                                             |
| `body`                                                                                                                                          | [operations.PostV3ConnectionsByProviderDocumentsRequestBody](../../models/operations/post-v3-connections-by-provider-documents-request-body.md) | :heavy_check_mark:                                                                                                                              | N/A                                                                                                                                             |