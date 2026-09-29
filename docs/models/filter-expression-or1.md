# FilterExpressionOr1

## Example Usage

```typescript
import { FilterExpressionOr1 } from "supermemory/models";

let value: FilterExpressionOr1 = {
  operator: "or",
  operands: [],
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `operator`                                             | *"or"*                                                 | :heavy_check_mark:                                     | Require at least one nested filter expression to match |
| `operands`                                             | *models.FilterExpression*[]                            | :heavy_check_mark:                                     | Filter expressions combined with logical OR            |