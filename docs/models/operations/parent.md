# Parent

## Example Usage

```typescript
import { Parent } from "supermemory/models/operations";

let value: Parent = {
  relation: "extends",
  memory: "<value>",
  system: {
    updatedAt: "1735637680600",
  },
};
```

## Fields

| Field                                                                   | Type                                                                    | Required                                                                | Description                                                             |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `relation`                                                              | [operations.ParentRelation](../../models/operations/parent-relation.md) | :heavy_check_mark:                                                      | How this memory is connected to the matched memory                      |
| `version`                                                               | *number*                                                                | :heavy_minus_sign:                                                      | Version number within the related memory's history                      |
| `memory`                                                                | *string*                                                                | :heavy_check_mark:                                                      | Related learned fact or context                                         |
| `metadata`                                                              | Record<string, *any*>                                                   | :heavy_minus_sign:                                                      | Public metadata associated with the related memory                      |
| `system`                                                                | [operations.ParentSystem](../../models/operations/parent-system.md)     | :heavy_check_mark:                                                      | Lifecycle details for the related memory                                |