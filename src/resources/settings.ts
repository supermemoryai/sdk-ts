// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Settings extends APIResource {
  /**
   * Update settings for an organization
   */
  update(
    body: SettingUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SettingUpdateResponse> {
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
    excludeItems?: Array<string>;

    filterPrompt?: string;

    filterTags?: Record<string, Array<string>>;

    includeItems?: Array<string>;

    shouldLLMFilter?: boolean;
  }
}

export interface SettingGetResponse {
  excludeItems?: Array<string>;

  filterPrompt?: string;

  filterTags?: Record<string, Array<string>>;

  includeItems?: Array<string>;

  shouldLLMFilter?: boolean;
}

export interface SettingUpdateParams {
  excludeItems?: Array<string>;

  filterPrompt?: string;

  filterTags?: Record<string, Array<string>>;

  includeItems?: Array<string>;

  shouldLLMFilter?: boolean;
}

export declare namespace Settings {
  export {
    type SettingUpdateResponse as SettingUpdateResponse,
    type SettingGetResponse as SettingGetResponse,
    type SettingUpdateParams as SettingUpdateParams,
  };
}
