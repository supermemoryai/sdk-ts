// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Settings extends APIResource {
  /**
   * Get settings for an organization
   */
  retrieve(options?: RequestOptions): APIPromise<SettingRetrieveResponse> {
    return this._client.get('/v3/settings', options);
  }

  /**
   * Update settings for an organization
   */
  update(
    body: SettingUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SettingUpdateResponse> {
    return this._client.patch('/v3/settings', { body, ...options });
  }
}

export interface SettingRetrieveResponse {
  settings: Record<string, unknown>;
}

export interface SettingUpdateResponse {
  message: string;

  settings: SettingUpdateResponse.Settings;
}

export namespace SettingUpdateResponse {
  export interface Settings {
    excludeItems?: Array<string>;

    filterPrompt?: string;

    filterTags?: Record<string, Array<string>>;

    includeItems?: Array<string>;

    shouldLLMFilter?: boolean;
  }
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
    type SettingRetrieveResponse as SettingRetrieveResponse,
    type SettingUpdateResponse as SettingUpdateResponse,
    type SettingUpdateParams as SettingUpdateParams,
  };
}
