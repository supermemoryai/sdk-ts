# GetConnectorsCapabilities

## Example Usage

```typescript
import { GetConnectorsCapabilities } from "supermemory/models/operations";

let value: GetConnectorsCapabilities = {
  selectable: false,
  webhooks: true,
};
```

## Fields

| Field                                                 | Type                                                  | Required                                              | Description                                           |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `selectable`                                          | *boolean*                                             | :heavy_check_mark:                                    | Supports choosing what to sync via the hosted picker  |
| `webhooks`                                            | *boolean*                                             | :heavy_check_mark:                                    | Receives change notifications instead of only polling |