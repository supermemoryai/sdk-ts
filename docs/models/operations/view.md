# View

`active` returns in-flight documents updated in the last 4 hours. `all` also includes failed and stuck documents.

## Example Usage

```typescript
import { View } from "supermemory/models/operations";

let value: View = "all";
```

## Values

```typescript
"active" | "all"
```