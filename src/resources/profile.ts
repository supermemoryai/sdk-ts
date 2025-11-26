// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Profile extends APIResource {
  /**
   * Get user profile with optional search results
   */
  property(body: ProfilePropertyParams, options?: RequestOptions): APIPromise<ProfilePropertyResponse> {
    return this._client.post('/v4/profile', { body, ...options });
  }
}

export interface ProfilePropertyResponse {
  profile: ProfilePropertyResponse.Profile;

  /**
   * Search results if a search query was provided
   */
  searchResults?: ProfilePropertyResponse.SearchResults;
}

export namespace ProfilePropertyResponse {
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

export interface ProfilePropertyParams {
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

export declare namespace Profile {
  export {
    type ProfilePropertyResponse as ProfilePropertyResponse,
    type ProfilePropertyParams as ProfilePropertyParams,
  };
}
