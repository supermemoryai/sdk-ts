# PostV3SettingsResetResponse

Organization reset completed

## Example Usage

```typescript
import { PostV3SettingsResetResponse } from "supermemory/models/operations";

let value: PostV3SettingsResetResponse = {
  success: true,
  deletedConnections: 95.31,
  deletedDocumentBatches: 3434.77,
  deletedDocumentsApprox: 7974.95,
  deletedMemoryRows: 8155.89,
  deletedExtraSpaces: 6659.84,
  clearedDefaultSpaceContext: false,
  clearedBrainMemoryRegistry: true,
  settingsReset: false,
};
```

## Fields

| Field                        | Type                         | Required                     | Description                  |
| ---------------------------- | ---------------------------- | ---------------------------- | ---------------------------- |
| `success`                    | *true*                       | :heavy_check_mark:           | N/A                          |
| `deletedConnections`         | *number*                     | :heavy_check_mark:           | N/A                          |
| `deletedDocumentBatches`     | *number*                     | :heavy_check_mark:           | N/A                          |
| `deletedDocumentsApprox`     | *number*                     | :heavy_check_mark:           | N/A                          |
| `deletedMemoryRows`          | *number*                     | :heavy_check_mark:           | N/A                          |
| `deletedExtraSpaces`         | *number*                     | :heavy_check_mark:           | N/A                          |
| `clearedDefaultSpaceContext` | *boolean*                    | :heavy_check_mark:           | N/A                          |
| `clearedBrainMemoryRegistry` | *boolean*                    | :heavy_check_mark:           | N/A                          |
| `settingsReset`              | *boolean*                    | :heavy_check_mark:           | N/A                          |