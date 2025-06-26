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
    excludeItems?: string | number | boolean | { [key: string]: unknown } | Array<unknown> | null;

    filterPrompt?: string | null;

    filterTags?: string | number | boolean | { [key: string]: unknown } | Array<unknown> | null;

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

    shouldLLMFilter?: boolean | null;
  }
}

export interface SettingGetResponse {
  excludeItems?: string | number | boolean | { [key: string]: unknown } | Array<unknown> | null;

  filterPrompt?: string | null;

  filterTags?: string | number | boolean | { [key: string]: unknown } | Array<unknown> | null;

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

  shouldLLMFilter?: boolean | null;
}

export interface SettingUpdateParams {
  excludeItems?: string | number | boolean | { [key: string]: unknown } | Array<unknown> | null;

  filterPrompt?: string | null;

  filterTags?: string | number | boolean | { [key: string]: unknown } | Array<unknown> | null;

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

  shouldLLMFilter?: boolean | null;
}

export declare namespace Settings {
  export {
    type SettingUpdateResponse as SettingUpdateResponse,
    type SettingGetResponse as SettingGetResponse,
    type SettingUpdateParams as SettingUpdateParams,
  };
}
