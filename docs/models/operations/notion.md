# Notion

## Example Usage

```typescript
import { Notion } from "supermemory/models/operations";

let value: Notion = {
  provider: "notion",
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `provider`                                                 | *"notion"*                                                 | :heavy_check_mark:                                         | N/A                                                        |
| `redirectUrl`                                              | *string*                                                   | :heavy_minus_sign:                                         | Where the user returns after authorizing with the provider |
| `documentLimit`                                            | *number*                                                   | :heavy_minus_sign:                                         | Maximum documents this connector imports                   |