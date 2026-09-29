# ValidationErrorResponse

Body returned when request input fails schema validation

## Example Usage

```typescript
import { ValidationErrorResponse } from "supermemory/models/errors";

// No examples available for this model
```

## Fields

| Field                                      | Type                                       | Required                                   | Description                                |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| `success`                                  | *false*                                    | :heavy_check_mark:                         | N/A                                        |
| `error`                                    | [models.ErrorT](../../models/error-t.md)[] | :heavy_check_mark:                         | Validation issues                          |
| `data`                                     | *any*                                      | :heavy_minus_sign:                         | The input that failed validation           |