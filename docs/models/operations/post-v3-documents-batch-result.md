# PostV3DocumentsBatchResult

## Example Usage

```typescript
import { PostV3DocumentsBatchResult } from "supermemory/models/operations";

let value: PostV3DocumentsBatchResult = {
  id: "<id>",
  status: "<value>",
};
```

## Fields

| Field                                                             | Type                                                              | Required                                                          | Description                                                       |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| `id`                                                              | *string*                                                          | :heavy_check_mark:                                                | Unique identifier of the document (empty string for failed items) |
| `status`                                                          | *string*                                                          | :heavy_check_mark:                                                | Status of the document (e.g. 'done', 'queued', 'error')           |
| `error`                                                           | *string*                                                          | :heavy_minus_sign:                                                | Error message when status is 'error'                              |
| `details`                                                         | *string*                                                          | :heavy_minus_sign:                                                | Additional error details when status is 'error'                   |