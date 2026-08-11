# DeleteV3ConnectionsByProviderRequestBody

## Example Usage

```typescript
import { DeleteV3ConnectionsByProviderRequestBody } from "supermemory/models/operations";

let value: DeleteV3ConnectionsByProviderRequestBody = {
  containerTags: [
    "user_123",
    "project_123",
  ],
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              | Example                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `containerTags`                                                          | *string*[]                                                               | :heavy_check_mark:                                                       | Optional comma-separated list of container tags to filter connections by | [<br/>"user_123",<br/>"project_123"<br/>]                                |