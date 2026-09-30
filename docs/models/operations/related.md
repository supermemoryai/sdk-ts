# Related

Memory relationships attached when requested

## Example Usage

```typescript
import { Related } from "supermemory/models/operations";

let value: Related = {
  parents: [
    {
      relation: "extends",
      memory: "<value>",
      system: {
        updatedAt: "1735637680600",
      },
    },
  ],
  children: [
    {
      relation: "updates",
      memory: "<value>",
      system: {
        updatedAt: "1735630953345",
      },
    },
  ],
  siblings: [
    {
      relation: "updates",
      memory: "<value>",
      system: {
        updatedAt: "1735610449510",
      },
    },
  ],
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `parents`                                                  | [operations.Parent](../../models/operations/parent.md)[]   | :heavy_check_mark:                                         | Earlier memories this result updates or derives from       |
| `children`                                                 | [operations.Child](../../models/operations/child.md)[]     | :heavy_check_mark:                                         | Newer memories that update or extend this result           |
| `siblings`                                                 | [operations.Sibling](../../models/operations/sibling.md)[] | :heavy_check_mark:                                         | Other memories derived from related context                |