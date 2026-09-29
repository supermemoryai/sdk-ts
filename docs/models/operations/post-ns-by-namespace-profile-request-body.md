# PostNsByNamespaceProfileRequestBody

## Example Usage

```typescript
import { PostNsByNamespaceProfileRequestBody } from "supermemory/models/operations";

let value: PostNsByNamespaceProfileRequestBody = {
  buckets: [
    "interests",
    "goals",
  ],
};
```

## Fields

| Field                                                                                                           | Type                                                                                                            | Required                                                                                                        | Description                                                                                                     | Example                                                                                                         |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `filter`                                                                                                        | *models.FilterExpression*                                                                                       | :heavy_minus_sign:                                                                                              | A type-safe metadata filter predicate or nested and/or expression. The API validates up to 5 levels of nesting. |                                                                                                                 |
| `buckets`                                                                                                       | *string*[]                                                                                                      | :heavy_minus_sign:                                                                                              | Custom buckets to return. Omit to return every effective bucket.                                                | [<br/>"interests",<br/>"goals"<br/>]                                                                            |