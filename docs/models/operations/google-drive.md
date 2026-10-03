# GoogleDrive

## Example Usage

```typescript
import { GoogleDrive } from "supermemory/models/operations";

let value: GoogleDrive = {
  provider: "google-drive",
};
```

## Fields

| Field                                                                                                               | Type                                                                                                                | Required                                                                                                            | Description                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `provider`                                                                                                          | *"google-drive"*                                                                                                    | :heavy_check_mark:                                                                                                  | N/A                                                                                                                 |
| `redirectUrl`                                                                                                       | *string*                                                                                                            | :heavy_minus_sign:                                                                                                  | Where the user returns after authorizing with the provider                                                          |
| `documentLimit`                                                                                                     | *number*                                                                                                            | :heavy_minus_sign:                                                                                                  | Maximum documents this connector imports                                                                            |
| `config`                                                                                                            | [operations.PostNsByNamespaceConnectorsConfig1](../../models/operations/post-ns-by-namespace-connectors-config1.md) | :heavy_minus_sign:                                                                                                  | N/A                                                                                                                 |