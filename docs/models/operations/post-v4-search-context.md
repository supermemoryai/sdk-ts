# PostV4SearchContext

Object containing version history (parents/children via updates) and related memories (extends/derives)

## Example Usage

```typescript
import { PostV4SearchContext } from "supermemory/models/operations";

let value: PostV4SearchContext = {
  parents: [
    {
      relation: "updates",
      version: -1,
      memory: "Earlier version: API rate limit is 50 req/min on the free tier.",
      updatedAt: "2024-12-31T18:00:24.934Z",
    },
  ],
  children: [
    {
      relation: "extends",
      version: 1,
      memory:
        "Later version: API rate limit increased to 100 req/min on the free tier.",
      updatedAt: "2024-12-31T17:38:23.428Z",
    },
  ],
};
```

## Fields

| Field                                                                                 | Type                                                                                  | Required                                                                              | Description                                                                           |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `parents`                                                                             | [operations.PostV4SearchParent](../../models/operations/post-v4-search-parent.md)[]   | :heavy_minus_sign:                                                                    | N/A                                                                                   |
| `children`                                                                            | [operations.PostV4SearchChild](../../models/operations/post-v4-search-child.md)[]     | :heavy_minus_sign:                                                                    | N/A                                                                                   |
| `related`                                                                             | [operations.PostV4SearchRelated](../../models/operations/post-v4-search-related.md)[] | :heavy_minus_sign:                                                                    | N/A                                                                                   |