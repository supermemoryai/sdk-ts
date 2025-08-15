# Memories

Types:

- <code><a href="./src/resources/memories.ts">MemoryUpdateResponse</a></code>
- <code><a href="./src/resources/memories.ts">MemoryListResponse</a></code>
- <code><a href="./src/resources/memories.ts">MemoryAddResponse</a></code>
- <code><a href="./src/resources/memories.ts">MemoryGetResponse</a></code>
- <code><a href="./src/resources/memories.ts">MemoryUploadFileResponse</a></code>

Methods:

- <code title="patch /v3/memories/{id}">client.memories.<a href="./src/resources/memories.ts">update</a>(id, { ...params }) -> MemoryUpdateResponse</code>
- <code title="post /v3/memories/list">client.memories.<a href="./src/resources/memories.ts">list</a>({ ...params }) -> MemoryListResponse</code>
- <code title="delete /v3/memories/{id}">client.memories.<a href="./src/resources/memories.ts">delete</a>(id) -> void</code>
- <code title="post /v3/memories">client.memories.<a href="./src/resources/memories.ts">add</a>({ ...params }) -> MemoryAddResponse</code>
- <code title="get /v3/memories/{id}">client.memories.<a href="./src/resources/memories.ts">get</a>(id) -> MemoryGetResponse</code>
- <code title="post /v3/memories/file">client.memories.<a href="./src/resources/memories.ts">uploadFile</a>({ ...params }) -> MemoryUploadFileResponse</code>

# Search

Types:

- <code><a href="./src/resources/search.ts">SearchExecuteResponse</a></code>

Methods:

- <code title="post /v3/search">client.search.<a href="./src/resources/search.ts">execute</a>({ ...params }) -> SearchExecuteResponse</code>

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
- <code><a href="./src/resources/connections.ts">ConnectionListDocumentsResponse</a></code>

Methods:

- <code title="post /v3/connections/{provider}">client.connections.<a href="./src/resources/connections.ts">create</a>(provider, { ...params }) -> ConnectionCreateResponse</code>
- <code title="post /v3/connections/list">client.connections.<a href="./src/resources/connections.ts">list</a>({ ...params }) -> ConnectionListResponse</code>
- <code title="delete /v3/connections/{connectionId}">client.connections.<a href="./src/resources/connections.ts">deleteByID</a>(connectionID) -> ConnectionDeleteByIDResponse</code>
- <code title="delete /v3/connections/{provider}">client.connections.<a href="./src/resources/connections.ts">deleteByProvider</a>(provider, { ...params }) -> ConnectionDeleteByProviderResponse</code>
- <code title="get /v3/connections/{connectionId}">client.connections.<a href="./src/resources/connections.ts">getByID</a>(connectionID) -> ConnectionGetByIDResponse</code>
- <code title="post /v3/connections/{provider}/connection">client.connections.<a href="./src/resources/connections.ts">getByTags</a>(provider, { ...params }) -> ConnectionGetByTagsResponse</code>
- <code title="post /v3/connections/{provider}/import">client.connections.<a href="./src/resources/connections.ts">import</a>(provider, { ...params }) -> void</code>
- <code title="post /v3/connections/{provider}/documents">client.connections.<a href="./src/resources/connections.ts">listDocuments</a>(provider, { ...params }) -> ConnectionListDocumentsResponse</code>
