# Included

Requested supporting context for the result

## Example Usage

```typescript
import { Included } from "supermemory/models/operations";

let value: Included = {};
```

## Fields

| Field                                                                                                         | Type                                                                                                          | Required                                                                                                      | Description                                                                                                   |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `related`                                                                                                     | [operations.Related](../../models/operations/related.md)                                                      | :heavy_minus_sign:                                                                                            | Memory relationships attached when requested                                                                  |
| `document`                                                                                                    | [operations.PostNsByNamespaceSearchDocument](../../models/operations/post-ns-by-namespace-search-document.md) | :heavy_minus_sign:                                                                                            | Source document attached when requested and available                                                         |