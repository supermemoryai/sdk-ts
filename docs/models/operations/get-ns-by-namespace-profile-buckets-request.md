# GetNsByNamespaceProfileBucketsRequest

## Example Usage

```typescript
import { GetNsByNamespaceProfileBucketsRequest } from "supermemory/models/operations";

let value: GetNsByNamespaceProfileBucketsRequest = {
  namespace: "user_alex",
};
```

## Fields

| Field                                                                                                                                       | Type                                                                                                                                        | Required                                                                                                                                    | Description                                                                                                                                 | Example                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `namespace`                                                                                                                                 | *string*                                                                                                                                    | :heavy_check_mark:                                                                                                                          | The isolated namespace to search. This can be an ID for your user, a project ID, or any other identifier you wish to use to scope memories. | user_alex                                                                                                                                   |