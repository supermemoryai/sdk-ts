# Visibility

Space visibility: public (org-shared) or private (owner-only)

## Example Usage

```typescript
import { Visibility } from "supermemory/models/operations";

let value: Visibility = "public";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"public" | "private" | "unlisted" | Unrecognized<string>
```