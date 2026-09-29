# DeleteNsByNamespaceDocumentRequestBody

## Example Usage

```typescript
import { DeleteNsByNamespaceDocumentRequestBody } from "supermemory/models/operations";

let value: DeleteNsByNamespaceDocumentRequestBody = {
  ids: [
    "my-doc-123",
  ],
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    | Example                                                        |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `ids`                                                          | *string*[]                                                     | :heavy_check_mark:                                             | Document identifiers to permanently delete from this namespace | [<br/>"my-doc-123"<br/>]                                       |