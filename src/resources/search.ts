// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Search extends APIResource {
  /**
   * Search memories with advanced filtering
   *
   * @example
   * ```ts
   * const response = await client.search.documents({
   *   q: 'machine learning concepts',
   * });
   * ```
   */
  documents(body: SearchDocumentsParams, options?: RequestOptions): APIPromise<SearchDocumentsResponse> {
    return this._client.post('/v3/search', { body, ...options });
  }

  /**
   * Search memories with advanced filtering
   *
   * @example
   * ```ts
   * const response = await client.search.execute({
   *   q: 'machine learning concepts',
   * });
   * ```
   */
  execute(body: SearchExecuteParams, options?: RequestOptions): APIPromise<SearchExecuteResponse> {
    return this._client.post('/v3/search', { body, ...options });
  }

  /**
   * Search memory entries - Low latency for conversational
   *
   * @example
   * ```ts
   * const response = await client.search.memories({
   *   q: 'machine learning concepts',
   * });
   * ```
   */
  memories(body: SearchMemoriesParams, options?: RequestOptions): APIPromise<SearchMemoriesResponse> {
    return this._client.post('/v4/search', { body, ...options });
  }
}

export interface SearchDocumentsResponse {
  results: Array<SearchDocumentsResponse.Result>;

  timing: number;

  total: number;
}

export namespace SearchDocumentsResponse {
  export interface Result {
    /**
     * Matching content chunks from the document
     */
    chunks: Array<Result.Chunk>;

    /**
     * Document creation date
     */
    createdAt: string;

    /**
     * ID of the matching document
     */
    documentId: string;

    /**
     * Document metadata
     */
    metadata: { [key: string]: unknown } | null;

    /**
     * Relevance score of the match
     */
    score: number;

    /**
     * Document title
     */
    title: string | null;

    /**
     * Document type
     */
    type: string | null;

    /**
     * Document last update date
     */
    updatedAt: string;

    /**
     * Full document content (only included when includeFullDocs=true)
     */
    content?: string | null;

    /**
     * Document summary
     */
    summary?: string | null;
  }

  export namespace Result {
    /**
     * Matching content chunk
     */
    export interface Chunk {
      /**
       * Content of the matching chunk
       */
      content: string;

      /**
       * Whether this chunk is relevant to the query
       */
      isRelevant: boolean;

      /**
       * Similarity score for this chunk
       */
      score: number;
    }
  }
}

export interface SearchExecuteResponse {
  results: Array<SearchExecuteResponse.Result>;

  timing: number;

  total: number;
}

export namespace SearchExecuteResponse {
  export interface Result {
    /**
     * Matching content chunks from the document
     */
    chunks: Array<Result.Chunk>;

    /**
     * Document creation date
     */
    createdAt: string;

    /**
     * ID of the matching document
     */
    documentId: string;

    /**
     * Document metadata
     */
    metadata: { [key: string]: unknown } | null;

    /**
     * Relevance score of the match
     */
    score: number;

    /**
     * Document title
     */
    title: string | null;

    /**
     * Document type
     */
    type: string | null;

    /**
     * Document last update date
     */
    updatedAt: string;

    /**
     * Full document content (only included when includeFullDocs=true)
     */
    content?: string | null;

    /**
     * Document summary
     */
    summary?: string | null;
  }

  export namespace Result {
    /**
     * Matching content chunk
     */
    export interface Chunk {
      /**
       * Content of the matching chunk
       */
      content: string;

      /**
       * Whether this chunk is relevant to the query
       */
      isRelevant: boolean;

      /**
       * Similarity score for this chunk
       */
      score: number;
    }
  }
}

export interface SearchMemoriesResponse {
  /**
   * Array of matching memory entries with similarity scores
   */
  results: Array<SearchMemoriesResponse.Result>;

  /**
   * Search execution time in milliseconds
   */
  timing: number;

  /**
   * Total number of results returned
   */
  total: number;
}

export namespace SearchMemoriesResponse {
  export interface Result {
    /**
     * Memory entry ID
     */
    id: string;

    /**
     * The memory content
     */
    memory: string;

