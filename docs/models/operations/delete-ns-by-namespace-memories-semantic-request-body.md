# DeleteNsByNamespaceMemoriesSemanticRequestBody

## Example Usage

```typescript
import { DeleteNsByNamespaceMemoriesSemanticRequestBody } from "supermemory/models/operations";

let value: DeleteNsByNamespaceMemoriesSemanticRequestBody = {
  query: "everything about the old pricing plans",
  dryRun: true,
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              | Example                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `query`                                                                  | *string*                                                                 | :heavy_check_mark:                                                       | Natural-language description of the memories that should be forgotten    | everything about the old pricing plans                                   |
| `dryRun`                                                                 | *boolean*                                                                | :heavy_check_mark:                                                       | When true, preview matching memories without changing their recall state | true                                                                     |