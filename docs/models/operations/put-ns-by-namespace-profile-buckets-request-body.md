# PutNsByNamespaceProfileBucketsRequestBody

## Example Usage

```typescript
import { PutNsByNamespaceProfileBucketsRequestBody } from "supermemory/models/operations";

let value: PutNsByNamespaceProfileBucketsRequestBody = {
  buckets: {
    "interests": "Topics the subject actively follows",
  },
};
```

## Fields

| Field                                                                                                                                  | Type                                                                                                                                   | Required                                                                                                                               | Description                                                                                                                            | Example                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `buckets`                                                                                                                              | Record<string, *string*>                                                                                                               | :heavy_check_mark:                                                                                                                     | Namespace-owned bucket names mapped to descriptions that guide memory classification. Existing names are updated; new names are added. | {<br/>"interests": "Topics the subject actively follows"<br/>}                                                                         |