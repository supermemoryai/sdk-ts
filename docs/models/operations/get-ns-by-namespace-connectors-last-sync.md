# GetNsByNamespaceConnectorsLastSync

## Example Usage

```typescript
import { GetNsByNamespaceConnectorsLastSync } from "supermemory/models/operations";

let value: GetNsByNamespaceConnectorsLastSync = {
  status: "completed",
  errorCode: "auth_expired",
  error: "<value>",
  startedAt: new Date("2025-12-13T20:36:49.226Z"),
  completedAt: new Date("2026-04-30T17:23:58.040Z"),
};
```

## Fields

| Field                                                                                                                                    | Type                                                                                                                                     | Required                                                                                                                                 | Description                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `status`                                                                                                                                 | [operations.GetNsByNamespaceConnectorsLastSyncStatus](../../models/operations/get-ns-by-namespace-connectors-last-sync-status.md)        | :heavy_check_mark:                                                                                                                       | N/A                                                                                                                                      |
| `errorCode`                                                                                                                              | [operations.GetNsByNamespaceConnectorsLastSyncErrorCode](../../models/operations/get-ns-by-namespace-connectors-last-sync-error-code.md) | :heavy_check_mark:                                                                                                                       | N/A                                                                                                                                      |
| `error`                                                                                                                                  | *string*                                                                                                                                 | :heavy_check_mark:                                                                                                                       | Customer-safe error message                                                                                                              |
| `startedAt`                                                                                                                              | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)                                            | :heavy_check_mark:                                                                                                                       | N/A                                                                                                                                      |
| `completedAt`                                                                                                                            | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)                                            | :heavy_check_mark:                                                                                                                       | N/A                                                                                                                                      |