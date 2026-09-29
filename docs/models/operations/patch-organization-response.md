# PatchOrganizationResponse

Organization settings updated successfully

## Example Usage

```typescript
import { PatchOrganizationResponse } from "supermemory/models/operations";

let value: PatchOrganizationResponse = {
  organizationalContext: "<value>",
  namespaceCount: 510282,
};
```

## Fields

| Field                                                                                          | Type                                                                                           | Required                                                                                       | Description                                                                                    |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `organizationalContext`                                                                        | *string*                                                                                       | :heavy_check_mark:                                                                             | Shared background that helps Supermemory interpret content consistently across every namespace |
| `namespaceCount`                                                                               | *number*                                                                                       | :heavy_check_mark:                                                                             | Number of namespaces in the organization                                                       |