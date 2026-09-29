# PatchNsByNamespaceResponse

Updated namespace settings

## Example Usage

```typescript
import { PatchNsByNamespaceResponse } from "supermemory/models/operations";

let value: PatchNsByNamespaceResponse = {
  namespace: "<value>",
  supportingContext: null,
  system: {
    createdAt: new Date("2025-11-22T11:03:09.222Z"),
    updatedAt: new Date("2026-02-13T06:17:08.176Z"),
  },
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `namespace`                                                                                      | *string*                                                                                         | :heavy_check_mark:                                                                               | Namespace identifier used in API paths                                                           |
| `supportingContext`                                                                              | *string*                                                                                         | :heavy_check_mark:                                                                               | Background that helps Supermemory interpret documents and form better memories in this namespace |
| `system`                                                                                         | [operations.PatchNsByNamespaceSystem](../../models/operations/patch-ns-by-namespace-system.md)   | :heavy_check_mark:                                                                               | Namespace lifecycle timestamps                                                                   |