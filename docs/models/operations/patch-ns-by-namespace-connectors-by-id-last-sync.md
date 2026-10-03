# PatchNsByNamespaceConnectorsByIdLastSync

## Example Usage

```typescript
import { PatchNsByNamespaceConnectorsByIdLastSync } from "supermemory/models/operations";

let value: PatchNsByNamespaceConnectorsByIdLastSync = {
  status: "running",
  errorCode: "rate_limited",
  error: "<value>",
  startedAt: new Date("2024-01-28T09:10:18.523Z"),
  completedAt: new Date("2026-06-02T16:44:24.519Z"),
};
```

## Fields

| Field                                                                                                                                                  | Type                                                                                                                                                   | Required                                                                                                                                               | Description                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `status`                                                                                                                                               | [operations.PatchNsByNamespaceConnectorsByIdLastSyncStatus](../../models/operations/patch-ns-by-namespace-connectors-by-id-last-sync-status.md)        | :heavy_check_mark:                                                                                                                                     | N/A                                                                                                                                                    |
| `errorCode`                                                                                                                                            | [operations.PatchNsByNamespaceConnectorsByIdLastSyncErrorCode](../../models/operations/patch-ns-by-namespace-connectors-by-id-last-sync-error-code.md) | :heavy_check_mark:                                                                                                                                     | N/A                                                                                                                                                    |
| `error`                                                                                                                                                | *string*                                                                                                                                               | :heavy_check_mark:                                                                                                                                     | Customer-safe error message                                                                                                                            |
| `startedAt`                                                                                                                                            | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)                                                          | :heavy_check_mark:                                                                                                                                     | N/A                                                                                                                                                    |
| `completedAt`                                                                                                                                          | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)                                                          | :heavy_check_mark:                                                                                                                                     | N/A                                                                                                                                                    |