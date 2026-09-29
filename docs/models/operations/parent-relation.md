# ParentRelation

How this memory is connected to the matched memory

## Example Usage

```typescript
import { ParentRelation } from "supermemory/models/operations";

let value: ParentRelation = "extends";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"updates" | "extends" | "derives" | Unrecognized<string>
```