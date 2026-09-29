# PostNsByNamespaceDocumentFileResponse

File accepted for processing

## Example Usage

```typescript
import { PostNsByNamespaceDocumentFileResponse } from "supermemory/models/operations";

let value: PostNsByNamespaceDocumentFileResponse = {
  id: "<id>",
  status: "processing",
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `id`                                                       | *string*                                                   | :heavy_check_mark:                                         | Document identifier to poll or retrieve                    |
| `status`                                                   | *"processing"*                                             | :heavy_check_mark:                                         | Confirms the file was accepted for asynchronous processing |