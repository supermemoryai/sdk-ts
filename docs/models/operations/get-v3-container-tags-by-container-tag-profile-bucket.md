# GetV3ContainerTagsByContainerTagProfileBucket

Definition of a single profile bucket

## Example Usage

```typescript
import { GetV3ContainerTagsByContainerTagProfileBucket } from "supermemory/models/operations";

let value: GetV3ContainerTagsByContainerTagProfileBucket = {
  key: "<key>",
};
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `key`                                                                 | *string*                                                              | :heavy_check_mark:                                                    | Stable slug for the bucket, stored on each memory                     |
| `description`                                                         | *string*                                                              | :heavy_minus_sign:                                                    | What belongs in this bucket — used to guide the ingestion classifier. |