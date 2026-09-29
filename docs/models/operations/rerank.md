# Rerank

Post-retrieval ranking. "order" improves result ordering; "aggregate" also combines overlapping context into cleaner answers. This is helpful if you want to ensure the most relevant results are returned.

## Example Usage

```typescript
import { Rerank } from "supermemory/models/operations";

let value: Rerank = "order";
```

## Values

```typescript
"none" | "order" | "aggregate"
```