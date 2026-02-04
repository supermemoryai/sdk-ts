// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Memories extends APIResource {
  /**
   * Forget (soft delete) a memory entry. The memory is marked as forgotten but not
   * permanently deleted.
   *
   * @example
   * ```ts
   * const response = await client.memories.forget({
   *   containerTag: 'user_123',
   * });
   * ```
   */
  forget(body: MemoryForgetParams, options?: RequestOptions): APIPromise<MemoryForgetResponse> {
    return this._client.delete('/v4/memories', { body, ...options });
  }

  /**
   * Update a memory by creating a new version. The original memory is preserved with
   * isLatest=false.
   *
   * @example
   * ```ts
   * const response = await client.memories.updateMemory({
   *   containerTag: 'user_123',
   *   newContent: 'John now prefers light mode',
   * });
   * ```
   */
  updateMemory(
    body: MemoryUpdateMemoryParams,
    options?: RequestOptions,
  ): APIPromise<MemoryUpdateMemoryResponse> {
    return this._client.patch('/v4/memories', { body, ...options });
  }
}

/**
 * Response after forgetting a memory
 */
export interface MemoryForgetResponse {
  /**
   * ID of the memory that was forgotten
   */
  id: string;

  /**
   * Indicates the memory was successfully forgotten
   */
  forgotten: boolean;
}

/**
 * Response after updating a memory
 */
export interface MemoryUpdateMemoryResponse {
  /**
   * ID of the newly created memory version
   */
  id: string;

  /**
   * When this memory version was created
   */
  createdAt: string;

  /**
   * The content of the new memory version
   */
  memory: string;

  /**
   * ID of the memory this version updates
   */
  parentMemoryId: string | null;

  /**
   * ID of the first memory in this version chain
   */
  rootMemoryId: string | null;

  /**
   * Version number of this memory entry
   */
  version: number;
}

export interface MemoryForgetParams {
  /**
   * Container tag / space identifier. Required to scope the operation.
   */
  containerTag: string;

  /**
   * ID of the memory entry to operate on
   */
  id?: string;

  /**
   * Exact content match of the memory entry to operate on. Use this when you don't
   * have the ID.
   */
  content?: string;

  /**
   * Optional reason for forgetting this memory
   */
  reason?: string;
}

export interface MemoryUpdateMemoryParams {
  /**
   * Container tag / space identifier. Required to scope the operation.
   */
  containerTag: string;

  /**
   * The new content that will replace the existing memory
   */
  newContent: string;

  /**
   * ID of the memory entry to operate on
   */
  id?: string;

  /**
   * Exact content match of the memory entry to operate on. Use this when you don't
   * have the ID.
   */
  content?: string;

  /**
   * Optional metadata. If not provided, inherits from the previous version.
   */
  metadata?: { [key: string]: string | number | boolean | Array<string> };
}

export declare namespace Memories {
  export {
    type MemoryForgetResponse as MemoryForgetResponse,
    type MemoryUpdateMemoryResponse as MemoryUpdateMemoryResponse,
    type MemoryForgetParams as MemoryForgetParams,
    type MemoryUpdateMemoryParams as MemoryUpdateMemoryParams,
  };
}
