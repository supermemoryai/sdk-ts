# PostV4SearchChildRelation

Relation type between this memory and its parent/child

## Example Usage

```typescript
import { PostV4SearchChildRelation } from "supermemory/models/operations";

let value: PostV4SearchChildRelation = "extends";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"updates" | "extends" | "derives" | Unrecognized<string>
```