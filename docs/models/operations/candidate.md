# Candidate

## Example Usage

```typescript
import { Candidate } from "supermemory/models/operations";

let value: Candidate = {
  id: "<id>",
  memory: "<value>",
  score: 8935.81,
};
```

## Fields

| Field                                     | Type                                      | Required                                  | Description                               |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| `id`                                      | *string*                                  | :heavy_check_mark:                        | Memory ID                                 |
| `memory`                                  | *string*                                  | :heavy_check_mark:                        | Memory content                            |
| `score`                                   | *number*                                  | :heavy_check_mark:                        | Similarity score against the forget query |