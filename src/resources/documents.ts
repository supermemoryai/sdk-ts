// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { type Uploadable } from '../core/uploads';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

export class Documents extends APIResource {
  /**
   * Update a document with any content type (text, url, file, etc.) and metadata
   *
   * @example
   * ```ts
   * const document = await client.documents.update('id');
   * ```
   */
  update(
    id: string,
    body: DocumentUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DocumentUpdateResponse> {
    return this._client.patch(path`/v3/documents/${id}`, { body, ...options });
  }

  /**
   * Retrieves a paginated list of documents with their metadata and workflow status
   *
   * @example
   * ```ts
   * const documents = await client.documents.list();
   * ```
   */
  list(
    body: DocumentListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DocumentListResponse> {
    return this._client.post('/v3/documents/list', { body, ...options });
  }

  /**
   * Delete a document by ID or customId
   *
   * @example
   * ```ts
   * await client.documents.delete('id');
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
   * const response = await client.documents.add({
   *   content: 'content',
   * });
   * ```
   */
  add(body: DocumentAddParams, options?: RequestOptions): APIPromise<DocumentAddResponse> {
    return this._client.post('/v3/documents', { body, ...options });
  }

  /**
   * Add multiple documents in a single request. Each document can have any content
   * type (text, url, file, etc.) and metadata
   *
   * @example
   * ```ts
   * const response = await client.documents.batchAdd({
   *   documents: [
   *     {
   *       content:
   *         'This is a detailed article about machine learning concepts...',
   *     },
   *   ],
   * });
   * ```
   */
  batchAdd(body: DocumentBatchAddParams, options?: RequestOptions): APIPromise<DocumentBatchAddResponse> {
    return this._client.post('/v3/documents/batch', { body, ...options });
  }

  /**
   * Bulk delete documents by IDs or container tags
   *
   * @example
   * ```ts
   * const response = await client.documents.deleteBulk();
   * ```
   */
  deleteBulk(
    body: DocumentDeleteBulkParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DocumentDeleteBulkResponse> {
    return this._client.delete('/v3/documents/bulk', { body, ...options });
  }

  /**
   * Get a document by ID
   *
   * @example
   * ```ts
   * const document = await client.documents.get('id');
   * ```
   */
  get(id: string, options?: RequestOptions): APIPromise<DocumentGetResponse> {
    return this._client.get(path`/v3/documents/${id}`, options);
  }

  /**
   * Get documents that are currently being processed
   *
   * @example
   * ```ts
   * const response = await client.documents.listProcessing();
   * ```
   */
  listProcessing(options?: RequestOptions): APIPromise<DocumentListProcessingResponse> {
    return this._client.get('/v3/documents/processing', options);
  }

  /**
   * Upload a file to be processed
   *
   * @example
   * ```ts
   * const response = await client.documents.uploadFile({
   *   file: fs.createReadStream('path/to/file'),
   * });
   * ```
   */
  uploadFile(
    body: DocumentUploadFileParams,
    options?: RequestOptions,
  ): APIPromise<DocumentUploadFileResponse> {
    return this._client.post(
      '/v3/documents/file',
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

export interface DocumentUpdateResponse {
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
export interface DocumentListResponse {
  memories: Array<DocumentListResponse.Memory>;

  /**
   * Pagination metadata
   */
  pagination: DocumentListResponse.Pagination;
}

export namespace DocumentListResponse {
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
     * @deprecated Optional tags this document should be containerized by. This can be
     * an ID for your user, a project ID, or any other identifier you wish to use to
     * group documents.
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

export interface DocumentAddResponse {
  /**
   * Unique identifier of the document
   */
  id: string;

  /**
   * Status of the document
   */
  status: string;
}

export type DocumentBatchAddResponse = Array<DocumentBatchAddResponse.DocumentBatchAddResponseItem>;

export namespace DocumentBatchAddResponse {
  export interface DocumentBatchAddResponseItem {
    /**
     * Unique identifier of the document
     */
    id: string;

    /**
     * Status of the document
     */
    status: string;
  }
}

/**
 * Response for bulk document deletion
 */
export interface DocumentDeleteBulkResponse {
  /**
   * Number of documents successfully deleted
   */
  deletedCount: number;

  /**
   * Whether the bulk deletion was successful
   */
  success: boolean;

  /**
   * @deprecated Container tags that were processed (only applicable when deleting by
   * container tags)
   */
  containerTags?: Array<string>;

  /**
   * Array of errors for documents that couldn't be deleted (only applicable when
   * deleting by IDs)
   */
  errors?: Array<DocumentDeleteBulkResponse.Error>;
}

export namespace DocumentDeleteBulkResponse {
  export interface Error {
    id: string;

    error: string;
  }
}

/**
 * Document object
 */
export interface DocumentGetResponse {
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

  spatialPoint: unknown;

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
   * @deprecated Optional tags this document should be containerized by. This can be
   * an ID for your user, a project ID, or any other identifier you wish to use to
   * group documents.
   */
  containerTags?: Array<string>;

  /**
   * URL of the document
   */
  url?: string | null;
}

/**
 * List of documents currently being processed
 */
export interface DocumentListProcessingResponse {
  documents: Array<DocumentListProcessingResponse.Document>;

  /**
   * Total number of processing documents
   */
  totalCount: number;
}

export namespace DocumentListProcessingResponse {
  export interface Document {
    /**
     * Unique identifier of the document.
     */
    id: string;

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
     * @deprecated Optional tags this document should be containerized by. This can be
     * an ID for your user, a project ID, or any other identifier you wish to use to
     * group documents.
     */
    containerTags?: Array<string>;
  }
}

export interface DocumentUploadFileResponse {
  /**
   * Unique identifier of the document
   */
  id: string;

  /**
   * Status of the document
   */
  status: string;
}

export interface DocumentUpdateParams {
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

export interface DocumentListParams {
  /**
   * @deprecated Optional tags this document should be containerized by. This can be
   * an ID for your user, a project ID, or any other identifier you wish to use to
   * group documents.
   */
  containerTags?: Array<string>;

  /**
   * Optional filters to apply to the search. Can be a JSON string or Query object.
   */
  filters?: DocumentListParams.Or | DocumentListParams.And;

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

export namespace DocumentListParams {
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

export interface DocumentAddParams {
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
   * Optional entity context for this container tag. Max 1500 characters. Used during
   * document processing to guide memory extraction.
   */
  entityContext?: string;

  /**
   * Optional metadata for the document.
   */
  metadata?: { [key: string]: string | number | boolean | Array<string> };
}

export interface DocumentBatchAddParams {
  documents: Array<DocumentBatchAddParams.UnionMember0> | Array<string>;

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

  content?: null;

  /**
   * Optional metadata for the document. This is used to store additional information
   * about the document. You can use this to store any additional information you
   * need about the document. Metadata can be filtered through. Keys must be strings
   * and are case sensitive. Values can be strings, numbers, or booleans. You cannot
   * nest objects.
   */
  metadata?: { [key: string]: string | number | boolean | Array<string> };
}

export namespace DocumentBatchAddParams {
  export interface UnionMember0 {
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
    content: string;

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
}

export interface DocumentDeleteBulkParams {
  /**
   * @deprecated Array of container tags - all documents in these containers will be
   * deleted
   */
  containerTags?: Array<string>;

  /**
   * Array of document IDs to delete (max 100 at once)
   */
  ids?: Array<string>;
}

export interface DocumentUploadFileParams {
  /**
   * File to upload and process
   */
  file: Uploadable;

  /**
   * @deprecated Optional container tags. Can be either a JSON string of an array
   * (e.g., '["user_123", "project_123"]') or a single string (e.g., 'user_123').
   * Single strings will be automatically converted to an array.
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
   * @deprecated DEPRECATED: This field is no longer used. Advanced PDF processing is
   * now automatic with our hybrid Mistral OCR + Gemini pipeline. This parameter will
   * be accepted but ignored for backwards compatibility.
   */
  useAdvancedProcessing?: string;
}

export declare namespace Documents {
  export {
    type DocumentUpdateResponse as DocumentUpdateResponse,
    type DocumentListResponse as DocumentListResponse,
    type DocumentAddResponse as DocumentAddResponse,
    type DocumentBatchAddResponse as DocumentBatchAddResponse,
    type DocumentDeleteBulkResponse as DocumentDeleteBulkResponse,
    type DocumentGetResponse as DocumentGetResponse,
    type DocumentListProcessingResponse as DocumentListProcessingResponse,
    type DocumentUploadFileResponse as DocumentUploadFileResponse,
    type DocumentUpdateParams as DocumentUpdateParams,
    type DocumentListParams as DocumentListParams,
    type DocumentAddParams as DocumentAddParams,
    type DocumentBatchAddParams as DocumentBatchAddParams,
    type DocumentDeleteBulkParams as DocumentDeleteBulkParams,
    type DocumentUploadFileParams as DocumentUploadFileParams,
  };
}
