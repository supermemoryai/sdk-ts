// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

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

export declare namespace TopLevel {
  export { type ProfileResponse as ProfileResponse, type ProfileParams as ProfileParams };
}
