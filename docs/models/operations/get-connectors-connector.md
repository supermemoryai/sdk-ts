# GetConnectorsConnector

## Example Usage

```typescript
import { GetConnectorsConnector } from "supermemory/models/operations";

let value: GetConnectorsConnector = {
  id: "<id>",
  provider: "web-crawler",
  namespace: "<value>",
  account: "08938648",
  capabilities: {
    selectable: true,
    webhooks: true,
  },
  config: {
    "key": "<value>",
  },
  selection: {
    "labels": [
      {
        id: "INBOX",
        name: "Inbox",
      },
    ],
  },
  documentLimit: 3313.91,
  documentCount: 6283.56,
  lastSync: null,
  lastSyncedAt: null,
  createdAt: new Date("2024-03-15T09:32:49.496Z"),
};
```

## Fields

| Field                                                                                                           | Type                                                                                                            | Required                                                                                                        | Description                                                                                                     | Example                                                                                                         |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                            | *string*                                                                                                        | :heavy_check_mark:                                                                                              | N/A                                                                                                             |                                                                                                                 |
| `provider`                                                                                                      | [operations.GetConnectorsConnectorProvider](../../models/operations/get-connectors-connector-provider.md)       | :heavy_check_mark:                                                                                              | External source                                                                                                 |                                                                                                                 |
| `namespace`                                                                                                     | *string*                                                                                                        | :heavy_check_mark:                                                                                              | Namespace the connector syncs into. Null only for connectors created before namespaces were required.           |                                                                                                                 |
| `account`                                                                                                       | *string*                                                                                                        | :heavy_check_mark:                                                                                              | Account on the provider side, usually an email                                                                  |                                                                                                                 |
| `capabilities`                                                                                                  | [operations.GetConnectorsCapabilities](../../models/operations/get-connectors-capabilities.md)                  | :heavy_check_mark:                                                                                              | N/A                                                                                                             |                                                                                                                 |
| `config`                                                                                                        | Record<string, *operations.GetConnectorsConfig*>                                                                | :heavy_check_mark:                                                                                              | Non-secret setup, such as the S3 bucket, crawler start URL or Notion workspace. Credentials are never returned. |                                                                                                                 |
| `selection`                                                                                                     | Record<string, [operations.GetConnectorsSelection](../../models/operations/get-connectors-selection.md)[]>      | :heavy_check_mark:                                                                                              | What syncs, grouped by kind, in the same shape PATCH takes. Null for connectors that sync everything.           | {<br/>"labels": [<br/>{<br/>"id": "INBOX",<br/>"name": "Inbox"<br/>}<br/>]<br/>}                                |
| `documentLimit`                                                                                                 | *number*                                                                                                        | :heavy_check_mark:                                                                                              | N/A                                                                                                             |                                                                                                                 |
| `documentCount`                                                                                                 | *number*                                                                                                        | :heavy_check_mark:                                                                                              | N/A                                                                                                             |                                                                                                                 |
| `lastSync`                                                                                                      | [operations.GetConnectorsLastSync](../../models/operations/get-connectors-last-sync.md)                         | :heavy_check_mark:                                                                                              | Most recent sync run                                                                                            |                                                                                                                 |
| `lastSyncedAt`                                                                                                  | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)                   | :heavy_check_mark:                                                                                              | When content last finished syncing                                                                              |                                                                                                                 |
| `createdAt`                                                                                                     | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)                   | :heavy_check_mark:                                                                                              | N/A                                                                                                             |                                                                                                                 |
| `syncs`                                                                                                         | [operations.GetConnectorsSync](../../models/operations/get-connectors-sync.md)[]                                | :heavy_minus_sign:                                                                                              | Present when attach=syncs                                                                                       |                                                                                                                 |
| `picker`                                                                                                        | [operations.GetConnectorsPicker](../../models/operations/get-connectors-picker.md)                              | :heavy_minus_sign:                                                                                              | Present when attach=picker. Null for connectors that sync everything.                                           |                                                                                                                 |