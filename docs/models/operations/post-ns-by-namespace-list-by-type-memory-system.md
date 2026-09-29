# PostNsByNamespaceListByTypeMemorySystem

Lifecycle timestamps maintained by Supermemory

## Example Usage

```typescript
import { PostNsByNamespaceListByTypeMemorySystem } from "supermemory/models/operations";

let value: PostNsByNamespaceListByTypeMemorySystem = {
  createdAt: new Date("2025-01-31T01:40:48.413Z"),
  updatedAt: new Date("2025-01-27T16:46:16.395Z"),
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `createdAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | ISO 8601 timestamp when this memory version was created                                       |
| `updatedAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | ISO 8601 timestamp of the latest update to this version                                       |