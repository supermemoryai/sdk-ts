# Github

## Example Usage

```typescript
import { Github } from "supermemory/models/operations";

let value: Github = {
  provider: "github",
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `provider`                                                 | *"github"*                                                 | :heavy_check_mark:                                         | N/A                                                        |
| `redirectUrl`                                              | *string*                                                   | :heavy_minus_sign:                                         | Where the user returns after authorizing with the provider |
| `documentLimit`                                            | *number*                                                   | :heavy_minus_sign:                                         | Maximum documents this connector imports                   |