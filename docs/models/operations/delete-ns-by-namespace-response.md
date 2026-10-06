# DeleteNsByNamespaceResponse


## Supported Types

### `operations.DeleteNsByNamespaceResponseBody`

```typescript
const value: operations.DeleteNsByNamespaceResponseBody = {
  success: true,
  status: "deleted",
  namespace: "<value>",
  deletedDocumentsCount: 565849,
  deletedMemoriesCount: 854361,
};
```

### `operations.DeleteNsByNamespaceResponseBodyQueued`

```typescript
const value: operations.DeleteNsByNamespaceResponseBodyQueued = {
  success: true,
  status: "queued",
  operationId: "<id>",
  namespace: "<value>",
  moveTo: "<value>",
};
```

