/*
 * Base class for the SDK and its groups. Same public shape as 5.0.0-rc.5;
 * requests are made by lib/invoke.ts.
 */

import { SDKOptions, serverURLFromOptions } from "./config.js";
import { env } from "./env.js";
import { HTTPClient } from "./http.js";
import { Logger } from "./logger.js";
import { RetryConfig } from "./retries.js";

export type RequestOptions = {
  /**
   * Sets a timeout, in milliseconds, on HTTP requests made by an SDK method. If
   * `fetchOptions.signal` is set then it will take precedence over this option.
   */
  timeoutMs?: number;
  /**
   * Set or override a retry policy on HTTP calls.
   */
  retries?: RetryConfig;
  /**
   * Specifies the status codes which should be retried using the given retry policy.
   */
  retryCodes?: string[];
  /**
   * Overrides the base server URL that will be used by an operation.
   */
  serverURL?: string | URL;
  /**
   * @deprecated `fetchOptions` has been flattened into `RequestOptions`.
   *
   * Sets various request options on the `fetch` call made by an SDK method.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options|Request}
   */
  fetchOptions?: Omit<RequestInit, "method" | "body">;
} & Omit<RequestInit, "method" | "body">;

export class ClientSDK {
  /** @internal */
  readonly _httpClient: HTTPClient;
  /** @internal */
  readonly _logger?: Logger | undefined;
  public readonly _baseURL: URL | null;
  public readonly _options: SDKOptions;

  constructor(options: SDKOptions = {}) {
    const defaultHttpClient = new HTTPClient();
    options.httpClient = options.httpClient || defaultHttpClient;

    const url = serverURLFromOptions(options);
    if (url) {
      url.pathname = url.pathname.replace(/\/+$/, "") + "/";
    }
    this._baseURL = url;
    this._httpClient = options.httpClient || defaultHttpClient;
    this._options = { ...options };

    this._logger = this._options.debugLogger;
    if (!this._logger && env().SUPERMEMORY_DEBUG) {
      this._logger = console;
    }
  }
}

export type { RetryConfig };
