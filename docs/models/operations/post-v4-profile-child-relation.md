# PostV4ProfileChildRelation

Relation type between this memory and its parent/child

## Example Usage

```typescript
import { PostV4ProfileChildRelation } from "supermemory/models/operations";

let value: PostV4ProfileChildRelation = "extends";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"updates" | "extends" | "derives" | Unrecognized<string>
```