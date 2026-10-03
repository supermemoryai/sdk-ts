# PatchNsByNamespaceConnectorsByIdRequest

## Example Usage

```typescript
import { PatchNsByNamespaceConnectorsByIdRequest } from "supermemory/models/operations";

let value: PatchNsByNamespaceConnectorsByIdRequest = {
  namespace: "user_alex",
  id: "PTzGiUYei7pgzg5buzZHgA",
  body: {},
};
```

## Fields

| Field                                                                                                                                         | Type                                                                                                                                          | Required                                                                                                                                      | Description                                                                                                                                   | Example                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `namespace`                                                                                                                                   | *string*                                                                                                                                      | :heavy_check_mark:                                                                                                                            | Namespace identifier. This can be an ID for your user, a project ID, or any other identifier you wish to use to scope documents and memories. | user_alex                                                                                                                                     |
| `id`                                                                                                                                          | *string*                                                                                                                                      | :heavy_check_mark:                                                                                                                            | Connector identifier returned when the connector was created                                                                                  | PTzGiUYei7pgzg5buzZHgA                                                                                                                        |
| `body`                                                                                                                                        | [operations.PatchNsByNamespaceConnectorsByIdRequestBody](../../models/operations/patch-ns-by-namespace-connectors-by-id-request-body.md)      | :heavy_check_mark:                                                                                                                            | N/A                                                                                                                                           |                                                                                                                                               |