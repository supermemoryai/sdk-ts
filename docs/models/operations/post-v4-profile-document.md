# PostV4ProfileDocument

## Example Usage

```typescript
import { PostV4ProfileDocument } from "supermemory/models/operations";

let value: PostV4ProfileDocument = {
  id: "doc_xyz789",
  title: "API Rate Limiting Policy",
  type: "web",
  metadata: {
    "source": "upload",
    "language": "en",
  },
  summary: "API rate limit policy: 100 req/min free, 1000 req/min pro.",
  createdAt: "2024-12-31T09:48:29.027Z",
  updatedAt: "2024-12-31T04:12:27.937Z",
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                | Example                                                    |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `id`                                                       | *string*                                                   | :heavy_check_mark:                                         | Document ID                                                | doc_xyz789                                                 |
| `title`                                                    | *string*                                                   | :heavy_minus_sign:                                         | Document title (only included when documents=true)         | API Rate Limiting Policy                                   |
| `type`                                                     | *string*                                                   | :heavy_minus_sign:                                         | Document type (only included when documents=true)          | web                                                        |
| `metadata`                                                 | Record<string, *any*>                                      | :heavy_minus_sign:                                         | Document metadata (only included when documents=true)      | {<br/>"source": "upload",<br/>"language": "en"<br/>}       |
| `summary`                                                  | *string*                                                   | :heavy_minus_sign:                                         | Document summary (only included when summaries=true)       | API rate limit policy: 100 req/min free, 1000 req/min pro. |
| `createdAt`                                                | *string*                                                   | :heavy_check_mark:                                         | Document creation date                                     |                                                            |
| `updatedAt`                                                | *string*                                                   | :heavy_check_mark:                                         | Document last update date                                  |                                                            |