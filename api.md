# Shared

Types:

- <code><a href="./src/resources/shared.ts">And</a></code>
- <code><a href="./src/resources/shared.ts">Or</a></code>
- <code><a href="./src/resources/shared.ts">ProfileResponse</a></code>

Methods:

- <code title="post /v4/profile">client.shared.<a href="./src/resources/shared.ts">profile</a>({ ...params }) -> ProfileResponse</code>

# Memories

Types:

- <code><a href="./src/resources/memories.ts">MemoryUpdateResponse</a></code>
- <code><a href="./src/resources/memories.ts">MemoryListResponse</a></code>
- <code><a href="./src/resources/memories.ts">MemoryAddResponse</a></code>
- <code><a href="./src/resources/memories.ts">MemoryGetResponse</a></code>
- <code><a href="./src/resources/memories.ts">MemoryUploadFileResponse</a></code>

Methods:

- <code title="patch /v3/documents/{id}">client.memories.<a href="./src/resources/memories.ts">update</a>(id, { ...params }) -> MemoryUpdateResponse</code>
- <code title="post /v3/documents/list">client.memories.<a href="./src/resources/memories.ts">list</a>({ ...params }) -> MemoryListResponse</code>
- <code title="delete /v3/documents/{id}">client.memories.<a href="./src/resources/memories.ts">delete</a>(id) -> void</code>
- <code title="post /v3/documents">client.memories.<a href="./src/resources/memories.ts">add</a>({ ...params }) -> MemoryAddResponse</code>
- <code title="get /v3/documents/{id}">client.memories.<a href="./src/resources/memories.ts">get</a>(id) -> MemoryGetResponse</code>
- <code title="post /v3/documents/file">client.memories.<a href="./src/resources/memories.ts">uploadFile</a>({ ...params }) -> MemoryUploadFileResponse</code>

# Documents

Types:

- <code><a href="./src/resources/documents.ts">DocumentUpdateResponse</a></code>
- <code><a href="./src/resources/documents.ts">DocumentListResponse</a></code>
- <code><a href="./src/resources/documents.ts">DocumentAddResponse</a></code>
- <code><a href="./src/resources/documents.ts">DocumentGetResponse</a></code>
- <code><a href="./src/resources/documents.ts">DocumentUploadFileResponse</a></code>

Methods:

- <code title="patch /v3/documents/{id}">client.documents.<a href="./src/resources/documents.ts">update</a>(id, { ...params }) -> DocumentUpdateResponse</code>
- <code title="post /v3/documents/list">client.documents.<a href="./src/resources/documents.ts">list</a>({ ...params }) -> DocumentListResponse</code>
- <code title="delete /v3/documents/{id}">client.documents.<a href="./src/resources/documents.ts">delete</a>(id) -> void</code>
- <code title="post /v3/documents">client.documents.<a href="./src/resources/documents.ts">add</a>({ ...params }) -> DocumentAddResponse</code>
- <code title="get /v3/documents/{id}">client.documents.<a href="./src/resources/documents.ts">get</a>(id) -> DocumentGetResponse</code>
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

Types:

- <code><a href="./src/resources/connections.ts">ConnectionCreateResponse</a></code>
- <code><a href="./src/resources/connections.ts">ConnectionListResponse</a></code>
- <code><a href="./src/resources/connections.ts">ConnectionDeleteByIDResponse</a></code>
- <code><a href="./src/resources/connections.ts">ConnectionDeleteByProviderResponse</a></code>
- <code><a href="./src/resources/connections.ts">ConnectionGetByIDResponse</a></code>
- <code><a href="./src/resources/connections.ts">ConnectionGetByTagsResponse</a></code>
- <code><a href="./src/resources/connections.ts">ConnectionImportResponse</a></code>
- <code><a href="./src/resources/connections.ts">ConnectionListDocumentsResponse</a></code>

Methods:

- <code title="post /v3/connections/{provider}">client.connections.<a href="./src/resources/connections.ts">create</a>(provider, { ...params }) -> ConnectionCreateResponse</code>
- <code title="post /v3/connections/list">client.connections.<a href="./src/resources/connections.ts">list</a>({ ...params }) -> ConnectionListResponse</code>
- <code title="delete /v3/connections/{connectionId}">client.connections.<a href="./src/resources/connections.ts">deleteByID</a>(connectionID) -> ConnectionDeleteByIDResponse</code>
- <code title="delete /v3/connections/{provider}">client.connections.<a href="./src/resources/connections.ts">deleteByProvider</a>(provider, { ...params }) -> ConnectionDeleteByProviderResponse</code>
- <code title="get /v3/connections/{connectionId}">client.connections.<a href="./src/resources/connections.ts">getByID</a>(connectionID) -> ConnectionGetByIDResponse</code>
- <code title="post /v3/connections/{provider}/connection">client.connections.<a href="./src/resources/connections.ts">getByTags</a>(provider, { ...params }) -> ConnectionGetByTagsResponse</code>
- <code title="post /v3/connections/{provider}/import">client.connections.<a href="./src/resources/connections.ts">import</a>(provider, { ...params }) -> string</code>
- <code title="post /v3/connections/{provider}/documents">client.connections.<a href="./src/resources/connections.ts">listDocuments</a>(provider, { ...params }) -> ConnectionListDocumentsResponse</code>
