# Gmail

## Example Usage

```typescript
import { Gmail } from "supermemory/models/operations";

let value: Gmail = {
  provider: "gmail",
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `provider`                                                 | *"gmail"*                                                  | :heavy_check_mark:                                         | N/A                                                        |
| `redirectUrl`                                              | *string*                                                   | :heavy_minus_sign:                                         | Where the user returns after authorizing with the provider |
| `documentLimit`                                            | *number*                                                   | :heavy_minus_sign:                                         | Maximum documents this connector imports                   |