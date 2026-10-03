# GetConnectorsLastSync

## Example Usage

```typescript
import { GetConnectorsLastSync } from "supermemory/models/operations";

let value: GetConnectorsLastSync = {
  status: "running",
  errorCode: "provider_unavailable",
  error: "<value>",
  startedAt: new Date("2026-06-18T05:25:21.712Z"),
  completedAt: null,
};
```

## Fields

| Field                                                                                                       | Type                                                                                                        | Required                                                                                                    | Description                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `status`                                                                                                    | [operations.GetConnectorsLastSyncStatus](../../models/operations/get-connectors-last-sync-status.md)        | :heavy_check_mark:                                                                                          | N/A                                                                                                         |
| `errorCode`                                                                                                 | [operations.GetConnectorsLastSyncErrorCode](../../models/operations/get-connectors-last-sync-error-code.md) | :heavy_check_mark:                                                                                          | N/A                                                                                                         |
| `error`                                                                                                     | *string*                                                                                                    | :heavy_check_mark:                                                                                          | Customer-safe error message                                                                                 |
| `startedAt`                                                                                                 | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)               | :heavy_check_mark:                                                                                          | N/A                                                                                                         |
| `completedAt`                                                                                               | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)               | :heavy_check_mark:                                                                                          | N/A                                                                                                         |