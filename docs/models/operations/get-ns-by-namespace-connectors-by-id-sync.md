# GetNsByNamespaceConnectorsByIdSync

## Example Usage

```typescript
import { GetNsByNamespaceConnectorsByIdSync } from "supermemory/models/operations";

let value: GetNsByNamespaceConnectorsByIdSync = {
  status: "failed",
  errorCode: "rate_limited",
  error: "<value>",
  startedAt: new Date("2024-03-12T23:46:12.687Z"),
  completedAt: new Date("2025-10-30T10:53:08.909Z"),
  id: "<id>",
  trigger: "event",
  itemsProcessed: 7897.46,
  itemsFailed: 3251.75,
  failures: [
    {
      documentId: "<id>",
      title: null,
      errorCode: "<value>",
      errorMessage: "<value>",
      failedAt: "<value>",
    },
  ],
};
```

## Fields

| Field                                                                                                                                     | Type                                                                                                                                      | Required                                                                                                                                  | Description                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `status`                                                                                                                                  | [operations.GetNsByNamespaceConnectorsByIdSyncStatus](../../models/operations/get-ns-by-namespace-connectors-by-id-sync-status.md)        | :heavy_check_mark:                                                                                                                        | N/A                                                                                                                                       |
| `errorCode`                                                                                                                               | [operations.GetNsByNamespaceConnectorsByIdSyncErrorCode](../../models/operations/get-ns-by-namespace-connectors-by-id-sync-error-code.md) | :heavy_check_mark:                                                                                                                        | N/A                                                                                                                                       |
| `error`                                                                                                                                   | *string*                                                                                                                                  | :heavy_check_mark:                                                                                                                        | Customer-safe error message                                                                                                               |
| `startedAt`                                                                                                                               | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)                                             | :heavy_check_mark:                                                                                                                        | N/A                                                                                                                                       |
| `completedAt`                                                                                                                             | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)                                             | :heavy_check_mark:                                                                                                                        | N/A                                                                                                                                       |
| `id`                                                                                                                                      | *string*                                                                                                                                  | :heavy_check_mark:                                                                                                                        | N/A                                                                                                                                       |
| `trigger`                                                                                                                                 | [operations.GetNsByNamespaceConnectorsByIdTrigger](../../models/operations/get-ns-by-namespace-connectors-by-id-trigger.md)               | :heavy_check_mark:                                                                                                                        | N/A                                                                                                                                       |
| `itemsProcessed`                                                                                                                          | *number*                                                                                                                                  | :heavy_check_mark:                                                                                                                        | N/A                                                                                                                                       |
| `itemsFailed`                                                                                                                             | *number*                                                                                                                                  | :heavy_check_mark:                                                                                                                        | N/A                                                                                                                                       |
| `failures`                                                                                                                                | [operations.GetNsByNamespaceConnectorsByIdFailure](../../models/operations/get-ns-by-namespace-connectors-by-id-failure.md)[]             | :heavy_check_mark:                                                                                                                        | Failed items, capped. itemsFailed is the true count.                                                                                      |