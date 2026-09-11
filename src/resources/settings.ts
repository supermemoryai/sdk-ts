// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Organization settings
 */
export class Settings extends APIResource {
  /**
   * Update settings for an organization
   */
  update(body: SettingUpdateParams, options?: RequestOptions): APIPromise<SettingUpdateResponse> {
    return this._client.patch('/v3/settings', { body, ...options });
  }

  /**
   * Get settings for an organization
   */
  get(options?: RequestOptions): APIPromise<SettingGetResponse> {
    return this._client.get('/v3/settings', options);
  }
}

export interface SettingUpdateResponse {
  orgId: string;

  orgSlug: string;

  updated: SettingUpdateResponse.Updated;
}

export namespace SettingUpdateResponse {
  export interface Updated {
    chunkSize?: number | null;

    excludeItems?: string | number | boolean | { [key: string]: unknown } | Array<unknown> | null;

    filterPrompt?: string | null;

    githubClientId?: string | null;

    githubClientSecret?: string | null;

    githubCustomKeyEnabled?: boolean | null;

    googleDriveClientId?: string | null;

    googleDriveClientSecret?: string | null;

    googleDriveCustomKeyEnabled?: boolean | null;

    includeItems?: string | number | boolean | { [key: string]: unknown } | Array<unknown> | null;

    notionClientId?: string | null;

    notionClientSecret?: string | null;

    notionCustomKeyEnabled?: boolean | null;

    onedriveClientId?: string | null;

    onedriveClientSecret?: string | null;

    onedriveCustomKeyEnabled?: boolean | null;

    /**
     * Profile bucket definitions
     */
    profileBuckets?: Array<Updated.ProfileBucket>;

    shouldLLMFilter?: boolean | null;
  }

  export namespace Updated {
    /**
     * Definition of a single profile bucket
     */
    export interface ProfileBucket {
      /**
       * Stable slug for the bucket, stored on each memory
       */
      key: string;

      /**
       * What belongs in this bucket — used to guide the ingestion classifier.
       */
      description?: string;
    }
  }
}

export interface SettingGetResponse {
  chunkSize?: number | null;

  excludeItems?: string | number | boolean | { [key: string]: unknown } | Array<unknown> | null;

  filterPrompt?: string | null;

  githubClientId?: string | null;

  githubClientSecret?: string | null;

  githubCustomKeyEnabled?: boolean | null;

  googleDriveClientId?: string | null;

  googleDriveClientSecret?: string | null;

  googleDriveCustomKeyEnabled?: boolean | null;

  includeItems?: string | number | boolean | { [key: string]: unknown } | Array<unknown> | null;

  notionClientId?: string | null;

  notionClientSecret?: string | null;

  notionCustomKeyEnabled?: boolean | null;

  onedriveClientId?: string | null;

  onedriveClientSecret?: string | null;

  onedriveCustomKeyEnabled?: boolean | null;

  /**
   * Profile bucket definitions
   */
  profileBuckets?: Array<SettingGetResponse.ProfileBucket>;

  shouldLLMFilter?: boolean | null;
}

export namespace SettingGetResponse {
  /**
   * Definition of a single profile bucket
   */
  export interface ProfileBucket {
    /**
     * Stable slug for the bucket, stored on each memory
     */
    key: string;

    /**
     * What belongs in this bucket — used to guide the ingestion classifier.
     */
    description?: string;
  }
}

export interface SettingUpdateParams {
  chunkSize?: number | null;

  excludeItems?: string | number | boolean | { [key: string]: unknown } | Array<unknown> | null;

  filterPrompt?: string | null;

  githubClientId?: string | null;

  githubClientSecret?: string | null;

  githubCustomKeyEnabled?: boolean | null;

  googleDriveClientId?: string | null;

  googleDriveClientSecret?: string | null;

  googleDriveCustomKeyEnabled?: boolean | null;

  includeItems?: string | number | boolean | { [key: string]: unknown } | Array<unknown> | null;

  notionClientId?: string | null;

  notionClientSecret?: string | null;

  notionCustomKeyEnabled?: boolean | null;

  onedriveClientId?: string | null;

  onedriveClientSecret?: string | null;

  onedriveCustomKeyEnabled?: boolean | null;

  /**
   * Profile bucket definitions
   */
  profileBuckets?: Array<SettingUpdateParams.ProfileBucket>;

  shouldLLMFilter?: boolean | null;
}

export namespace SettingUpdateParams {
  /**
   * Definition of a single profile bucket
   */
  export interface ProfileBucket {
    /**
     * Stable slug for the bucket, stored on each memory
     */
    key: string;

    /**
     * What belongs in this bucket — used to guide the ingestion classifier.
     */
    description?: string;
  }
}

export declare namespace Settings {
  export {
    type SettingUpdateResponse as SettingUpdateResponse,
    type SettingGetResponse as SettingGetResponse,
    type SettingUpdateParams as SettingUpdateParams,
  };
}
