# Profile

Continuously maintained understanding of the subject represented by this namespace

## Example Usage

```typescript
import { Profile } from "supermemory/models/operations";

let value: Profile = {
  static: [
    {
      id: "<id>",
      memory: "<value>",
    },
  ],
  dynamic: [],
  buckets: {
    "key": [],
    "key1": [
      {
        id: "<id>",
        memory: "<value>",
      },
    ],
    "key2": [],
  },
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `static`                                                                                           | [operations.Static](../../models/operations/static.md)[]                                           | :heavy_check_mark:                                                                                 | Durable facts that define the subject and rarely change, such as identity or long-term preferences |
| `dynamic`                                                                                          | [operations.Dynamic](../../models/operations/dynamic.md)[]                                         | :heavy_check_mark:                                                                                 | Recent or evolving context, such as current goals, projects, and active interests                  |
| `buckets`                                                                                          | Record<string, [operations.Bucket](../../models/operations/bucket.md)[]>                           | :heavy_check_mark:                                                                                 | Custom profile sections keyed by bucket name, with the memories currently assigned to each bucket  |