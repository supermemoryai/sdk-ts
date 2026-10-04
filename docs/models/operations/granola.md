# Granola

## Example Usage

```typescript
import { Granola } from "supermemory/models/operations";

let value: Granola = {
  provider: "granola",
  config: {
    apiKey: "<value>",
  },
};
```

## Fields

| Field                                                                                                               | Type                                                                                                                | Required                                                                                                            | Description                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `provider`                                                                                                          | *"granola"*                                                                                                         | :heavy_check_mark:                                                                                                  | N/A                                                                                                                 |
| `config`                                                                                                            | [operations.PostNsByNamespaceConnectorsConfig4](../../models/operations/post-ns-by-namespace-connectors-config4.md) | :heavy_check_mark:                                                                                                  | Granola API key. Stored encrypted and never returned.                                                               |
| `documentLimit`                                                                                                     | *number*                                                                                                            | :heavy_minus_sign:                                                                                                  | Maximum documents this connector imports                                                                            |