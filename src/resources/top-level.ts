// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export interface AddResponse {
  /**
   * Unique identifier of the document
   */
  id: string;

  /**
   * Status of the document
   */
  status: string;
}

export interface ProfileResponse {
  profile: ProfileResponse.Profile;

  /**
   * Search results if a search query was provided
   */
  searchResults?: ProfileResponse.SearchResults;
}

export namespace ProfileResponse {
  export interface Profile {
    /**
     * Dynamic profile information (recent memories)
     */
    dynamic: Array<string>;

    /**
     * Static profile information that remains relevant long-term
     */
    static: Array<string>;
  }

  /**
   * Search results if a search query was provided
   */
  export interface SearchResults {
    /**
     * Search results for the provided query
     */
    results: Array<unknown>;

    /**
     * Search timing in milliseconds
     */
    timing: number;

    /**
     * Total number of search results
     */
    total: number;
  }
}

export interface SearchResponse {
  /**
   * Array of matching memory entries with similarity scores
   */
  results: Array<SearchResponse.Result>;

  /**
   * Search execution time in milliseconds
   */
  timing: number;

  /**
   * Total number of results returned
   */
  total: number;
}

export namespace SearchResponse {
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
     * Relevant chunks from associated documents (only included when chunks=true)
     */
    chunks?: Array<Result.Chunk>;

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
    export interface Chunk {
      /**
       * Content of the chunk
       */
      content: string;

      /**
       * ID of the document this chunk belongs to
       */
      documentId: string;

      /**
       * Position of chunk in the document (0-indexed)
       */
      position: number;

      /**
       * Similarity score between the query and chunk
       */
      score: number;
    }

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

export interface AddParams {
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

export interface ProfileParams {
  /**
   * Tag to filter the profile by. This can be an ID for your user, a project ID, or
   * any other identifier you wish to use to filter memories.
   */
  containerTag: string;

  /**
   * Optional search query to include search results in the response
   */
  q?: string;
}

export interface SearchParams {
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
  filters?: SearchParams.Or | SearchParams.And;

  include?: SearchParams.Include;

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

export namespace SearchParams {
  /**
   * OR
   */
  export interface Or {
    OR: Array<unknown>;
  }

  /**
   * AND
   */
  export interface And {
    AND: Array<unknown>;
  }

  export interface Include {
    /**
     * If true, fetch and return chunks from documents associated with the found
     * memories. Performs vector search on chunks within those documents.
     */
    chunks?: boolean;

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

export declare namespace TopLevel {
  export {
    type AddResponse as AddResponse,
    type ProfileResponse as ProfileResponse,
    type SearchResponse as SearchResponse,
    type AddParams as AddParams,
    type ProfileParams as ProfileParams,
    type SearchParams as SearchParams,
  };
}
