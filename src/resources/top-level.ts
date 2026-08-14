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
     * Per-bucket memory lists, keyed by bucket key
     */
    buckets?: { [key: string]: Array<string> };

    /**
     * Dynamic profile information (recent memories)
     */
    dynamic?: Array<string>;

    /**
     * Static profile information that remains relevant long-term
     */
    static?: Array<string>;
  }

  /**
   * Search results if a search query was provided
   */
  export interface SearchResults {
    /**
     * Search results for the provided query
     */
    results: Array<SearchResults.Result>;

    /**
     * Search timing in milliseconds
     */
    timing: number;

    /**
     * Total number of search results
     */
    total: number;
  }

  export namespace SearchResults {
    export interface Result {
      /**
       * Memory entry ID or chunk ID
       */
      id: string;

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
       * The chunk content (only present for chunk results from hybrid search)
       */
      chunk?: string;

      /**
       * Relevant chunks from associated documents (only included when chunks=true)
       */
      chunks?: Array<Result.Chunk>;

      /**
       * Object containing version history (parents/children via updates) and related
       * memories (extends/derives)
       */
      context?: Result.Context;

      /**
       * Associated documents for this memory entry
       */
      documents?: Array<Result.Document>;

      /**
       * Filepath of the source document this memory or chunk came from
       */
      filepath?: string | null;

      /**
       * Indicates if this memory was created by aggregating multiple source memories
       */
      isAggregated?: boolean;

      /**
       * The memory content (only present for memory results)
       */
      memory?: string;

      /**
       * ID of the root (first version) memory entry this one descends from. Null for
       * memories that have never been superseded. Only present on memory results, not on
       * standalone chunk results.
       */
      rootMemoryId?: string | null;

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
      }

      /**
       * Object containing version history (parents/children via updates) and related
       * memories (extends/derives)
       */
      export interface Context {
        children?: Array<Context.Child>;

        parents?: Array<Context.Parent>;

        related?: Array<Context.Related>;
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

        export interface Related {
          /**
           * The related memory content
           */
          memory: string;

          /**
           * Relation type
           */
          relation: 'extends' | 'derives';

          /**
           * Related memory last update date
           */
          updatedAt: string;

          /**
           * Related memory metadata
           */
          metadata?: { [key: string]: unknown } | null;
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
}

export interface AddParams {
  /**
   * The content to extract and process into a document. This can be a URL to a
   * website, a PDF, an image, or a video.
   */
  content: string;

  /**
   * Optional tag this document should be containerized by. Max 100 characters,
   * alphanumeric with hyphens, underscores, and dots only.
   */
  containerTag?: string;

  /**
   * @deprecated
   */
  containerTags?: Array<string>;

  /**
   * Optional custom ID of the document. Max 100 characters, alphanumeric with
   * hyphens, underscores, and dots only.
   */
  customId?: string;

  /**
   * When this document's content is from, as opposed to when it was uploaded.
   * Accepts YYYY-MM-DD or a full ISO 8601 timestamp. Memory extraction resolves
   * relative dates against this instead of the ingestion time, and documents in a
   * batch are processed oldest-first so newer facts correctly supersede older ones.
   * Set this whenever you backfill historical content.
   */
  documentDate?: string;

  /**
   * Processing mode. "dynamic" (default) groups related documents together so
   * memories form from coherent, logical units rather than one isolated entry at a
   * time. "instant" processes each document on its own right away, and bills one
   * extra operation per document.
   */
  dreaming?: 'instant' | 'dynamic';

  /**
   * Optional entity context for this container tag. Max 1500 characters. Used during
   * document processing to guide memory extraction.
   */
  entityContext?: string;

  /**
   * Optional file path for the document. Used by supermemoryfs to store the full
   * path of the file.
   */
  filepath?: string;

  /**
   * Optional metadata filter to apply when pulling related memories and profile
   * during ingestion. Only memories matching these filters will be used as context.
   */
  filterByMetadata?: { [key: string]: string | number | boolean | Array<string> };

  /**
   * Optional metadata for the document.
   */
  metadata?: { [key: string]: string | number | boolean | Array<string> };

  /**
   * Task type: "memory" (default) for full context layer with SuperRAG built in,
   * "superrag" for managed RAG as a service.
   */
  taskType?: 'memory' | 'superrag';
}

export interface ProfileParams {
  /**
   * Tag to filter the profile by. This can be an ID for your user, a project ID, or
   * any other identifier you wish to use to filter memories.
   */
  containerTag: string;

  /**
   * Specific bucket keys to return. Omit to return all configured buckets. Only
   * relevant when "buckets" is included.
   */
  buckets?: Array<string>;

  /**
   * Optional metadata filters to apply to profile results and search results.
   * Supports complex AND/OR queries with multiple conditions.
   */
  filters?: ProfileParams.Or | ProfileParams.And;

  /**
   * Profile sections to return. Omit to return all sections. Pass a subset to reduce
   * payload — e.g. ["buckets"] skips static and dynamic entirely.
   */
  include?: Array<'static' | 'dynamic' | 'buckets'>;

  /**
   * Optional search query to include search results in the response
   */
  q?: string;

  /**
   * Threshold for search results. Only results with a score above this threshold
   * will be included.
   */
  threshold?: number;
}

export namespace ProfileParams {
  export interface Or {
    /**
     * Array of OR filter expressions
     */
    OR: Array<Or.FilterCondition | Or.Or | Or.And>;
  }

  export namespace Or {
    /**
     * A single filter condition based on metadata, numeric values, array contents, or
     * string matching
     */
    export interface FilterCondition {
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
      OR: Array<unknown>;
    }

    export interface And {
      /**
       * AND: Array of conditions or nested expressions
       */
      AND: Array<unknown>;
    }
  }

  export interface And {
    /**
     * Array of AND filter expressions
     */
    AND: Array<And.FilterCondition | And.Or | And.And>;
  }

  export namespace And {
    /**
     * A single filter condition based on metadata, numeric values, array contents, or
     * string matching
     */
    export interface FilterCondition {
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
      OR: Array<unknown>;
    }

    export interface And {
      /**
       * AND: Array of conditions or nested expressions
       */
      AND: Array<unknown>;
    }
  }
}

export declare namespace TopLevel {
  export {
    type AddResponse as AddResponse,
    type ProfileResponse as ProfileResponse,
    type AddParams as AddParams,
    type ProfileParams as ProfileParams,
  };
}
