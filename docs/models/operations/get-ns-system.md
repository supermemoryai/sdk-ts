# GetNsSystem

Namespace lifecycle timestamps

## Example Usage

```typescript
import { GetNsSystem } from "supermemory/models/operations";

let value: GetNsSystem = {
  createdAt: new Date("2025-09-07T06:21:38.607Z"),
  updatedAt: new Date("2024-08-16T11:29:29.298Z"),
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `createdAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | ISO 8601 timestamp when the namespace was created                                             |
| `updatedAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | ISO 8601 timestamp of the latest namespace update                                             |