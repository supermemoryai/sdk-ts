# PostV3DocumentsBatchResponse

Documents added successfully

## Example Usage

```typescript
import { PostV3DocumentsBatchResponse } from "supermemory/models/operations";

let value: PostV3DocumentsBatchResponse = {
  results: [],
  failed: 9011.45,
  success: 8736.72,
};
```

## Fields

| Field                                                                                                | Type                                                                                                 | Required                                                                                             | Description                                                                                          |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `results`                                                                                            | [operations.PostV3DocumentsBatchResult](../../models/operations/post-v3-documents-batch-result.md)[] | :heavy_check_mark:                                                                                   | Array of results for each document in the batch                                                      |
| `failed`                                                                                             | *number*                                                                                             | :heavy_check_mark:                                                                                   | Count of documents that failed to add                                                                |
| `success`                                                                                            | *number*                                                                                             | :heavy_check_mark:                                                                                   | Count of documents successfully added                                                                |