# GetNsByNamespaceSystem

Namespace lifecycle timestamps

## Example Usage

```typescript
import { GetNsByNamespaceSystem } from "supermemory/models/operations";

let value: GetNsByNamespaceSystem = {
  createdAt: new Date("2025-08-28T13:12:29.965Z"),
  updatedAt: new Date("2024-08-03T17:48:45.952Z"),
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `createdAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | ISO 8601 timestamp when the namespace was created                                             |
| `updatedAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | ISO 8601 timestamp of the latest settings update                                              |