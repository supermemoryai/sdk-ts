# GetV3ConnectionsByConnectionIdResourcesResponse

List of accessible resources

## Example Usage

```typescript
import { GetV3ConnectionsByConnectionIdResourcesResponse } from "supermemory/models/operations";

let value: GetV3ConnectionsByConnectionIdResourcesResponse = {
  resources: [
    {
      "key": "<value>",
      "key1": "<value>",
    },
    {},
    {
      "key": "<value>",
    },
  ],
};
```

## Fields

| Field                   | Type                    | Required                | Description             |
| ----------------------- | ----------------------- | ----------------------- | ----------------------- |
| `resources`             | Record<string, *any*>[] | :heavy_check_mark:      | N/A                     |
| `totalCount`            | *number*                | :heavy_minus_sign:      | N/A                     |