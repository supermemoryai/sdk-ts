# PostNsByNamespaceDocumentTaskType

Processing pipeline. "memory" builds durable learned context; "superrag" optimizes the document for retrieval without generating memories.

## Example Usage

```typescript
import { PostNsByNamespaceDocumentTaskType } from "supermemory/models/operations";

let value: PostNsByNamespaceDocumentTaskType = "memory";
```

## Values

```typescript
"memory" | "superrag"
```