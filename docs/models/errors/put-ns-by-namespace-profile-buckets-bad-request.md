# PutNsByNamespaceProfileBucketsBadRequest

Invalid profile bucket definitions


## Supported Types

### `errors.ErrorResponse`

```typescript
const value: errors.ErrorResponse = {
  error: "Invalid request parameters",
  details: "Query must be at least 1 character long",
};
```

### `errors.ValidationErrorResponse`

```typescript
const value: errors.ValidationErrorResponse = {
  success: false,
  error: [
    {
      message: "<value>",
    },
  ],
};
```

