# PostV4SearchParent

## Example Usage

```typescript
import { PostV4SearchParent } from "supermemory/models/operations";

let value: PostV4SearchParent = {
  relation: "updates",
  version: -1,
  memory: "Earlier version: API rate limit is 50 req/min on the free tier.",
  updatedAt: "2024-12-31T21:33:38.194Z",
};
```

## Fields

| Field                                                                                               | Type                                                                                                | Required                                                                                            | Description                                                                                         | Example                                                                                             |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `relation`                                                                                          | [operations.PostV4SearchParentRelation](../../models/operations/post-v4-search-parent-relation.md)  | :heavy_check_mark:                                                                                  | Relation type between this memory and its parent/child                                              | updates                                                                                             |
| `version`                                                                                           | *number*                                                                                            | :heavy_minus_sign:                                                                                  | Relative version distance from the primary memory (-1 for direct parent, -2 for grand-parent, etc.) | -1                                                                                                  |
| `memory`                                                                                            | *string*                                                                                            | :heavy_check_mark:                                                                                  | The contextual memory content                                                                       | Earlier version: API rate limit is 50 req/min on the free tier.                                     |
| `metadata`                                                                                          | Record<string, *any*>                                                                               | :heavy_minus_sign:                                                                                  | Contextual memory metadata                                                                          |                                                                                                     |
| `updatedAt`                                                                                         | *string*                                                                                            | :heavy_check_mark:                                                                                  | Contextual memory last update date                                                                  |                                                                                                     |