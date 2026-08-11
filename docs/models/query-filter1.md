# QueryFilter1

## Example Usage

```typescript
import { QueryFilter1 } from "supermemory/models";

let value: QueryFilter1 = {
  or: [],
};
```

## Fields

| Field                             | Type                              | Required                          | Description                       |
| --------------------------------- | --------------------------------- | --------------------------------- | --------------------------------- |
| `or`                              | *models.LogicalExpressionUnion*[] | :heavy_check_mark:                | Array of OR filter expressions    |