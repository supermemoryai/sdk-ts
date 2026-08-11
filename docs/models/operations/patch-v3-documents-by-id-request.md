# PatchV3DocumentsByIdRequest

## Example Usage

```typescript
import { PatchV3DocumentsByIdRequest } from "supermemory/models/operations";

let value: PatchV3DocumentsByIdRequest = {
  id: "<id>",
  body: {
    containerTag: "user_alex",
    content:
      "Our API rate limits are 100 req/min on free and 1000 on pro. Clients should use exponential backoff on 429s.",
    customId: "doc-api-rate-limits",
    metadata: {
      "source": "upload",
      "language": "en",
    },
    taskType: "memory",
    filepath: "/documents/reports/file.pdf",
    filterByMetadata: {
      "department": "engineering",
      "region": "us",
    },
  },
};
```

## Fields

| Field                                                                                                          | Type                                                                                                           | Required                                                                                                       | Description                                                                                                    |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                           | *string*                                                                                                       | :heavy_check_mark:                                                                                             | N/A                                                                                                            |
| `body`                                                                                                         | [operations.PatchV3DocumentsByIdRequestBody](../../models/operations/patch-v3-documents-by-id-request-body.md) | :heavy_check_mark:                                                                                             | N/A                                                                                                            |