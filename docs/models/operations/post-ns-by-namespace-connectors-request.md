# PostNsByNamespaceConnectorsRequest

## Example Usage

```typescript
import { PostNsByNamespaceConnectorsRequest } from "supermemory/models/operations";

let value: PostNsByNamespaceConnectorsRequest = {
  namespace: "user_alex",
  body: {
    provider: "github",
  },
};
```

## Fields

| Field                                                                                                                                         | Type                                                                                                                                          | Required                                                                                                                                      | Description                                                                                                                                   | Example                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `namespace`                                                                                                                                   | *string*                                                                                                                                      | :heavy_check_mark:                                                                                                                            | Namespace identifier. This can be an ID for your user, a project ID, or any other identifier you wish to use to scope documents and memories. | user_alex                                                                                                                                     |
| `body`                                                                                                                                        | *operations.PostNsByNamespaceConnectorsRequestBody*                                                                                           | :heavy_check_mark:                                                                                                                            | N/A                                                                                                                                           |                                                                                                                                               |