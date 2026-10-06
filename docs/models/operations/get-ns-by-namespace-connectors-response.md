# GetNsByNamespaceConnectorsResponse

Connectors in this namespace

## Example Usage

```typescript
import { GetNsByNamespaceConnectorsResponse } from "supermemory/models/operations";

let value: GetNsByNamespaceConnectorsResponse = {
  connectors: [
    {
      id: "<id>",
      provider: "google-drive",
      status: "pending_authorization",
      namespace: null,
      account: "48808965",
      capabilities: {
        selectable: false,
        webhooks: false,
      },
      config: {},
      selection: {
        "labels": [
          {
            id: "INBOX",
            name: "Inbox",
          },
        ],
      },
      documentLimit: 9436.88,
      documentCount: 2789.88,
      lastSync: {
        status: "running",
        errorCode: "rate_limited",
        error: "<value>",
        startedAt: new Date("2024-07-07T21:42:17.574Z"),
        completedAt: null,
      },
      lastSyncedAt: new Date("2025-12-14T06:31:23.406Z"),
      createdAt: new Date("2026-08-30T10:31:45.990Z"),
    },
  ],
  pagination: {
    currentPage: 1,
    totalItems: 100,
    totalPages: 10,
  },
};
```

## Fields

| Field                                                                                                                   | Type                                                                                                                    | Required                                                                                                                | Description                                                                                                             | Example                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `connectors`                                                                                                            | [operations.GetNsByNamespaceConnectorsConnector](../../models/operations/get-ns-by-namespace-connectors-connector.md)[] | :heavy_check_mark:                                                                                                      | N/A                                                                                                                     |                                                                                                                         |
| `pagination`                                                                                                            | [operations.GetNsByNamespaceConnectorsPagination](../../models/operations/get-ns-by-namespace-connectors-pagination.md) | :heavy_check_mark:                                                                                                      | Pagination metadata                                                                                                     | {<br/>"currentPage": 1,<br/>"limit": 10,<br/>"totalItems": 100,<br/>"totalPages": 10<br/>}                              |