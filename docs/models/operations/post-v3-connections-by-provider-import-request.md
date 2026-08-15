# PostV3ConnectionsByProviderImportRequest

## Example Usage

```typescript
import { PostV3ConnectionsByProviderImportRequest } from "supermemory/models/operations";

let value: PostV3ConnectionsByProviderImportRequest = {
  provider: "notion",
  body: {
    containerTags: [
      "user_123",
      "project_123",
    ],
  },
};
```

## Fields

| Field                                                                                                                                     | Type                                                                                                                                      | Required                                                                                                                                  | Description                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`                                                                                                                                | [operations.PostV3ConnectionsByProviderImportProvider](../../models/operations/post-v3-connections-by-provider-import-provider.md)        | :heavy_check_mark:                                                                                                                        | N/A                                                                                                                                       |
| `body`                                                                                                                                    | [operations.PostV3ConnectionsByProviderImportRequestBody](../../models/operations/post-v3-connections-by-provider-import-request-body.md) | :heavy_check_mark:                                                                                                                        | N/A                                                                                                                                       |