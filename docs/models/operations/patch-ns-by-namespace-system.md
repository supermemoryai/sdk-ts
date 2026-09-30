# PatchNsByNamespaceSystem

Namespace lifecycle timestamps

## Example Usage

```typescript
import { PatchNsByNamespaceSystem } from "supermemory/models/operations";

let value: PatchNsByNamespaceSystem = {
  createdAt: new Date("2026-10-08T01:29:42.817Z"),
  updatedAt: new Date("2024-02-09T09:40:53.077Z"),
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `createdAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | ISO 8601 timestamp when the namespace was created                                             |
| `updatedAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | ISO 8601 timestamp of the latest settings update                                              |