# PostNsByNamespaceSearchAttach

Optional context to include alongside each matching result

## Example Usage

```typescript
import { PostNsByNamespaceSearchAttach } from "supermemory/models/operations";

let value: PostNsByNamespaceSearchAttach = {};
```

## Fields

| Field                                                                           | Type                                                                            | Required                                                                        | Description                                                                     |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `documents`                                                                     | *boolean*                                                                       | :heavy_minus_sign:                                                              | Attach the source document for each result when one is available                |
| `related`                                                                       | *boolean*                                                                       | :heavy_minus_sign:                                                              | Attach parent, child, and sibling memories that explain how each memory evolved |
| `forgotten`                                                                     | *boolean*                                                                       | :heavy_minus_sign:                                                              | Allow forgotten memories to participate in recall                               |