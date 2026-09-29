# DeleteNsByNamespaceDocumentError

## Example Usage

```typescript
import { DeleteNsByNamespaceDocumentError } from "supermemory/models/operations";

let value: DeleteNsByNamespaceDocumentError = {
  id: "my-doc-123",
  error: "<value>",
};
```

## Fields

| Field                                  | Type                                   | Required                               | Description                            | Example                                |
| -------------------------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- |
| `id`                                   | *string*                               | :heavy_check_mark:                     | The requested document identifier      | my-doc-123                             |
| `error`                                | *string*                               | :heavy_check_mark:                     | Why this document could not be deleted |                                        |