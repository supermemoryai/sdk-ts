# PatchOrganizationRequest

## Example Usage

```typescript
import { PatchOrganizationRequest } from "supermemory/models/operations";

let value: PatchOrganizationRequest = {
  organizationalContext: "Acme Corp builds developer tools for startups.",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `organizationalContext`                                                                      | *string*                                                                                     | :heavy_check_mark:                                                                           | Shared background that guides memory formation across every namespace. Set null to clear it. | Acme Corp builds developer tools for startups.                                               |