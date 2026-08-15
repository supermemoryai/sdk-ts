# Profile

## Example Usage

```typescript
import { Profile } from "supermemory/models/operations";

let value: Profile = {};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `static`                                                   | *string*[]                                                 | :heavy_minus_sign:                                         | Static profile information that remains relevant long-term |
| `dynamic`                                                  | *string*[]                                                 | :heavy_minus_sign:                                         | Dynamic profile information (recent memories)              |
| `buckets`                                                  | Record<string, *string*[]>                                 | :heavy_minus_sign:                                         | Per-bucket memory lists, keyed by bucket key               |