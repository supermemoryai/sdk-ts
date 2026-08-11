# PostV3DocumentsFileDreaming

Processing mode. "dynamic" (default) groups related documents together so memories form from coherent, logical units rather than one isolated entry at a time. "instant" processes each document on its own right away, and bills one extra operation per document.

## Example Usage

```typescript
import { PostV3DocumentsFileDreaming } from "supermemory/models/operations";

let value: PostV3DocumentsFileDreaming = "instant";
```

## Values

```typescript
"instant" | "dynamic"
```