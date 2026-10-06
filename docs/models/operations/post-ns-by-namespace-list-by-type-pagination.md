# PostNsByNamespaceListByTypePagination

Page metadata for the selected resource collection

## Example Usage

```typescript
import { PostNsByNamespaceListByTypePagination } from "supermemory/models/operations";

let value: PostNsByNamespaceListByTypePagination = {
  currentPage: 4808.69,
  totalItems: 1183.28,
  totalPages: 7846.94,
};
```

## Fields

| Field                                       | Type                                        | Required                                    | Description                                 |
| ------------------------------------------- | ------------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| `currentPage`                               | *number*                                    | :heavy_check_mark:                          | Current one-based page number               |
| `limit`                                     | *number*                                    | :heavy_minus_sign:                          | Maximum resources returned per page         |
| `totalItems`                                | *number*                                    | :heavy_check_mark:                          | Total resources matching the request        |
| `totalPages`                                | *number*                                    | :heavy_check_mark:                          | Total pages available at the selected limit |