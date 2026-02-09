// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
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
    provider: 'notion' | 'google-drive' | 'onedrive' | 'gmail' | 'github' | 'web-crawler' | 's3',
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
   * Configure resources for a connection (supported providers: GitHub for now)
   *
   * @example
   * ```ts
   * const response = await client.connections.configure(
   *   'connectionId',
   *   { resources: [{ foo: 'bar' }] },
   * );
   * ```
   */
  configure(
    connectionID: string,
    body: ConnectionConfigureParams,
    options?: RequestOptions,
  ): APIPromise<ConnectionConfigureResponse> {
    return this._client.post(path`/v3/connections/${connectionID}/configure`, { body, ...options });
  }

  /**
   * Delete a specific connection by ID
   *
   * @example
   * ```ts
   * const response = await client.connections.deleteByID(
   *   'connectionId',
   * );
   * ```
   */
  deleteByID(connectionID: string, options?: RequestOptions): APIPromise<ConnectionDeleteByIDResponse> {
    return this._client.delete(path`/v3/connections/${connectionID}`, options);
  }

  /**
   * Delete connection for a specific provider and container tags
   *
   * @example
   * ```ts
   * const response = await client.connections.deleteByProvider(
   *   'notion',
   *   { containerTags: ['user_123', 'project_123'] },
   * );
   * ```
   */
  deleteByProvider(
    provider: 'notion' | 'google-drive' | 'onedrive' | 'gmail' | 'github' | 'web-crawler' | 's3',
    body: ConnectionDeleteByProviderParams,
    options?: RequestOptions,
  ): APIPromise<ConnectionDeleteByProviderResponse> {
    return this._client.delete(path`/v3/connections/${provider}`, { body, ...options });
  }

  /**
   * Get connection details with id
   *
   * @example
   * ```ts
   * const response = await client.connections.getByID(
   *   'connectionId',
   * );
   * ```
   */
  getByID(connectionID: string, options?: RequestOptions): APIPromise<ConnectionGetByIDResponse> {
    return this._client.get(path`/v3/connections/${connectionID}`, options);
  }

  /**
   * Get connection details with provider and container tags
   *
   * @example
   * ```ts
   * const response = await client.connections.getByTag(
   *   'notion',
   *   { containerTags: ['user_123', 'project_123'] },
   * );
   * ```
   */
  getByTag(
    provider: 'notion' | 'google-drive' | 'onedrive' | 'gmail' | 'github' | 'web-crawler' | 's3',
    body: ConnectionGetByTagParams,
    options?: RequestOptions,
  ): APIPromise<ConnectionGetByTagResponse> {
    return this._client.post(path`/v3/connections/${provider}/connection`, { body, ...options });
  }

  /**
   * Initiate a manual sync of connections
   *
   * @example
   * ```ts
   * const response = await client.connections.import('notion');
   * ```
   */
  import(
    provider: 'notion' | 'google-drive' | 'onedrive' | 'gmail' | 'github' | 'web-crawler' | 's3',
    body: ConnectionImportParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<string> {
    return this._client.post(path`/v3/connections/${provider}/import`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: 'text/plain' }, options?.headers]),
    });
  }

  /**
   * List documents indexed for a provider and container tags
   *
   * @example
   * ```ts
   * const response = await client.connections.listDocuments(
   *   'notion',
   * );
   * ```
   */
  listDocuments(
    provider: 'notion' | 'google-drive' | 'onedrive' | 'gmail' | 'github' | 'web-crawler' | 's3',
    body: ConnectionListDocumentsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConnectionListDocumentsResponse> {
    return this._client.post(path`/v3/connections/${provider}/documents`, { body, ...options });
  }

  /**
   * Fetch resources for a connection (supported providers: GitHub for now)
   *
   * @example
   * ```ts
   * const response = await client.connections.resources(
   *   'connectionId',
   * );
   * ```
   */
  resources(
    connectionID: string,
    query: ConnectionResourcesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConnectionResourcesResponse> {
    return this._client.get(path`/v3/connections/${connectionID}/resources`, { query, ...options });
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

    createdAt: string;

    provider: string;

    /**
     * @deprecated
     */
    containerTags?: Array<string>;

    documentLimit?: number;

    email?: string;

    expiresAt?: string;

    metadata?: { [key: string]: unknown };
  }
}

export interface ConnectionConfigureResponse {
  message: string;

  success: boolean;

  webhooksRegistered?: number;
}

export interface ConnectionDeleteByIDResponse {
  id: string;

  provider: string;
}

export interface ConnectionDeleteByProviderResponse {
  id: string;

  provider: string;
}

export interface ConnectionGetByIDResponse {
  id: string;

  createdAt: string;

  provider: string;

  /**
   * @deprecated
   */
  containerTags?: Array<string>;

  documentLimit?: number;

  email?: string;

  expiresAt?: string;

  metadata?: { [key: string]: unknown };
}

export interface ConnectionGetByTagResponse {
  id: string;

  createdAt: string;

  provider: string;

  /**
   * @deprecated
   */
  containerTags?: Array<string>;

  documentLimit?: number;

  email?: string;

  expiresAt?: string;

  metadata?: { [key: string]: unknown };
}

export type ConnectionImportResponse = string;

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

export interface ConnectionResourcesResponse {
  resources: Array<{ [key: string]: unknown }>;

  total_count?: number;
}

export interface ConnectionCreateParams {
  containerTags?: Array<string>;

  documentLimit?: number;

  metadata?: { [key: string]: string | number | boolean } | null;

  redirectUrl?: string;
}

export interface ConnectionListParams {
  /**
   * Optional comma-separated list of container tags to filter documents by
   */
  containerTags?: Array<string>;
}

export interface ConnectionConfigureParams {
  resources: Array<{ [key: string]: unknown }>;
}

export interface ConnectionDeleteByProviderParams {
  /**
   * Optional comma-separated list of container tags to filter connections by
   */
  containerTags: Array<string>;
}

export interface ConnectionGetByTagParams {
  /**
   * Comma-separated list of container tags to filter connection by
   */
  containerTags: Array<string>;
}

export interface ConnectionImportParams {
  /**
   * Optional comma-separated list of container tags to filter connections by
   */
  containerTags?: Array<string>;
}

export interface ConnectionListDocumentsParams {
  /**
   * Optional comma-separated list of container tags to filter documents by
   */
  containerTags?: Array<string>;
}

export interface ConnectionResourcesParams {
  page?: number;

  per_page?: number;
}

export declare namespace Connections {
  export {
    type ConnectionCreateResponse as ConnectionCreateResponse,
    type ConnectionListResponse as ConnectionListResponse,
    type ConnectionConfigureResponse as ConnectionConfigureResponse,
    type ConnectionDeleteByIDResponse as ConnectionDeleteByIDResponse,
    type ConnectionDeleteByProviderResponse as ConnectionDeleteByProviderResponse,
    type ConnectionGetByIDResponse as ConnectionGetByIDResponse,
    type ConnectionGetByTagResponse as ConnectionGetByTagResponse,
    type ConnectionImportResponse as ConnectionImportResponse,
    type ConnectionListDocumentsResponse as ConnectionListDocumentsResponse,
    type ConnectionResourcesResponse as ConnectionResourcesResponse,
    type ConnectionCreateParams as ConnectionCreateParams,
    type ConnectionListParams as ConnectionListParams,
    type ConnectionConfigureParams as ConnectionConfigureParams,
    type ConnectionDeleteByProviderParams as ConnectionDeleteByProviderParams,
    type ConnectionGetByTagParams as ConnectionGetByTagParams,
    type ConnectionImportParams as ConnectionImportParams,
    type ConnectionListDocumentsParams as ConnectionListDocumentsParams,
    type ConnectionResourcesParams as ConnectionResourcesParams,
  };
}
