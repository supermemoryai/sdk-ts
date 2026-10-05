/*
 * Client options for `new Supermemory({...})`. Same shape as 5.0.0-rc.5.
 */

import { HTTPClient } from "./http.js";
import { Logger } from "./logger.js";
import { RetryConfig } from "./retries.js";
import { OPENAPI_DOC_VERSION, SDK_VERSION, ServerList } from "./surface.js";
import { Params, pathToFunc } from "./url.js";

export { ServerList };

export type SDKOptions = {
  apiKey?: string | (() => Promise<string>) | undefined;

  httpClient?: HTTPClient;
  /**
   * Allows overriding the default server used by the SDK
   */
  serverIdx?: number | undefined;
  /**
   * Allows overriding the default server URL used by the SDK
   */
  serverURL?: string | undefined;
  /**
   * Allows overriding the default user agent used by the SDK
   */
  userAgent?: string | undefined;
  /**
   * Allows overriding the default retry config used by the SDK
   */
  retryConfig?: RetryConfig;
  timeoutMs?: number;
  debugLogger?: Logger;
};

export function serverURLFromOptions(options: SDKOptions): URL | null {
  let serverURL = options.serverURL;

  const params: Params = {};

  if (!serverURL) {
    const serverIdx = options.serverIdx ?? 0;
    if (serverIdx < 0 || serverIdx >= ServerList.length) {
      throw new Error(`Invalid server index ${serverIdx}`);
    }
    serverURL = ServerList[serverIdx] || "";
  }

  const u = pathToFunc(serverURL)(params);
  return new URL(u);
}

export const SDK_METADATA = {
  language: "typescript",
  openapiDocVersion: OPENAPI_DOC_VERSION,
  sdkVersion: SDK_VERSION,
  genVersion: "fern",
  userAgent: `supermemory-sdk/typescript ${SDK_VERSION} ${OPENAPI_DOC_VERSION}`,
} as const;
