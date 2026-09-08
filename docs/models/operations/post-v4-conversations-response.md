# PostV4ConversationsResponse

Conversation ingested/updated successfully

## Example Usage

```typescript
import { PostV4ConversationsResponse } from "supermemory/models/operations";

let value: PostV4ConversationsResponse = {
  id: "doc_abc123",
  conversationId: "conv_abc123",
  status: "queued",
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  | Example                                      |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `id`                                         | *string*                                     | :heavy_check_mark:                           | ID of the document backing this conversation | doc_abc123                                   |
| `conversationId`                             | *string*                                     | :heavy_check_mark:                           | The conversation ID supplied in the request  | conv_abc123                                  |
| `status`                                     | *string*                                     | :heavy_check_mark:                           | Processing status of the document            | queued                                       |