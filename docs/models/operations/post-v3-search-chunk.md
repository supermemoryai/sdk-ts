# PostV3SearchChunk

Matching content chunk

## Example Usage

```typescript
import { PostV3SearchChunk } from "supermemory/models/operations";

let value: PostV3SearchChunk = {
  content:
    "Rate limit headers are included in every response. Clients should implement exponential backoff when receiving 429 responses.",
  isRelevant: true,
  score: 0.85,
};
```

## Fields

| Field                                                                                                                         | Type                                                                                                                          | Required                                                                                                                      | Description                                                                                                                   | Example                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `content`                                                                                                                     | *string*                                                                                                                      | :heavy_check_mark:                                                                                                            | Content of the matching chunk                                                                                                 | Rate limit headers are included in every response. Clients should implement exponential backoff when receiving 429 responses. |
| `isRelevant`                                                                                                                  | *boolean*                                                                                                                     | :heavy_check_mark:                                                                                                            | Whether this chunk is relevant to the query                                                                                   | true                                                                                                                          |
| `score`                                                                                                                       | *number*                                                                                                                      | :heavy_check_mark:                                                                                                            | Similarity score for this chunk                                                                                               | 0.85                                                                                                                          |