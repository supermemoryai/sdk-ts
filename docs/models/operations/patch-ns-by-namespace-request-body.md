# PatchNsByNamespaceRequestBody

## Example Usage

```typescript
import { PatchNsByNamespaceRequestBody } from "supermemory/models/operations";

let value: PatchNsByNamespaceRequestBody = {
  supportingContext: "This namespace holds Acme Corp support tickets.",
};
```

## Fields

| Field                                                                                                                      | Type                                                                                                                       | Required                                                                                                                   | Description                                                                                                                | Example                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `supportingContext`                                                                                                        | *string*                                                                                                                   | :heavy_minus_sign:                                                                                                         | Background that guides how Supermemory interprets documents and forms memories. Max 1500 characters. Set null to clear it. | This namespace holds Acme Corp support tickets.                                                                            |