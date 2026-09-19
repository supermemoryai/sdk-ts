# GetV3ContainerTagsMergeByMergeIdStatus

## Example Usage

```typescript
import { GetV3ContainerTagsMergeByMergeIdStatus } from "supermemory/models/operations";

let value: GetV3ContainerTagsMergeByMergeIdStatus = "cleanup_pending";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"queued" | "waiting_for_ingest" | "copying_vectors" | "db_committing" | "cleanup_pending" | "completed" | "failed" | Unrecognized<string>
```