    /**
     * Memory metadata
     */
    metadata: { [key: string]: unknown } | null;

    /**
     * Similarity score between the query and memory entry
     */
    similarity: number;

    /**
     * Memory last update date
     */
    updatedAt: string;

    /**
     * Object containing arrays of parent and child contextual memories
     */
    context?: Result.Context;

    /**
     * Associated documents for this memory entry
     */
    documents?: Array<Result.Document>;

    /**
     * Version number of this memory entry
     */
    version?: number | null;
  }

  export namespace Result {
    /**
     * Object containing arrays of parent and child contextual memories
     */
    export interface Context {
      children?: Array<Context.Child>;

      parents?: Array<Context.Parent>;
    }

    export namespace Context {
      export interface Child {
        /**
         * The contextual memory content
         */
        memory: string;

        /**
         * Relation type between this memory and its parent/child
         */
        relation: 'updates' | 'extends' | 'derives';

        /**
         * Contextual memory last update date
         */
        updatedAt: string;

        /**
         * Contextual memory metadata
         */
        metadata?: { [key: string]: unknown } | null;

        /**
         * Relative version distance from the primary memory (+1 for direct child, +2 for
         * grand-child, etc.)
         */
        version?: number | null;
      }

      export interface Parent {
        /**
         * The contextual memory content
         */
        memory: string;

        /**
         * Relation type between this memory and its parent/child
         */
        relation: 'updates' | 'extends' | 'derives';

        /**
         * Contextual memory last update date
         */
        updatedAt: string;

        /**
         * Contextual memory metadata
         */
        metadata?: { [key: string]: unknown } | null;

        /**
         * Relative version distance from the primary memory (-1 for direct parent, -2 for
         * grand-parent, etc.)
         */
        version?: number | null;
      }
    }

    export interface Document {
      /**
       * Document ID
       */
      id: string;

      /**
       * Document creation date
       */
      createdAt: string;

      /**
       * Document last update date
       */
      updatedAt: string;

      /**
       * Document metadata (only included when documents=true)
       */
      metadata?: { [key: string]: unknown } | null;

      /**
       * Document summary (only included when summaries=true)
       */
      summary?: string | null;

      /**
       * Document title (only included when documents=true)
       */
      title?: string;

      /**
       * Document type (only included when documents=true)
       */
      type?: string;
    }
  }
}

export interface SearchDocumentsParams {
  /**
   * Search query string
   */
  q: string;

  /**
   * @deprecated Optional category filters
   */
  categoriesFilter?: Array<'technology' | 'science' | 'business' | 'health'>;

  /**
   * Threshold / sensitivity for chunk selection. 0 is least sensitive (returns most
   * chunks, more results), 1 is most sensitive (returns lesser chunks, accurate
   * results)
   */
  chunkThreshold?: number;

  /**
   * Optional tags this search should be containerized by. This can be an ID for your
   * user, a project ID, or any other identifier you wish to use to filter documents.
   */
  containerTags?: Array<string>;

  /**
   * Optional document ID to search within. You can use this to find chunks in a very
   * large document.
   */
  docId?: string;

  /**
   * Threshold / sensitivity for document selection. 0 is least sensitive (returns
   * most documents, more results), 1 is most sensitive (returns lesser documents,
   * accurate results)
   */
  documentThreshold?: number;

  /**
   * Optional filters to apply to the search. Can be a JSON string or Query object.
   */
  filters?: Shared.Or | Shared.And;

  /**
   * If true, include full document in the response. This is helpful if you want a
   * chatbot to know the full context of the document.
   */
  includeFullDocs?: boolean;

  /**
   * If true, include document summary in the response. This is helpful if you want a
   * chatbot to know the full context of the document.
   */
  includeSummary?: boolean;

  /**
   * Maximum number of results to return
   */
  limit?: number;

  /**
   * If true, only return matching chunks without context. Normally, we send the
   * previous and next chunk to provide more context for LLMs. If you only want the
   * matching chunk, set this to true.
   */
  onlyMatchingChunks?: boolean;

