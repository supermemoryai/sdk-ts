# PostV3ConnectionsByProviderDocumentsRequestBody

## Example Usage

```typescript
import { PostV3ConnectionsByProviderDocumentsRequestBody } from "supermemory/models/operations";

let value: PostV3ConnectionsByProviderDocumentsRequestBody = {
  containerTags: [
    "user_123",
    "project_123",
  ],
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            | Example                                                                |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `containerTags`                                                        | *string*[]                                                             | :heavy_minus_sign:                                                     | Optional comma-separated list of container tags to filter documents by | [<br/>"user_123",<br/>"project_123"<br/>]                              |