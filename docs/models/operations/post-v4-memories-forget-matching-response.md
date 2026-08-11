# PostV4MemoriesForgetMatchingResponse

Response after an agentic mass-forget

## Example Usage

```typescript
import { PostV4MemoriesForgetMatchingResponse } from "supermemory/models/operations";

let value: PostV4MemoriesForgetMatchingResponse = {
  dryRun: false,
  count: 505.17,
  forgetBatchId: "<id>",
  summary: "<value>",
};
```

## Fields

| Field                                                             | Type                                                              | Required                                                          | Description                                                       |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| `dryRun`                                                          | *boolean*                                                         | :heavy_check_mark:                                                | Whether this was a preview (no mutation) or a real forget         |
| `count`                                                           | *number*                                                          | :heavy_check_mark:                                                | Number of memories selected / forgotten                           |
| `forgetBatchId`                                                   | *string*                                                          | :heavy_check_mark:                                                | ID tagged on every memory forgotten in this call (null on dryRun) |
| `summary`                                                         | *string*                                                          | :heavy_check_mark:                                                | The agent's one-line summary of what it did                       |
| `candidates`                                                      | [operations.Candidate](../../models/operations/candidate.md)[]    | :heavy_minus_sign:                                                | On dryRun: the memories that would be forgotten                   |
| `forgotten`                                                       | [operations.Forgotten](../../models/operations/forgotten.md)[]    | :heavy_minus_sign:                                                | On apply: the memories that were forgotten                        |