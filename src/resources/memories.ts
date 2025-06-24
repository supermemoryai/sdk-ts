// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Memories extends APIResource {
  /**
   * Update a memory with any content type (text, url, file, etc.) and metadata
   *
   * @example
   * ```ts
   * const memory = await client.memories.update('id', {
   *   content:
   *     'This is a detailed article about machine learning concepts...',
   * });
   * ```
   */
  update(id: string, body: MemoryUpdateParams, options?: RequestOptions): APIPromise<MemoryUpdateResponse> {
    return this._client.patch(path`/v3/memories/${id}`, { body, ...options });
  }

  /**
   * Retrieves a paginated list of memories with their metadata and workflow status
   *
   * @example
   * ```ts
   * const memories = await client.memories.list();
   * ```
   */
  list(
    body: MemoryListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MemoryListResponse> {
    return this._client.post('/v3/memories/list', { body, ...options });
  }

  /**
   * Delete a memory
   *
   * @example
   * ```ts
   * await client.memories.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v3/memories/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Add a memory with any content type (text, url, file, etc.) and metadata
   *
   * @example
   * ```ts
   * const response = await client.memories.add({
   *   content:
   *     'This is a detailed article about machine learning concepts...',
   * });
   * ```
   */
  add(body: MemoryAddParams, options?: RequestOptions): APIPromise<MemoryAddResponse> {
    return this._client.post('/v3/memories', { body, ...options });
  }

  /**
   * Get a memory by ID
   *
   * @example
   * ```ts
   * const memory = await client.memories.get('id');
   * ```
   */
  get(id: string, options?: RequestOptions): APIPromise<MemoryGetResponse> {
    return this._client.get(path`/v3/memories/${id}`, options);
  }
}

export interface MemoryUpdateResponse {
  id: string;

  status: string;
}

/**
 * List of memories
 */
export interface MemoryListResponse {
  memories: Array<MemoryListResponse.Memory>;

  /**
   * Pagination metadata
   */
  pagination: MemoryListResponse.Pagination;
}

export namespace MemoryListResponse {
  /**
   * Memory object
   */
  export interface Memory {
    /**
     * Unique identifier of the memory.
     */
    id: string;

    /**
     * Optional ID of connection the memory was created from. This is useful for
     * identifying the source of the memory.
     */
    connectionId: string | null;

    /**
     * Creation timestamp
     */
    createdAt: string;

    /**
     * Optional custom ID of the memory. This could be an ID from your database that
     * will uniquely identify this memory.
     */
    customId: string | null;

    /**
     * Optional metadata for the memory. This is used to store additional information
     * about the memory. You can use this to store any additional information you need
     * about the memory. Metadata can be filtered through. Keys must be strings and are
     * case sensitive. Values can be strings, numbers, or booleans. You cannot nest
     * objects.
     */
    metadata: string | number | boolean | { [key: string]: unknown } | Array<unknown> | null;

    /**
     * Status of the memory
     */
    status: 'unknown' | 'queued' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'done' | 'failed';

    /**
     * Summary of the memory content
     */
    summary: string | null;

    /**
     * Title of the memory
     */
    title: string | null;

    /**
     * Type of the memory
     */
    type:
      | 'text'
      | 'pdf'
      | 'tweet'
      | 'google_doc'
      | 'google_slide'
      | 'google_sheet'
      | 'image'
      | 'video'
      | 'notion_doc'
      | 'webpage'
      | 'onedrive';

    /**
     * Last update timestamp
     */
    updatedAt: string;

    /**
     * Optional tags this memory should be containerized by. This can be an ID for your
     * user, a project ID, or any other identifier you wish to use to group memories.
     */
    containerTags?: Array<string>;
  }

  /**
   * Pagination metadata
   */
  export interface Pagination {
    currentPage: number;

    limit: number;

    totalItems: number;

    totalPages: number;
  }
}

export interface MemoryAddResponse {
  id: string;

  status: string;
}

/**
 * Memory object
 */
export interface MemoryGetResponse {
  /**
   * Unique identifier of the memory.
   */
  id: string;

  /**
   * Optional ID of connection the memory was created from. This is useful for
   * identifying the source of the memory.
   */
  connectionId: string | null;

  /**
   * The content to extract and process into a memory. This can be a URL to a
   * website, a PDF, an image, or a video.
   *
   * Plaintext: Any plaintext format
   *
   * URL: A URL to a website, PDF, image, or video
   *
   * We automatically detect the content type from the url's response format.
   */
  content: string | null;

  /**
   * Creation timestamp
   */
  createdAt: string;

