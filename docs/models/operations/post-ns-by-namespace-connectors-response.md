# PostNsByNamespaceConnectorsResponse

Connector created

## Example Usage

```typescript
import { PostNsByNamespaceConnectorsResponse } from "supermemory/models/operations";

let value: PostNsByNamespaceConnectorsResponse = {
  id: "<id>",
  authUrl: "https://scornful-folklore.org/",
  authUrlExpiresAt: new Date("2024-02-23T11:26:58.595Z"),
};
```

## Fields

| Field                                                                                                | Type                                                                                                 | Required                                                                                             | Description                                                                                          |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `id`                                                                                                 | *string*                                                                                             | :heavy_check_mark:                                                                                   | Connector identifier                                                                                 |
| `authUrl`                                                                                            | *string*                                                                                             | :heavy_check_mark:                                                                                   | Send the user here to authorize the provider. Null for providers that authenticate with config only. |
| `authUrlExpiresAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)        | :heavy_check_mark:                                                                                   | When authUrl stops working                                                                           |