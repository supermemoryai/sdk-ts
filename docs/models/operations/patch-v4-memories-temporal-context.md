# PatchV4MemoriesTemporalContext

Structured temporal metadata. Merged into the metadata JSON column. If omitted, existing temporalContext is preserved.

## Example Usage

```typescript
import { PatchV4MemoriesTemporalContext } from "supermemory/models/operations";

let value: PatchV4MemoriesTemporalContext = {};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `documentDate`                           | *string*                                 | :heavy_minus_sign:                       | Date the document was authored           |
| `eventDate`                              | *string*[]                               | :heavy_minus_sign:                       | Dates of events referenced in the memory |