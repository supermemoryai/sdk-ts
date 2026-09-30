# Pagination

Page metadata for the selected resource collection

## Example Usage

```typescript
import { Pagination } from "supermemory/models/operations";

let value: Pagination = {
  currentPage: 2716.35,
  totalItems: 561.05,
  totalPages: 5360.64,
};
```

## Fields

| Field                                       | Type                                        | Required                                    | Description                                 |
| ------------------------------------------- | ------------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| `currentPage`                               | *number*                                    | :heavy_check_mark:                          | Current one-based page number               |
| `limit`                                     | *number*                                    | :heavy_minus_sign:                          | Maximum resources returned per page         |
| `totalItems`                                | *number*                                    | :heavy_check_mark:                          | Total resources matching the request        |
| `totalPages`                                | *number*                                    | :heavy_check_mark:                          | Total pages available at the selected limit |