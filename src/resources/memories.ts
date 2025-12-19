// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { type Uploadable } from '../core/uploads';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

export class Memories extends APIResource {
  /**
   * Update a document with any content type (text, url, file, etc.) and metadata
   *
   * @example
   * ```ts
   * const memory = await client.memories.update('id');
   * ```
   */
  update(
    id: string,
    body: MemoryUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MemoryUpdateResponse> {
    return this._client.patch(path`/v3/documents/${id}`, { body, ...options });
  }

  /**
   * Retrieves a paginated list of documents with their metadata and workflow status
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
    return this._client.post('/v3/documents/list', { body, ...options });
  }

  /**
   * Delete a document by ID or customId
   *
   * @example
   * ```ts
   * await client.memories.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v3/documents/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Add a document with any content type (text, url, file, etc.) and metadata
   *
   * @example
   * ```ts
   * const response = await client.memories.add({
   *   content: 'content',
   * });
   * ```
   */
  add(body: MemoryAddParams, options?: RequestOptions): APIPromise<MemoryAddResponse> {
    return this._client.post('/v3/documents', { body, ...options });
  }

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
   * Get a document by ID
   *
   * @example
   * ```ts
   * const memory = await client.memories.get('id');
   * ```
   */
  get(id: string, options?: RequestOptions): APIPromise<MemoryGetResponse> {
    return this._client.get(path`/v3/documents/${id}`, options);
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

  /**
   * Upload a file to be processed
   *
   * @example
   * ```ts
   * const response = await client.memories.uploadFile({
   *   file: fs.createReadStream('path/to/file'),
   * });
   * ```
   */
  uploadFile(body: MemoryUploadFileParams, options?: RequestOptions): APIPromise<MemoryUploadFileResponse> {
    return this._client.post(
      '/v3/documents/file',
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

export interface MemoryUpdateResponse {
  /**
   * Unique identifier of the document
   */
  id: string;

  /**
   * Status of the document
   */
  status: string;
}

/**
 * List of documents
 */
export interface MemoryListResponse {
  memories: Array<MemoryListResponse.Memory>;

  /**
   * Pagination metadata
   */
  pagination: MemoryListResponse.Pagination;
}

export namespace MemoryListResponse {
  export interface Memory {
    /**
     * Unique identifier of the document.
     */
    id: string;

    /**
     * Optional ID of connection the document was created from. This is useful for
     * identifying the source of the document.
     */
    connectionId: string | null;

    /**
     * Creation timestamp
     */
    createdAt: string;

    /**
     * Optional custom ID of the document. This could be an ID from your database that
     * will uniquely identify this document.
     */
    customId: string | null;

    /**
     * Optional metadata for the document. This is used to store additional information
     * about the document. You can use this to store any additional information you
     * need about the document. Metadata can be filtered through. Keys must be strings
     * and are case sensitive. Values can be strings, numbers, or booleans. You cannot
     * nest objects.
     */
    metadata: string | number | boolean | { [key: string]: unknown } | Array<unknown> | null;

    /**
     * Status of the document
     */
    status: 'unknown' | 'queued' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'done' | 'failed';

    /**
     * Summary of the document content
     */
    summary: string | null;

    /**
     * Title of the document
     */
    title: string | null;

    /**
     * Type of the document
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
      | 'onedrive'
      | 'github_markdown';

    /**
     * Last update timestamp
     */
    updatedAt: string;

    /**
     * Optional tags this document should be containerized by. This can be an ID for
     * your user, a project ID, or any other identifier you wish to use to group
     * documents.
     */
    containerTags?: Array<string>;

    /**
     * Content of the document (only included when includeContent=true)
     */
    content?: string;
  }

  /**
   * Pagination metadata
   */
  export interface Pagination {
    currentPage: number;

    totalItems: number;

    totalPages: number;

    limit?: number;
  }
}

export interface MemoryAddResponse {
  /**
   * Unique identifier of the document
   */
  id: string;

  /**
   * Status of the document
   */
  status: string;
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
 * Document object
 */
export interface MemoryGetResponse {
  /**
   * Unique identifier of the document.
   */
  id: string;

  /**
   * Optional ID of connection the document was created from. This is useful for
   * identifying the source of the document.
   */
  connectionId: string | null;

  /**
   * The content to extract and process into a document. This can be a URL to a
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
   * Optional custom ID of the document. This could be an ID from your database that
   * will uniquely identify this document.
   */
  customId: string | null;

  /**
   * Optional metadata for the document. This is used to store additional information
   * about the document. You can use this to store any additional information you
   * need about the document. Metadata can be filtered through. Keys must be strings
   * and are case sensitive. Values can be strings, numbers, or booleans. You cannot
   * nest objects.
   */
  metadata: string | number | boolean | { [key: string]: unknown } | Array<unknown> | null;

  ogImage: string | null;

  /**
   * Raw content of the document
   */
  raw: unknown;

  /**
   * Source of the document
   */
  source: string | null;

  /**
   * Status of the document
   */
  status: 'unknown' | 'queued' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'done' | 'failed';

  /**
   * Summary of the document content
   */
  summary: string | null;

  summaryEmbeddingModel: string | null;

  summaryEmbeddingModelNew: string | null;

  summaryEmbeddingNew: Array<number> | null;

  /**
   * Title of the document
   */
  title: string | null;

  /**
   * Type of the document
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
    | 'onedrive'
    | 'github_markdown';

  /**
   * Last update timestamp
   */
  updatedAt: string;

  /**
   * Optional tags this document should be containerized by. This can be an ID for
   * your user, a project ID, or any other identifier you wish to use to group
   * documents.
   */
  containerTags?: Array<string>;

  /**
   * URL of the document
   */
  url?: string | null;
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

export interface MemoryUploadFileResponse {
  /**
   * Unique identifier of the document
   */
  id: string;

  /**
   * Status of the document
   */
  status: string;
}

export interface MemoryUpdateParams {
  /**
   * Optional tag this document should be containerized by. This can be an ID for
   * your user, a project ID, or any other identifier you wish to use to group
   * documents.
   */
  containerTag?: string;

  /**
   * @deprecated (DEPRECATED: Use containerTag instead) Optional tags this document
   * should be containerized by. This can be an ID for your user, a project ID, or
   * any other identifier you wish to use to group documents.
   */
  containerTags?: Array<string>;

  /**
   * The content to extract and process into a document. This can be a URL to a
   * website, a PDF, an image, or a video.
   *
   * Plaintext: Any plaintext format
   *
   * URL: A URL to a website, PDF, image, or video
   *
   * We automatically detect the content type from the url's response format.
   */
  content?: string;

  /**
   * Optional custom ID of the document. This could be an ID from your database that
   * will uniquely identify this document.
   */
  customId?: string;

  /**
   * Optional metadata for the document. This is used to store additional information
   * about the document. You can use this to store any additional information you
   * need about the document. Metadata can be filtered through. Keys must be strings
   * and are case sensitive. Values can be strings, numbers, or booleans. You cannot
   * nest objects.
   */
  metadata?: { [key: string]: string | number | boolean | Array<string> };
}

export interface MemoryListParams {
  /**
   * Optional tags this document should be containerized by. This can be an ID for
   * your user, a project ID, or any other identifier you wish to use to group
   * documents.
   */
  containerTags?: Array<string>;

  /**
   * Optional filters to apply to the search. Can be a JSON string or Query object.
   */
  filters?: MemoryListParams.Or | MemoryListParams.And;

  /**
   * Whether to include the content field in the response. Warning: This can make
   * responses significantly larger.
   */
  includeContent?: boolean;

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

export namespace MemoryListParams {
  export interface Or {
    /**
     * Array of OR filter expressions
     */
    OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
  }

  export namespace Or {
    /**
     * A single filter condition based on metadata, numeric values, array contents, or
     * string matching
     */
    export interface UnionMember0 {
      key: string;

      value: string;

      filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

      ignoreCase?: boolean | 'true' | 'false';

      negate?: boolean | 'true' | 'false';

      numericOperator?: '>' | '<' | '>=' | '<=' | '=';
    }

    export interface Or {
      /**
       * OR: Array of conditions or nested expressions
       */
      OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
    }

    export namespace Or {
      /**
       * A single filter condition based on metadata, numeric values, array contents, or
       * string matching
       */
      export interface UnionMember0 {
        key: string;

        value: string;

        filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

        ignoreCase?: boolean | 'true' | 'false';

        negate?: boolean | 'true' | 'false';

        numericOperator?: '>' | '<' | '>=' | '<=' | '=';
      }

      export interface Or {
        /**
         * OR: Array of conditions or nested expressions
         */
        OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
      }

      export namespace Or {
        /**
         * A single filter condition based on metadata, numeric values, array contents, or
         * string matching
         */
        export interface UnionMember0 {
          key: string;

          value: string;

          filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

          ignoreCase?: boolean | 'true' | 'false';

          negate?: boolean | 'true' | 'false';

          numericOperator?: '>' | '<' | '>=' | '<=' | '=';
        }

        export interface Or {
          /**
           * OR: Array of conditions or nested expressions
           */
          OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
        }

        export namespace Or {
          /**
           * A single filter condition based on metadata, numeric values, array contents, or
           * string matching
           */
          export interface UnionMember0 {
            key: string;

            value: string;

            filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

            ignoreCase?: boolean | 'true' | 'false';

            negate?: boolean | 'true' | 'false';

            numericOperator?: '>' | '<' | '>=' | '<=' | '=';
          }

          export interface Or {
            /**
             * OR: Array of conditions or nested expressions
             */
            OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
          }

          export namespace Or {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }

          export interface And {
            /**
             * AND: Array of conditions or nested expressions
             */
            AND: Array<And.UnionMember0 | And.Or | And.And>;
          }

          export namespace And {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }
        }

        export interface And {
          /**
           * AND: Array of conditions or nested expressions
           */
          AND: Array<And.UnionMember0 | And.Or | And.And>;
        }

        export namespace And {
          /**
           * A single filter condition based on metadata, numeric values, array contents, or
           * string matching
           */
          export interface UnionMember0 {
            key: string;

            value: string;

            filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

            ignoreCase?: boolean | 'true' | 'false';

            negate?: boolean | 'true' | 'false';

            numericOperator?: '>' | '<' | '>=' | '<=' | '=';
          }

          export interface Or {
            /**
             * OR: Array of conditions or nested expressions
             */
            OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
          }

          export namespace Or {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }

          export interface And {
            /**
             * AND: Array of conditions or nested expressions
             */
            AND: Array<And.UnionMember0 | And.Or | And.And>;
          }

          export namespace And {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }
        }
      }

      export interface And {
        /**
         * AND: Array of conditions or nested expressions
         */
        AND: Array<And.UnionMember0 | And.Or | And.And>;
      }

      export namespace And {
        /**
         * A single filter condition based on metadata, numeric values, array contents, or
         * string matching
         */
        export interface UnionMember0 {
          key: string;

          value: string;

          filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

          ignoreCase?: boolean | 'true' | 'false';

          negate?: boolean | 'true' | 'false';

          numericOperator?: '>' | '<' | '>=' | '<=' | '=';
        }

        export interface Or {
          /**
           * OR: Array of conditions or nested expressions
           */
          OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
        }

        export namespace Or {
          /**
           * A single filter condition based on metadata, numeric values, array contents, or
           * string matching
           */
          export interface UnionMember0 {
            key: string;

            value: string;

            filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

            ignoreCase?: boolean | 'true' | 'false';

            negate?: boolean | 'true' | 'false';

            numericOperator?: '>' | '<' | '>=' | '<=' | '=';
          }

          export interface Or {
            /**
             * OR: Array of conditions or nested expressions
             */
            OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
          }

          export namespace Or {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }

          export interface And {
            /**
             * AND: Array of conditions or nested expressions
             */
            AND: Array<And.UnionMember0 | And.Or | And.And>;
          }

          export namespace And {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }
        }

        export interface And {
          /**
           * AND: Array of conditions or nested expressions
           */
          AND: Array<And.UnionMember0 | And.Or | And.And>;
        }

        export namespace And {
          /**
           * A single filter condition based on metadata, numeric values, array contents, or
           * string matching
           */
          export interface UnionMember0 {
            key: string;

            value: string;

            filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

            ignoreCase?: boolean | 'true' | 'false';

            negate?: boolean | 'true' | 'false';

            numericOperator?: '>' | '<' | '>=' | '<=' | '=';
          }

          export interface Or {
            /**
             * OR: Array of conditions or nested expressions
             */
            OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
          }

          export namespace Or {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }

          export interface And {
            /**
             * AND: Array of conditions or nested expressions
             */
            AND: Array<And.UnionMember0 | And.Or | And.And>;
          }

          export namespace And {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }
        }
      }
    }

    export interface And {
      /**
       * AND: Array of conditions or nested expressions
       */
      AND: Array<And.UnionMember0 | And.Or | And.And>;
    }

    export namespace And {
      /**
       * A single filter condition based on metadata, numeric values, array contents, or
       * string matching
       */
      export interface UnionMember0 {
        key: string;

        value: string;

        filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

        ignoreCase?: boolean | 'true' | 'false';

        negate?: boolean | 'true' | 'false';

        numericOperator?: '>' | '<' | '>=' | '<=' | '=';
      }

      export interface Or {
        /**
         * OR: Array of conditions or nested expressions
         */
        OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
      }

      export namespace Or {
        /**
         * A single filter condition based on metadata, numeric values, array contents, or
         * string matching
         */
        export interface UnionMember0 {
          key: string;

          value: string;

          filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

          ignoreCase?: boolean | 'true' | 'false';

          negate?: boolean | 'true' | 'false';

          numericOperator?: '>' | '<' | '>=' | '<=' | '=';
        }

        export interface Or {
          /**
           * OR: Array of conditions or nested expressions
           */
          OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
        }

        export namespace Or {
          /**
           * A single filter condition based on metadata, numeric values, array contents, or
           * string matching
           */
          export interface UnionMember0 {
            key: string;

            value: string;

            filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

            ignoreCase?: boolean | 'true' | 'false';

            negate?: boolean | 'true' | 'false';

            numericOperator?: '>' | '<' | '>=' | '<=' | '=';
          }

          export interface Or {
            /**
             * OR: Array of conditions or nested expressions
             */
            OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
          }

          export namespace Or {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }

          export interface And {
            /**
             * AND: Array of conditions or nested expressions
             */
            AND: Array<And.UnionMember0 | And.Or | And.And>;
          }

          export namespace And {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }
        }

        export interface And {
          /**
           * AND: Array of conditions or nested expressions
           */
          AND: Array<And.UnionMember0 | And.Or | And.And>;
        }

        export namespace And {
          /**
           * A single filter condition based on metadata, numeric values, array contents, or
           * string matching
           */
          export interface UnionMember0 {
            key: string;

            value: string;

            filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

            ignoreCase?: boolean | 'true' | 'false';

            negate?: boolean | 'true' | 'false';

            numericOperator?: '>' | '<' | '>=' | '<=' | '=';
          }

          export interface Or {
            /**
             * OR: Array of conditions or nested expressions
             */
            OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
          }

          export namespace Or {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }

          export interface And {
            /**
             * AND: Array of conditions or nested expressions
             */
            AND: Array<And.UnionMember0 | And.Or | And.And>;
          }

          export namespace And {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }
        }
      }

      export interface And {
        /**
         * AND: Array of conditions or nested expressions
         */
        AND: Array<And.UnionMember0 | And.Or | And.And>;
      }

      export namespace And {
        /**
         * A single filter condition based on metadata, numeric values, array contents, or
         * string matching
         */
        export interface UnionMember0 {
          key: string;

          value: string;

          filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

          ignoreCase?: boolean | 'true' | 'false';

          negate?: boolean | 'true' | 'false';

          numericOperator?: '>' | '<' | '>=' | '<=' | '=';
        }

        export interface Or {
          /**
           * OR: Array of conditions or nested expressions
           */
          OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
        }

        export namespace Or {
          /**
           * A single filter condition based on metadata, numeric values, array contents, or
           * string matching
           */
          export interface UnionMember0 {
            key: string;

            value: string;

            filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

            ignoreCase?: boolean | 'true' | 'false';

            negate?: boolean | 'true' | 'false';

            numericOperator?: '>' | '<' | '>=' | '<=' | '=';
          }

          export interface Or {
            /**
             * OR: Array of conditions or nested expressions
             */
            OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
          }

          export namespace Or {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }

          export interface And {
            /**
             * AND: Array of conditions or nested expressions
             */
            AND: Array<And.UnionMember0 | And.Or | And.And>;
          }

          export namespace And {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }
        }

        export interface And {
          /**
           * AND: Array of conditions or nested expressions
           */
          AND: Array<And.UnionMember0 | And.Or | And.And>;
        }

        export namespace And {
          /**
           * A single filter condition based on metadata, numeric values, array contents, or
           * string matching
           */
          export interface UnionMember0 {
            key: string;

            value: string;

            filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

            ignoreCase?: boolean | 'true' | 'false';

            negate?: boolean | 'true' | 'false';

            numericOperator?: '>' | '<' | '>=' | '<=' | '=';
          }

          export interface Or {
            /**
             * OR: Array of conditions or nested expressions
             */
            OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
          }

          export namespace Or {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }

          export interface And {
            /**
             * AND: Array of conditions or nested expressions
             */
            AND: Array<And.UnionMember0 | And.Or | And.And>;
          }

          export namespace And {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }
        }
      }
    }
  }

  export interface And {
    /**
     * Array of AND filter expressions
     */
    AND: Array<And.UnionMember0 | And.Or | And.And>;
  }

  export namespace And {
    /**
     * A single filter condition based on metadata, numeric values, array contents, or
     * string matching
     */
    export interface UnionMember0 {
      key: string;

      value: string;

      filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

      ignoreCase?: boolean | 'true' | 'false';

      negate?: boolean | 'true' | 'false';

      numericOperator?: '>' | '<' | '>=' | '<=' | '=';
    }

    export interface Or {
      /**
       * OR: Array of conditions or nested expressions
       */
      OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
    }

    export namespace Or {
      /**
       * A single filter condition based on metadata, numeric values, array contents, or
       * string matching
       */
      export interface UnionMember0 {
        key: string;

        value: string;

        filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

        ignoreCase?: boolean | 'true' | 'false';

        negate?: boolean | 'true' | 'false';

        numericOperator?: '>' | '<' | '>=' | '<=' | '=';
      }

      export interface Or {
        /**
         * OR: Array of conditions or nested expressions
         */
        OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
      }

      export namespace Or {
        /**
         * A single filter condition based on metadata, numeric values, array contents, or
         * string matching
         */
        export interface UnionMember0 {
          key: string;

          value: string;

          filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

          ignoreCase?: boolean | 'true' | 'false';

          negate?: boolean | 'true' | 'false';

          numericOperator?: '>' | '<' | '>=' | '<=' | '=';
        }

        export interface Or {
          /**
           * OR: Array of conditions or nested expressions
           */
          OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
        }

        export namespace Or {
          /**
           * A single filter condition based on metadata, numeric values, array contents, or
           * string matching
           */
          export interface UnionMember0 {
            key: string;

            value: string;

            filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

            ignoreCase?: boolean | 'true' | 'false';

            negate?: boolean | 'true' | 'false';

            numericOperator?: '>' | '<' | '>=' | '<=' | '=';
          }

          export interface Or {
            /**
             * OR: Array of conditions or nested expressions
             */
            OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
          }

          export namespace Or {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }

          export interface And {
            /**
             * AND: Array of conditions or nested expressions
             */
            AND: Array<And.UnionMember0 | And.Or | And.And>;
          }

          export namespace And {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }
        }

        export interface And {
          /**
           * AND: Array of conditions or nested expressions
           */
          AND: Array<And.UnionMember0 | And.Or | And.And>;
        }

        export namespace And {
          /**
           * A single filter condition based on metadata, numeric values, array contents, or
           * string matching
           */
          export interface UnionMember0 {
            key: string;

            value: string;

            filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

            ignoreCase?: boolean | 'true' | 'false';

            negate?: boolean | 'true' | 'false';

            numericOperator?: '>' | '<' | '>=' | '<=' | '=';
          }

          export interface Or {
            /**
             * OR: Array of conditions or nested expressions
             */
            OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
          }

          export namespace Or {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }

          export interface And {
            /**
             * AND: Array of conditions or nested expressions
             */
            AND: Array<And.UnionMember0 | And.Or | And.And>;
          }

          export namespace And {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }
        }
      }

      export interface And {
        /**
         * AND: Array of conditions or nested expressions
         */
        AND: Array<And.UnionMember0 | And.Or | And.And>;
      }

      export namespace And {
        /**
         * A single filter condition based on metadata, numeric values, array contents, or
         * string matching
         */
        export interface UnionMember0 {
          key: string;

          value: string;

          filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

          ignoreCase?: boolean | 'true' | 'false';

          negate?: boolean | 'true' | 'false';

          numericOperator?: '>' | '<' | '>=' | '<=' | '=';
        }

        export interface Or {
          /**
           * OR: Array of conditions or nested expressions
           */
          OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
        }

        export namespace Or {
          /**
           * A single filter condition based on metadata, numeric values, array contents, or
           * string matching
           */
          export interface UnionMember0 {
            key: string;

            value: string;

            filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

            ignoreCase?: boolean | 'true' | 'false';

            negate?: boolean | 'true' | 'false';

            numericOperator?: '>' | '<' | '>=' | '<=' | '=';
          }

          export interface Or {
            /**
             * OR: Array of conditions or nested expressions
             */
            OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
          }

          export namespace Or {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }

          export interface And {
            /**
             * AND: Array of conditions or nested expressions
             */
            AND: Array<And.UnionMember0 | And.Or | And.And>;
          }

          export namespace And {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }
        }

        export interface And {
          /**
           * AND: Array of conditions or nested expressions
           */
          AND: Array<And.UnionMember0 | And.Or | And.And>;
        }

        export namespace And {
          /**
           * A single filter condition based on metadata, numeric values, array contents, or
           * string matching
           */
          export interface UnionMember0 {
            key: string;

            value: string;

            filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

            ignoreCase?: boolean | 'true' | 'false';

            negate?: boolean | 'true' | 'false';

            numericOperator?: '>' | '<' | '>=' | '<=' | '=';
          }

          export interface Or {
            /**
             * OR: Array of conditions or nested expressions
             */
            OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
          }

          export namespace Or {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }

          export interface And {
            /**
             * AND: Array of conditions or nested expressions
             */
            AND: Array<And.UnionMember0 | And.Or | And.And>;
          }

          export namespace And {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }
        }
      }
    }

    export interface And {
      /**
       * AND: Array of conditions or nested expressions
       */
      AND: Array<And.UnionMember0 | And.Or | And.And>;
    }

    export namespace And {
      /**
       * A single filter condition based on metadata, numeric values, array contents, or
       * string matching
       */
      export interface UnionMember0 {
        key: string;

        value: string;

        filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

        ignoreCase?: boolean | 'true' | 'false';

        negate?: boolean | 'true' | 'false';

        numericOperator?: '>' | '<' | '>=' | '<=' | '=';
      }

      export interface Or {
        /**
         * OR: Array of conditions or nested expressions
         */
        OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
      }

      export namespace Or {
        /**
         * A single filter condition based on metadata, numeric values, array contents, or
         * string matching
         */
        export interface UnionMember0 {
          key: string;

          value: string;

          filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

          ignoreCase?: boolean | 'true' | 'false';

          negate?: boolean | 'true' | 'false';

          numericOperator?: '>' | '<' | '>=' | '<=' | '=';
        }

        export interface Or {
          /**
           * OR: Array of conditions or nested expressions
           */
          OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
        }

        export namespace Or {
          /**
           * A single filter condition based on metadata, numeric values, array contents, or
           * string matching
           */
          export interface UnionMember0 {
            key: string;

            value: string;

            filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

            ignoreCase?: boolean | 'true' | 'false';

            negate?: boolean | 'true' | 'false';

            numericOperator?: '>' | '<' | '>=' | '<=' | '=';
          }

          export interface Or {
            /**
             * OR: Array of conditions or nested expressions
             */
            OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
          }

          export namespace Or {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }

          export interface And {
            /**
             * AND: Array of conditions or nested expressions
             */
            AND: Array<And.UnionMember0 | And.Or | And.And>;
          }

          export namespace And {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }
        }

        export interface And {
          /**
           * AND: Array of conditions or nested expressions
           */
          AND: Array<And.UnionMember0 | And.Or | And.And>;
        }

        export namespace And {
          /**
           * A single filter condition based on metadata, numeric values, array contents, or
           * string matching
           */
          export interface UnionMember0 {
            key: string;

            value: string;

            filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

            ignoreCase?: boolean | 'true' | 'false';

            negate?: boolean | 'true' | 'false';

            numericOperator?: '>' | '<' | '>=' | '<=' | '=';
          }

          export interface Or {
            /**
             * OR: Array of conditions or nested expressions
             */
            OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
          }

          export namespace Or {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }

          export interface And {
            /**
             * AND: Array of conditions or nested expressions
             */
            AND: Array<And.UnionMember0 | And.Or | And.And>;
          }

          export namespace And {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }
        }
      }

      export interface And {
        /**
         * AND: Array of conditions or nested expressions
         */
        AND: Array<And.UnionMember0 | And.Or | And.And>;
      }

      export namespace And {
        /**
         * A single filter condition based on metadata, numeric values, array contents, or
         * string matching
         */
        export interface UnionMember0 {
          key: string;

          value: string;

          filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

          ignoreCase?: boolean | 'true' | 'false';

          negate?: boolean | 'true' | 'false';

          numericOperator?: '>' | '<' | '>=' | '<=' | '=';
        }

        export interface Or {
          /**
           * OR: Array of conditions or nested expressions
           */
          OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
        }

        export namespace Or {
          /**
           * A single filter condition based on metadata, numeric values, array contents, or
           * string matching
           */
          export interface UnionMember0 {
            key: string;

            value: string;

            filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

            ignoreCase?: boolean | 'true' | 'false';

            negate?: boolean | 'true' | 'false';

            numericOperator?: '>' | '<' | '>=' | '<=' | '=';
          }

          export interface Or {
            /**
             * OR: Array of conditions or nested expressions
             */
            OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
          }

          export namespace Or {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }

          export interface And {
            /**
             * AND: Array of conditions or nested expressions
             */
            AND: Array<And.UnionMember0 | And.Or | And.And>;
          }

          export namespace And {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }
        }

        export interface And {
          /**
           * AND: Array of conditions or nested expressions
           */
          AND: Array<And.UnionMember0 | And.Or | And.And>;
        }

        export namespace And {
          /**
           * A single filter condition based on metadata, numeric values, array contents, or
           * string matching
           */
          export interface UnionMember0 {
            key: string;

            value: string;

            filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

            ignoreCase?: boolean | 'true' | 'false';

            negate?: boolean | 'true' | 'false';

            numericOperator?: '>' | '<' | '>=' | '<=' | '=';
          }

          export interface Or {
            /**
             * OR: Array of conditions or nested expressions
             */
            OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
          }

          export namespace Or {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }

          export interface And {
            /**
             * AND: Array of conditions or nested expressions
             */
            AND: Array<And.UnionMember0 | And.Or | And.And>;
          }

          export namespace And {
            /**
             * A single filter condition based on metadata, numeric values, array contents, or
             * string matching
             */
            export interface UnionMember0 {
              key: string;

              value: string;

              filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

              ignoreCase?: boolean | 'true' | 'false';

              negate?: boolean | 'true' | 'false';

              numericOperator?: '>' | '<' | '>=' | '<=' | '=';
            }

            export interface Or {
              /**
               * OR: Array of conditions
               */
              OR: Array<Or.Or>;
            }

            export namespace Or {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface Or {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }

            export interface And {
              /**
               * AND: Array of conditions
               */
              AND: Array<And.And>;
            }

            export namespace And {
              /**
               * A single filter condition based on metadata, numeric values, array contents, or
               * string matching
               */
              export interface And {
                key: string;

                value: string;

                filterType?: 'metadata' | 'numeric' | 'array_contains' | 'string_contains';

                ignoreCase?: boolean | 'true' | 'false';

                negate?: boolean | 'true' | 'false';

                numericOperator?: '>' | '<' | '>=' | '<=' | '=';
              }
            }
          }
        }
      }
    }
  }
}

export interface MemoryAddParams {
  /**
   * The content to extract and process into a document. This can be a URL to a
   * website, a PDF, an image, or a video.
   */
  content: string;

  /**
   * Optional tag this document should be containerized by. Max 100 characters,
   * alphanumeric with hyphens and underscores only.
   */
  containerTag?: string;

  /**
   * @deprecated
   */
  containerTags?: Array<string>;

  /**
   * Optional custom ID of the document. Max 100 characters, alphanumeric with
   * hyphens and underscores only.
   */
  customId?: string;

  /**
   * Optional metadata for the document.
   */
  metadata?: { [key: string]: string | number | boolean | Array<string> };
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

export interface MemoryUploadFileParams {
  /**
   * File to upload and process
   */
  file: Uploadable;

  /**
   * Optional container tags. Can be either a JSON string of an array (e.g.,
   * '["user_123", "project_123"]') or a single string (e.g., 'user_123'). Single
   * strings will be automatically converted to an array.
   */
  containerTags?: string;

  /**
   * Optional file type override to force specific processing behavior. Valid values:
   * text, pdf, tweet, google_doc, google_slide, google_sheet, image, video,
   * notion_doc, webpage, onedrive
   */
  fileType?: string;

  /**
   * Optional metadata for the document as a JSON string. This is used to store
   * additional information about the document. Keys must be strings and values can
   * be strings, numbers, or booleans.
   */
  metadata?: string;

  /**
   * Required when fileType is 'image' or 'video'. Specifies the exact MIME type to
   * use (e.g., 'image/png', 'image/jpeg', 'video/mp4', 'video/webm')
   */
  mimeType?: string;

  /**
   * Use advanced processing with Reducto for better PDF extraction and chunking.
   * This costs 3x tokens but provides superior quality for complex documents.
   */
  useAdvancedProcessing?: string;
}

export declare namespace Memories {
  export {
    type MemoryUpdateResponse as MemoryUpdateResponse,
    type MemoryListResponse as MemoryListResponse,
    type MemoryAddResponse as MemoryAddResponse,
    type MemoryForgetResponse as MemoryForgetResponse,
    type MemoryGetResponse as MemoryGetResponse,
    type MemoryUpdateMemoryResponse as MemoryUpdateMemoryResponse,
    type MemoryUploadFileResponse as MemoryUploadFileResponse,
    type MemoryUpdateParams as MemoryUpdateParams,
    type MemoryListParams as MemoryListParams,
    type MemoryAddParams as MemoryAddParams,
    type MemoryForgetParams as MemoryForgetParams,
    type MemoryUpdateMemoryParams as MemoryUpdateMemoryParams,
    type MemoryUploadFileParams as MemoryUploadFileParams,
  };
}
