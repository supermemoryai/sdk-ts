# DeleteNsByNamespaceProfileBucketsResponse

Updated effective namespace profile bucket definitions

## Example Usage

```typescript
import { DeleteNsByNamespaceProfileBucketsResponse } from "supermemory/models/operations";

let value: DeleteNsByNamespaceProfileBucketsResponse = {
  buckets: {
    "key": "<value>",
  },
};
```

## Fields

| Field                                                                                                    | Type                                                                                                     | Required                                                                                                 | Description                                                                                              |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `buckets`                                                                                                | Record<string, *string*>                                                                                 | :heavy_check_mark:                                                                                       | Effective bucket definitions keyed by name. Includes organization buckets and namespace-owned additions. |