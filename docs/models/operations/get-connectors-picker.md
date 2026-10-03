# GetConnectorsPicker

## Example Usage

```typescript
import { GetConnectorsPicker } from "supermemory/models/operations";

let value: GetConnectorsPicker = {
  url: "https://frozen-chairperson.name",
  expiresAt: new Date("2026-09-04T21:22:29.598Z"),
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `url`                                                                                         | *string*                                                                                      | :heavy_check_mark:                                                                            | Send the user here to choose what syncs. Works once, in any browser.                          |
| `expiresAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | N/A                                                                                           |