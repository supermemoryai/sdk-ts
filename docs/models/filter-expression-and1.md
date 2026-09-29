# FilterExpressionAnd1

## Example Usage

```typescript
import { FilterExpressionAnd1 } from "supermemory/models";

let value: FilterExpressionAnd1 = {
  operator: "and",
  operands: [
    {
      operator: "and",
      operands: [],
    },
  ],
};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `operator`                                      | *"and"*                                         | :heavy_check_mark:                              | Require every nested filter expression to match |
| `operands`                                      | *models.FilterExpression*[]                     | :heavy_check_mark:                              | Filter expressions combined with logical AND    |