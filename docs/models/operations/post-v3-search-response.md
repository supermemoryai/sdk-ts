# PostV3SearchResponse

Search results

## Example Usage

```typescript
import { PostV3SearchResponse } from "supermemory/models/operations";

let value: PostV3SearchResponse = {
  results: [],
  timing: 2620.85,
  total: 1821.13,
};
```

## Fields

| Field                                                                               | Type                                                                                | Required                                                                            | Description                                                                         |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `results`                                                                           | [operations.PostV3SearchResult](../../models/operations/post-v3-search-result.md)[] | :heavy_check_mark:                                                                  | N/A                                                                                 |
| `timing`                                                                            | *number*                                                                            | :heavy_check_mark:                                                                  | N/A                                                                                 |
| `total`                                                                             | *number*                                                                            | :heavy_check_mark:                                                                  | N/A                                                                                 |