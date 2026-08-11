# LogicalExpression1

## Example Usage

```typescript
import { LogicalExpression1 } from "supermemory/models";

let value: LogicalExpression1 = {
  or: [
    {
      filterType: "metadata",
      key: "<key>",
      numericOperator: "=",
      value: "<value>",
    },
  ],
};
```

## Fields

| Field                                         | Type                                          | Required                                      | Description                                   |
| --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| `or`                                          | *models.LogicalExpressionUnion*[]             | :heavy_check_mark:                            | OR: Array of conditions or nested expressions |