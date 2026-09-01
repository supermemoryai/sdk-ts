# PostV4ProfileChild

## Example Usage

```typescript
import { PostV4ProfileChild } from "supermemory/models/operations";

let value: PostV4ProfileChild = {
  relation: "extends",
  version: 1,
  memory:
    "Later version: API rate limit increased to 100 req/min on the free tier.",
  updatedAt: "2024-12-31T06:46:06.311Z",
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        | Example                                                                                            |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `relation`                                                                                         | [operations.PostV4ProfileChildRelation](../../models/operations/post-v4-profile-child-relation.md) | :heavy_check_mark:                                                                                 | Relation type between this memory and its parent/child                                             | extends                                                                                            |
| `version`                                                                                          | *number*                                                                                           | :heavy_minus_sign:                                                                                 | Relative version distance from the primary memory (+1 for direct child, +2 for grand-child, etc.)  | 1                                                                                                  |
| `memory`                                                                                           | *string*                                                                                           | :heavy_check_mark:                                                                                 | The contextual memory content                                                                      | Later version: API rate limit increased to 100 req/min on the free tier.                           |
| `metadata`                                                                                         | Record<string, *any*>                                                                              | :heavy_minus_sign:                                                                                 | Contextual memory metadata                                                                         |                                                                                                    |
| `updatedAt`                                                                                        | *string*                                                                                           | :heavy_check_mark:                                                                                 | Contextual memory last update date                                                                 |                                                                                                    |