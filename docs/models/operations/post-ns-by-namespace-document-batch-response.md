# PostNsByNamespaceDocumentBatchResponse

Batch accepted for processing

## Example Usage

```typescript
import { PostNsByNamespaceDocumentBatchResponse } from "supermemory/models/operations";

let value: PostNsByNamespaceDocumentBatchResponse = {
  results: [],
  failed: 2803.05,
  success: 9761.89,
};
```

## Fields

| Field                                                                                                                      | Type                                                                                                                       | Required                                                                                                                   | Description                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `results`                                                                                                                  | [operations.PostNsByNamespaceDocumentBatchResult](../../models/operations/post-ns-by-namespace-document-batch-result.md)[] | :heavy_check_mark:                                                                                                         | Array of results for each document in the batch                                                                            |
| `failed`                                                                                                                   | *number*                                                                                                                   | :heavy_check_mark:                                                                                                         | Count of documents that failed to add                                                                                      |
| `success`                                                                                                                  | *number*                                                                                                                   | :heavy_check_mark:                                                                                                         | Count of documents successfully added                                                                                      |