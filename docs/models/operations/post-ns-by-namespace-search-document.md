# PostNsByNamespaceSearchDocument

Source document attached when requested and available

## Example Usage

```typescript
import { PostNsByNamespaceSearchDocument } from "supermemory/models/operations";

let value: PostNsByNamespaceSearchDocument = {
  id: "<id>",
  createdAt: "1712089568172",
  updatedAt: "1735624805772",
};
```

## Fields

| Field                                                     | Type                                                      | Required                                                  | Description                                               |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `id`                                                      | *string*                                                  | :heavy_check_mark:                                        | Source document identifier                                |
| `title`                                                   | *string*                                                  | :heavy_minus_sign:                                        | Source document title                                     |
| `type`                                                    | *string*                                                  | :heavy_minus_sign:                                        | Detected source or content type                           |
| `metadata`                                                | Record<string, *any*>                                     | :heavy_minus_sign:                                        | Public metadata attached to the source document           |
| `summary`                                                 | *string*                                                  | :heavy_minus_sign:                                        | Generated summary of the source document                  |
| `createdAt`                                               | *string*                                                  | :heavy_check_mark:                                        | ISO 8601 timestamp when the source document was created   |
| `updatedAt`                                               | *string*                                                  | :heavy_check_mark:                                        | ISO 8601 timestamp of the source document's latest update |