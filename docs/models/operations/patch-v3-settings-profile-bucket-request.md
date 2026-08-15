# PatchV3SettingsProfileBucketRequest

Definition of a single profile bucket

## Example Usage

```typescript
import { PatchV3SettingsProfileBucketRequest } from "supermemory/models/operations";

let value: PatchV3SettingsProfileBucketRequest = {
  key: "<key>",
};
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `key`                                                                 | *string*                                                              | :heavy_check_mark:                                                    | Stable slug for the bucket, stored on each memory                     |
| `description`                                                         | *string*                                                              | :heavy_minus_sign:                                                    | What belongs in this bucket — used to guide the ingestion classifier. |