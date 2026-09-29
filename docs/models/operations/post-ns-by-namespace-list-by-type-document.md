# PostNsByNamespaceListByTypeDocument

A document in this namespace without its content

## Example Usage

```typescript
import { PostNsByNamespaceListByTypeDocument } from "supermemory/models/operations";

let value: PostNsByNamespaceListByTypeDocument = {
  id: "<id>",
  title: "<value>",
  type: "<value>",
  summary: "<value>",
  metadata: {
    "key": "<value>",
    "key1": "<value>",
  },
  url: "https://shimmering-cow.org",
  system: {
    status: "<value>",
    createdAt: new Date("2026-08-21T03:45:30.453Z"),
    updatedAt: new Date("2026-09-16T22:28:41.174Z"),
  },
};
```

## Fields

| Field                                                                               | Type                                                                                | Required                                                                            | Description                                                                         |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `id`                                                                                | *string*                                                                            | :heavy_check_mark:                                                                  | Stable document identifier                                                          |
| `title`                                                                             | *string*                                                                            | :heavy_check_mark:                                                                  | Extracted or caller-provided document title                                         |
| `type`                                                                              | *string*                                                                            | :heavy_check_mark:                                                                  | Detected source or content type                                                     |
| `summary`                                                                           | *string*                                                                            | :heavy_check_mark:                                                                  | Generated summary of the document, when available                                   |
| `metadata`                                                                          | Record<string, *any*>                                                               | :heavy_check_mark:                                                                  | Public metadata attached to the document                                            |
| `url`                                                                               | *string*                                                                            | :heavy_check_mark:                                                                  | Original source URL, when the document was ingested from the web                    |
| `system`                                                                            | [operations.DocumentSystem](../../models/operations/document-system.md)             | :heavy_check_mark:                                                                  | Processing status, lifecycle timestamps, and storage path maintained by Supermemory |