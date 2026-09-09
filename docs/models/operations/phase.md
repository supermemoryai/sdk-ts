# Phase

## Example Usage

```typescript
import { Phase } from "supermemory/models/operations";

let value: Phase = "copying_vectors";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"queued" | "waiting_for_ingest" | "copying_vectors" | "db_committing" | "cleanup_pending" | "completed" | "failed" | Unrecognized<string>
```