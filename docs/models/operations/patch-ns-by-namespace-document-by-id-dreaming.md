# PatchNsByNamespaceDocumentByIdDreaming

Processing mode. "dynamic" (default) groups related documents so memories form from coherent context. "instant" processes each document independently right away and bills one extra operation per document.

## Example Usage

```typescript
import { PatchNsByNamespaceDocumentByIdDreaming } from "supermemory/models/operations";

let value: PatchNsByNamespaceDocumentByIdDreaming = "instant";
```

## Values

```typescript
"dynamic" | "instant"
```