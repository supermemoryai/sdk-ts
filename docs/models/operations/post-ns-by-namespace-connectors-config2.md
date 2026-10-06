# PostNsByNamespaceConnectorsConfig2

S3 bucket to sync. Credentials are stored encrypted and never returned.

## Example Usage

```typescript
import { PostNsByNamespaceConnectorsConfig2 } from "supermemory/models/operations";

let value: PostNsByNamespaceConnectorsConfig2 = {
  bucket: "<value>",
  region: "<value>",
  accessKeyId: "<id>",
  secretAccessKey: "<value>",
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `bucket`                                     | *string*                                     | :heavy_check_mark:                           | N/A                                          |
| `region`                                     | *string*                                     | :heavy_check_mark:                           | N/A                                          |
| `accessKeyId`                                | *string*                                     | :heavy_check_mark:                           | N/A                                          |
| `secretAccessKey`                            | *string*                                     | :heavy_check_mark:                           | N/A                                          |
| `endpoint`                                   | *string*                                     | :heavy_minus_sign:                           | For S3-compatible stores such as R2 or MinIO |
| `prefix`                                     | *string*                                     | :heavy_minus_sign:                           | Only sync keys under this prefix             |