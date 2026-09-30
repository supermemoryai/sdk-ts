# GetOrganizationResponse

Organization settings retrieved successfully

## Example Usage

```typescript
import { GetOrganizationResponse } from "supermemory/models/operations";

let value: GetOrganizationResponse = {
  organizationalContext: "<value>",
  namespaceCount: 258218,
};
```

## Fields

| Field                                                                                          | Type                                                                                           | Required                                                                                       | Description                                                                                    |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `organizationalContext`                                                                        | *string*                                                                                       | :heavy_check_mark:                                                                             | Shared background that helps Supermemory interpret content consistently across every namespace |
| `namespaceCount`                                                                               | *number*                                                                                       | :heavy_check_mark:                                                                             | Number of namespaces in the organization                                                       |