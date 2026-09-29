# ChildRelation

How this memory is connected to the matched memory

## Example Usage

```typescript
import { ChildRelation } from "supermemory/models/operations";

let value: ChildRelation = "derives";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"updates" | "extends" | "derives" | Unrecognized<string>
```