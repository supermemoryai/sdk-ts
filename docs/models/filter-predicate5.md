# FilterPredicate5

## Example Usage

```typescript
import { FilterPredicate5 } from "supermemory/models";

let value: FilterPredicate5 = {
  field: "<value>",
  operator: "arrayContains",
  value: "<value>",
};
```

## Fields

| Field                                                                                                           | Type                                                                                                            | Required                                                                                                        | Description                                                                                                     |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `field`                                                                                                         | *string*                                                                                                        | :heavy_check_mark:                                                                                              | Metadata key to evaluate, matched literally. A period is part of the key name, not a path into nested metadata. |
| `operator`                                                                                                      | [models.Operator5](../models/operator5.md)                                                                      | :heavy_check_mark:                                                                                              | Require or exclude an exact array member                                                                        |
| `value`                                                                                                         | *string*                                                                                                        | :heavy_check_mark:                                                                                              | Array member to look for                                                                                        |