# FilterPredicate2

## Example Usage

```typescript
import { FilterPredicate2 } from "supermemory/models";

let value: FilterPredicate2 = {
  field: "<value>",
  operator: "neq",
  value: 9987.95,
};
```

## Fields

| Field                                                                                                           | Type                                                                                                            | Required                                                                                                        | Description                                                                                                     |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `field`                                                                                                         | *string*                                                                                                        | :heavy_check_mark:                                                                                              | Metadata key to evaluate, matched literally. A period is part of the key name, not a path into nested metadata. |
| `operator`                                                                                                      | [models.Operator2](../models/operator2.md)                                                                      | :heavy_check_mark:                                                                                              | Compare the field for equality or inequality                                                                    |
| `value`                                                                                                         | *models.Value*                                                                                                  | :heavy_check_mark:                                                                                              | Numeric or boolean value to compare against                                                                     |