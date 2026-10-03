# GetConnectorsRequest

## Example Usage

```typescript
import { GetConnectorsRequest } from "supermemory/models/operations";

let value: GetConnectorsRequest = {};
```

## Fields

| Field                                                                                                        | Type                                                                                                         | Required                                                                                                     | Description                                                                                                  |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `provider`                                                                                                   | [operations.GetConnectorsQueryParamProvider](../../models/operations/get-connectors-query-param-provider.md) | :heavy_minus_sign:                                                                                           | Only return connectors for this provider                                                                     |
| `page`                                                                                                       | *number*                                                                                                     | :heavy_minus_sign:                                                                                           | One-based page number                                                                                        |
| `limit`                                                                                                      | *number*                                                                                                     | :heavy_minus_sign:                                                                                           | Maximum connectors to return per page                                                                        |