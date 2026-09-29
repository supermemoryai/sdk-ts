# PatchNsByNamespaceRequest

## Example Usage

```typescript
import { PatchNsByNamespaceRequest } from "supermemory/models/operations";

let value: PatchNsByNamespaceRequest = {
  namespace: "user_alex",
  body: {
    supportingContext: "This namespace holds Acme Corp support tickets.",
  },
};
```

## Fields

| Field                                                                                                                                         | Type                                                                                                                                          | Required                                                                                                                                      | Description                                                                                                                                   | Example                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `namespace`                                                                                                                                   | *string*                                                                                                                                      | :heavy_check_mark:                                                                                                                            | Namespace identifier. This can be an ID for your user, a project ID, or any other identifier you wish to use to scope documents and memories. | user_alex                                                                                                                                     |
| `body`                                                                                                                                        | [operations.PatchNsByNamespaceRequestBody](../../models/operations/patch-ns-by-namespace-request-body.md)                                     | :heavy_check_mark:                                                                                                                            | N/A                                                                                                                                           |                                                                                                                                               |