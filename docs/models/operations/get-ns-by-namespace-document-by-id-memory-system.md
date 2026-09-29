# GetNsByNamespaceDocumentByIdMemorySystem

Lifecycle timestamps maintained by Supermemory

## Example Usage

```typescript
import { GetNsByNamespaceDocumentByIdMemorySystem } from "supermemory/models/operations";

let value: GetNsByNamespaceDocumentByIdMemorySystem = {
  createdAt: new Date("2024-07-21T20:58:43.875Z"),
  updatedAt: new Date("2025-01-29T16:35:31.384Z"),
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `createdAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | ISO 8601 timestamp when this memory version was created                                       |
| `updatedAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | ISO 8601 timestamp of the latest update to this version                                       |