# PostNsByNamespaceProfileResponseBody

Namespace profile. Send `Accept: text/markdown` to receive it as a markdown document instead of JSON.

## Example Usage

```typescript
import { PostNsByNamespaceProfileResponseBody } from "supermemory/models/operations";

let value: PostNsByNamespaceProfileResponseBody = {
  profile: {
    static: [
      {
        id: "<id>",
        memory: "<value>",
      },
    ],
    dynamic: [
      {
        id: "<id>",
        memory: "<value>",
      },
    ],
    buckets: {
      "key": [
        {
          id: "<id>",
          memory: "<value>",
        },
      ],
      "key1": [
        {
          id: "<id>",
          memory: "<value>",
        },
      ],
    },
  },
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `profile`                                                                          | [operations.Profile](../../models/operations/profile.md)                           | :heavy_check_mark:                                                                 | Continuously maintained understanding of the subject represented by this namespace |