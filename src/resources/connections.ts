// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Connections extends APIResource {
  /**
   * Initialize connection and get authorization URL
   *
   * @example
   * ```ts
   * const connection = await client.connections.create(
   *   'notion',
   * );
   * ```
   */
  create(
    provider: 'notion' | 'google-drive' | 'onedrive',
    body: ConnectionCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConnectionCreateResponse> {
    return this._client.post(path`/v3/connections/${provider}`, { body, ...options });
  }

  /**
   * List all connections
   *
   * @example
   * ```ts
   * const connections = await client.connections.list();
   * ```
   */
  list(
    body: ConnectionListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConnectionListResponse> {
    return this._client.post('/v3/connections/list', { body, ...options });
  }

  /**
   * Get connection details
   *
   * @example
   * ```ts
   * const connection = await client.connections.get(
   *   'connectionId',
   * );
   * ```
   */
  get(connectionID: string, options?: RequestOptions): APIPromise<ConnectionGetResponse> {
    return this._client.get(path`/v3/connections/${connectionID}`, options);
  }

  /**
   * List documents for a specific provider and container tags
   *
   * @example
   * ```ts
   * const response = await client.connections.listDocuments(
   *   'notion',
   * );
   * ```
   */
  listDocuments(
    provider: 'notion' | 'google-drive' | 'onedrive',
    body: ConnectionListDocumentsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConnectionListDocumentsResponse> {
    return this._client.post(path`/v3/connections/${provider}/documents`, { body, ...options });
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

export type ConnectionListDocumentsResponse =
  Array<ConnectionListDocumentsResponse.ConnectionListDocumentsResponseItem>;

export namespace ConnectionListDocumentsResponse {
  export interface ConnectionListDocumentsResponseItem {
    id: string;

    createdAt: string;

    status: string;

    summary: string | null;

    title: string | null;

    type: string;

    updatedAt: string;
  }
}

export interface ConnectionCreateParams {
  containerTags?: Array<string>;

  metadata?: Record<string, string | number | boolean> | null;

  redirectUrl?: string;
}

export interface ConnectionListParams {
  /**
   * Optional comma-separated list of container tags to filter documents by
   */
  containerTags?: Array<string>;
}

export interface ConnectionListDocumentsParams {
  /**
   * Optional comma-separated list of container tags to filter documents by
   */
  containerTags?: Array<string>;
}

export declare namespace Connections {
  export {
    type ConnectionCreateResponse as ConnectionCreateResponse,
    type ConnectionListResponse as ConnectionListResponse,
    type ConnectionGetResponse as ConnectionGetResponse,
    type ConnectionListDocumentsResponse as ConnectionListDocumentsResponse,
    type ConnectionCreateParams as ConnectionCreateParams,
    type ConnectionListParams as ConnectionListParams,
    type ConnectionListDocumentsParams as ConnectionListDocumentsParams,
  };
}
