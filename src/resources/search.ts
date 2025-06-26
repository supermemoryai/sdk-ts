// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Search extends APIResource {
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
     * Document last update date
     */
    updatedAt: string;

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

export interface SearchExecuteParams {
  /**
   * Search query string
   */
  q: string;

  /**
   * Optional category filters
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
   * user, a project ID, or any other identifier you wish to use to filter memories.
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
   * Optional filters to apply to the search
   */
  filters?: SearchExecuteParams.UnionMember0 | { [key: string]: unknown };

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

export namespace SearchExecuteParams {
  export interface UnionMember0 {
    AND?: Array<unknown>;

    OR?: Array<unknown>;
  }
}

export declare namespace Search {
  export {
    type SearchExecuteResponse as SearchExecuteResponse,
    type SearchExecuteParams as SearchExecuteParams,
  };
}
