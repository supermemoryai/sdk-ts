# WebCrawler

## Example Usage

```typescript
import { WebCrawler } from "supermemory/models/operations";

let value: WebCrawler = {
  provider: "web-crawler",
  config: {
    startUrl: "https://limp-longboat.com",
  },
};
```

## Fields

| Field                                                                                                               | Type                                                                                                                | Required                                                                                                            | Description                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `provider`                                                                                                          | *"web-crawler"*                                                                                                     | :heavy_check_mark:                                                                                                  | N/A                                                                                                                 |
| `config`                                                                                                            | [operations.PostNsByNamespaceConnectorsConfig3](../../models/operations/post-ns-by-namespace-connectors-config3.md) | :heavy_check_mark:                                                                                                  | Website to crawl                                                                                                    |
| `documentLimit`                                                                                                     | *number*                                                                                                            | :heavy_minus_sign:                                                                                                  | Maximum documents this connector imports                                                                            |