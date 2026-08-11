# PostV4ProfileBucketsRequest

## Example Usage

```typescript
import { PostV4ProfileBucketsRequest } from "supermemory/models/operations";

let value: PostV4ProfileBucketsRequest = {
  containerTag: "<value>",
};
```

## Fields

| Field                                                                                                                    | Type                                                                                                                     | Required                                                                                                                 | Description                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `containerTag`                                                                                                           | *string*                                                                                                                 | :heavy_check_mark:                                                                                                       | Tag to resolve effective bucket definitions for. Can be a user ID, project ID, or any identifier used to scope memories. |