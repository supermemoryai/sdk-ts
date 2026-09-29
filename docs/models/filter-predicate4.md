# FilterPredicate4

## Example Usage

```typescript
import { FilterPredicate4 } from "supermemory/models";

let value: FilterPredicate4 = {
  field: "<value>",
  operator: "notContains",
  value: "<value>",
};
```

## Fields

| Field                                                                                                           | Type                                                                                                            | Required                                                                                                        | Description                                                                                                     |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `field`                                                                                                         | *string*                                                                                                        | :heavy_check_mark:                                                                                              | Metadata key to evaluate, matched literally. A period is part of the key name, not a path into nested metadata. |
| `operator`                                                                                                      | [models.Operator4](../models/operator4.md)                                                                      | :heavy_check_mark:                                                                                              | Require or exclude a substring match                                                                            |
| `value`                                                                                                         | *string*                                                                                                        | :heavy_check_mark:                                                                                              | Substring to look for                                                                                           |
| `caseSensitive`                                                                                                 | *boolean*                                                                                                       | :heavy_minus_sign:                                                                                              | Whether substring matching preserves letter case                                                                |