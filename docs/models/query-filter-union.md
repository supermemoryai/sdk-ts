# QueryFilterUnion

Root query object that must contain either an AND or OR array of filter expressions


## Supported Types

### `models.QueryFilter1`

```typescript
const value: models.QueryFilter1 = {
  or: [],
};
```

### `models.QueryFilter2`

```typescript
const value: models.QueryFilter2 = {
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

