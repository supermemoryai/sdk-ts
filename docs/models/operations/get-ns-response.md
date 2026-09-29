# GetNsResponse

## Example Usage

```typescript
import { GetNsResponse } from "supermemory/models/operations";

let value: GetNsResponse = {
  id: "<id>",
  namespace: "<value>",
  documentCount: 817320,
  memoryCount: 120755,
  description: "preside inasmuch misspend incidentally e-mail that",
  system: {
    createdAt: new Date("2024-05-08T17:01:16.342Z"),
    updatedAt: new Date("2024-07-23T23:13:31.350Z"),
  },
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `id`                                                               | *string*                                                           | :heavy_check_mark:                                                 | Internal identifier for the namespace                              |
| `namespace`                                                        | *string*                                                           | :heavy_check_mark:                                                 | Namespace identifier used in API paths                             |
| `documentCount`                                                    | *number*                                                           | :heavy_check_mark:                                                 | Number of active source documents in the namespace                 |
| `memoryCount`                                                      | *number*                                                           | :heavy_check_mark:                                                 | Number of current, recallable memories in the namespace            |
| `description`                                                      | *string*                                                           | :heavy_check_mark:                                                 | Human-readable purpose or scope of the namespace                   |
| `system`                                                           | [operations.GetNsSystem](../../models/operations/get-ns-system.md) | :heavy_check_mark:                                                 | Namespace lifecycle timestamps                                     |