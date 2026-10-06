# PatchNsByNamespaceConnectorsByIdRequestBody

## Example Usage

```typescript
import { PatchNsByNamespaceConnectorsByIdRequestBody } from "supermemory/models/operations";

let value: PatchNsByNamespaceConnectorsByIdRequestBody = {};
```

## Fields

| Field                                                                                                                                               | Type                                                                                                                                                | Required                                                                                                                                            | Description                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `selection`                                                                                                                                         | [operations.SelectionRequest](../../models/operations/selection-request.md)                                                                         | :heavy_minus_sign:                                                                                                                                  | What to sync, as ids grouped by kind. GitHub takes repos, Gmail takes labels, Google Drive takes files and folders. Replaces the current selection. |
| `documentLimit`                                                                                                                                     | *number*                                                                                                                                            | :heavy_minus_sign:                                                                                                                                  | Maximum documents this connector imports                                                                                                            |