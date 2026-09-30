# Child

## Example Usage

```typescript
import { Child } from "supermemory/models/operations";

let value: Child = {
  relation: "extends",
  memory: "<value>",
  system: {
    updatedAt: "1735630953345",
  },
};
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `relation`                                                            | [operations.ChildRelation](../../models/operations/child-relation.md) | :heavy_check_mark:                                                    | How this memory is connected to the matched memory                    |
| `version`                                                             | *number*                                                              | :heavy_minus_sign:                                                    | Version number within the related memory's history                    |
| `memory`                                                              | *string*                                                              | :heavy_check_mark:                                                    | Related learned fact or context                                       |
| `metadata`                                                            | Record<string, *any*>                                                 | :heavy_minus_sign:                                                    | Public metadata associated with the related memory                    |
| `system`                                                              | [operations.ChildSystem](../../models/operations/child-system.md)     | :heavy_check_mark:                                                    | Lifecycle details for the related memory                              |