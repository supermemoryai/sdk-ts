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
      namespace: null,
      account: null,
      capabilities: {
        selectable: true,
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
      documentLimit: 8349.08,
      documentCount: 8518.92,
      lastSync: null,
      lastSyncedAt: new Date("2026-10-02T22:10:42.460Z"),
      createdAt: new Date("2025-12-10T10:00:54.557Z"),
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