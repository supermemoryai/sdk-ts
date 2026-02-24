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
   * Optional entity context for this container tag. Max 1500 characters. Used during
   * document processing to guide memory extraction.
   */
  entityContext?: string;

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
   * Optional metadata filters to apply to profile results and search results.
   * Supports complex AND/OR queries with multiple conditions.
   */
  filters?: ProfileParams.Or | ProfileParams.And;

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

export declare namespace TopLevel {
  export {
    type AddResponse as AddResponse,
    type ProfileResponse as ProfileResponse,
    type AddParams as AddParams,
    type ProfileParams as ProfileParams,
  };
}
