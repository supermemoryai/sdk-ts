// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Connections extends APIResource {
  /**
   * Initialize connection and get authorization URL
   */
  create(
    provider: 'notion' | 'google-drive' | 'onedrive',
    options?: RequestOptions,
  ): APIPromise<ConnectionCreateResponse> {
    return this._client.post(path`/v3/connections/${provider}`, options);
  }

  /**
   * List all connections
   */
  list(options?: RequestOptions): APIPromise<ConnectionListResponse> {
    return this._client.get('/v3/connections', options);
  }

  /**
   * Get connection details
   */
  get(connectionID: string, options?: RequestOptions): APIPromise<ConnectionGetResponse> {
    return this._client.get(path`/v3/connections/${connectionID}`, options);
  }
}

export interface ConnectionCreateResponse {
  id: string;

  authLink: string;

  expiresIn: string;
}

export type ConnectionListResponse = Array<ConnectionListResponse.ConnectionListResponseItem>;

export namespace ConnectionListResponse {
  export interface ConnectionListResponseItem {
    id: string;

    createdAt: number;

    provider: string;

    expiresAt?: number;

    metadata?: Record<string, unknown>;
  }
}

export interface ConnectionGetResponse {
  id: string;

  createdAt: number;

  provider: string;

  expiresAt?: number;

  metadata?: Record<string, unknown>;
}

export declare namespace Connections {
  export {
    type ConnectionCreateResponse as ConnectionCreateResponse,
    type ConnectionListResponse as ConnectionListResponse,
    type ConnectionGetResponse as ConnectionGetResponse,
  };
}
