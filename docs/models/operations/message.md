# Message

## Example Usage

```typescript
import { Message } from "supermemory/models/operations";

let value: Message = {
  role: "system",
  content: "<value>",
};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `role`                                             | [operations.Role](../../models/operations/role.md) | :heavy_check_mark:                                 | N/A                                                |
| `content`                                          | *operations.ContentUnion1*                         | :heavy_check_mark:                                 | N/A                                                |
| `name`                                             | *string*                                           | :heavy_minus_sign:                                 | N/A                                                |
| `toolCalls`                                        | *any*[]                                            | :heavy_minus_sign:                                 | N/A                                                |
| `toolCallId`                                       | *string*                                           | :heavy_minus_sign:                                 | N/A                                                |