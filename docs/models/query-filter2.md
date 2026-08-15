# QueryFilter2

## Example Usage

```typescript
import { QueryFilter2 } from "supermemory/models";

let value: QueryFilter2 = {
  and: [
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

| Field                             | Type                              | Required                          | Description                       |
| --------------------------------- | --------------------------------- | --------------------------------- | --------------------------------- |
| `and`                             | *models.LogicalExpressionUnion*[] | :heavy_check_mark:                | Array of AND filter expressions   |