# ChildRelation

Relation type between this memory and its parent/child

## Example Usage

```typescript
import { ChildRelation } from "supermemory/models/operations";

let value: ChildRelation = "extends";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"updates" | "extends" | "derives" | Unrecognized<string>
```