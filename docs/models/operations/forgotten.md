# Forgotten

## Example Usage

```typescript
import { Forgotten } from "supermemory/models/operations";

let value: Forgotten = {
  id: "<id>",
  memory: "<value>",
  score: 8654.14,
};
```

## Fields

| Field                                     | Type                                      | Required                                  | Description                               |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| `id`                                      | *string*                                  | :heavy_check_mark:                        | Memory ID                                 |
| `memory`                                  | *string*                                  | :heavy_check_mark:                        | Memory content                            |
| `score`                                   | *number*                                  | :heavy_check_mark:                        | Similarity score against the forget query |