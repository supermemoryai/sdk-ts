// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
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
   *   content:
   *     'This is a detailed article about machine learning concepts...',
   * });
   * ```
   */
  add(body: DocumentAddParams, options?: RequestOptions): APIPromise<DocumentAddResponse> {
    return this._client.post('/v3/documents', { body, ...options });
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
  id: string;

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
  /**
   * Document object
   */
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
      | 'onedrive';

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

    limit: number;

    totalItems: number;

    totalPages: number;
  }
}

export interface DocumentAddResponse {
  id: string;

  status: string;
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
    | 'onedrive';

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
   * Raw content of the document
   */
  raw?: null;

  /**
   * URL of the document
   */
  url?: string | null;
}

export interface DocumentUploadFileResponse {
  id: string;

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
   * Optional file type override to force specific processing behavior. Valid values:
   * text, pdf, tweet, google_doc, google_slide, google_sheet, image, video,
   * notion_doc, webpage, onedrive
   */
  fileType?: string;

  /**
   * Optional metadata for the document. This is used to store additional information
   * about the document. You can use this to store any additional information you
   * need about the document. Metadata can be filtered through. Keys must be strings
   * and are case sensitive. Values can be strings, numbers, or booleans. You cannot
   * nest objects.
   */
  metadata?: { [key: string]: string | number | boolean | Array<string> };

  /**
   * Required when fileType is 'image' or 'video'. Specifies the exact MIME type to
   * use (e.g., 'image/png', 'image/jpeg', 'video/mp4', 'video/webm')
   */
  mimeType?: string;
}

export interface DocumentListParams {
  /**
   * Optional tags this document should be containerized by. This can be an ID for
   * your user, a project ID, or any other identifier you wish to use to group
   * documents.
   */
  containerTags?: Array<string>;

  /**
   * Optional filters to apply to the search. Can be a JSON string or Query object.
   */
  filters?: Shared.Or | Shared.And;

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

export interface DocumentAddParams {
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
   * Optional file type override to force specific processing behavior. Valid values:
   * text, pdf, tweet, google_doc, google_slide, google_sheet, image, video,
   * notion_doc, webpage, onedrive
   */
  fileType?: string;

  /**
   * Optional metadata for the document. This is used to store additional information
   * about the document. You can use this to store any additional information you
   * need about the document. Metadata can be filtered through. Keys must be strings
   * and are case sensitive. Values can be strings, numbers, or booleans. You cannot
   * nest objects.
   */
  metadata?: { [key: string]: string | number | boolean | Array<string> };

  /**
   * Required when fileType is 'image' or 'video'. Specifies the exact MIME type to
   * use (e.g., 'image/png', 'image/jpeg', 'video/mp4', 'video/webm')
   */
  mimeType?: string;
}

export interface DocumentUploadFileParams {
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
}

export declare namespace Documents {
  export {
    type DocumentUpdateResponse as DocumentUpdateResponse,
    type DocumentListResponse as DocumentListResponse,
    type DocumentAddResponse as DocumentAddResponse,
    type DocumentGetResponse as DocumentGetResponse,
    type DocumentUploadFileResponse as DocumentUploadFileResponse,
    type DocumentUpdateParams as DocumentUpdateParams,
    type DocumentListParams as DocumentListParams,
    type DocumentAddParams as DocumentAddParams,
    type DocumentUploadFileParams as DocumentUploadFileParams,
  };
}
