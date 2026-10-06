# DeleteNsByNamespaceResponseBody

Namespace permanently deleted (status "deleted"). A move answers 202 with status "queued".


## Supported Types

### `operations.Deleted`

```typescript
const value: operations.Deleted = {
  success: true,
  status: "deleted",
  namespace: "<value>",
  deletedDocumentsCount: 399741,
  deletedMemoriesCount: 142389,
};
```

### `operations.Queued`

```typescript
const value: operations.Queued = {
  success: true,
  status: "queued",
  operationId: "<id>",
  namespace: "<value>",
  moveTo: "<value>",
};
```

