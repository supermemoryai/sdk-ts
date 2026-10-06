# Onedrive

## Example Usage

```typescript
import { Onedrive } from "supermemory/models/operations";

let value: Onedrive = {
  provider: "onedrive",
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `provider`                                                 | *"onedrive"*                                               | :heavy_check_mark:                                         | N/A                                                        |
| `redirectUrl`                                              | *string*                                                   | :heavy_minus_sign:                                         | Where the user returns after authorizing with the provider |
| `documentLimit`                                            | *number*                                                   | :heavy_minus_sign:                                         | Maximum documents this connector imports                   |