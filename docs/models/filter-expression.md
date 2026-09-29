# FilterExpression

A type-safe metadata filter predicate or nested and/or expression. The API validates up to 5 levels of nesting.


## Supported Types

### `models.FilterPredicateUnion`

```typescript
const value: models.FilterPredicateUnion = {
  field: "<value>",
  operator: "lte",
  value: 5848.53,
};
```

### `models.FilterExpressionAnd1`

```typescript
const value: models.FilterExpressionAnd1 = {
  operator: "and",
  operands: [
    {
      operator: "and",
      operands: [],
    },
  ],
};
```

### `models.FilterExpressionOr1`

```typescript
const value: models.FilterExpressionOr1 = {
  operator: "or",
  operands: [],
};
```

