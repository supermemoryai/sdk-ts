# DocumentSystem

Processing status, lifecycle timestamps, and storage path maintained by Supermemory

## Example Usage

```typescript
import { DocumentSystem } from "supermemory/models/operations";

let value: DocumentSystem = {
  status: "<value>",
  createdAt: new Date("2025-09-06T08:16:36.989Z"),
  updatedAt: new Date("2024-01-04T14:43:35.326Z"),
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `status`                                                                                      | *string*                                                                                      | :heavy_check_mark:                                                                            | Current extraction and memory-processing status                                               |
| `createdAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | ISO 8601 timestamp when the document was created                                              |
| `updatedAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | ISO 8601 timestamp of the latest document update                                              |