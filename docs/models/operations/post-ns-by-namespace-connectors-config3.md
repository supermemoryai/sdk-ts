# PostNsByNamespaceConnectorsConfig3

Website to crawl

## Example Usage

```typescript
import { PostNsByNamespaceConnectorsConfig3 } from "supermemory/models/operations";

let value: PostNsByNamespaceConnectorsConfig3 = {
  startUrl: "https://glass-teriyaki.com/",
};
```

## Fields

| Field                                         | Type                                          | Required                                      | Description                                   |
| --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| `startUrl`                                    | *string*                                      | :heavy_check_mark:                            | N/A                                           |
| `crawlDepth`                                  | *number*                                      | :heavy_minus_sign:                            | How many links deep to follow. Defaults to 3. |