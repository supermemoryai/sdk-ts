# PostV4MemoriesTemporalContext

Structured temporal metadata. Merged into the metadata JSON column.

## Example Usage

```typescript
import { PostV4MemoriesTemporalContext } from "supermemory/models/operations";

let value: PostV4MemoriesTemporalContext = {};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `documentDate`                           | *string*                                 | :heavy_minus_sign:                       | Date the document was authored           |
| `eventDate`                              | *string*[]                               | :heavy_minus_sign:                       | Dates of events referenced in the memory |