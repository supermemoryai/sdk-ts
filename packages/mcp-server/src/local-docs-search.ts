// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'profile',
    endpoint: '/v4/profile',
    httpMethod: 'post',
    summary: 'Get user profile',
    description: 'Get user profile with optional search results',
    stainlessPath: '(resource) $client > (method) profile',
    qualified: 'client.profile',
    params: [
      'containerTag: string;',
      "filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; };",
      'q?: string;',
      'threshold?: number;',
    ],
    response:
      '{ profile: { dynamic: string[]; static: string[]; }; searchResults?: { results: object[]; timing: number; total: number; }; }',
    markdown:
      "## profile\n\n`client.profile(containerTag: string, filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }, q?: string, threshold?: number): { profile: object; searchResults?: object; }`\n\n**post** `/v4/profile`\n\nGet user profile with optional search results\n\n### Parameters\n\n- `containerTag: string`\n  Tag to filter the profile by. This can be an ID for your user, a project ID, or any other identifier you wish to use to filter memories.\n\n- `filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; }`\n  Optional metadata filters to apply to profile results and search results. Supports complex AND/OR queries with multiple conditions.\n\n- `q?: string`\n  Optional search query to include search results in the response\n\n- `threshold?: number`\n  Threshold for search results. Only results with a score above this threshold will be included.\n\n### Returns\n\n- `{ profile: { dynamic: string[]; static: string[]; }; searchResults?: { results: object[]; timing: number; total: number; }; }`\n\n  - `profile: { dynamic: string[]; static: string[]; }`\n  - `searchResults?: { results: object[]; timing: number; total: number; }`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.profile({ containerTag: 'containerTag' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v4/profile \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY" \\\n    -d \'{\n          "containerTag": "containerTag"\n        }\'',
      },
      python: {
        method: 'profile',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.profile(\n    container_tag="containerTag",\n)\nprint(response.profile)',
      },
      typescript: {
        method: 'client.profile',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.profile({ containerTag: 'containerTag' });\n\nconsole.log(response.profile);",
      },
    },
  },
  {
    name: 'add',
    endpoint: '/v3/documents',
    httpMethod: 'post',
    summary: 'Add document',
    description: 'Add a document with any content type (text, url, file, etc.) and metadata',
    stainlessPath: '(resource) $client > (method) add',
    qualified: 'client.add',
    params: [
      'content: string;',
      'containerTag?: string;',
      'containerTags?: string[];',
      'customId?: string;',
      'entityContext?: string;',
      'filepath?: string;',
      'metadata?: object;',
      "taskType?: 'memory' | 'superrag';",
    ],
    response: '{ id: string; status: string; }',
    markdown:
      "## add\n\n`client.add(content: string, containerTag?: string, containerTags?: string[], customId?: string, entityContext?: string, filepath?: string, metadata?: object, taskType?: 'memory' | 'superrag'): { id: string; status: string; }`\n\n**post** `/v3/documents`\n\nAdd a document with any content type (text, url, file, etc.) and metadata\n\n### Parameters\n\n- `content: string`\n  The content to extract and process into a document. This can be a URL to a website, a PDF, an image, or a video.\n\n- `containerTag?: string`\n  Optional tag this document should be containerized by. Max 100 characters, alphanumeric with hyphens, underscores, and dots only.\n\n- `containerTags?: string[]`\n\n- `customId?: string`\n  Optional custom ID of the document. Max 100 characters, alphanumeric with hyphens, underscores, and dots only.\n\n- `entityContext?: string`\n  Optional entity context for this container tag. Max 1500 characters. Used during document processing to guide memory extraction.\n\n- `filepath?: string`\n  Optional file path for the document. Used by supermemoryfs to store the full path of the file.\n\n- `metadata?: object`\n  Optional metadata for the document.\n\n- `taskType?: 'memory' | 'superrag'`\n  Task type: \"memory\" (default) for full context layer with SuperRAG built in, \"superrag\" for managed RAG as a service.\n\n### Returns\n\n- `{ id: string; status: string; }`\n\n  - `id: string`\n  - `status: string`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.add({ content: 'content' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/documents \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY" \\\n    -d \'{\n          "content": "content"\n        }\'',
      },
      python: {
        method: 'add',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.add(\n    content="content",\n)\nprint(response.id)',
      },
      typescript: {
        method: 'client.add',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.add({ content: 'content' });\n\nconsole.log(response.id);",
      },
    },
  },
  {
    name: 'forget',
    endpoint: '/v4/memories',
    httpMethod: 'delete',
    summary: 'Forget a memory',
    description:
      'Forget (soft delete) a memory entry. The memory is marked as forgotten but not permanently deleted.',
    stainlessPath: '(resource) memories > (method) forget',
    qualified: 'client.memories.forget',
    params: ['containerTag: string;', 'id?: string;', 'content?: string;', 'reason?: string;'],
    response: '{ id: string; forgotten: boolean; }',
    markdown:
      "## forget\n\n`client.memories.forget(containerTag: string, id?: string, content?: string, reason?: string): { id: string; forgotten: boolean; }`\n\n**delete** `/v4/memories`\n\nForget (soft delete) a memory entry. The memory is marked as forgotten but not permanently deleted.\n\n### Parameters\n\n- `containerTag: string`\n  Container tag / space identifier. Required to scope the operation.\n\n- `id?: string`\n  ID of the memory entry to operate on\n\n- `content?: string`\n  Exact content match of the memory entry to operate on. Use this when you don't have the ID.\n\n- `reason?: string`\n  Optional reason for forgetting this memory\n\n### Returns\n\n- `{ id: string; forgotten: boolean; }`\n  Response after forgetting a memory\n\n  - `id: string`\n  - `forgotten: boolean`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.memories.forget({ containerTag: 'user_123' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v4/memories \\\n    -X DELETE \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY"',
      },
      python: {
        method: 'memories.forget',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.memories.forget(\n    container_tag="user_123",\n)\nprint(response.id)',
      },
      typescript: {
        method: 'client.memories.forget',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.memories.forget({ containerTag: 'user_123' });\n\nconsole.log(response.id);",
      },
    },
  },
  {
    name: 'update_memory',
    endpoint: '/v4/memories',
    httpMethod: 'patch',
    summary: 'Update a memory (creates new version)',
    description:
      'Update a memory by creating a new version. The original memory is preserved with isLatest=false.',
    stainlessPath: '(resource) memories > (method) update_memory',
    qualified: 'client.memories.updateMemory',
    params: [
      'containerTag: string;',
      'newContent: string;',
      'id?: string;',
      'content?: string;',
      'forgetAfter?: string;',
      'forgetReason?: string;',
      'metadata?: object;',
      'temporalContext?: { documentDate?: string; eventDate?: string[]; };',
    ],
    response:
      '{ id: string; createdAt: string; forgetAfter: string; forgetReason: string; memory: string; parentMemoryId: string; rootMemoryId: string; version: number; }',
    markdown:
      "## update_memory\n\n`client.memories.updateMemory(containerTag: string, newContent: string, id?: string, content?: string, forgetAfter?: string, forgetReason?: string, metadata?: object, temporalContext?: { documentDate?: string; eventDate?: string[]; }): { id: string; createdAt: string; forgetAfter: string; forgetReason: string; memory: string; parentMemoryId: string; rootMemoryId: string; version: number; }`\n\n**patch** `/v4/memories`\n\nUpdate a memory by creating a new version. The original memory is preserved with isLatest=false.\n\n### Parameters\n\n- `containerTag: string`\n  Container tag / space identifier. Required to scope the operation.\n\n- `newContent: string`\n  The new content that will replace the existing memory\n\n- `id?: string`\n  ID of the memory entry to operate on\n\n- `content?: string`\n  Exact content match of the memory entry to operate on. Use this when you don't have the ID.\n\n- `forgetAfter?: string`\n  ISO 8601 datetime string. The memory will be auto-forgotten after this time. Pass null to clear an existing expiry. Omit to inherit from the previous version.\n\n- `forgetReason?: string`\n  Optional reason for the scheduled forgetting. Cleared automatically when forgetAfter is set to null.\n\n- `metadata?: object`\n  Optional metadata. If not provided, inherits from the previous version.\n\n- `temporalContext?: { documentDate?: string; eventDate?: string[]; }`\n  Structured temporal metadata. Merged into the metadata JSON column. If omitted, existing temporalContext is preserved.\n  - `documentDate?: string`\n    Date the document was authored\n  - `eventDate?: string[]`\n    Dates of events referenced in the memory\n\n### Returns\n\n- `{ id: string; createdAt: string; forgetAfter: string; forgetReason: string; memory: string; parentMemoryId: string; rootMemoryId: string; version: number; }`\n  Response after updating a memory\n\n  - `id: string`\n  - `createdAt: string`\n  - `forgetAfter: string`\n  - `forgetReason: string`\n  - `memory: string`\n  - `parentMemoryId: string`\n  - `rootMemoryId: string`\n  - `version: number`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.memories.updateMemory({ containerTag: 'user_123', newContent: 'John now prefers light mode' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v4/memories \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY" \\\n    -d \'{\n          "containerTag": "user_123",\n          "newContent": "John now prefers light mode",\n          "id": "mem_abc123",\n          "content": "John prefers dark mode",\n          "forgetAfter": "2026-06-01T00:00:00Z",\n          "forgetReason": "temporary project deadline"\n        }\'',
      },
      python: {
        method: 'memories.update_memory',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.memories.update_memory(\n    container_tag="user_123",\n    new_content="John now prefers light mode",\n)\nprint(response.id)',
      },
      typescript: {
        method: 'client.memories.updateMemory',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.memories.updateMemory({\n  containerTag: 'user_123',\n  newContent: 'John now prefers light mode',\n});\n\nconsole.log(response.id);",
      },
    },
  },
  {
    name: 'add',
    endpoint: '/v3/documents',
    httpMethod: 'post',
    summary: 'Add document',
    description: 'Add a document with any content type (text, url, file, etc.) and metadata',
    stainlessPath: '(resource) documents > (method) add',
    qualified: 'client.documents.add',
    params: [
      'content: string;',
      'containerTag?: string;',
      'containerTags?: string[];',
      'customId?: string;',
      'entityContext?: string;',
      'filepath?: string;',
      'metadata?: object;',
      "taskType?: 'memory' | 'superrag';",
    ],
    response: '{ id: string; status: string; }',
    markdown:
      "## add\n\n`client.documents.add(content: string, containerTag?: string, containerTags?: string[], customId?: string, entityContext?: string, filepath?: string, metadata?: object, taskType?: 'memory' | 'superrag'): { id: string; status: string; }`\n\n**post** `/v3/documents`\n\nAdd a document with any content type (text, url, file, etc.) and metadata\n\n### Parameters\n\n- `content: string`\n  The content to extract and process into a document. This can be a URL to a website, a PDF, an image, or a video.\n\n- `containerTag?: string`\n  Optional tag this document should be containerized by. Max 100 characters, alphanumeric with hyphens, underscores, and dots only.\n\n- `containerTags?: string[]`\n\n- `customId?: string`\n  Optional custom ID of the document. Max 100 characters, alphanumeric with hyphens, underscores, and dots only.\n\n- `entityContext?: string`\n  Optional entity context for this container tag. Max 1500 characters. Used during document processing to guide memory extraction.\n\n- `filepath?: string`\n  Optional file path for the document. Used by supermemoryfs to store the full path of the file.\n\n- `metadata?: object`\n  Optional metadata for the document.\n\n- `taskType?: 'memory' | 'superrag'`\n  Task type: \"memory\" (default) for full context layer with SuperRAG built in, \"superrag\" for managed RAG as a service.\n\n### Returns\n\n- `{ id: string; status: string; }`\n\n  - `id: string`\n  - `status: string`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.documents.add({ content: 'content' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/documents \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY" \\\n    -d \'{\n          "content": "content"\n        }\'',
      },
      python: {
        method: 'documents.add',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.documents.add(\n    content="content",\n)\nprint(response.id)',
      },
      typescript: {
        method: 'client.documents.add',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.documents.add({ content: 'content' });\n\nconsole.log(response.id);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v3/documents/list',
    httpMethod: 'post',
    summary: 'List documents',
    description: 'Retrieves a paginated list of documents with their metadata and workflow status',
    stainlessPath: '(resource) documents > (method) list',
    qualified: 'client.documents.list',
    params: [
      'containerTags?: string[];',
      'filepath?: string;',
      "filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; };",
      'includeContent?: boolean;',
      'limit?: string | number;',
      "order?: 'asc' | 'desc';",
      'page?: string | number;',
      "sort?: 'createdAt' | 'updatedAt';",
    ],
    response:
      "{ memories: { id: string; connectionId: string; createdAt: string; customId: string; filepath: string; metadata: string | number | boolean | object | object[]; status: 'unknown' | 'queued' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'done' | 'failed'; summary: string; title: string; type: string; updatedAt: string; containerTags?: string[]; content?: string; }[]; pagination: { currentPage: number; totalItems: number; totalPages: number; limit?: number; }; }",
    markdown:
      "## list\n\n`client.documents.list(containerTags?: string[], filepath?: string, filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }, includeContent?: boolean, limit?: string | number, order?: 'asc' | 'desc', page?: string | number, sort?: 'createdAt' | 'updatedAt'): { memories: object[]; pagination: object; }`\n\n**post** `/v3/documents/list`\n\nRetrieves a paginated list of documents with their metadata and workflow status\n\n### Parameters\n\n- `containerTags?: string[]`\n  Optional tags this document should be containerized by. This can be an ID for your user, a project ID, or any other identifier you wish to use to group documents.\n\n- `filepath?: string`\n  Filter documents by filepath. Exact match for full paths, prefix match if ending with /\n\n- `filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; }`\n  Optional filters to apply to the search. Can be a JSON string or Query object.\n\n- `includeContent?: boolean`\n  Whether to include the content field in the response. Warning: This can make responses significantly larger.\n\n- `limit?: string | number`\n  Number of items per page\n\n- `order?: 'asc' | 'desc'`\n  Sort order\n\n- `page?: string | number`\n  Page number to fetch\n\n- `sort?: 'createdAt' | 'updatedAt'`\n  Field to sort by\n\n### Returns\n\n- `{ memories: { id: string; connectionId: string; createdAt: string; customId: string; filepath: string; metadata: string | number | boolean | object | object[]; status: 'unknown' | 'queued' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'done' | 'failed'; summary: string; title: string; type: string; updatedAt: string; containerTags?: string[]; content?: string; }[]; pagination: { currentPage: number; totalItems: number; totalPages: number; limit?: number; }; }`\n  List of documents\n\n  - `memories: { id: string; connectionId: string; createdAt: string; customId: string; filepath: string; metadata: string | number | boolean | object | object[]; status: 'unknown' | 'queued' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'done' | 'failed'; summary: string; title: string; type: string; updatedAt: string; containerTags?: string[]; content?: string; }[]`\n  - `pagination: { currentPage: number; totalItems: number; totalPages: number; limit?: number; }`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst documents = await client.documents.list();\n\nconsole.log(documents);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/documents/list \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY" \\\n    -d \'{\n          "containerTags": [\n            "user_123",\n            "project_123"\n          ],\n          "filepath": "/docs/",\n          "limit": 10,\n          "order": "desc",\n          "page": 1,\n          "sort": "createdAt"\n        }\'',
      },
      python: {
        method: 'documents.list',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\ndocuments = client.documents.list()\nprint(documents.memories)',
      },
      typescript: {
        method: 'client.documents.list',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst documents = await client.documents.list();\n\nconsole.log(documents.memories);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v3/documents/{id}',
    httpMethod: 'patch',
    summary: 'Update document',
    description: 'Update a document with any content type (text, url, file, etc.) and metadata',
    stainlessPath: '(resource) documents > (method) update',
    qualified: 'client.documents.update',
    params: [
      'id: string;',
      'containerTag?: string;',
      'containerTags?: string[];',
      'content?: string;',
      'customId?: string;',
      'filepath?: string;',
      'metadata?: object;',
      "taskType?: 'memory' | 'superrag';",
    ],
    response: '{ id: string; status: string; }',
    markdown:
      "## update\n\n`client.documents.update(id: string, containerTag?: string, containerTags?: string[], content?: string, customId?: string, filepath?: string, metadata?: object, taskType?: 'memory' | 'superrag'): { id: string; status: string; }`\n\n**patch** `/v3/documents/{id}`\n\nUpdate a document with any content type (text, url, file, etc.) and metadata\n\n### Parameters\n\n- `id: string`\n\n- `containerTag?: string`\n  Optional tag this document should be containerized by. This can be an ID for your user, a project ID, or any other identifier you wish to use to group documents.\n\n- `containerTags?: string[]`\n  (DEPRECATED: Use containerTag instead) Optional tags this document should be containerized by. This can be an ID for your user, a project ID, or any other identifier you wish to use to group documents.\n\n- `content?: string`\n  The content to extract and process into a document. This can be a URL to a website, a PDF, an image, or a video. \n\nPlaintext: Any plaintext format\n\nURL: A URL to a website, PDF, image, or video\n\nWe automatically detect the content type from the url's response format.\n\n- `customId?: string`\n  Optional custom ID of the document. This could be an ID from your database that will uniquely identify this document.\n\n- `filepath?: string`\n  Optional file path for the document (e.g., '/documents/reports/file.pdf'). Used by supermemoryfs to map documents to filesystem paths.\n\n- `metadata?: object`\n  Optional metadata for the document. This is used to store additional information about the document. You can use this to store any additional information you need about the document. Metadata can be filtered through. Keys must be strings and are case sensitive. Values can be strings, numbers, or booleans. You cannot nest objects.\n\n- `taskType?: 'memory' | 'superrag'`\n  Task type: \"memory\" (default) for full context layer with SuperRAG built in, \"superrag\" for managed RAG as a service.\n\n### Returns\n\n- `{ id: string; status: string; }`\n\n  - `id: string`\n  - `status: string`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst document = await client.documents.update('id');\n\nconsole.log(document);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/documents/$ID \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY" \\\n    -d \'{\n          "containerTag": "user_123",\n          "containerTags": [\n            "user_123",\n            "project_123"\n          ],\n          "content": "This is a detailed article about machine learning concepts...",\n          "customId": "mem_abc123",\n          "filepath": "/documents/reports/file.pdf",\n          "metadata": {\n            "category": "technology",\n            "isPublic": true,\n            "readingTime": 5,\n            "source": "web",\n            "tag_1": "ai",\n            "tag_2": "machine-learning"\n          },\n          "taskType": "memory"\n        }\'',
      },
      python: {
        method: 'documents.update',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\ndocument = client.documents.update(\n    id="id",\n)\nprint(document.id)',
      },
      typescript: {
        method: 'client.documents.update',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst document = await client.documents.update('id');\n\nconsole.log(document.id);",
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v3/documents/{id}',
    httpMethod: 'get',
    summary: 'Get document',
    description: 'Get a document by ID',
    stainlessPath: '(resource) documents > (method) get',
    qualified: 'client.documents.get',
    params: ['id: string;'],
    response:
      "{ id: string; connectionId: string; content: string; createdAt: string; customId: string; filepath: string; metadata: string | number | boolean | object | object[]; ogImage: string; raw: object; source: string; spatialPoint: object; status: 'unknown' | 'queued' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'done' | 'failed'; summary: string; taskType: 'memory' | 'superrag'; title: string; type: string; updatedAt: string; containerTags?: string[]; url?: string; }",
    markdown:
      "## get\n\n`client.documents.get(id: string): { id: string; connectionId: string; content: string; createdAt: string; customId: string; filepath: string; metadata: string | number | boolean | object | object[]; ogImage: string; raw: object; source: string; spatialPoint: object; status: 'unknown' | 'queued' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'done' | 'failed'; summary: string; taskType: 'memory' | 'superrag'; title: string; type: string; updatedAt: string; containerTags?: string[]; url?: string; }`\n\n**get** `/v3/documents/{id}`\n\nGet a document by ID\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; connectionId: string; content: string; createdAt: string; customId: string; filepath: string; metadata: string | number | boolean | object | object[]; ogImage: string; raw: object; source: string; spatialPoint: object; status: 'unknown' | 'queued' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'done' | 'failed'; summary: string; taskType: 'memory' | 'superrag'; title: string; type: string; updatedAt: string; containerTags?: string[]; url?: string; }`\n  Document object\n\n  - `id: string`\n  - `connectionId: string`\n  - `content: string`\n  - `createdAt: string`\n  - `customId: string`\n  - `filepath: string`\n  - `metadata: string | number | boolean | object | object[]`\n  - `ogImage: string`\n  - `raw: object`\n  - `source: string`\n  - `spatialPoint: object`\n  - `status: 'unknown' | 'queued' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'done' | 'failed'`\n  - `summary: string`\n  - `taskType: 'memory' | 'superrag'`\n  - `title: string`\n  - `type: string`\n  - `updatedAt: string`\n  - `containerTags?: string[]`\n  - `url?: string`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst document = await client.documents.get('id');\n\nconsole.log(document);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/documents/$ID \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY"',
      },
      python: {
        method: 'documents.get',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\ndocument = client.documents.get(\n    "id",\n)\nprint(document.id)',
      },
      typescript: {
        method: 'client.documents.get',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst document = await client.documents.get('id');\n\nconsole.log(document.id);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v3/documents/{id}',
    httpMethod: 'delete',
    summary: 'Delete document by ID or customId',
    description: 'Delete a document by ID or customId',
    stainlessPath: '(resource) documents > (method) delete',
    qualified: 'client.documents.delete',
    params: ['id: string;'],
    markdown:
      "## delete\n\n`client.documents.delete(id: string): void`\n\n**delete** `/v3/documents/{id}`\n\nDelete a document by ID or customId\n\n### Parameters\n\n- `id: string`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nawait client.documents.delete('id')\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/documents/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY"',
      },
      python: {
        method: 'documents.delete',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nclient.documents.delete(\n    "id",\n)',
      },
      typescript: {
        method: 'client.documents.delete',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.documents.delete('id');",
      },
    },
  },
  {
    name: 'delete_bulk',
    endpoint: '/v3/documents/bulk',
    httpMethod: 'delete',
    summary: 'Bulk delete documents',
    description: 'Bulk delete documents by IDs or container tags',
    stainlessPath: '(resource) documents > (method) delete_bulk',
    qualified: 'client.documents.deleteBulk',
    params: ['containerTags?: string[];', 'filepath?: string;', 'ids?: string[];'],
    response:
      '{ deletedCount: number; success: boolean; containerTags?: string[]; errors?: { id: string; error: string; }[]; }',
    markdown:
      "## delete_bulk\n\n`client.documents.deleteBulk(containerTags?: string[], filepath?: string, ids?: string[]): { deletedCount: number; success: boolean; containerTags?: string[]; errors?: object[]; }`\n\n**delete** `/v3/documents/bulk`\n\nBulk delete documents by IDs or container tags\n\n### Parameters\n\n- `containerTags?: string[]`\n  Array of container tags - all documents in these containers will be deleted\n\n- `filepath?: string`\n  Delete documents matching this filepath. Exact match for full paths, prefix match if ending with /\n\n- `ids?: string[]`\n  Array of document IDs to delete (max 100 at once)\n\n### Returns\n\n- `{ deletedCount: number; success: boolean; containerTags?: string[]; errors?: { id: string; error: string; }[]; }`\n  Response for bulk document deletion\n\n  - `deletedCount: number`\n  - `success: boolean`\n  - `containerTags?: string[]`\n  - `errors?: { id: string; error: string; }[]`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.documents.deleteBulk();\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/documents/bulk \\\n    -X DELETE \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY"',
      },
      python: {
        method: 'documents.delete_bulk',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.documents.delete_bulk()\nprint(response.deleted_count)',
      },
      typescript: {
        method: 'client.documents.deleteBulk',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.documents.deleteBulk();\n\nconsole.log(response.deletedCount);",
      },
    },
  },
  {
    name: 'upload_file',
    endpoint: '/v3/documents/file',
    httpMethod: 'post',
    summary: 'Upload a file',
    description: 'Upload a file to be processed',
    stainlessPath: '(resource) documents > (method) upload_file',
    qualified: 'client.documents.uploadFile',
    params: [
      'file: string;',
      'containerTag?: string;',
      'containerTags?: string;',
      'filepath?: string;',
      'fileType?: string;',
      'metadata?: string;',
      'mimeType?: string;',
      "taskType?: 'memory' | 'superrag';",
      'useAdvancedProcessing?: string;',
    ],
    response: '{ id: string; status: string; }',
    markdown:
      "## upload_file\n\n`client.documents.uploadFile(file: string, containerTag?: string, containerTags?: string, filepath?: string, fileType?: string, metadata?: string, mimeType?: string, taskType?: 'memory' | 'superrag', useAdvancedProcessing?: string): { id: string; status: string; }`\n\n**post** `/v3/documents/file`\n\nUpload a file to be processed\n\n### Parameters\n\n- `file: string`\n  File to upload and process\n\n- `containerTag?: string`\n  Optional container tag (e.g., 'user_123'). Use this for a single tag.\n\n- `containerTags?: string`\n  Optional container tags. Can be either a JSON string of an array (e.g., '[\"user_123\", \"project_123\"]') or a single string (e.g., 'user_123'). Single strings will be automatically converted to an array.\n\n- `filepath?: string`\n  Optional file path for the uploaded file (e.g., '/documents/reports/file.pdf'). Used by supermemoryfs to map documents to filesystem paths.\n\n- `fileType?: string`\n  Optional file type override to force specific processing behavior. Valid values: text, pdf, tweet, google_doc, google_slide, google_sheet, image, video, notion_doc, webpage, onedrive\n\n- `metadata?: string`\n  Optional metadata for the document as a JSON string. This is used to store additional information about the document. Keys must be strings and values can be strings, numbers, or booleans.\n\n- `mimeType?: string`\n  Required when fileType is 'image' or 'video'. Specifies the exact MIME type to use (e.g., 'image/png', 'image/jpeg', 'video/mp4', 'video/webm')\n\n- `taskType?: 'memory' | 'superrag'`\n  Task type: \"memory\" (default) for full context layer with SuperRAG built in, \"superrag\" for managed RAG as a service.\n\n- `useAdvancedProcessing?: string`\n  DEPRECATED: This field is no longer used. Advanced PDF processing is now automatic with our hybrid Mistral OCR + Gemini pipeline. This parameter will be accepted but ignored for backwards compatibility.\n\n### Returns\n\n- `{ id: string; status: string; }`\n\n  - `id: string`\n  - `status: string`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.documents.uploadFile({ file: fs.createReadStream('path/to/file') });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/documents/file \\\n    -H \'Content-Type: multipart/form-data\' \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY" \\\n    -F \'file=@/path/to/file\' \\\n    -F containerTag=user \\\n    -F containerTags=\'["user_123", "project_123"]\' \\\n    -F filepath=/documents/reports/file.pdf \\\n    -F fileType=image \\\n    -F metadata=\'{"category": "technology", "isPublic": true, "readingTime": 5}\' \\\n    -F taskType=memory \\\n    -F useAdvancedProcessing=true',
      },
      python: {
        method: 'documents.upload_file',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.documents.upload_file(\n    file=b"Example data",\n)\nprint(response.id)',
      },
      typescript: {
        method: 'client.documents.uploadFile',
        example:
          "import fs from 'fs';\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.documents.uploadFile({ file: fs.createReadStream('path/to/file') });\n\nconsole.log(response.id);",
      },
    },
  },
  {
    name: 'batch_add',
    endpoint: '/v3/documents/batch',
    httpMethod: 'post',
    summary: 'Batch add documents',
    description:
      'Add multiple documents in a single request. Each document can have any content type (text, url, file, etc.) and metadata',
    stainlessPath: '(resource) documents > (method) batch_add',
    qualified: 'client.documents.batchAdd',
    params: [
      "documents: { content: string; containerTag?: string; containerTags?: string[]; customId?: string; filepath?: string; metadata?: object; taskType?: 'memory' | 'superrag'; }[] | string[];",
      'containerTag?: string;',
      'containerTags?: string[];',
      'content?: null;',
      'filepath?: string;',
      'metadata?: object;',
      "taskType?: 'memory' | 'superrag';",
    ],
    response:
      '{ failed: number; results: { id: string; status: string; details?: string; error?: string; }[]; success: number; }',
    markdown:
      "## batch_add\n\n`client.documents.batchAdd(documents: { content: string; containerTag?: string; containerTags?: string[]; customId?: string; filepath?: string; metadata?: object; taskType?: 'memory' | 'superrag'; }[] | string[], containerTag?: string, containerTags?: string[], content?: null, filepath?: string, metadata?: object, taskType?: 'memory' | 'superrag'): { failed: number; results: object[]; success: number; }`\n\n**post** `/v3/documents/batch`\n\nAdd multiple documents in a single request. Each document can have any content type (text, url, file, etc.) and metadata\n\n### Parameters\n\n- `documents: { content: string; containerTag?: string; containerTags?: string[]; customId?: string; filepath?: string; metadata?: object; taskType?: 'memory' | 'superrag'; }[] | string[]`\n\n- `containerTag?: string`\n  Optional tag this document should be containerized by. This can be an ID for your user, a project ID, or any other identifier you wish to use to group documents.\n\n- `containerTags?: string[]`\n  (DEPRECATED: Use containerTag instead) Optional tags this document should be containerized by. This can be an ID for your user, a project ID, or any other identifier you wish to use to group documents.\n\n- `content?: null`\n\n- `filepath?: string`\n  Optional file path for the document (e.g., '/documents/reports/file.pdf'). Used by supermemoryfs to map documents to filesystem paths.\n\n- `metadata?: object`\n  Optional metadata for the document. This is used to store additional information about the document. You can use this to store any additional information you need about the document. Metadata can be filtered through. Keys must be strings and are case sensitive. Values can be strings, numbers, or booleans. You cannot nest objects.\n\n- `taskType?: 'memory' | 'superrag'`\n  Task type: \"memory\" (default) for full context layer with SuperRAG built in, \"superrag\" for managed RAG as a service.\n\n### Returns\n\n- `{ failed: number; results: { id: string; status: string; details?: string; error?: string; }[]; success: number; }`\n\n  - `failed: number`\n  - `results: { id: string; status: string; details?: string; error?: string; }[]`\n  - `success: number`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.documents.batchAdd({ documents: [{ content: 'This is a detailed article about machine learning concepts...' }] });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/documents/batch \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY" \\\n    -d \'{\n          "documents": [\n            {\n              "content": "This is a detailed article about machine learning concepts..."\n            }\n          ],\n          "containerTag": "user_123",\n          "containerTags": [\n            "user_123",\n            "project_123"\n          ],\n          "filepath": "/documents/reports/file.pdf",\n          "metadata": {\n            "category": "technology",\n            "isPublic": true,\n            "readingTime": 5,\n            "source": "web",\n            "tag_1": "ai",\n            "tag_2": "machine-learning"\n          },\n          "taskType": "memory"\n        }\'',
      },
      python: {
        method: 'documents.batch_add',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.documents.batch_add(\n    documents=[{\n        "content": "This is a detailed article about machine learning concepts..."\n    }],\n)\nprint(response.failed)',
      },
      typescript: {
        method: 'client.documents.batchAdd',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.documents.batchAdd({\n  documents: [{ content: 'This is a detailed article about machine learning concepts...' }],\n});\n\nconsole.log(response.failed);",
      },
    },
  },
  {
    name: 'list_processing',
    endpoint: '/v3/documents/processing',
    httpMethod: 'get',
    summary: 'Get processing documents',
    description: 'Get documents that are currently being processed',
    stainlessPath: '(resource) documents > (method) list_processing',
    qualified: 'client.documents.listProcessing',
    response:
      "{ documents: { id: string; createdAt: string; customId: string; metadata: string | number | boolean | object | object[]; status: 'unknown' | 'queued' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'done' | 'failed'; title: string; type: string; updatedAt: string; containerTags?: string[]; }[]; totalCount: number; }",
    markdown:
      "## list_processing\n\n`client.documents.listProcessing(): { documents: object[]; totalCount: number; }`\n\n**get** `/v3/documents/processing`\n\nGet documents that are currently being processed\n\n### Returns\n\n- `{ documents: { id: string; createdAt: string; customId: string; metadata: string | number | boolean | object | object[]; status: 'unknown' | 'queued' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'done' | 'failed'; title: string; type: string; updatedAt: string; containerTags?: string[]; }[]; totalCount: number; }`\n  List of documents currently being processed\n\n  - `documents: { id: string; createdAt: string; customId: string; metadata: string | number | boolean | object | object[]; status: 'unknown' | 'queued' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'done' | 'failed'; title: string; type: string; updatedAt: string; containerTags?: string[]; }[]`\n  - `totalCount: number`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.documents.listProcessing();\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/documents/processing \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY"',
      },
      python: {
        method: 'documents.list_processing',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.documents.list_processing()\nprint(response.documents)',
      },
      typescript: {
        method: 'client.documents.listProcessing',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.documents.listProcessing();\n\nconsole.log(response.documents);",
      },
    },
  },
  {
    name: 'execute',
    endpoint: '/v3/search',
    httpMethod: 'post',
    summary: 'Search documents',
    description: 'Search memories with advanced filtering',
    stainlessPath: '(resource) search > (method) execute',
    qualified: 'client.search.execute',
    params: [
      'q: string;',
      'categoriesFilter?: string[];',
      'chunkThreshold?: number;',
      'containerTag?: string;',
      'containerTags?: string[];',
      'docId?: string;',
      'documentThreshold?: number;',
      'filepath?: string;',
      "filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; };",
      'includeFullDocs?: boolean;',
      'includeSummary?: boolean;',
      'limit?: number;',
      'onlyMatchingChunks?: boolean;',
      'rerank?: boolean;',
      'rewriteQuery?: boolean;',
    ],
    response:
      '{ results: { chunks: { content: string; isRelevant: boolean; score: number; }[]; createdAt: string; documentId: string; metadata: object; score: number; title: string; type: string; updatedAt: string; content?: string; summary?: string; }[]; timing: number; total: number; }',
    markdown:
      "## execute\n\n`client.search.execute(q: string, categoriesFilter?: string[], chunkThreshold?: number, containerTag?: string, containerTags?: string[], docId?: string, documentThreshold?: number, filepath?: string, filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }, includeFullDocs?: boolean, includeSummary?: boolean, limit?: number, onlyMatchingChunks?: boolean, rerank?: boolean, rewriteQuery?: boolean): { results: object[]; timing: number; total: number; }`\n\n**post** `/v3/search`\n\nSearch memories with advanced filtering\n\n### Parameters\n\n- `q: string`\n  Search query string\n\n- `categoriesFilter?: string[]`\n  DEPRECATED: Optional category filters\n\n- `chunkThreshold?: number`\n  Threshold / sensitivity for chunk selection. 0 is least sensitive (returns most chunks, more results), 1 is most sensitive (returns lesser chunks, accurate results)\n\n- `containerTag?: string`\n  Optional single container tag. Use this or containerTags.\n\n- `containerTags?: string[]`\n  Optional tags this search should be containerized by. This can be an ID for your user, a project ID, or any other identifier you wish to use to filter documents.\n\n- `docId?: string`\n  Optional document ID to search within. You can use this to find chunks in a very large document.\n\n- `documentThreshold?: number`\n  DEPRECATED: This field is no longer used in v3 search. The search now uses chunkThreshold only. This parameter will be ignored.\n\n- `filepath?: string`\n  Filter search results by filepath. Exact match for full paths, prefix match if ending with /\n\n- `filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; }`\n  Optional filters to apply to the search. Can be a JSON string or Query object.\n\n- `includeFullDocs?: boolean`\n  If true, include full document in the response. This is helpful if you want a chatbot to know the full context of the document. \n\n- `includeSummary?: boolean`\n  If true, include document summary in the response. This is helpful if you want a chatbot to know the full context of the document. \n\n- `limit?: number`\n  Maximum number of results to return\n\n- `onlyMatchingChunks?: boolean`\n  If true, only return matching chunks without context. Normally, we send the previous and next chunk to provide more context for LLMs. If you only want the matching chunk, set this to true.\n\n- `rerank?: boolean`\n  If true, rerank the results based on the query. This is helpful if you want to ensure the most relevant results are returned.\n\n- `rewriteQuery?: boolean`\n  If true, rewrites the query to make it easier to find documents. This increases the latency by about 400ms\n\n### Returns\n\n- `{ results: { chunks: { content: string; isRelevant: boolean; score: number; }[]; createdAt: string; documentId: string; metadata: object; score: number; title: string; type: string; updatedAt: string; content?: string; summary?: string; }[]; timing: number; total: number; }`\n\n  - `results: { chunks: { content: string; isRelevant: boolean; score: number; }[]; createdAt: string; documentId: string; metadata: object; score: number; title: string; type: string; updatedAt: string; content?: string; summary?: string; }[]`\n  - `timing: number`\n  - `total: number`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.search.execute({ q: 'machine learning concepts' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/search \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY" \\\n    -d \'{\n          "q": "machine learning concepts",\n          "chunkThreshold": 0.5,\n          "containerTag": "user_123",\n          "containerTags": [\n            "user_123"\n          ],\n          "filepath": "/docs/",\n          "limit": 10\n        }\'',
      },
      python: {
        method: 'search.execute',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.search.execute(\n    q="machine learning concepts",\n)\nprint(response.results)',
      },
      typescript: {
        method: 'client.search.execute',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.search.execute({ q: 'machine learning concepts' });\n\nconsole.log(response.results);",
      },
    },
  },
  {
    name: 'documents',
    endpoint: '/v3/search',
    httpMethod: 'post',
    summary: 'Search documents',
    description: 'Search memories with advanced filtering',
    stainlessPath: '(resource) search > (method) documents',
    qualified: 'client.search.documents',
    params: [
      'q: string;',
      'categoriesFilter?: string[];',
      'chunkThreshold?: number;',
      'containerTag?: string;',
      'containerTags?: string[];',
      'docId?: string;',
      'documentThreshold?: number;',
      'filepath?: string;',
      "filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; };",
      'includeFullDocs?: boolean;',
      'includeSummary?: boolean;',
      'limit?: number;',
      'onlyMatchingChunks?: boolean;',
      'rerank?: boolean;',
      'rewriteQuery?: boolean;',
    ],
    response:
      '{ results: { chunks: { content: string; isRelevant: boolean; score: number; }[]; createdAt: string; documentId: string; metadata: object; score: number; title: string; type: string; updatedAt: string; content?: string; summary?: string; }[]; timing: number; total: number; }',
    markdown:
      "## documents\n\n`client.search.documents(q: string, categoriesFilter?: string[], chunkThreshold?: number, containerTag?: string, containerTags?: string[], docId?: string, documentThreshold?: number, filepath?: string, filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }, includeFullDocs?: boolean, includeSummary?: boolean, limit?: number, onlyMatchingChunks?: boolean, rerank?: boolean, rewriteQuery?: boolean): { results: object[]; timing: number; total: number; }`\n\n**post** `/v3/search`\n\nSearch memories with advanced filtering\n\n### Parameters\n\n- `q: string`\n  Search query string\n\n- `categoriesFilter?: string[]`\n  DEPRECATED: Optional category filters\n\n- `chunkThreshold?: number`\n  Threshold / sensitivity for chunk selection. 0 is least sensitive (returns most chunks, more results), 1 is most sensitive (returns lesser chunks, accurate results)\n\n- `containerTag?: string`\n  Optional single container tag. Use this or containerTags.\n\n- `containerTags?: string[]`\n  Optional tags this search should be containerized by. This can be an ID for your user, a project ID, or any other identifier you wish to use to filter documents.\n\n- `docId?: string`\n  Optional document ID to search within. You can use this to find chunks in a very large document.\n\n- `documentThreshold?: number`\n  DEPRECATED: This field is no longer used in v3 search. The search now uses chunkThreshold only. This parameter will be ignored.\n\n- `filepath?: string`\n  Filter search results by filepath. Exact match for full paths, prefix match if ending with /\n\n- `filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; }`\n  Optional filters to apply to the search. Can be a JSON string or Query object.\n\n- `includeFullDocs?: boolean`\n  If true, include full document in the response. This is helpful if you want a chatbot to know the full context of the document. \n\n- `includeSummary?: boolean`\n  If true, include document summary in the response. This is helpful if you want a chatbot to know the full context of the document. \n\n- `limit?: number`\n  Maximum number of results to return\n\n- `onlyMatchingChunks?: boolean`\n  If true, only return matching chunks without context. Normally, we send the previous and next chunk to provide more context for LLMs. If you only want the matching chunk, set this to true.\n\n- `rerank?: boolean`\n  If true, rerank the results based on the query. This is helpful if you want to ensure the most relevant results are returned.\n\n- `rewriteQuery?: boolean`\n  If true, rewrites the query to make it easier to find documents. This increases the latency by about 400ms\n\n### Returns\n\n- `{ results: { chunks: { content: string; isRelevant: boolean; score: number; }[]; createdAt: string; documentId: string; metadata: object; score: number; title: string; type: string; updatedAt: string; content?: string; summary?: string; }[]; timing: number; total: number; }`\n\n  - `results: { chunks: { content: string; isRelevant: boolean; score: number; }[]; createdAt: string; documentId: string; metadata: object; score: number; title: string; type: string; updatedAt: string; content?: string; summary?: string; }[]`\n  - `timing: number`\n  - `total: number`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.search.documents({ q: 'machine learning concepts' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/search \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY" \\\n    -d \'{\n          "q": "machine learning concepts",\n          "chunkThreshold": 0.5,\n          "containerTag": "user_123",\n          "containerTags": [\n            "user_123"\n          ],\n          "filepath": "/docs/",\n          "limit": 10\n        }\'',
      },
      python: {
        method: 'search.documents',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.search.documents(\n    q="machine learning concepts",\n)\nprint(response.results)',
      },
      typescript: {
        method: 'client.search.documents',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.search.documents({ q: 'machine learning concepts' });\n\nconsole.log(response.results);",
      },
    },
  },
  {
    name: 'memories',
    endpoint: '/v4/search',
    httpMethod: 'post',
    summary: 'Search memory entries',
    description: 'Search memory entries - Low latency for conversational',
    stainlessPath: '(resource) search > (method) memories',
    qualified: 'client.search.memories',
    params: [
      'q: string;',
      'aggregate?: boolean;',
      'containerTag?: string;',
      'filepath?: string;',
      "filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; };",
      'include?: { chunks?: boolean; documents?: boolean; forgottenMemories?: boolean; relatedMemories?: boolean; summaries?: boolean; };',
      'limit?: number;',
      'rerank?: boolean;',
      'rewriteQuery?: boolean;',
      "searchMode?: 'memories' | 'hybrid' | 'documents';",
      'threshold?: number;',
    ],
    response:
      '{ results: { id: string; metadata: object; similarity: number; updatedAt: string; chunk?: string; chunks?: { content: string; documentId: string; position: number; score: number; }[]; context?: { children?: object[]; parents?: object[]; }; documents?: { id: string; createdAt: string; updatedAt: string; metadata?: object; summary?: string; title?: string; type?: string; }[]; filepath?: string; isAggregated?: boolean; memory?: string; version?: number; }[]; timing: number; total: number; }',
    markdown:
      "## memories\n\n`client.search.memories(q: string, aggregate?: boolean, containerTag?: string, filepath?: string, filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }, include?: { chunks?: boolean; documents?: boolean; forgottenMemories?: boolean; relatedMemories?: boolean; summaries?: boolean; }, limit?: number, rerank?: boolean, rewriteQuery?: boolean, searchMode?: 'memories' | 'hybrid' | 'documents', threshold?: number): { results: object[]; timing: number; total: number; }`\n\n**post** `/v4/search`\n\nSearch memory entries - Low latency for conversational\n\n### Parameters\n\n- `q: string`\n  Search query string\n\n- `aggregate?: boolean`\n  If true, aggregates information from multiple memories to create new synthesized memories. The result will be a mix of aggregated and non-aggregated memories, reranked by relevance to the query. Works in conjunction with reranking.\n\n- `containerTag?: string`\n  Optional tag this search should be containerized by. This can be an ID for your user, a project ID, or any other identifier you wish to use to filter memories.\n\n- `filepath?: string`\n  Filter search results by filepath. Exact match for full paths, prefix match if ending with /\n\n- `filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; }`\n  Optional filters to apply to the search. Can be a JSON string or Query object.\n\n- `include?: { chunks?: boolean; documents?: boolean; forgottenMemories?: boolean; relatedMemories?: boolean; summaries?: boolean; }`\n  - `chunks?: boolean`\n    DEPRECATED: Use searchMode='hybrid' instead. If true, automatically switches to hybrid mode. This field is kept for backward compatibility only.\n  - `documents?: boolean`\n  - `forgottenMemories?: boolean`\n    If true, include forgotten memories in search results. Forgotten memories are memories that have been explicitly forgotten or have passed their expiration date.\n  - `relatedMemories?: boolean`\n  - `summaries?: boolean`\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `rerank?: boolean`\n  If true, rerank the results based on the query. This is helpful if you want to ensure the most relevant results are returned.\n\n- `rewriteQuery?: boolean`\n  If true, rewrites the query to make it easier to find documents. This increases the latency by about 400ms\n\n- `searchMode?: 'memories' | 'hybrid' | 'documents'`\n  Search mode. 'memories' searches only memory entries (default). 'hybrid' searches both memories and document chunks. 'documents' searches only document chunks.\n\n- `threshold?: number`\n  Threshold / sensitivity for memories selection. 0 is least sensitive (returns most memories, more results), 1 is most sensitive (returns lesser memories, accurate results)\n\n### Returns\n\n- `{ results: { id: string; metadata: object; similarity: number; updatedAt: string; chunk?: string; chunks?: { content: string; documentId: string; position: number; score: number; }[]; context?: { children?: object[]; parents?: object[]; }; documents?: { id: string; createdAt: string; updatedAt: string; metadata?: object; summary?: string; title?: string; type?: string; }[]; filepath?: string; isAggregated?: boolean; memory?: string; version?: number; }[]; timing: number; total: number; }`\n\n  - `results: { id: string; metadata: object; similarity: number; updatedAt: string; chunk?: string; chunks?: { content: string; documentId: string; position: number; score: number; }[]; context?: { children?: { memory: string; relation: 'updates' | 'extends' | 'derives'; updatedAt: string; metadata?: object; version?: number; }[]; parents?: { memory: string; relation: 'updates' | 'extends' | 'derives'; updatedAt: string; metadata?: object; version?: number; }[]; }; documents?: { id: string; createdAt: string; updatedAt: string; metadata?: object; summary?: string; title?: string; type?: string; }[]; filepath?: string; isAggregated?: boolean; memory?: string; version?: number; }[]`\n  - `timing: number`\n  - `total: number`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.search.memories({ q: 'machine learning concepts' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v4/search \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY" \\\n    -d \'{\n          "q": "machine learning concepts",\n          "containerTag": "user_123",\n          "filepath": "/docs/",\n          "limit": 10,\n          "searchMode": "memories",\n          "threshold": 0.5\n        }\'',
      },
      python: {
        method: 'search.memories',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.search.memories(\n    q="machine learning concepts",\n)\nprint(response.results)',
      },
      typescript: {
        method: 'client.search.memories',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.search.memories({ q: 'machine learning concepts' });\n\nconsole.log(response.results);",
      },
    },
  },
  {
    name: 'get',
    endpoint: '/v3/settings',
    httpMethod: 'get',
    summary: 'Get settings',
    description: 'Get settings for an organization',
    stainlessPath: '(resource) settings > (method) get',
    qualified: 'client.settings.get',
    response:
      '{ chunkSize?: number; excludeItems?: string | number | boolean | object | object[]; filterPrompt?: string; githubClientId?: string; githubClientSecret?: string; githubCustomKeyEnabled?: boolean; googleDriveClientId?: string; googleDriveClientSecret?: string; googleDriveCustomKeyEnabled?: boolean; includeItems?: string | number | boolean | object | object[]; notionClientId?: string; notionClientSecret?: string; notionCustomKeyEnabled?: boolean; onedriveClientId?: string; onedriveClientSecret?: string; onedriveCustomKeyEnabled?: boolean; shouldLLMFilter?: boolean; }',
    markdown:
      "## get\n\n`client.settings.get(): { chunkSize?: number; excludeItems?: string | number | boolean | object | object[]; filterPrompt?: string; githubClientId?: string; githubClientSecret?: string; githubCustomKeyEnabled?: boolean; googleDriveClientId?: string; googleDriveClientSecret?: string; googleDriveCustomKeyEnabled?: boolean; includeItems?: string | number | boolean | object | object[]; notionClientId?: string; notionClientSecret?: string; notionCustomKeyEnabled?: boolean; onedriveClientId?: string; onedriveClientSecret?: string; onedriveCustomKeyEnabled?: boolean; shouldLLMFilter?: boolean; }`\n\n**get** `/v3/settings`\n\nGet settings for an organization\n\n### Returns\n\n- `{ chunkSize?: number; excludeItems?: string | number | boolean | object | object[]; filterPrompt?: string; githubClientId?: string; githubClientSecret?: string; githubCustomKeyEnabled?: boolean; googleDriveClientId?: string; googleDriveClientSecret?: string; googleDriveCustomKeyEnabled?: boolean; includeItems?: string | number | boolean | object | object[]; notionClientId?: string; notionClientSecret?: string; notionCustomKeyEnabled?: boolean; onedriveClientId?: string; onedriveClientSecret?: string; onedriveCustomKeyEnabled?: boolean; shouldLLMFilter?: boolean; }`\n\n  - `chunkSize?: number`\n  - `excludeItems?: string | number | boolean | object | object[]`\n  - `filterPrompt?: string`\n  - `githubClientId?: string`\n  - `githubClientSecret?: string`\n  - `githubCustomKeyEnabled?: boolean`\n  - `googleDriveClientId?: string`\n  - `googleDriveClientSecret?: string`\n  - `googleDriveCustomKeyEnabled?: boolean`\n  - `includeItems?: string | number | boolean | object | object[]`\n  - `notionClientId?: string`\n  - `notionClientSecret?: string`\n  - `notionCustomKeyEnabled?: boolean`\n  - `onedriveClientId?: string`\n  - `onedriveClientSecret?: string`\n  - `onedriveCustomKeyEnabled?: boolean`\n  - `shouldLLMFilter?: boolean`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst setting = await client.settings.get();\n\nconsole.log(setting);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/settings \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY"',
      },
      python: {
        method: 'settings.get',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nsetting = client.settings.get()\nprint(setting.chunk_size)',
      },
      typescript: {
        method: 'client.settings.get',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst setting = await client.settings.get();\n\nconsole.log(setting.chunkSize);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v3/settings',
    httpMethod: 'patch',
    summary: 'Update settings',
    description: 'Update settings for an organization',
    stainlessPath: '(resource) settings > (method) update',
    qualified: 'client.settings.update',
    params: [
      'chunkSize?: number;',
      'excludeItems?: string | number | boolean | object | object[];',
      'filterPrompt?: string;',
      'githubClientId?: string;',
      'githubClientSecret?: string;',
      'githubCustomKeyEnabled?: boolean;',
      'googleDriveClientId?: string;',
      'googleDriveClientSecret?: string;',
      'googleDriveCustomKeyEnabled?: boolean;',
      'includeItems?: string | number | boolean | object | object[];',
      'notionClientId?: string;',
      'notionClientSecret?: string;',
      'notionCustomKeyEnabled?: boolean;',
      'onedriveClientId?: string;',
      'onedriveClientSecret?: string;',
      'onedriveCustomKeyEnabled?: boolean;',
      'shouldLLMFilter?: boolean;',
    ],
    response:
      '{ orgId: string; orgSlug: string; updated: { chunkSize?: number; excludeItems?: string | number | boolean | object | object[]; filterPrompt?: string; githubClientId?: string; githubClientSecret?: string; githubCustomKeyEnabled?: boolean; googleDriveClientId?: string; googleDriveClientSecret?: string; googleDriveCustomKeyEnabled?: boolean; includeItems?: string | number | boolean | object | object[]; notionClientId?: string; notionClientSecret?: string; notionCustomKeyEnabled?: boolean; onedriveClientId?: string; onedriveClientSecret?: string; onedriveCustomKeyEnabled?: boolean; shouldLLMFilter?: boolean; }; }',
    markdown:
      "## update\n\n`client.settings.update(chunkSize?: number, excludeItems?: string | number | boolean | object | object[], filterPrompt?: string, githubClientId?: string, githubClientSecret?: string, githubCustomKeyEnabled?: boolean, googleDriveClientId?: string, googleDriveClientSecret?: string, googleDriveCustomKeyEnabled?: boolean, includeItems?: string | number | boolean | object | object[], notionClientId?: string, notionClientSecret?: string, notionCustomKeyEnabled?: boolean, onedriveClientId?: string, onedriveClientSecret?: string, onedriveCustomKeyEnabled?: boolean, shouldLLMFilter?: boolean): { orgId: string; orgSlug: string; updated: object; }`\n\n**patch** `/v3/settings`\n\nUpdate settings for an organization\n\n### Parameters\n\n- `chunkSize?: number`\n\n- `excludeItems?: string | number | boolean | object | object[]`\n\n- `filterPrompt?: string`\n\n- `githubClientId?: string`\n\n- `githubClientSecret?: string`\n\n- `githubCustomKeyEnabled?: boolean`\n\n- `googleDriveClientId?: string`\n\n- `googleDriveClientSecret?: string`\n\n- `googleDriveCustomKeyEnabled?: boolean`\n\n- `includeItems?: string | number | boolean | object | object[]`\n\n- `notionClientId?: string`\n\n- `notionClientSecret?: string`\n\n- `notionCustomKeyEnabled?: boolean`\n\n- `onedriveClientId?: string`\n\n- `onedriveClientSecret?: string`\n\n- `onedriveCustomKeyEnabled?: boolean`\n\n- `shouldLLMFilter?: boolean`\n\n### Returns\n\n- `{ orgId: string; orgSlug: string; updated: { chunkSize?: number; excludeItems?: string | number | boolean | object | object[]; filterPrompt?: string; githubClientId?: string; githubClientSecret?: string; githubCustomKeyEnabled?: boolean; googleDriveClientId?: string; googleDriveClientSecret?: string; googleDriveCustomKeyEnabled?: boolean; includeItems?: string | number | boolean | object | object[]; notionClientId?: string; notionClientSecret?: string; notionCustomKeyEnabled?: boolean; onedriveClientId?: string; onedriveClientSecret?: string; onedriveCustomKeyEnabled?: boolean; shouldLLMFilter?: boolean; }; }`\n\n  - `orgId: string`\n  - `orgSlug: string`\n  - `updated: { chunkSize?: number; excludeItems?: string | number | boolean | object | object[]; filterPrompt?: string; githubClientId?: string; githubClientSecret?: string; githubCustomKeyEnabled?: boolean; googleDriveClientId?: string; googleDriveClientSecret?: string; googleDriveCustomKeyEnabled?: boolean; includeItems?: string | number | boolean | object | object[]; notionClientId?: string; notionClientSecret?: string; notionCustomKeyEnabled?: boolean; onedriveClientId?: string; onedriveClientSecret?: string; onedriveCustomKeyEnabled?: boolean; shouldLLMFilter?: boolean; }`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst setting = await client.settings.update();\n\nconsole.log(setting);\n```",
    perLanguage: {
      http: {
        example:
          "curl https://api.supermemory.ai/v3/settings \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $SUPERMEMORY_API_KEY\" \\\n    -d '{}'",
      },
      python: {
        method: 'settings.update',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nsetting = client.settings.update()\nprint(setting.org_id)',
      },
      typescript: {
        method: 'client.settings.update',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst setting = await client.settings.update();\n\nconsole.log(setting.orgId);",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v3/connections/{provider}',
    httpMethod: 'post',
    summary: 'Create connection',
    description: 'Initialize connection and get authorization URL',
    stainlessPath: '(resource) connections > (method) create',
    qualified: 'client.connections.create',
    params: [
      "provider: 'notion' | 'google-drive' | 'onedrive' | 'gmail' | 'github' | 'web-crawler' | 's3';",
      'containerTag?: string;',
      'containerTags?: string[];',
      'documentLimit?: number;',
      'metadata?: object;',
      'redirectUrl?: string;',
    ],
    response: '{ id: string; authLink: string; expiresIn: string; redirectsTo?: string; }',
    markdown:
      "## create\n\n`client.connections.create(provider: 'notion' | 'google-drive' | 'onedrive' | 'gmail' | 'github' | 'web-crawler' | 's3', containerTag?: string, containerTags?: string[], documentLimit?: number, metadata?: object, redirectUrl?: string): { id: string; authLink: string; expiresIn: string; redirectsTo?: string; }`\n\n**post** `/v3/connections/{provider}`\n\nInitialize connection and get authorization URL\n\n### Parameters\n\n- `provider: 'notion' | 'google-drive' | 'onedrive' | 'gmail' | 'github' | 'web-crawler' | 's3'`\n\n- `containerTag?: string`\n\n- `containerTags?: string[]`\n\n- `documentLimit?: number`\n\n- `metadata?: object`\n\n- `redirectUrl?: string`\n\n### Returns\n\n- `{ id: string; authLink: string; expiresIn: string; redirectsTo?: string; }`\n\n  - `id: string`\n  - `authLink: string`\n  - `expiresIn: string`\n  - `redirectsTo?: string`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst connection = await client.connections.create('notion');\n\nconsole.log(connection);\n```",
    perLanguage: {
      http: {
        example:
          "curl https://api.supermemory.ai/v3/connections/$PROVIDER \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $SUPERMEMORY_API_KEY\" \\\n    -d '{}'",
      },
      python: {
        method: 'connections.create',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nconnection = client.connections.create(\n    provider="notion",\n)\nprint(connection.id)',
      },
      typescript: {
        method: 'client.connections.create',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst connection = await client.connections.create('notion');\n\nconsole.log(connection.id);",
      },
    },
  },
  {
    name: 'get_by_id',
    endpoint: '/v3/connections/{connectionId}',
    httpMethod: 'get',
    summary: 'Get connection (by id)',
    description: 'Get connection details with id',
    stainlessPath: '(resource) connections > (method) get_by_id',
    qualified: 'client.connections.getByID',
    params: ['connectionId: string;'],
    response:
      '{ id: string; createdAt: string; provider: string; containerTags?: string[]; documentLimit?: number; email?: string; expiresAt?: string; metadata?: object; }',
    markdown:
      "## get_by_id\n\n`client.connections.getByID(connectionId: string): { id: string; createdAt: string; provider: string; containerTags?: string[]; documentLimit?: number; email?: string; expiresAt?: string; metadata?: object; }`\n\n**get** `/v3/connections/{connectionId}`\n\nGet connection details with id\n\n### Parameters\n\n- `connectionId: string`\n\n### Returns\n\n- `{ id: string; createdAt: string; provider: string; containerTags?: string[]; documentLimit?: number; email?: string; expiresAt?: string; metadata?: object; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `provider: string`\n  - `containerTags?: string[]`\n  - `documentLimit?: number`\n  - `email?: string`\n  - `expiresAt?: string`\n  - `metadata?: object`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.connections.getByID('connectionId');\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/connections/$CONNECTION_ID \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY"',
      },
      python: {
        method: 'connections.get_by_id',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.connections.get_by_id(\n    "connectionId",\n)\nprint(response.id)',
      },
      typescript: {
        method: 'client.connections.getByID',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.connections.getByID('connectionId');\n\nconsole.log(response.id);",
      },
    },
  },
  {
    name: 'get_by_tag',
    endpoint: '/v3/connections/{provider}/connection',
    httpMethod: 'post',
    summary: 'Get connection (by provider)',
    description: 'Get connection details with provider and container tags',
    stainlessPath: '(resource) connections > (method) get_by_tag',
    qualified: 'client.connections.getByTag',
    params: [
      "provider: 'notion' | 'google-drive' | 'onedrive' | 'gmail' | 'github' | 'web-crawler' | 's3';",
      'containerTags: string[];',
    ],
    response:
      '{ id: string; createdAt: string; provider: string; containerTags?: string[]; documentLimit?: number; email?: string; expiresAt?: string; metadata?: object; }',
    markdown:
      "## get_by_tag\n\n`client.connections.getByTag(provider: 'notion' | 'google-drive' | 'onedrive' | 'gmail' | 'github' | 'web-crawler' | 's3', containerTags: string[]): { id: string; createdAt: string; provider: string; containerTags?: string[]; documentLimit?: number; email?: string; expiresAt?: string; metadata?: object; }`\n\n**post** `/v3/connections/{provider}/connection`\n\nGet connection details with provider and container tags\n\n### Parameters\n\n- `provider: 'notion' | 'google-drive' | 'onedrive' | 'gmail' | 'github' | 'web-crawler' | 's3'`\n\n- `containerTags: string[]`\n  Comma-separated list of container tags to filter connection by\n\n### Returns\n\n- `{ id: string; createdAt: string; provider: string; containerTags?: string[]; documentLimit?: number; email?: string; expiresAt?: string; metadata?: object; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `provider: string`\n  - `containerTags?: string[]`\n  - `documentLimit?: number`\n  - `email?: string`\n  - `expiresAt?: string`\n  - `metadata?: object`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.connections.getByTag('notion', { containerTags: ['user_123', 'project_123'] });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/connections/$PROVIDER/connection \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY" \\\n    -d \'{\n          "containerTags": [\n            "user_123",\n            "project_123"\n          ]\n        }\'',
      },
      python: {
        method: 'connections.get_by_tag',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.connections.get_by_tag(\n    provider="notion",\n    container_tags=["user_123", "project_123"],\n)\nprint(response.id)',
      },
      typescript: {
        method: 'client.connections.getByTag',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.connections.getByTag('notion', {\n  containerTags: ['user_123', 'project_123'],\n});\n\nconsole.log(response.id);",
      },
    },
  },
  {
    name: 'delete_by_id',
    endpoint: '/v3/connections/{connectionId}',
    httpMethod: 'delete',
    summary: 'Delete connection by ID',
    description: 'Delete a specific connection by ID',
    stainlessPath: '(resource) connections > (method) delete_by_id',
    qualified: 'client.connections.deleteByID',
    params: ['connectionId: string;', 'deleteDocuments?: string;'],
    response: '{ id: string; provider: string; }',
    markdown:
      "## delete_by_id\n\n`client.connections.deleteByID(connectionId: string, deleteDocuments?: string): { id: string; provider: string; }`\n\n**delete** `/v3/connections/{connectionId}`\n\nDelete a specific connection by ID\n\n### Parameters\n\n- `connectionId: string`\n\n- `deleteDocuments?: string`\n  Whether to also delete documents imported by this connection. Defaults to true.\n\n### Returns\n\n- `{ id: string; provider: string; }`\n\n  - `id: string`\n  - `provider: string`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.connections.deleteByID('connectionId');\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/connections/$CONNECTION_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY"',
      },
      python: {
        method: 'connections.delete_by_id',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.connections.delete_by_id(\n    connection_id="connectionId",\n)\nprint(response.id)',
      },
      typescript: {
        method: 'client.connections.deleteByID',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.connections.deleteByID('connectionId');\n\nconsole.log(response.id);",
      },
    },
  },
  {
    name: 'delete_by_provider',
    endpoint: '/v3/connections/{provider}',
    httpMethod: 'delete',
    summary: 'Delete connection',
    description: 'Delete connection for a specific provider and container tags',
    stainlessPath: '(resource) connections > (method) delete_by_provider',
    qualified: 'client.connections.deleteByProvider',
    params: [
      "provider: 'notion' | 'google-drive' | 'onedrive' | 'gmail' | 'github' | 'web-crawler' | 's3';",
      'containerTags: string[];',
    ],
    response: '{ id: string; provider: string; }',
    markdown:
      "## delete_by_provider\n\n`client.connections.deleteByProvider(provider: 'notion' | 'google-drive' | 'onedrive' | 'gmail' | 'github' | 'web-crawler' | 's3', containerTags: string[]): { id: string; provider: string; }`\n\n**delete** `/v3/connections/{provider}`\n\nDelete connection for a specific provider and container tags\n\n### Parameters\n\n- `provider: 'notion' | 'google-drive' | 'onedrive' | 'gmail' | 'github' | 'web-crawler' | 's3'`\n\n- `containerTags: string[]`\n  Optional comma-separated list of container tags to filter connections by\n\n### Returns\n\n- `{ id: string; provider: string; }`\n\n  - `id: string`\n  - `provider: string`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.connections.deleteByProvider('notion', { containerTags: ['user_123', 'project_123'] });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/connections/$PROVIDER \\\n    -X DELETE \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY"',
      },
      python: {
        method: 'connections.delete_by_provider',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.connections.delete_by_provider(\n    provider="notion",\n    container_tags=["user_123", "project_123"],\n)\nprint(response.id)',
      },
      typescript: {
        method: 'client.connections.deleteByProvider',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.connections.deleteByProvider('notion', {\n  containerTags: ['user_123', 'project_123'],\n});\n\nconsole.log(response.id);",
      },
    },
  },
  {
    name: 'import',
    endpoint: '/v3/connections/{provider}/import',
    httpMethod: 'post',
    summary: 'Sync connection',
    description: 'Initiate a manual sync of connections',
    stainlessPath: '(resource) connections > (method) import',
    qualified: 'client.connections.import',
    params: [
      "provider: 'notion' | 'google-drive' | 'onedrive' | 'gmail' | 'github' | 'web-crawler' | 's3';",
      'containerTags?: string[];',
    ],
    response: 'string',
    markdown:
      "## import\n\n`client.connections.import(provider: 'notion' | 'google-drive' | 'onedrive' | 'gmail' | 'github' | 'web-crawler' | 's3', containerTags?: string[]): string`\n\n**post** `/v3/connections/{provider}/import`\n\nInitiate a manual sync of connections\n\n### Parameters\n\n- `provider: 'notion' | 'google-drive' | 'onedrive' | 'gmail' | 'github' | 'web-crawler' | 's3'`\n\n- `containerTags?: string[]`\n  Optional comma-separated list of container tags to filter connections by\n\n### Returns\n\n- `string`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.connections.import('notion');\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/connections/$PROVIDER/import \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY" \\\n    -d \'{\n          "containerTags": [\n            "user_123",\n            "project_123"\n          ]\n        }\'',
      },
      python: {
        method: 'connections.import_',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.connections.import_(\n    provider="notion",\n)\nprint(response)',
      },
      typescript: {
        method: 'client.connections.import',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.connections.import('notion');\n\nconsole.log(response);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v3/connections/list',
    httpMethod: 'post',
    summary: 'List connections',
    description: 'List all connections',
    stainlessPath: '(resource) connections > (method) list',
    qualified: 'client.connections.list',
    params: ['containerTags?: string[];'],
    response:
      '{ id: string; createdAt: string; provider: string; containerTags?: string[]; documentLimit?: number; email?: string; expiresAt?: string; metadata?: object; }[]',
    markdown:
      "## list\n\n`client.connections.list(containerTags?: string[]): { id: string; createdAt: string; provider: string; containerTags?: string[]; documentLimit?: number; email?: string; expiresAt?: string; metadata?: object; }[]`\n\n**post** `/v3/connections/list`\n\nList all connections\n\n### Parameters\n\n- `containerTags?: string[]`\n  Optional comma-separated list of container tags to filter documents by\n\n### Returns\n\n- `{ id: string; createdAt: string; provider: string; containerTags?: string[]; documentLimit?: number; email?: string; expiresAt?: string; metadata?: object; }[]`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst connections = await client.connections.list();\n\nconsole.log(connections);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/connections/list \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY" \\\n    -d \'{\n          "containerTags": [\n            "user_123",\n            "project_123"\n          ]\n        }\'',
      },
      python: {
        method: 'connections.list',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nconnections = client.connections.list()\nprint(connections)',
      },
      typescript: {
        method: 'client.connections.list',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst connections = await client.connections.list();\n\nconsole.log(connections);",
      },
    },
  },
  {
    name: 'list_documents',
    endpoint: '/v3/connections/{provider}/documents',
    httpMethod: 'post',
    summary: 'List documents',
    description: 'List documents indexed for a provider and container tags',
    stainlessPath: '(resource) connections > (method) list_documents',
    qualified: 'client.connections.listDocuments',
    params: [
      "provider: 'notion' | 'google-drive' | 'onedrive' | 'gmail' | 'github' | 'web-crawler' | 's3';",
      'containerTags?: string[];',
    ],
    response:
      '{ id: string; createdAt: string; status: string; summary: string; title: string; type: string; updatedAt: string; }[]',
    markdown:
      "## list_documents\n\n`client.connections.listDocuments(provider: 'notion' | 'google-drive' | 'onedrive' | 'gmail' | 'github' | 'web-crawler' | 's3', containerTags?: string[]): { id: string; createdAt: string; status: string; summary: string; title: string; type: string; updatedAt: string; }[]`\n\n**post** `/v3/connections/{provider}/documents`\n\nList documents indexed for a provider and container tags\n\n### Parameters\n\n- `provider: 'notion' | 'google-drive' | 'onedrive' | 'gmail' | 'github' | 'web-crawler' | 's3'`\n\n- `containerTags?: string[]`\n  Optional comma-separated list of container tags to filter documents by\n\n### Returns\n\n- `{ id: string; createdAt: string; status: string; summary: string; title: string; type: string; updatedAt: string; }[]`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.connections.listDocuments('notion');\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/connections/$PROVIDER/documents \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY" \\\n    -d \'{\n          "containerTags": [\n            "user_123",\n            "project_123"\n          ]\n        }\'',
      },
      python: {
        method: 'connections.list_documents',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.connections.list_documents(\n    provider="notion",\n)\nprint(response)',
      },
      typescript: {
        method: 'client.connections.listDocuments',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.connections.listDocuments('notion');\n\nconsole.log(response);",
      },
    },
  },
  {
    name: 'configure',
    endpoint: '/v3/connections/{connectionId}/configure',
    httpMethod: 'post',
    summary: 'Configure connection',
    description: 'Configure resources for a connection (supported providers: GitHub for now)',
    stainlessPath: '(resource) connections > (method) configure',
    qualified: 'client.connections.configure',
    params: ['connectionId: string;', 'resources: object[];'],
    response: '{ message: string; success: boolean; webhooksRegistered?: number; }',
    markdown:
      "## configure\n\n`client.connections.configure(connectionId: string, resources: object[]): { message: string; success: boolean; webhooksRegistered?: number; }`\n\n**post** `/v3/connections/{connectionId}/configure`\n\nConfigure resources for a connection (supported providers: GitHub for now)\n\n### Parameters\n\n- `connectionId: string`\n\n- `resources: object[]`\n\n### Returns\n\n- `{ message: string; success: boolean; webhooksRegistered?: number; }`\n\n  - `message: string`\n  - `success: boolean`\n  - `webhooksRegistered?: number`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.connections.configure('connectionId', { resources: [{ foo: 'bar' }] });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/connections/$CONNECTION_ID/configure \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY" \\\n    -d \'{\n          "resources": [\n            {\n              "foo": "bar"\n            }\n          ]\n        }\'',
      },
      python: {
        method: 'connections.configure',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.connections.configure(\n    connection_id="connectionId",\n    resources=[{\n        "foo": "bar"\n    }],\n)\nprint(response.message)',
      },
      typescript: {
        method: 'client.connections.configure',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.connections.configure('connectionId', {\n  resources: [{ foo: 'bar' }],\n});\n\nconsole.log(response.message);",
      },
    },
  },
  {
    name: 'resources',
    endpoint: '/v3/connections/{connectionId}/resources',
    httpMethod: 'get',
    summary: 'Fetch resources',
    description: 'Fetch resources for a connection (supported providers: GitHub for now)',
    stainlessPath: '(resource) connections > (method) resources',
    qualified: 'client.connections.resources',
    params: ['connectionId: string;', 'page?: number;', 'parent_id?: string;', 'per_page?: number;'],
    response: '{ resources: object[]; total_count?: number; }',
    markdown:
      "## resources\n\n`client.connections.resources(connectionId: string, page?: number, parent_id?: string, per_page?: number): { resources: object[]; total_count?: number; }`\n\n**get** `/v3/connections/{connectionId}/resources`\n\nFetch resources for a connection (supported providers: GitHub for now)\n\n### Parameters\n\n- `connectionId: string`\n\n- `page?: number`\n\n- `parent_id?: string`\n\n- `per_page?: number`\n\n### Returns\n\n- `{ resources: object[]; total_count?: number; }`\n\n  - `resources: object[]`\n  - `total_count?: number`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.connections.resources('connectionId');\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.supermemory.ai/v3/connections/$CONNECTION_ID/resources \\\n    -H "Authorization: Bearer $SUPERMEMORY_API_KEY"',
      },
      python: {
        method: 'connections.resources',
        example:
          'import os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.connections.resources(\n    connection_id="connectionId",\n)\nprint(response.resources)',
      },
      typescript: {
        method: 'client.connections.resources',
        example:
          "import Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.connections.resources('connectionId');\n\nconsole.log(response.resources);",
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'python',
    content:
      '# Supermemory Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/supermemory.svg?label=pypi%20(stable))](https://pypi.org/project/supermemory/)\n\nThe Supermemory Python library provides convenient access to the Supermemory REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Supermemory MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=supermemory-mcp&config=eyJuYW1lIjoic3VwZXJtZW1vcnktbWNwIiwidHJhbnNwb3J0IjoiaHR0cCIsInVybCI6Imh0dHBzOi8vc3VwZXJtZW1vcnktbmV3LnN0bG1jcC5jb20iLCJoZWFkZXJzIjp7Ingtc3VwZXJtZW1vcnktYXBpLWtleSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22supermemory-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fsupermemory-new.stlmcp.com%22%2C%22headers%22%3A%7B%22x-supermemory-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [docs.supermemory.ai](https://docs.supermemory.ai). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install supermemory\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom supermemory import Supermemory\n\nclient = Supermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\n\nresponse = client.search.documents(\n    q="documents related to python",\n)\nprint(response.results)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `SUPERMEMORY_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncSupermemory` instead of `Supermemory` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom supermemory import AsyncSupermemory\n\nclient = AsyncSupermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  response = await client.search.documents(\n      q="documents related to python",\n  )\n  print(response.results)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install supermemory[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom supermemory import DefaultAioHttpClient\nfrom supermemory import AsyncSupermemory\n\nasync def main() -> None:\n  async with AsyncSupermemory(\n    api_key=os.environ.get("SUPERMEMORY_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    response = await client.search.documents(\n        q="documents related to python",\n    )\n    print(response.results)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom supermemory import Supermemory\n\nclient = Supermemory()\n\nresponse = client.memories.update_memory(\n    container_tag="user_123",\n    new_content="John now prefers light mode",\n    temporal_context={},\n)\nprint(response.temporal_context)\n```\n\n## File uploads\n\nRequest parameters that correspond to file uploads can be passed as `bytes`, or a [`PathLike`](https://docs.python.org/3/library/os.html#os.PathLike) instance or a tuple of `(filename, contents, media type)`.\n\n```python\nfrom pathlib import Path\nfrom supermemory import Supermemory\n\nclient = Supermemory()\n\nclient.documents.upload_file(\n    file=Path("/path/to/file"),\n)\n```\n\nThe async client uses the exact same interface. If you pass a [`PathLike`](https://docs.python.org/3/library/os.html#os.PathLike) instance, the file contents will be read asynchronously automatically.\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `supermemory.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `supermemory.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `supermemory.APIError`.\n\n```python\nimport supermemory\nfrom supermemory import Supermemory\n\nclient = Supermemory()\n\ntry:\n    client.add(\n        content="content",\n    )\nexcept supermemory.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept supermemory.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept supermemory.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom supermemory import Supermemory\n\n# Configure the default for all requests:\nclient = Supermemory(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).add(\n    content="content",\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom supermemory import Supermemory\n\n# Configure the default for all requests:\nclient = Supermemory(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Supermemory(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).add(\n    content="content",\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `SUPERMEMORY_LOG` to `info`.\n\n```shell\n$ export SUPERMEMORY_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom supermemory import Supermemory\n\nclient = Supermemory()\nresponse = client.with_raw_response.add(\n    content="content",\n)\nprint(response.headers.get(\'X-My-Header\'))\n\nclient = response.parse()  # get the object that `add()` would have returned\nprint(client.id)\n```\n\nThese methods return an [`APIResponse`](https://github.com/supermemoryai/python-sdk/tree/main/src/supermemory/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/supermemoryai/python-sdk/tree/main/src/supermemory/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.with_streaming_response.add(\n    content="content",\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom supermemory import Supermemory, DefaultHttpxClient\n\nclient = Supermemory(\n    # Or use the `SUPERMEMORY_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom supermemory import Supermemory\n\nwith Supermemory() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/supermemoryai/python-sdk/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport supermemory\nprint(supermemory.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Supermemory TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/supermemory.svg?label=npm%20(stable))](https://npmjs.org/package/supermemory) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/supermemory)\n\nThis library provides convenient access to the Supermemory REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [docs.supermemory.ai](https://docs.supermemory.ai). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Supermemory MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=supermemory-mcp&config=eyJuYW1lIjoic3VwZXJtZW1vcnktbWNwIiwidHJhbnNwb3J0IjoiaHR0cCIsInVybCI6Imh0dHBzOi8vc3VwZXJtZW1vcnktbmV3LnN0bG1jcC5jb20iLCJoZWFkZXJzIjp7Ingtc3VwZXJtZW1vcnktYXBpLWtleSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22supermemory-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fsupermemory-new.stlmcp.com%22%2C%22headers%22%3A%7B%22x-supermemory-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install supermemory\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.search.execute({ q: 'documents related to python' });\n\nconsole.log(response.results);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  apiKey: process.env['SUPERMEMORY_API_KEY'], // This is the default and can be omitted\n});\n\nconst params: Supermemory.AddParams = { content: 'content' };\nconst response: Supermemory.AddResponse = await client.add(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n## File uploads\n\nRequest parameters that correspond to file uploads can be passed in many different forms:\n- `File` (or an object with the same structure)\n- a `fetch` `Response` (or an object with the same structure)\n- an `fs.ReadStream`\n- the return value of our `toFile` helper\n\n```ts\nimport fs from 'fs';\nimport Supermemory, { toFile } from 'supermemory';\n\nconst client = new Supermemory();\n\n// If you have access to Node `fs` we recommend using `fs.createReadStream()`:\nawait client.documents.uploadFile({ file: fs.createReadStream('/path/to/file') });\n\n// Or if you have the web `File` API you can pass a `File` instance:\nawait client.documents.uploadFile({ file: new File(['my bytes'], 'file') });\n\n// You can also pass a `fetch` `Response`:\nawait client.documents.uploadFile({ file: await fetch('https://somesite/file') });\n\n// Finally, if none of the above are convenient, you can use our `toFile` helper:\nawait client.documents.uploadFile({ file: await toFile(Buffer.from('my bytes'), 'file') });\nawait client.documents.uploadFile({ file: await toFile(new Uint8Array([0, 1, 2]), 'file') });\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst response = await client.add({ content: 'content' }).catch(async (err) => {\n  if (err instanceof Supermemory.APIError) {\n    console.log(err.status); // 400\n    console.log(err.name); // BadRequestError\n    console.log(err.headers); // {server: 'nginx', ...}\n  } else {\n    throw err;\n  }\n});\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Supermemory({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.add({ content: 'content' }, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Supermemory({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.add({ content: 'content' }, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Supermemory();\n\nconst response = await client.add({ content: 'content' }).asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: response, response: raw } = await client.add({ content: 'content' }).withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(response.id);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `SUPERMEMORY_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Supermemory from 'supermemory';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Supermemory({\n  logger: logger.child({ name: 'Supermemory' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.search.execute({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Supermemory from 'supermemory';\nimport fetch from 'my-fetch';\n\nconst client = new Supermemory({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Supermemory from 'supermemory';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Supermemory({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Supermemory from 'npm:supermemory';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Supermemory({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/supermemoryai/sdk-ts/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
