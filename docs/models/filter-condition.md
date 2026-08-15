# FilterCondition

A single filter condition based on metadata, numeric values, array contents, or string matching

## Example Usage

```typescript
import { FilterCondition } from "supermemory/models";

let value: FilterCondition = {
  key: "<key>",
  value: "<value>",
};
```

## Fields

| Field                                                   | Type                                                    | Required                                                | Description                                             |
| ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| `filterType`                                            | [models.FilterType](../models/filter-type.md)           | :heavy_minus_sign:                                      | N/A                                                     |
| `key`                                                   | *string*                                                | :heavy_check_mark:                                      | N/A                                                     |
| `negate`                                                | *models.Negate*                                         | :heavy_minus_sign:                                      | N/A                                                     |
| `ignoreCase`                                            | *models.IgnoreCase*                                     | :heavy_minus_sign:                                      | N/A                                                     |
| `numericOperator`                                       | [models.NumericOperator](../models/numeric-operator.md) | :heavy_minus_sign:                                      | N/A                                                     |
| `value`                                                 | *string*                                                | :heavy_check_mark:                                      | N/A                                                     |