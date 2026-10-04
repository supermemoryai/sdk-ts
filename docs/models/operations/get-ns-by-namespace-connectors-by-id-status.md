# GetNsByNamespaceConnectorsByIdStatus

pending_authorization until the user finishes the provider login at authUrl; DELETE cancels it. Pending connectors are not listed.

## Example Usage

```typescript
import { GetNsByNamespaceConnectorsByIdStatus } from "supermemory/models/operations";

let value: GetNsByNamespaceConnectorsByIdStatus = "active";

// Open enum: unrecognized values are captured as Unrecognized<string>
```

## Values

```typescript
"pending_authorization" | "active" | Unrecognized<string>
```