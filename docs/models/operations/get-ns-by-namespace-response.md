# GetNsByNamespaceResponse

Namespace settings

## Example Usage

```typescript
import { GetNsByNamespaceResponse } from "supermemory/models/operations";

let value: GetNsByNamespaceResponse = {
  namespace: "<value>",
  supportingContext: "<value>",
  system: {
    createdAt: new Date("2024-01-07T13:54:47.312Z"),
    updatedAt: new Date("2026-06-20T03:51:29.013Z"),
  },
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `namespace`                                                                                      | *string*                                                                                         | :heavy_check_mark:                                                                               | Namespace identifier used in API paths                                                           |
| `supportingContext`                                                                              | *string*                                                                                         | :heavy_check_mark:                                                                               | Background that helps Supermemory interpret documents and form better memories in this namespace |
| `system`                                                                                         | [operations.GetNsByNamespaceSystem](../../models/operations/get-ns-by-namespace-system.md)       | :heavy_check_mark:                                                                               | Namespace lifecycle timestamps                                                                   |