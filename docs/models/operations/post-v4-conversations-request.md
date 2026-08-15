# PostV4ConversationsRequest

## Example Usage

```typescript
import { PostV4ConversationsRequest } from "supermemory/models/operations";

let value: PostV4ConversationsRequest = {
  conversationId: "<id>",
  messages: [],
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `conversationId`                                           | *string*                                                   | :heavy_check_mark:                                         | N/A                                                        |
| `messages`                                                 | [operations.Message](../../models/operations/message.md)[] | :heavy_check_mark:                                         | N/A                                                        |
| `containerTags`                                            | *string*[]                                                 | :heavy_minus_sign:                                         | N/A                                                        |
| `metadata`                                                 | Record<string, *operations.PostV4ConversationsMetadata*>   | :heavy_minus_sign:                                         | N/A                                                        |