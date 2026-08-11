# LogicalExpressionUnion

A single filter condition or a nested AND/OR expression. The API validates up to 5 levels of nesting.


## Supported Types

### `models.FilterCondition`

```typescript
const value: models.FilterCondition = {
  key: "<key>",
  value: "<value>",
};
```

### `models.LogicalExpression1`

```typescript
const value: models.LogicalExpression1 = {
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

### `models.LogicalExpression2`

```typescript
const value: models.LogicalExpression2 = {
  and: [],
};
```