  /**
   * If true, rerank the results based on the query. This is helpful if you want to
   * ensure the most relevant results are returned.
   */
  rerank?: boolean;

  /**
   * If true, rewrites the query to make it easier to find documents. This increases
   * the latency by about 400ms
   */
  rewriteQuery?: boolean;
}

export interface SearchExecuteParams {
  /**
   * Search query string
   */
  q: string;

  /**
   * @deprecated Optional category filters
   */
  categoriesFilter?: Array<'technology' | 'science' | 'business' | 'health'>;

  /**
   * Threshold / sensitivity for chunk selection. 0 is least sensitive (returns most
   * chunks, more results), 1 is most sensitive (returns lesser chunks, accurate
   * results)
   */
  chunkThreshold?: number;

  /**
   * Optional tags this search should be containerized by. This can be an ID for your
   * user, a project ID, or any other identifier you wish to use to filter documents.
   */
  containerTags?: Array<string>;

  /**
   * Optional document ID to search within. You can use this to find chunks in a very
   * large document.
   */
  docId?: string;

  /**
   * Threshold / sensitivity for document selection. 0 is least sensitive (returns
   * most documents, more results), 1 is most sensitive (returns lesser documents,
   * accurate results)
   */
  documentThreshold?: number;

  /**
   * Optional filters to apply to the search. Can be a JSON string or Query object.
   */
  filters?: Shared.Or | Shared.And;

  /**
   * If true, include full document in the response. This is helpful if you want a
   * chatbot to know the full context of the document.
   */
  includeFullDocs?: boolean;

  /**
   * If true, include document summary in the response. This is helpful if you want a
   * chatbot to know the full context of the document.
   */
  includeSummary?: boolean;

  /**
   * Maximum number of results to return
   */
  limit?: number;

  /**
   * If true, only return matching chunks without context. Normally, we send the
   * previous and next chunk to provide more context for LLMs. If you only want the
   * matching chunk, set this to true.
   */
  onlyMatchingChunks?: boolean;

  /**
   * If true, rerank the results based on the query. This is helpful if you want to
   * ensure the most relevant results are returned.
   */
  rerank?: boolean;

  /**
   * If true, rewrites the query to make it easier to find documents. This increases
   * the latency by about 400ms
   */
  rewriteQuery?: boolean;
}

export interface SearchMemoriesParams {
  /**
   * Search query string
   */
  q: string;

  /**
   * Optional tag this search should be containerized by. This can be an ID for your
   * user, a project ID, or any other identifier you wish to use to filter memories.
   */
  containerTag?: string;

  /**
   * Optional filters to apply to the search. Can be a JSON string or Query object.
   */
  filters?: Shared.Or | Shared.And;

  include?: SearchMemoriesParams.Include;

  /**
   * Maximum number of results to return
   */
  limit?: number;

  /**
   * If true, rerank the results based on the query. This is helpful if you want to
   * ensure the most relevant results are returned.
   */
  rerank?: boolean;

  /**
   * If true, rewrites the query to make it easier to find documents. This increases
   * the latency by about 400ms
   */
  rewriteQuery?: boolean;

  /**
   * Threshold / sensitivity for memories selection. 0 is least sensitive (returns
   * most memories, more results), 1 is most sensitive (returns lesser memories,
   * accurate results)
   */
  threshold?: number;
}

export namespace SearchMemoriesParams {
  export interface Include {
    documents?: boolean;

    /**
     * If true, include forgotten memories in search results. Forgotten memories are
     * memories that have been explicitly forgotten or have passed their expiration
     * date.
     */
    forgottenMemories?: boolean;

    relatedMemories?: boolean;

    summaries?: boolean;
  }
}

export declare namespace Search {
  export {
    type SearchDocumentsResponse as SearchDocumentsResponse,
    type SearchExecuteResponse as SearchExecuteResponse,
    type SearchMemoriesResponse as SearchMemoriesResponse,
    type SearchDocumentsParams as SearchDocumentsParams,
    type SearchExecuteParams as SearchExecuteParams,
    type SearchMemoriesParams as SearchMemoriesParams,
  };
}
