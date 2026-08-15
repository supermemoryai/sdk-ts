# Child

## Example Usage

```typescript
import { Child } from "supermemory/models/operations";

let value: Child = {
  relation: "extends",
  version: 1,
  memory:
    "Later version: API rate limit increased to 100 req/min on the free tier.",
  updatedAt: "2024-12-31T09:38:10.297Z",
};
```

## Fields

| Field                                                                                             | Type                                                                                              | Required                                                                                          | Description                                                                                       | Example                                                                                           |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `relation`                                                                                        | [operations.ChildRelation](../../models/operations/child-relation.md)                             | :heavy_check_mark:                                                                                | Relation type between this memory and its parent/child                                            | extends                                                                                           |
| `version`                                                                                         | *number*                                                                                          | :heavy_minus_sign:                                                                                | Relative version distance from the primary memory (+1 for direct child, +2 for grand-child, etc.) | 1                                                                                                 |
| `memory`                                                                                          | *string*                                                                                          | :heavy_check_mark:                                                                                | The contextual memory content                                                                     | Later version: API rate limit increased to 100 req/min on the free tier.                          |
| `metadata`                                                                                        | Record<string, *any*>                                                                             | :heavy_minus_sign:                                                                                | Contextual memory metadata                                                                        |                                                                                                   |
| `updatedAt`                                                                                       | *string*                                                                                          | :heavy_check_mark:                                                                                | Contextual memory last update date                                                                |                                                                                                   |