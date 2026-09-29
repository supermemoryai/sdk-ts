# PatchNsByNamespaceDocumentFileByIdResponse

Update accepted for processing

## Example Usage

```typescript
import { PatchNsByNamespaceDocumentFileByIdResponse } from "supermemory/models/operations";

let value: PatchNsByNamespaceDocumentFileByIdResponse = {
  id: "<id>",
  status: "processing",
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `id`                                                       | *string*                                                   | :heavy_check_mark:                                         | Document identifier to poll or retrieve                    |
| `status`                                                   | *"processing"*                                             | :heavy_check_mark:                                         | Confirms the file was accepted for asynchronous processing |