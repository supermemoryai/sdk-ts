# PostV3ConnectionsByProviderConnectionRequestBody

## Example Usage

```typescript
import { PostV3ConnectionsByProviderConnectionRequestBody } from "supermemory/models/operations";

let value: PostV3ConnectionsByProviderConnectionRequestBody = {
  containerTags: [
    "user_123",
    "project_123",
  ],
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    | Example                                                        |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `containerTags`                                                | *string*[]                                                     | :heavy_check_mark:                                             | Comma-separated list of container tags to filter connection by | [<br/>"user_123",<br/>"project_123"<br/>]                      |