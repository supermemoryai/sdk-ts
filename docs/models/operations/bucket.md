# Bucket

## Example Usage

```typescript
import { Bucket } from "supermemory/models/operations";

let value: Bucket = {
  id: "<id>",
  memory: "<value>",
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `id`                                                                                     | *string*                                                                                 | :heavy_check_mark:                                                                       | Memory ID, or an aggregated_-prefixed ID for a summary synthesized from several memories |
| `memory`                                                                                 | *string*                                                                                 | :heavy_check_mark:                                                                       | Memory text                                                                              |