# GetConnectorsResponse

Connectors across namespaces

## Example Usage

```typescript
import { GetConnectorsResponse } from "supermemory/models/operations";

let value: GetConnectorsResponse = {
  connectors: [],
  pagination: {
    currentPage: 1,
    totalItems: 100,
    totalPages: 10,
  },
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                | Example                                                                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `connectors`                                                                               | [operations.GetConnectorsConnector](../../models/operations/get-connectors-connector.md)[] | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |
| `pagination`                                                                               | [operations.GetConnectorsPagination](../../models/operations/get-connectors-pagination.md) | :heavy_check_mark:                                                                         | Pagination metadata                                                                        | {<br/>"currentPage": 1,<br/>"limit": 10,<br/>"totalItems": 100,<br/>"totalPages": 10<br/>} |