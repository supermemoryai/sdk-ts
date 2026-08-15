# Suggestion

Definition of a single profile bucket

## Example Usage

```typescript
import { Suggestion } from "supermemory/models/operations";

let value: Suggestion = {
  key: "<key>",
};
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `key`                                                                 | *string*                                                              | :heavy_check_mark:                                                    | Stable slug for the bucket, stored on each memory                     |
| `description`                                                         | *string*                                                              | :heavy_minus_sign:                                                    | What belongs in this bucket — used to guide the ingestion classifier. |