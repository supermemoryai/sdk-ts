# GetNsByNamespaceRequest

## Example Usage

```typescript
import { GetNsByNamespaceRequest } from "supermemory/models/operations";

let value: GetNsByNamespaceRequest = {
  namespace: "user_alex",
};
```

## Fields

| Field                                                                                                                                         | Type                                                                                                                                          | Required                                                                                                                                      | Description                                                                                                                                   | Example                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `namespace`                                                                                                                                   | *string*                                                                                                                                      | :heavy_check_mark:                                                                                                                            | Namespace identifier. This can be an ID for your user, a project ID, or any other identifier you wish to use to scope documents and memories. | user_alex                                                                                                                                     |