# GetNsByNamespaceConnectorsByIdLastSync

## Example Usage

```typescript
import { GetNsByNamespaceConnectorsByIdLastSync } from "supermemory/models/operations";

let value: GetNsByNamespaceConnectorsByIdLastSync = {
  status: "running",
  errorCode: "rate_limited",
  error: "<value>",
  startedAt: new Date("2026-08-27T12:18:28.540Z"),
  completedAt: new Date("2026-09-27T07:36:53.730Z"),
};
```

## Fields

| Field                                                                                                                                              | Type                                                                                                                                               | Required                                                                                                                                           | Description                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `status`                                                                                                                                           | [operations.GetNsByNamespaceConnectorsByIdLastSyncStatus](../../models/operations/get-ns-by-namespace-connectors-by-id-last-sync-status.md)        | :heavy_check_mark:                                                                                                                                 | N/A                                                                                                                                                |
| `errorCode`                                                                                                                                        | [operations.GetNsByNamespaceConnectorsByIdLastSyncErrorCode](../../models/operations/get-ns-by-namespace-connectors-by-id-last-sync-error-code.md) | :heavy_check_mark:                                                                                                                                 | N/A                                                                                                                                                |
| `error`                                                                                                                                            | *string*                                                                                                                                           | :heavy_check_mark:                                                                                                                                 | Customer-safe error message                                                                                                                        |
| `startedAt`                                                                                                                                        | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)                                                      | :heavy_check_mark:                                                                                                                                 | N/A                                                                                                                                                |
| `completedAt`                                                                                                                                      | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)                                                      | :heavy_check_mark:                                                                                                                                 | N/A                                                                                                                                                |