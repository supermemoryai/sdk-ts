# Sibling

## Example Usage

```typescript
import { Sibling } from "supermemory/models/operations";

let value: Sibling = {
  relation: "derives",
  memory: "<value>",
  system: {
    updatedAt: "1735610449510",
  },
};
```

## Fields

| Field                                                                     | Type                                                                      | Required                                                                  | Description                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `relation`                                                                | [operations.SiblingRelation](../../models/operations/sibling-relation.md) | :heavy_check_mark:                                                        | How this memory is connected to the matched memory                        |
| `version`                                                                 | *number*                                                                  | :heavy_minus_sign:                                                        | Version number within the related memory's history                        |
| `memory`                                                                  | *string*                                                                  | :heavy_check_mark:                                                        | Related learned fact or context                                           |
| `metadata`                                                                | Record<string, *any*>                                                     | :heavy_minus_sign:                                                        | Public metadata associated with the related memory                        |
| `system`                                                                  | [operations.SiblingSystem](../../models/operations/sibling-system.md)     | :heavy_check_mark:                                                        | Lifecycle details for the related memory                                  |