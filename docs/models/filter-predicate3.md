# FilterPredicate3

## Example Usage

```typescript
import { FilterPredicate3 } from "supermemory/models";

let value: FilterPredicate3 = {
  field: "<value>",
  operator: "lte",
  value: 2055.76,
};
```

## Fields

| Field                                                                                                           | Type                                                                                                            | Required                                                                                                        | Description                                                                                                     |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `field`                                                                                                         | *string*                                                                                                        | :heavy_check_mark:                                                                                              | Metadata key to evaluate, matched literally. A period is part of the key name, not a path into nested metadata. |
| `operator`                                                                                                      | [models.Operator3](../models/operator3.md)                                                                      | :heavy_check_mark:                                                                                              | Numeric comparison to apply                                                                                     |
| `value`                                                                                                         | *number*                                                                                                        | :heavy_check_mark:                                                                                              | Numeric value to compare against                                                                                |