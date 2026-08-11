# GetV3DocumentsProcessingStatus

Status of the document

## Example Usage

```typescript
import { GetV3DocumentsProcessingStatus } from "supermemory/models/operations";

let value: GetV3DocumentsProcessingStatus = "done";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"unknown" | "queued" | "extracting" | "chunking" | "embedding" | "indexing" | "done" | "failed" | Unrecognized<string>
```