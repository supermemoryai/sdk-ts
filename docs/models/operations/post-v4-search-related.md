# PostV4SearchRelated

## Example Usage

```typescript
import { PostV4SearchRelated } from "supermemory/models/operations";

let value: PostV4SearchRelated = {
  relation: "extends",
  memory: "<value>",
  updatedAt: "1735623935237",
};
```

## Fields

| Field                                                                                                | Type                                                                                                 | Required                                                                                             | Description                                                                                          |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `relation`                                                                                           | [operations.PostV4SearchRelatedRelation](../../models/operations/post-v4-search-related-relation.md) | :heavy_check_mark:                                                                                   | Relation type                                                                                        |
| `memory`                                                                                             | *string*                                                                                             | :heavy_check_mark:                                                                                   | The related memory content                                                                           |
| `metadata`                                                                                           | Record<string, *any*>                                                                                | :heavy_minus_sign:                                                                                   | Related memory metadata                                                                              |
| `updatedAt`                                                                                          | *string*                                                                                             | :heavy_check_mark:                                                                                   | Related memory last update date                                                                      |