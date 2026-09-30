# PostNsByNamespaceSearchRequest

## Example Usage

```typescript
import { PostNsByNamespaceSearchRequest } from "supermemory/models/operations";

let value: PostNsByNamespaceSearchRequest = {
  namespace: "user_alex",
  body: {
    query: "what are the API rate limits",
    threshold: 0.5,
    rerank: "order",
  },
};
```

## Fields

| Field                                                                                                                                            | Type                                                                                                                                             | Required                                                                                                                                         | Description                                                                                                                                      | Example                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `namespace`                                                                                                                                      | *string*                                                                                                                                         | :heavy_check_mark:                                                                                                                               | The isolated namespace to search. This can be an ID for your user, a project ID, or any other identifier you wish to use to scope memories.      | user_alex                                                                                                                                        |
| `limit`                                                                                                                                          | *number*                                                                                                                                         | :heavy_minus_sign:                                                                                                                               | Maximum number of results to return                                                                                                              | 10                                                                                                                                               |
| `searchMode`                                                                                                                                     | [operations.SearchMode](../../models/operations/search-mode.md)                                                                                  | :heavy_minus_sign:                                                                                                                               | Search surface. "hybrid" combines learned memories with source chunks, "memories" returns learned context, and "chunks" returns source passages. | hybrid                                                                                                                                           |
| `body`                                                                                                                                           | [operations.PostNsByNamespaceSearchRequestBody](../../models/operations/post-ns-by-namespace-search-request-body.md)                             | :heavy_check_mark:                                                                                                                               | N/A                                                                                                                                              |                                                                                                                                                  |