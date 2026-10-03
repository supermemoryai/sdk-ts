# GetNsByNamespaceConnectorsSync

## Example Usage

```typescript
import { GetNsByNamespaceConnectorsSync } from "supermemory/models/operations";

let value: GetNsByNamespaceConnectorsSync = {
  status: "completed",
  errorCode: "internal",
  error: "<value>",
  startedAt: new Date("2024-07-21T02:23:07.505Z"),
  completedAt: new Date("2024-05-28T00:16:29.117Z"),
  id: "<id>",
  trigger: "event",
  itemsProcessed: 5697.74,
  itemsFailed: 6494.28,
  failures: [],
};
```

## Fields

| Field                                                                                                                           | Type                                                                                                                            | Required                                                                                                                        | Description                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `status`                                                                                                                        | [operations.GetNsByNamespaceConnectorsSyncStatus](../../models/operations/get-ns-by-namespace-connectors-sync-status.md)        | :heavy_check_mark:                                                                                                              | N/A                                                                                                                             |
| `errorCode`                                                                                                                     | [operations.GetNsByNamespaceConnectorsSyncErrorCode](../../models/operations/get-ns-by-namespace-connectors-sync-error-code.md) | :heavy_check_mark:                                                                                                              | N/A                                                                                                                             |
| `error`                                                                                                                         | *string*                                                                                                                        | :heavy_check_mark:                                                                                                              | Customer-safe error message                                                                                                     |
| `startedAt`                                                                                                                     | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)                                   | :heavy_check_mark:                                                                                                              | N/A                                                                                                                             |
| `completedAt`                                                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)                                   | :heavy_check_mark:                                                                                                              | N/A                                                                                                                             |
| `id`                                                                                                                            | *string*                                                                                                                        | :heavy_check_mark:                                                                                                              | N/A                                                                                                                             |
| `trigger`                                                                                                                       | [operations.GetNsByNamespaceConnectorsTrigger](../../models/operations/get-ns-by-namespace-connectors-trigger.md)               | :heavy_check_mark:                                                                                                              | N/A                                                                                                                             |
| `itemsProcessed`                                                                                                                | *number*                                                                                                                        | :heavy_check_mark:                                                                                                              | N/A                                                                                                                             |
| `itemsFailed`                                                                                                                   | *number*                                                                                                                        | :heavy_check_mark:                                                                                                              | N/A                                                                                                                             |
| `failures`                                                                                                                      | [operations.GetNsByNamespaceConnectorsFailure](../../models/operations/get-ns-by-namespace-connectors-failure.md)[]             | :heavy_check_mark:                                                                                                              | Failed items, capped. itemsFailed is the true count.                                                                            |