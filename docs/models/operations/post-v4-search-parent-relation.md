# PostV4SearchParentRelation

Relation type between this memory and its parent/child

## Example Usage

```typescript
import { PostV4SearchParentRelation } from "supermemory/models/operations";

let value: PostV4SearchParentRelation = "updates";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"updates" | "extends" | "derives" | Unrecognized<string>
```