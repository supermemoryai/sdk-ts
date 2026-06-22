# Supermemory

Types:

- <code><a href="./src/resources/top-level.ts">AddResponse</a></code>
- <code><a href="./src/resources/top-level.ts">ProfileResponse</a></code>

Methods:

- <code title="post /v3/documents">client.<a href="./src/index.ts">add</a>({ ...params }) -> AddResponse</code>
- <code title="post /v4/profile">client.<a href="./src/index.ts">profile</a>({ ...params }) -> ProfileResponse</code>

# Memories

Types:

- <code><a href="./src/resources/memories.ts">MemoryForgetResponse</a></code>
- <code><a href="./src/resources/memories.ts">MemoryUpdateMemoryResponse</a></code>

Methods:

- <code title="delete /v4/memories">client.memories.<a href="./src/resources/memories.ts">forget</a>({ ...params }) -> MemoryForgetResponse</code>
- <code title="patch /v4/memories">client.memories.<a href="./src/resources/memories.ts">updateMemory</a>({ ...params }) -> MemoryUpdateMemoryResponse</code>

# Documents

Types:

- <code><a href="./src/resources/documents.ts">DocumentUpdateResponse</a></code>
- <code><a href="./src/resources/documents.ts">DocumentListResponse</a></code>
- <code><a href="./src/resources/documents.ts">DocumentAddResponse</a></code>
- <code><a href="./src/resources/documents.ts">DocumentBatchAddResponse</a></code>
- <code><a href="./src/resources/documents.ts">DocumentDeleteBulkResponse</a></code>
- <code><a href="./src/resources/documents.ts">DocumentGetResponse</a></code>
- <code><a href="./src/resources/documents.ts">DocumentListProcessingResponse</a></code>
- <code><a href="./src/resources/documents.ts">DocumentUploadFileResponse</a></code>

Methods:

- <code title="patch /v3/documents/{id}">client.documents.<a href="./src/resources/documents.ts">update</a>(id, { ...params }) -> DocumentUpdateResponse</code>
- <code title="post /v3/documents/list">client.documents.<a href="./src/resources/documents.ts">list</a>({ ...params }) -> DocumentListResponse</code>
- <code title="delete /v3/documents/{id}">client.documents.<a href="./src/resources/documents.ts">delete</a>(id) -> void</code>
- <code title="post /v3/documents">client.documents.<a href="./src/resources/documents.ts">add</a>({ ...params }) -> DocumentAddResponse</code>
- <code title="post /v3/documents/batch">client.documents.<a href="./src/resources/documents.ts">batchAdd</a>({ ...params }) -> DocumentBatchAddResponse</code>
- <code title="delete /v3/documents/bulk">client.documents.<a href="./src/resources/documents.ts">deleteBulk</a>({ ...params }) -> DocumentDeleteBulkResponse</code>
- <code title="get /v3/documents/{id}">client.documents.<a href="./src/resources/documents.ts">get</a>(id) -> DocumentGetResponse</code>
- <code title="get /v3/documents/processing">client.documents.<a href="./src/resources/documents.ts">listProcessing</a>() -> DocumentListProcessingResponse</code>
- <code title="post /v3/documents/file">client.documents.<a href="./src/resources/documents.ts">uploadFile</a>({ ...params }) -> DocumentUploadFileResponse</code>

# Search

Types:

- <code><a href="./src/resources/search.ts">SearchDocumentsResponse</a></code>
- <code><a href="./src/resources/search.ts">SearchExecuteResponse</a></code>
- <code><a href="./src/resources/search.ts">SearchMemoriesResponse</a></code>

Methods:

- <code title="post /v3/search">client.search.<a href="./src/resources/search.ts">documents</a>({ ...params }) -> SearchDocumentsResponse</code>
- <code title="post /v3/search">client.search.<a href="./src/resources/search.ts">execute</a>({ ...params }) -> SearchExecuteResponse</code>
- <code title="post /v4/search">client.search.<a href="./src/resources/search.ts">memories</a>({ ...params }) -> SearchMemoriesResponse</code>

# Settings

Types:

- <code><a href="./src/resources/settings.ts">SettingUpdateResponse</a></code>
- <code><a href="./src/resources/settings.ts">SettingGetResponse</a></code>

Methods:

- <code title="patch /v3/settings">client.settings.<a href="./src/resources/settings.ts">update</a>({ ...params }) -> SettingUpdateResponse</code>
- <code title="get /v3/settings">client.settings.<a href="./src/resources/settings.ts">get</a>() -> SettingGetResponse</code>

# Connections
