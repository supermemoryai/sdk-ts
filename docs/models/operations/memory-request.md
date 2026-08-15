# MemoryRequest

## Example Usage

```typescript
import { MemoryRequest } from "supermemory/models/operations";

let value: MemoryRequest = {
  content: "John prefers dark mode",
  isStatic: false,
  forgetAfter: "2026-06-01T00:00:00Z",
  forgetReason: "temporary project deadline",
};
```

## Fields

| Field                                                                                                         | Type                                                                                                          | Required                                                                                                      | Description                                                                                                   | Example                                                                                                       |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `content`                                                                                                     | *string*                                                                                                      | :heavy_check_mark:                                                                                            | The memory text. Should be entity-centric, e.g. 'John prefers dark mode'.                                     | John prefers dark mode                                                                                        |
| `isStatic`                                                                                                    | *boolean*                                                                                                     | :heavy_minus_sign:                                                                                            | Mark as true for permanent traits (name, profession, hometown). Defaults to false.                            | false                                                                                                         |
| `metadata`                                                                                                    | Record<string, *operations.PostV4MemoriesMetadata*>                                                           | :heavy_minus_sign:                                                                                            | Arbitrary key-value metadata to attach.                                                                       |                                                                                                               |
| `forgetAfter`                                                                                                 | *string*                                                                                                      | :heavy_minus_sign:                                                                                            | ISO 8601 datetime string. The memory will be auto-forgotten after this time. Pass null or omit for no expiry. | 2026-06-01T00:00:00Z                                                                                          |
| `forgetReason`                                                                                                | *string*                                                                                                      | :heavy_minus_sign:                                                                                            | Optional reason for the scheduled forgetting. Only meaningful when forgetAfter is set.                        | temporary project deadline                                                                                    |
| `temporalContext`                                                                                             | [operations.PostV4MemoriesTemporalContext](../../models/operations/post-v4-memories-temporal-context.md)      | :heavy_minus_sign:                                                                                            | Structured temporal metadata. Merged into the metadata JSON column.                                           |                                                                                                               |