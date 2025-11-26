// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

/**
 * AND
 */
export interface And {
  AND: Array<unknown>;
}

/**
 * OR
 */
export interface Or {
  OR: Array<unknown>;
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
