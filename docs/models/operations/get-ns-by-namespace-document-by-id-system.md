# GetNsByNamespaceDocumentByIdSystem

Processing status, lifecycle timestamps, and storage path maintained by Supermemory

## Example Usage

```typescript
import { GetNsByNamespaceDocumentByIdSystem } from "supermemory/models/operations";

let value: GetNsByNamespaceDocumentByIdSystem = {
  status: "<value>",
  createdAt: new Date("2025-06-24T21:23:18.073Z"),
  updatedAt: new Date("2026-05-27T15:37:45.350Z"),
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `status`                                                                                      | *string*                                                                                      | :heavy_check_mark:                                                                            | Current extraction and memory-processing status                                               |
| `createdAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | ISO 8601 timestamp when the document was created                                              |
| `updatedAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | ISO 8601 timestamp of the latest document update                                              |