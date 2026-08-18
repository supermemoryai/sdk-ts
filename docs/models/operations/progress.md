# Progress

## Example Usage

```typescript
import { Progress } from "supermemory/models/operations";

let value: Progress = {};
```

## Fields

| Field                                                             | Type                                                              | Required                                                          | Description                                                       |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| `phase`                                                           | [operations.Phase](../../models/operations/phase.md)              | :heavy_minus_sign:                                                | N/A                                                               |
| `currentSourceTag`                                                | *string*                                                          | :heavy_minus_sign:                                                | N/A                                                               |
| `currentKind`                                                     | [operations.CurrentKind](../../models/operations/current-kind.md) | :heavy_minus_sign:                                                | N/A                                                               |
| `copiedRows`                                                      | *number*                                                          | :heavy_minus_sign:                                                | N/A                                                               |
| `completedSourceTags`                                             | *string*[]                                                        | :heavy_minus_sign:                                                | N/A                                                               |
| `inFlightItems`                                                   | *number*                                                          | :heavy_minus_sign:                                                | N/A                                                               |
| `attempt`                                                         | *number*                                                          | :heavy_minus_sign:                                                | N/A                                                               |