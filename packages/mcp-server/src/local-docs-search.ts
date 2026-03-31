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
      'metadata?: object;',
    ],
    response: '{ id: string; status: string; }',
    markdown:
      "## add\n\n`client.add(content: string, containerTag?: string, containerTags?: string[], customId?: string, entityContext?: string, metadata?: object): { id: string; status: string; }`\n\n**post** `/v3/documents`\n\nAdd a document with any content type (text, url, file, etc.) and metadata\n\n### Parameters\n\n- `content: string`\n  The content to extract and process into a document. This can be a URL to a website, a PDF, an image, or a video.\n\n- `containerTag?: string`\n  Optional tag this document should be containerized by. Max 100 characters, alphanumeric with hyphens, underscores, and dots only.\n\n- `containerTags?: string[]`\n\n- `customId?: string`\n  Optional custom ID of the document. Max 100 characters, alphanumeric with hyphens, underscores, and dots only.\n\n- `entityContext?: string`\n  Optional entity context for this container tag. Max 1500 characters. Used during document processing to guide memory extraction.\n\n- `metadata?: object`\n  Optional metadata for the document.\n\n### Returns\n\n- `{ id: string; status: string; }`\n\n  - `id: string`\n  - `status: string`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.add({ content: 'content' });\n\nconsole.log(response);\n```",
  },
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
      'metadata?: object;',
    ],
    response: '{ id: string; status: string; }',
    markdown:
      "## update\n\n`client.documents.update(id: string, containerTag?: string, containerTags?: string[], content?: string, customId?: string, metadata?: object): { id: string; status: string; }`\n\n**patch** `/v3/documents/{id}`\n\nUpdate a document with any content type (text, url, file, etc.) and metadata\n\n### Parameters\n\n- `id: string`\n\n- `containerTag?: string`\n  Optional tag this document should be containerized by. This can be an ID for your user, a project ID, or any other identifier you wish to use to group documents.\n\n- `containerTags?: string[]`\n  (DEPRECATED: Use containerTag instead) Optional tags this document should be containerized by. This can be an ID for your user, a project ID, or any other identifier you wish to use to group documents.\n\n- `content?: string`\n  The content to extract and process into a document. This can be a URL to a website, a PDF, an image, or a video. \n\nPlaintext: Any plaintext format\n\nURL: A URL to a website, PDF, image, or video\n\nWe automatically detect the content type from the url's response format.\n\n- `customId?: string`\n  Optional custom ID of the document. This could be an ID from your database that will uniquely identify this document.\n\n- `metadata?: object`\n  Optional metadata for the document. This is used to store additional information about the document. You can use this to store any additional information you need about the document. Metadata can be filtered through. Keys must be strings and are case sensitive. Values can be strings, numbers, or booleans. You cannot nest objects.\n\n### Returns\n\n- `{ id: string; status: string; }`\n\n  - `id: string`\n  - `status: string`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst document = await client.documents.update('id');\n\nconsole.log(document);\n```",
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
      "filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; };",
      'includeContent?: boolean;',
      'limit?: string | number;',
      "order?: 'asc' | 'desc';",
      'page?: string | number;',
      "sort?: 'createdAt' | 'updatedAt';",
    ],
    response:
      "{ memories: { id: string; connectionId: string; createdAt: string; customId: string; metadata: string | number | boolean | object | object[]; status: 'unknown' | 'queued' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'done' | 'failed'; summary: string; title: string; type: string; updatedAt: string; containerTags?: string[]; content?: string; }[]; pagination: { currentPage: number; totalItems: number; totalPages: number; limit?: number; }; }",
    markdown:
      "## list\n\n`client.documents.list(containerTags?: string[], filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }, includeContent?: boolean, limit?: string | number, order?: 'asc' | 'desc', page?: string | number, sort?: 'createdAt' | 'updatedAt'): { memories: object[]; pagination: object; }`\n\n**post** `/v3/documents/list`\n\nRetrieves a paginated list of documents with their metadata and workflow status\n\n### Parameters\n\n- `containerTags?: string[]`\n  Optional tags this document should be containerized by. This can be an ID for your user, a project ID, or any other identifier you wish to use to group documents.\n\n- `filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; }`\n  Optional filters to apply to the search. Can be a JSON string or Query object.\n\n- `includeContent?: boolean`\n  Whether to include the content field in the response. Warning: This can make responses significantly larger.\n\n- `limit?: string | number`\n  Number of items per page\n\n- `order?: 'asc' | 'desc'`\n  Sort order\n\n- `page?: string | number`\n  Page number to fetch\n\n- `sort?: 'createdAt' | 'updatedAt'`\n  Field to sort by\n\n### Returns\n\n- `{ memories: { id: string; connectionId: string; createdAt: string; customId: string; metadata: string | number | boolean | object | object[]; status: 'unknown' | 'queued' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'done' | 'failed'; summary: string; title: string; type: string; updatedAt: string; containerTags?: string[]; content?: string; }[]; pagination: { currentPage: number; totalItems: number; totalPages: number; limit?: number; }; }`\n  List of documents\n\n  - `memories: { id: string; connectionId: string; createdAt: string; customId: string; metadata: string | number | boolean | object | object[]; status: 'unknown' | 'queued' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'done' | 'failed'; summary: string; title: string; type: string; updatedAt: string; containerTags?: string[]; content?: string; }[]`\n  - `pagination: { currentPage: number; totalItems: number; totalPages: number; limit?: number; }`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst documents = await client.documents.list();\n\nconsole.log(documents);\n```",
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
      'metadata?: object;',
    ],
    response: '{ id: string; status: string; }',
    markdown:
      "## add\n\n`client.documents.add(content: string, containerTag?: string, containerTags?: string[], customId?: string, entityContext?: string, metadata?: object): { id: string; status: string; }`\n\n**post** `/v3/documents`\n\nAdd a document with any content type (text, url, file, etc.) and metadata\n\n### Parameters\n\n- `content: string`\n  The content to extract and process into a document. This can be a URL to a website, a PDF, an image, or a video.\n\n- `containerTag?: string`\n  Optional tag this document should be containerized by. Max 100 characters, alphanumeric with hyphens, underscores, and dots only.\n\n- `containerTags?: string[]`\n\n- `customId?: string`\n  Optional custom ID of the document. Max 100 characters, alphanumeric with hyphens, underscores, and dots only.\n\n- `entityContext?: string`\n  Optional entity context for this container tag. Max 1500 characters. Used during document processing to guide memory extraction.\n\n- `metadata?: object`\n  Optional metadata for the document.\n\n### Returns\n\n- `{ id: string; status: string; }`\n\n  - `id: string`\n  - `status: string`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.documents.add({ content: 'content' });\n\nconsole.log(response);\n```",
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
      'documents: { content: string; containerTag?: string; containerTags?: string[]; customId?: string; metadata?: object; }[] | string[];',
      'containerTag?: string;',
      'containerTags?: string[];',
      'content?: null;',
      'metadata?: object;',
    ],
    response:
      '{ failed: number; results: { id: string; status: string; details?: string; error?: string; }[]; success: number; }',
    markdown:
      "## batch_add\n\n`client.documents.batchAdd(documents: { content: string; containerTag?: string; containerTags?: string[]; customId?: string; metadata?: object; }[] | string[], containerTag?: string, containerTags?: string[], content?: null, metadata?: object): { failed: number; results: object[]; success: number; }`\n\n**post** `/v3/documents/batch`\n\nAdd multiple documents in a single request. Each document can have any content type (text, url, file, etc.) and metadata\n\n### Parameters\n\n- `documents: { content: string; containerTag?: string; containerTags?: string[]; customId?: string; metadata?: object; }[] | string[]`\n\n- `containerTag?: string`\n  Optional tag this document should be containerized by. This can be an ID for your user, a project ID, or any other identifier you wish to use to group documents.\n\n- `containerTags?: string[]`\n  (DEPRECATED: Use containerTag instead) Optional tags this document should be containerized by. This can be an ID for your user, a project ID, or any other identifier you wish to use to group documents.\n\n- `content?: null`\n\n- `metadata?: object`\n  Optional metadata for the document. This is used to store additional information about the document. You can use this to store any additional information you need about the document. Metadata can be filtered through. Keys must be strings and are case sensitive. Values can be strings, numbers, or booleans. You cannot nest objects.\n\n### Returns\n\n- `{ failed: number; results: { id: string; status: string; details?: string; error?: string; }[]; success: number; }`\n\n  - `failed: number`\n  - `results: { id: string; status: string; details?: string; error?: string; }[]`\n  - `success: number`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.documents.batchAdd({ documents: [{ content: 'This is a detailed article about machine learning concepts...' }] });\n\nconsole.log(response);\n```",
  },
  {
    name: 'delete_bulk',
    endpoint: '/v3/documents/bulk',
    httpMethod: 'delete',
    summary: 'Bulk delete documents',
    description: 'Bulk delete documents by IDs or container tags',
    stainlessPath: '(resource) documents > (method) delete_bulk',
    qualified: 'client.documents.deleteBulk',
    params: ['containerTags?: string[];', 'ids?: string[];'],
    response:
      '{ deletedCount: number; success: boolean; containerTags?: string[]; errors?: { id: string; error: string; }[]; }',
    markdown:
      "## delete_bulk\n\n`client.documents.deleteBulk(containerTags?: string[], ids?: string[]): { deletedCount: number; success: boolean; containerTags?: string[]; errors?: object[]; }`\n\n**delete** `/v3/documents/bulk`\n\nBulk delete documents by IDs or container tags\n\n### Parameters\n\n- `containerTags?: string[]`\n  Array of container tags - all documents in these containers will be deleted\n\n- `ids?: string[]`\n  Array of document IDs to delete (max 100 at once)\n\n### Returns\n\n- `{ deletedCount: number; success: boolean; containerTags?: string[]; errors?: { id: string; error: string; }[]; }`\n  Response for bulk document deletion\n\n  - `deletedCount: number`\n  - `success: boolean`\n  - `containerTags?: string[]`\n  - `errors?: { id: string; error: string; }[]`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.documents.deleteBulk();\n\nconsole.log(response);\n```",
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
      "{ id: string; connectionId: string; content: string; createdAt: string; customId: string; metadata: string | number | boolean | object | object[]; ogImage: string; raw: object; source: string; spatialPoint: object; status: 'unknown' | 'queued' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'done' | 'failed'; summary: string; title: string; type: string; updatedAt: string; containerTags?: string[]; url?: string; }",
    markdown:
      "## get\n\n`client.documents.get(id: string): { id: string; connectionId: string; content: string; createdAt: string; customId: string; metadata: string | number | boolean | object | object[]; ogImage: string; raw: object; source: string; spatialPoint: object; status: 'unknown' | 'queued' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'done' | 'failed'; summary: string; title: string; type: string; updatedAt: string; containerTags?: string[]; url?: string; }`\n\n**get** `/v3/documents/{id}`\n\nGet a document by ID\n\n### Parameters\n\n- `id: string`\n\n### Returns\n\n- `{ id: string; connectionId: string; content: string; createdAt: string; customId: string; metadata: string | number | boolean | object | object[]; ogImage: string; raw: object; source: string; spatialPoint: object; status: 'unknown' | 'queued' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'done' | 'failed'; summary: string; title: string; type: string; updatedAt: string; containerTags?: string[]; url?: string; }`\n  Document object\n\n  - `id: string`\n  - `connectionId: string`\n  - `content: string`\n  - `createdAt: string`\n  - `customId: string`\n  - `metadata: string | number | boolean | object | object[]`\n  - `ogImage: string`\n  - `raw: object`\n  - `source: string`\n  - `spatialPoint: object`\n  - `status: 'unknown' | 'queued' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'done' | 'failed'`\n  - `summary: string`\n  - `title: string`\n  - `type: string`\n  - `updatedAt: string`\n  - `containerTags?: string[]`\n  - `url?: string`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst document = await client.documents.get('id');\n\nconsole.log(document);\n```",
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
      'containerTags?: string;',
      'fileType?: string;',
      'metadata?: string;',
      'mimeType?: string;',
      'useAdvancedProcessing?: string;',
    ],
    response: '{ id: string; status: string; }',
    markdown:
      "## upload_file\n\n`client.documents.uploadFile(file: string, containerTags?: string, fileType?: string, metadata?: string, mimeType?: string, useAdvancedProcessing?: string): { id: string; status: string; }`\n\n**post** `/v3/documents/file`\n\nUpload a file to be processed\n\n### Parameters\n\n- `file: string`\n  File to upload and process\n\n- `containerTags?: string`\n  Optional container tags. Can be either a JSON string of an array (e.g., '[\"user_123\", \"project_123\"]') or a single string (e.g., 'user_123'). Single strings will be automatically converted to an array.\n\n- `fileType?: string`\n  Optional file type override to force specific processing behavior. Valid values: text, pdf, tweet, google_doc, google_slide, google_sheet, image, video, notion_doc, webpage, onedrive\n\n- `metadata?: string`\n  Optional metadata for the document as a JSON string. This is used to store additional information about the document. Keys must be strings and values can be strings, numbers, or booleans.\n\n- `mimeType?: string`\n  Required when fileType is 'image' or 'video'. Specifies the exact MIME type to use (e.g., 'image/png', 'image/jpeg', 'video/mp4', 'video/webm')\n\n- `useAdvancedProcessing?: string`\n  DEPRECATED: This field is no longer used. Advanced PDF processing is now automatic with our hybrid Mistral OCR + Gemini pipeline. This parameter will be accepted but ignored for backwards compatibility.\n\n### Returns\n\n- `{ id: string; status: string; }`\n\n  - `id: string`\n  - `status: string`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.documents.uploadFile({ file: fs.createReadStream('path/to/file') });\n\nconsole.log(response);\n```",
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
      'containerTags?: string[];',
      'docId?: string;',
      'documentThreshold?: number;',
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
      "## documents\n\n`client.search.documents(q: string, categoriesFilter?: string[], chunkThreshold?: number, containerTags?: string[], docId?: string, documentThreshold?: number, filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }, includeFullDocs?: boolean, includeSummary?: boolean, limit?: number, onlyMatchingChunks?: boolean, rerank?: boolean, rewriteQuery?: boolean): { results: object[]; timing: number; total: number; }`\n\n**post** `/v3/search`\n\nSearch memories with advanced filtering\n\n### Parameters\n\n- `q: string`\n  Search query string\n\n- `categoriesFilter?: string[]`\n  DEPRECATED: Optional category filters\n\n- `chunkThreshold?: number`\n  Threshold / sensitivity for chunk selection. 0 is least sensitive (returns most chunks, more results), 1 is most sensitive (returns lesser chunks, accurate results)\n\n- `containerTags?: string[]`\n  Optional tags this search should be containerized by. This can be an ID for your user, a project ID, or any other identifier you wish to use to filter documents.\n\n- `docId?: string`\n  Optional document ID to search within. You can use this to find chunks in a very large document.\n\n- `documentThreshold?: number`\n  DEPRECATED: This field is no longer used in v3 search. The search now uses chunkThreshold only. This parameter will be ignored.\n\n- `filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; }`\n  Optional filters to apply to the search. Can be a JSON string or Query object.\n\n- `includeFullDocs?: boolean`\n  If true, include full document in the response. This is helpful if you want a chatbot to know the full context of the document. \n\n- `includeSummary?: boolean`\n  If true, include document summary in the response. This is helpful if you want a chatbot to know the full context of the document. \n\n- `limit?: number`\n  Maximum number of results to return\n\n- `onlyMatchingChunks?: boolean`\n  If true, only return matching chunks without context. Normally, we send the previous and next chunk to provide more context for LLMs. If you only want the matching chunk, set this to true.\n\n- `rerank?: boolean`\n  If true, rerank the results based on the query. This is helpful if you want to ensure the most relevant results are returned.\n\n- `rewriteQuery?: boolean`\n  If true, rewrites the query to make it easier to find documents. This increases the latency by about 400ms\n\n### Returns\n\n- `{ results: { chunks: { content: string; isRelevant: boolean; score: number; }[]; createdAt: string; documentId: string; metadata: object; score: number; title: string; type: string; updatedAt: string; content?: string; summary?: string; }[]; timing: number; total: number; }`\n\n  - `results: { chunks: { content: string; isRelevant: boolean; score: number; }[]; createdAt: string; documentId: string; metadata: object; score: number; title: string; type: string; updatedAt: string; content?: string; summary?: string; }[]`\n  - `timing: number`\n  - `total: number`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.search.documents({ q: 'machine learning concepts' });\n\nconsole.log(response);\n```",
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
      'containerTags?: string[];',
      'docId?: string;',
      'documentThreshold?: number;',
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
      "## execute\n\n`client.search.execute(q: string, categoriesFilter?: string[], chunkThreshold?: number, containerTags?: string[], docId?: string, documentThreshold?: number, filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }, includeFullDocs?: boolean, includeSummary?: boolean, limit?: number, onlyMatchingChunks?: boolean, rerank?: boolean, rewriteQuery?: boolean): { results: object[]; timing: number; total: number; }`\n\n**post** `/v3/search`\n\nSearch memories with advanced filtering\n\n### Parameters\n\n- `q: string`\n  Search query string\n\n- `categoriesFilter?: string[]`\n  DEPRECATED: Optional category filters\n\n- `chunkThreshold?: number`\n  Threshold / sensitivity for chunk selection. 0 is least sensitive (returns most chunks, more results), 1 is most sensitive (returns lesser chunks, accurate results)\n\n- `containerTags?: string[]`\n  Optional tags this search should be containerized by. This can be an ID for your user, a project ID, or any other identifier you wish to use to filter documents.\n\n- `docId?: string`\n  Optional document ID to search within. You can use this to find chunks in a very large document.\n\n- `documentThreshold?: number`\n  DEPRECATED: This field is no longer used in v3 search. The search now uses chunkThreshold only. This parameter will be ignored.\n\n- `filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; }`\n  Optional filters to apply to the search. Can be a JSON string or Query object.\n\n- `includeFullDocs?: boolean`\n  If true, include full document in the response. This is helpful if you want a chatbot to know the full context of the document. \n\n- `includeSummary?: boolean`\n  If true, include document summary in the response. This is helpful if you want a chatbot to know the full context of the document. \n\n- `limit?: number`\n  Maximum number of results to return\n\n- `onlyMatchingChunks?: boolean`\n  If true, only return matching chunks without context. Normally, we send the previous and next chunk to provide more context for LLMs. If you only want the matching chunk, set this to true.\n\n- `rerank?: boolean`\n  If true, rerank the results based on the query. This is helpful if you want to ensure the most relevant results are returned.\n\n- `rewriteQuery?: boolean`\n  If true, rewrites the query to make it easier to find documents. This increases the latency by about 400ms\n\n### Returns\n\n- `{ results: { chunks: { content: string; isRelevant: boolean; score: number; }[]; createdAt: string; documentId: string; metadata: object; score: number; title: string; type: string; updatedAt: string; content?: string; summary?: string; }[]; timing: number; total: number; }`\n\n  - `results: { chunks: { content: string; isRelevant: boolean; score: number; }[]; createdAt: string; documentId: string; metadata: object; score: number; title: string; type: string; updatedAt: string; content?: string; summary?: string; }[]`\n  - `timing: number`\n  - `total: number`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.search.execute({ q: 'machine learning concepts' });\n\nconsole.log(response);\n```",
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
      'containerTag?: string;',
      "filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; };",
      'include?: { chunks?: boolean; documents?: boolean; forgottenMemories?: boolean; relatedMemories?: boolean; summaries?: boolean; };',
      'limit?: number;',
      'rerank?: boolean;',
      'rewriteQuery?: boolean;',
      "searchMode?: 'memories' | 'hybrid' | 'documents';",
      'threshold?: number;',
    ],
    response:
      '{ results: { id: string; metadata: object; similarity: number; updatedAt: string; chunk?: string; chunks?: { content: string; documentId: string; position: number; score: number; }[]; context?: { children?: object[]; parents?: object[]; }; documents?: { id: string; createdAt: string; updatedAt: string; metadata?: object; summary?: string; title?: string; type?: string; }[]; memory?: string; version?: number; }[]; timing: number; total: number; }',
    markdown:
      "## memories\n\n`client.search.memories(q: string, containerTag?: string, filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }, include?: { chunks?: boolean; documents?: boolean; forgottenMemories?: boolean; relatedMemories?: boolean; summaries?: boolean; }, limit?: number, rerank?: boolean, rewriteQuery?: boolean, searchMode?: 'memories' | 'hybrid' | 'documents', threshold?: number): { results: object[]; timing: number; total: number; }`\n\n**post** `/v4/search`\n\nSearch memory entries - Low latency for conversational\n\n### Parameters\n\n- `q: string`\n  Search query string\n\n- `containerTag?: string`\n  Optional tag this search should be containerized by. This can be an ID for your user, a project ID, or any other identifier you wish to use to filter memories.\n\n- `filters?: { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; } | { AND: { key: string; value: string; filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains'; ignoreCase?: boolean | 'true' | 'false'; negate?: boolean | 'true' | 'false'; numericOperator?: '>' | '<' | '>=' | '<=' | '='; } | { OR: object | object | object[]; } | { AND: object | object | object[]; }[]; }[]; }[]; }`\n  Optional filters to apply to the search. Can be a JSON string or Query object.\n\n- `include?: { chunks?: boolean; documents?: boolean; forgottenMemories?: boolean; relatedMemories?: boolean; summaries?: boolean; }`\n  - `chunks?: boolean`\n    DEPRECATED: Use searchMode='hybrid' instead. If true, automatically switches to hybrid mode. This field is kept for backward compatibility only.\n  - `documents?: boolean`\n  - `forgottenMemories?: boolean`\n    If true, include forgotten memories in search results. Forgotten memories are memories that have been explicitly forgotten or have passed their expiration date.\n  - `relatedMemories?: boolean`\n  - `summaries?: boolean`\n\n- `limit?: number`\n  Maximum number of results to return\n\n- `rerank?: boolean`\n  If true, rerank the results based on the query. This is helpful if you want to ensure the most relevant results are returned.\n\n- `rewriteQuery?: boolean`\n  If true, rewrites the query to make it easier to find documents. This increases the latency by about 400ms\n\n- `searchMode?: 'memories' | 'hybrid' | 'documents'`\n  Search mode. 'memories' searches only memory entries (default). 'hybrid' searches both memories and document chunks. 'documents' searches only document chunks.\n\n- `threshold?: number`\n  Threshold / sensitivity for memories selection. 0 is least sensitive (returns most memories, more results), 1 is most sensitive (returns lesser memories, accurate results)\n\n### Returns\n\n- `{ results: { id: string; metadata: object; similarity: number; updatedAt: string; chunk?: string; chunks?: { content: string; documentId: string; position: number; score: number; }[]; context?: { children?: object[]; parents?: object[]; }; documents?: { id: string; createdAt: string; updatedAt: string; metadata?: object; summary?: string; title?: string; type?: string; }[]; memory?: string; version?: number; }[]; timing: number; total: number; }`\n\n  - `results: { id: string; metadata: object; similarity: number; updatedAt: string; chunk?: string; chunks?: { content: string; documentId: string; position: number; score: number; }[]; context?: { children?: { memory: string; relation: 'updates' | 'extends' | 'derives'; updatedAt: string; metadata?: object; version?: number; }[]; parents?: { memory: string; relation: 'updates' | 'extends' | 'derives'; updatedAt: string; metadata?: object; version?: number; }[]; }; documents?: { id: string; createdAt: string; updatedAt: string; metadata?: object; summary?: string; title?: string; type?: string; }[]; memory?: string; version?: number; }[]`\n  - `timing: number`\n  - `total: number`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.search.memories({ q: 'machine learning concepts' });\n\nconsole.log(response);\n```",
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
  },
  {
    name: 'resources',
    endpoint: '/v3/connections/{connectionId}/resources',
    httpMethod: 'get',
    summary: 'Fetch resources',
    description: 'Fetch resources for a connection (supported providers: GitHub for now)',
    stainlessPath: '(resource) connections > (method) resources',
    qualified: 'client.connections.resources',
    params: ['connectionId: string;', 'page?: number;', 'per_page?: number;'],
    response: '{ resources: object[]; total_count?: number; }',
    markdown:
      "## resources\n\n`client.connections.resources(connectionId: string, page?: number, per_page?: number): { resources: object[]; total_count?: number; }`\n\n**get** `/v3/connections/{connectionId}/resources`\n\nFetch resources for a connection (supported providers: GitHub for now)\n\n### Parameters\n\n- `connectionId: string`\n\n- `page?: number`\n\n- `per_page?: number`\n\n### Returns\n\n- `{ resources: object[]; total_count?: number; }`\n\n  - `resources: object[]`\n  - `total_count?: number`\n\n### Example\n\n```typescript\nimport Supermemory from 'supermemory';\n\nconst client = new Supermemory();\n\nconst response = await client.connections.resources('connectionId');\n\nconsole.log(response);\n```",
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [];

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
