# SelectionRequest

What to sync, as ids grouped by kind. GitHub takes repos, Gmail takes labels, Google Drive takes files and folders. Replaces the current selection.

## Example Usage

```typescript
import { SelectionRequest } from "supermemory/models/operations";

let value: SelectionRequest = {};
```

## Fields

| Field                   | Type                    | Required                | Description             |
| ----------------------- | ----------------------- | ----------------------- | ----------------------- |
| `repos`                 | *string*[]              | :heavy_minus_sign:      | GitHub repository ids   |
| `labels`                | *string*[]              | :heavy_minus_sign:      | Gmail label ids         |
| `files`                 | *string*[]              | :heavy_minus_sign:      | Google Drive file ids   |
| `folders`               | *string*[]              | :heavy_minus_sign:      | Google Drive folder ids |