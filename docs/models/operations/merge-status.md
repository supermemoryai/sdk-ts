# MergeStatus

Whether this tag is involved in an active merge

## Example Usage

```typescript
import { MergeStatus } from "supermemory/models/operations";

let value: MergeStatus = "source";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"source" | "target" | Unrecognized<string>
```