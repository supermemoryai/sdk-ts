# SearchResults

Search results if a search query was provided

## Example Usage

```typescript
import { SearchResults } from "supermemory/models/operations";

let value: SearchResults = {
  results: [
    "<value 1>",
  ],
  total: 9831.55,
  timing: 7668.05,
};
```

## Fields

| Field                                 | Type                                  | Required                              | Description                           |
| ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- |
| `results`                             | *any*[]                               | :heavy_check_mark:                    | Search results for the provided query |
| `total`                               | *number*                              | :heavy_check_mark:                    | Total number of search results        |
| `timing`                              | *number*                              | :heavy_check_mark:                    | Search timing in milliseconds         |