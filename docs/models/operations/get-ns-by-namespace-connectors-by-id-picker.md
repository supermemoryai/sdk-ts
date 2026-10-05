# GetNsByNamespaceConnectorsByIdPicker

## Example Usage

```typescript
import { GetNsByNamespaceConnectorsByIdPicker } from "supermemory/models/operations";

let value: GetNsByNamespaceConnectorsByIdPicker = {
  url: "https://runny-wedding.name",
  expiresAt: new Date("2026-07-14T13:17:17.126Z"),
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `url`                                                                                         | *string*                                                                                      | :heavy_check_mark:                                                                            | Send the user here to choose what syncs. Works once, in any browser.                          |
| `expiresAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | N/A                                                                                           |