  /**
   * Optional custom ID of the memory. This could be an ID from your database that
   * will uniquely identify this memory.
   */
  customId: string | null;

  /**
   * Optional metadata for the memory. This is used to store additional information
   * about the memory. You can use this to store any additional information you need
   * about the memory. Metadata can be filtered through. Keys must be strings and are
   * case sensitive. Values can be strings, numbers, or booleans. You cannot nest
   * objects.
   */
  metadata: string | number | boolean | { [key: string]: unknown } | Array<unknown> | null;

  ogImage: string | null;

  /**
   * Source of the memory
   */
  source: string | null;

  /**
   * Status of the memory
   */
  status: 'unknown' | 'queued' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'done' | 'failed';

  /**
   * Summary of the memory content
   */
  summary: string | null;

  /**
   * Title of the memory
   */
  title: string | null;

  /**
   * Type of the memory
   */
  type:
    | 'text'
    | 'pdf'
    | 'tweet'
    | 'google_doc'
    | 'google_slide'
    | 'google_sheet'
    | 'image'
    | 'video'
    | 'notion_doc'
    | 'webpage'
    | 'onedrive';

  /**
   * Last update timestamp
   */
  updatedAt: string;

  /**
   * URL of the memory
   */
  url: string | null;

  /**
   * Optional tags this memory should be containerized by. This can be an ID for your
   * user, a project ID, or any other identifier you wish to use to group memories.
   */
  containerTags?: Array<string>;

  /**
   * Raw content of the memory
   */
  raw?: null;
}

export interface MemoryUpdateParams {
  /**
   * The content to extract and process into a memory. This can be a URL to a
   * website, a PDF, an image, or a video.
   *
   * Plaintext: Any plaintext format
   *
   * URL: A URL to a website, PDF, image, or video
   *
   * We automatically detect the content type from the url's response format.
   */
  content: string;

  /**
   * Optional tags this memory should be containerized by. This can be an ID for your
   * user, a project ID, or any other identifier you wish to use to group memories.
   */
  containerTags?: Array<string>;

  /**
   * Optional custom ID of the memory. This could be an ID from your database that
   * will uniquely identify this memory.
   */
  customId?: string;

  /**
   * Optional metadata for the memory. This is used to store additional information
   * about the memory. You can use this to store any additional information you need
   * about the memory. Metadata can be filtered through. Keys must be strings and are
   * case sensitive. Values can be strings, numbers, or booleans. You cannot nest
   * objects.
   */
  metadata?: { [key: string]: string | number | boolean };
}

export interface MemoryListParams {
  /**
   * Optional tags this memory should be containerized by. This can be an ID for your
   * user, a project ID, or any other identifier you wish to use to group memories.
   */
  containerTags?: Array<string>;

  /**
   * Optional filters to apply to the search
   */
  filters?: string;

  /**
   * Number of items per page
   */
  limit?: string | number;

  /**
   * Sort order
   */
  order?: 'asc' | 'desc';

  /**
   * Page number to fetch
   */
  page?: string | number;

  /**
   * Field to sort by
   */
  sort?: 'createdAt' | 'updatedAt';
}

export interface MemoryAddParams {
  /**
   * The content to extract and process into a memory. This can be a URL to a
   * website, a PDF, an image, or a video.
   *
   * Plaintext: Any plaintext format
   *
   * URL: A URL to a website, PDF, image, or video
   *
   * We automatically detect the content type from the url's response format.
   */
  content: string;

  /**
   * Optional tags this memory should be containerized by. This can be an ID for your
   * user, a project ID, or any other identifier you wish to use to group memories.
   */
  containerTags?: Array<string>;

  /**
   * Optional custom ID of the memory. This could be an ID from your database that
   * will uniquely identify this memory.
   */
  customId?: string;

  /**
   * Optional metadata for the memory. This is used to store additional information
   * about the memory. You can use this to store any additional information you need
   * about the memory. Metadata can be filtered through. Keys must be strings and are
   * case sensitive. Values can be strings, numbers, or booleans. You cannot nest
   * objects.
   */
  metadata?: { [key: string]: string | number | boolean };
}

export declare namespace Memories {
  export {
    type MemoryUpdateResponse as MemoryUpdateResponse,
    type MemoryListResponse as MemoryListResponse,
    type MemoryAddResponse as MemoryAddResponse,
    type MemoryGetResponse as MemoryGetResponse,
    type MemoryUpdateParams as MemoryUpdateParams,
    type MemoryListParams as MemoryListParams,
    type MemoryAddParams as MemoryAddParams,
  };
}
