# PostV4MemoriesListRequest

Query parameters for listing memory entries with history

## Example Usage

```typescript
import { PostV4MemoriesListRequest } from "supermemory/models/operations";

let value: PostV4MemoriesListRequest = {
  containerTags: [
    "<value 1>",
    "<value 2>",
    "<value 3>",
  ],
  limit: "10",
  page: "1",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `containerTags`                                                                              | *string*[]                                                                                   | :heavy_check_mark:                                                                           | Container tags to filter memory entries. At least one tag is required.                       |                                                                                              |
| `filters`                                                                                    | *models.QueryFilterUnion*                                                                    | :heavy_minus_sign:                                                                           | Root query object that must contain either an AND or OR array of filter expressions          |                                                                                              |
| `limit`                                                                                      | *operations.PostV4MemoriesListLimit*                                                         | :heavy_minus_sign:                                                                           | Number of items per page                                                                     | 10                                                                                           |
| `order`                                                                                      | [operations.PostV4MemoriesListOrder](../../models/operations/post-v4-memories-list-order.md) | :heavy_minus_sign:                                                                           | Sort order                                                                                   | desc                                                                                         |
| `page`                                                                                       | *operations.PostV4MemoriesListPage*                                                          | :heavy_minus_sign:                                                                           | Page number to fetch                                                                         | 1                                                                                            |
| `sort`                                                                                       | [operations.PostV4MemoriesListSort](../../models/operations/post-v4-memories-list-sort.md)   | :heavy_minus_sign:                                                                           | Field to sort by                                                                             | createdAt                                                                                    |