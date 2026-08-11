# ParentRelation

Relation type between this memory and its parent/child

## Example Usage

```typescript
import { ParentRelation } from "supermemory/models/operations";

let value: ParentRelation = "updates";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"updates" | "extends" | "derives" | Unrecognized<string>
```