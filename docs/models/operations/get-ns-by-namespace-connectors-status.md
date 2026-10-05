# GetNsByNamespaceConnectorsStatus

pending_authorization until the user finishes the provider login at authUrl; DELETE cancels it. Pending connectors are not listed.

## Example Usage

```typescript
import { GetNsByNamespaceConnectorsStatus } from "supermemory/models/operations";

let value: GetNsByNamespaceConnectorsStatus = "pending_authorization";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"pending_authorization" | "active" | Unrecognized<string>
```