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
    params: ConnectionCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConnectionCreateResponse> {
    const { endUserId, redirectUrl, ...body } = params ?? {};
    return this._client.post(path`/v3/connections/${provider}`, {
      query: { endUserId, redirectUrl },
      body,
      ...options,
    });
  }

  /**
   * List all connections
   */
  list(
    query: ConnectionListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConnectionListResponse> {
    return this._client.get('/v3/connections', { query, ...options });
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

  redirectsTo?: string;
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

export interface ConnectionCreateParams {
  /**
   * Query param:
   */
  endUserId?: string;

  /**
   * Query param:
   */
  redirectUrl?: string;

  /**
   * Body param:
   */
  metadata?: Record<string, string | number | boolean> | null;
}

export interface ConnectionListParams {
  endUserId?: string;
}

export declare namespace Connections {
  export {
    type ConnectionCreateResponse as ConnectionCreateResponse,
    type ConnectionListResponse as ConnectionListResponse,
    type ConnectionGetResponse as ConnectionGetResponse,
    type ConnectionCreateParams as ConnectionCreateParams,
    type ConnectionListParams as ConnectionListParams,
  };
}
