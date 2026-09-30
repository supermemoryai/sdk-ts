# PutNsByNamespaceProfileBucketsResponse

Updated effective namespace profile bucket definitions

## Example Usage

```typescript
import { PutNsByNamespaceProfileBucketsResponse } from "supermemory/models/operations";

let value: PutNsByNamespaceProfileBucketsResponse = {
  buckets: {
    "key": "<value>",
    "key1": "<value>",
    "key2": "<value>",
  },
};
```

## Fields

| Field                                                                                                    | Type                                                                                                     | Required                                                                                                 | Description                                                                                              |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `buckets`                                                                                                | Record<string, *string*>                                                                                 | :heavy_check_mark:                                                                                       | Effective bucket definitions keyed by name. Includes organization buckets and namespace-owned additions. |