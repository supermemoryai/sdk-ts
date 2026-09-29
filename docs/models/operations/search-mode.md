# SearchMode

Search surface. "hybrid" combines learned memories with source chunks, "memories" returns learned context, and "chunks" returns source passages.

## Example Usage

```typescript
import { SearchMode } from "supermemory/models/operations";

let value: SearchMode = "hybrid";
```

## Values

```typescript
"hybrid" | "memories" | "chunks"
```