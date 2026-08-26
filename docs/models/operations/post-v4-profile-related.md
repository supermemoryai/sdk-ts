# PostV4ProfileRelated

## Example Usage

```typescript
import { PostV4ProfileRelated } from "supermemory/models/operations";

let value: PostV4ProfileRelated = {
  relation: "derives",
  memory: "<value>",
  updatedAt: "1735617251564",
};
```

## Fields

| Field                                                                                                  | Type                                                                                                   | Required                                                                                               | Description                                                                                            |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `relation`                                                                                             | [operations.PostV4ProfileRelatedRelation](../../models/operations/post-v4-profile-related-relation.md) | :heavy_check_mark:                                                                                     | Relation type                                                                                          |
| `memory`                                                                                               | *string*                                                                                               | :heavy_check_mark:                                                                                     | The related memory content                                                                             |
| `metadata`                                                                                             | Record<string, *any*>                                                                                  | :heavy_minus_sign:                                                                                     | Related memory metadata                                                                                |
| `updatedAt`                                                                                            | *string*                                                                                               | :heavy_check_mark:                                                                                     | Related memory last update date                                                                        |