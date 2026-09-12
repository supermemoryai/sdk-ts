# SearchResults

Search results if a search query was provided

## Example Usage

```typescript
import { SearchResults } from "supermemory/models/operations";

let value: SearchResults = {
  results: [],
  total: 9831.55,
  timing: 7668.05,
};
```

## Fields

| Field                                                                                 | Type                                                                                  | Required                                                                              | Description                                                                           |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `results`                                                                             | [operations.PostV4ProfileResult](../../models/operations/post-v4-profile-result.md)[] | :heavy_check_mark:                                                                    | Search results for the provided query                                                 |
| `total`                                                                               | *number*                                                                              | :heavy_check_mark:                                                                    | Total number of search results                                                        |
| `timing`                                                                              | *number*                                                                              | :heavy_check_mark:                                                                    | Search timing in milliseconds                                                         |