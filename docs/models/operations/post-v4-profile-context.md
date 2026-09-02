# PostV4ProfileContext

Object containing version history (parents/children via updates) and related memories (extends/derives)

## Example Usage

```typescript
import { PostV4ProfileContext } from "supermemory/models/operations";

let value: PostV4ProfileContext = {
  parents: [
    {
      relation: "updates",
      version: -1,
      memory: "Earlier version: API rate limit is 50 req/min on the free tier.",
      updatedAt: "2024-12-31T12:34:13.373Z",
    },
  ],
  children: [
    {
      relation: "extends",
      version: 1,
      memory:
        "Later version: API rate limit increased to 100 req/min on the free tier.",
      updatedAt: "2024-12-31T03:30:47.916Z",
    },
  ],
};
```

## Fields

| Field                                                                                   | Type                                                                                    | Required                                                                                | Description                                                                             |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `parents`                                                                               | [operations.PostV4ProfileParent](../../models/operations/post-v4-profile-parent.md)[]   | :heavy_minus_sign:                                                                      | N/A                                                                                     |
| `children`                                                                              | [operations.PostV4ProfileChild](../../models/operations/post-v4-profile-child.md)[]     | :heavy_minus_sign:                                                                      | N/A                                                                                     |
| `related`                                                                               | [operations.PostV4ProfileRelated](../../models/operations/post-v4-profile-related.md)[] | :heavy_minus_sign:                                                                      | N/A                                                                                     |