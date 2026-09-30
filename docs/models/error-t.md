# ErrorT

## Example Usage

```typescript
import { ErrorT } from "supermemory/models";

let value: ErrorT = {
  message: "<value>",
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `message`          | *string*           | :heavy_check_mark: | N/A                |
| `path`             | *models.Path*[]    | :heavy_minus_sign: | N/A                |