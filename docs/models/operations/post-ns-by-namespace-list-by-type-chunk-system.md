# PostNsByNamespaceListByTypeChunkSystem

Lifecycle timestamps maintained by Supermemory

## Example Usage

```typescript
import { PostNsByNamespaceListByTypeChunkSystem } from "supermemory/models/operations";

let value: PostNsByNamespaceListByTypeChunkSystem = {
  createdAt: new Date("2024-03-20T01:29:08.641Z"),
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `createdAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | ISO 8601 timestamp when the chunk was created                                                 |