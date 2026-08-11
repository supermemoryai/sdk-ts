# Related

## Example Usage

```typescript
import { Related } from "supermemory/models/operations";

let value: Related = {
  relation: "derives",
  memory: "<value>",
  updatedAt: "1735657181229",
};
```

## Fields

| Field                                                                     | Type                                                                      | Required                                                                  | Description                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `relation`                                                                | [operations.RelatedRelation](../../models/operations/related-relation.md) | :heavy_check_mark:                                                        | Relation type                                                             |
| `memory`                                                                  | *string*                                                                  | :heavy_check_mark:                                                        | The related memory content                                                |
| `metadata`                                                                | Record<string, *any*>                                                     | :heavy_minus_sign:                                                        | Related memory metadata                                                   |
| `updatedAt`                                                               | *string*                                                                  | :heavy_check_mark:                                                        | Related memory last update date                                           |