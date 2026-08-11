# PostV3DocumentsListStatus

Status of the document

## Example Usage

```typescript
import { PostV3DocumentsListStatus } from "supermemory/models/operations";

let value: PostV3DocumentsListStatus = "done";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"unknown" | "queued" | "extracting" | "chunking" | "embedding" | "indexing" | "done" | "failed" | Unrecognized<string>
```