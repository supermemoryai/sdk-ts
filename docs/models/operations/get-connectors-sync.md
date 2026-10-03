# GetConnectorsSync

## Example Usage

```typescript
import { GetConnectorsSync } from "supermemory/models/operations";

let value: GetConnectorsSync = {
  status: "failed",
  errorCode: "auth_expired",
  error: "<value>",
  startedAt: new Date("2025-12-04T03:48:05.626Z"),
  completedAt: new Date("2025-06-09T19:51:15.899Z"),
  id: "<id>",
  trigger: "manual",
  itemsProcessed: 7653.49,
  itemsFailed: 5106.95,
  failures: [],
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `status`                                                                                           | [operations.GetConnectorsSyncStatus](../../models/operations/get-connectors-sync-status.md)        | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `errorCode`                                                                                        | [operations.GetConnectorsSyncErrorCode](../../models/operations/get-connectors-sync-error-code.md) | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `error`                                                                                            | *string*                                                                                           | :heavy_check_mark:                                                                                 | Customer-safe error message                                                                        |
| `startedAt`                                                                                        | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)      | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `completedAt`                                                                                      | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)      | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `id`                                                                                               | *string*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `trigger`                                                                                          | [operations.GetConnectorsTrigger](../../models/operations/get-connectors-trigger.md)               | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `itemsProcessed`                                                                                   | *number*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `itemsFailed`                                                                                      | *number*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `failures`                                                                                         | [operations.GetConnectorsFailure](../../models/operations/get-connectors-failure.md)[]             | :heavy_check_mark:                                                                                 | Failed items, capped. itemsFailed is the true count.                                               |