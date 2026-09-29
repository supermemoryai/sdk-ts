# FilterPredicate1

## Example Usage

```typescript
import { FilterPredicate1 } from "supermemory/models";

let value: FilterPredicate1 = {
  field: "<value>",
  operator: "neq",
  value: "<value>",
};
```

## Fields

| Field                                                                                                           | Type                                                                                                            | Required                                                                                                        | Description                                                                                                     |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `field`                                                                                                         | *string*                                                                                                        | :heavy_check_mark:                                                                                              | Metadata key to evaluate, matched literally. A period is part of the key name, not a path into nested metadata. |
| `operator`                                                                                                      | [models.Operator1](../models/operator1.md)                                                                      | :heavy_check_mark:                                                                                              | Compare the field for equality or inequality                                                                    |
| `value`                                                                                                         | *string*                                                                                                        | :heavy_check_mark:                                                                                              | String value to compare against                                                                                 |
| `caseSensitive`                                                                                                 | *boolean*                                                                                                       | :heavy_minus_sign:                                                                                              | Whether string comparison preserves letter case                                                                 |