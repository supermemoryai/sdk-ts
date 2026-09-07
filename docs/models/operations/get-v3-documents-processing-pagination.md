# GetV3DocumentsProcessingPagination

Present when `view=all`

## Example Usage

```typescript
import { GetV3DocumentsProcessingPagination } from "supermemory/models/operations";

let value: GetV3DocumentsProcessingPagination = {
  currentPage: 1,
  totalItems: 100,
  totalPages: 10,
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `currentPage`      | *number*           | :heavy_check_mark: | N/A                |
| `limit`            | *number*           | :heavy_minus_sign: | N/A                |
| `totalItems`       | *number*           | :heavy_check_mark: | N/A                |
| `totalPages`       | *number*           | :heavy_check_mark: | N/A                |