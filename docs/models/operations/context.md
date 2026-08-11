# Context

Object containing version history (parents/children via updates) and related memories (extends/derives)

## Example Usage

```typescript
import { Context } from "supermemory/models/operations";

let value: Context = {
  parents: [
    {
      relation: "updates",
      version: -1,
      memory: "Earlier version: API rate limit is 50 req/min on the free tier.",
      updatedAt: "2024-12-31T13:50:00.600Z",
    },
  ],
  children: [
    {
      relation: "extends",
      version: 1,
      memory:
        "Later version: API rate limit increased to 100 req/min on the free tier.",
      updatedAt: "2024-12-31T14:40:59.603Z",
    },
  ],
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `parents`                                                  | [operations.Parent](../../models/operations/parent.md)[]   | :heavy_minus_sign:                                         | N/A                                                        |
| `children`                                                 | [operations.Child](../../models/operations/child.md)[]     | :heavy_minus_sign:                                         | N/A                                                        |
| `related`                                                  | [operations.Related](../../models/operations/related.md)[] | :heavy_minus_sign:                                         | N/A                                                        |