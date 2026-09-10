# View

`active` returns in-flight documents updated in the last 4 hours. `pending` returns every document that is not done or failed, with no time cutoff. `all` also includes failed documents, paginated.

## Example Usage

```typescript
import { View } from "supermemory/models/operations";

let value: View = "all";
```

## Values

```typescript
"active" | "pending" | "all"
```