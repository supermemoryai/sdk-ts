# DeleteNsByNamespaceProfileBucketsRequestBody

## Example Usage

```typescript
import { DeleteNsByNamespaceProfileBucketsRequestBody } from "supermemory/models/operations";

let value: DeleteNsByNamespaceProfileBucketsRequestBody = {
  buckets: [
    "interests",
  ],
};
```

## Fields

| Field                                                                                                        | Type                                                                                                         | Required                                                                                                     | Description                                                                                                  | Example                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `buckets`                                                                                                    | *string*[]                                                                                                   | :heavy_check_mark:                                                                                           | Namespace-owned bucket names to delete. Organization-level buckets are protected and cannot be removed here. | [<br/>"interests"<br/>]                                                                                      |