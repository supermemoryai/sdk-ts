# PostV4ProfileResponse

User profile with optional search results

## Example Usage

```typescript
import { PostV4ProfileResponse } from "supermemory/models/operations";

let value: PostV4ProfileResponse = {
  profile: {},
};
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `profile`                                                             | [operations.Profile](../../models/operations/profile.md)              | :heavy_check_mark:                                                    | N/A                                                                   |
| `searchResults`                                                       | [operations.SearchResults](../../models/operations/search-results.md) | :heavy_minus_sign:                                                    | Search results if a search query was provided                         |