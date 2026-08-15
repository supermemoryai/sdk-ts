# PatchV3SettingsResponse

Settings updated successfully

## Example Usage

```typescript
import { PatchV3SettingsResponse } from "supermemory/models/operations";

let value: PatchV3SettingsResponse = {
  orgId: "<id>",
  orgSlug: "<value>",
  updated: {},
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `orgId`                                                  | *string*                                                 | :heavy_check_mark:                                       | N/A                                                      |
| `orgSlug`                                                | *string*                                                 | :heavy_check_mark:                                       | N/A                                                      |
| `updated`                                                | [operations.Updated](../../models/operations/updated.md) | :heavy_check_mark:                                       | N/A                                                      |