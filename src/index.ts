import type * as Api from "./generated/api/index.js";
import { ConnectorsClient } from "./generated/api/resources/connectors/client/Client.js";
import { SupermemoryClient } from "./generated/Client.js";
import * as core from "./generated/core/index.js";
import { mergeHeaders } from "./generated/core/headers.js";
import { SupermemoryEnvironment } from "./generated/environments.js";
import { handleNonStatusCodeError } from "./generated/errors/handleNonStatusCodeError.js";
import { SupermemoryError } from "./generated/errors/index.js";

// Fern cannot inline the per-provider union body of connectors.create, so it alone would take `{ body }`. Accept the body directly like every other method.
class Connectors extends ConnectorsClient {
  override create(
    namespace: string,
    request: Api.CreateConnectorsRequestBody | Api.CreateConnectorsRequest,
    requestOptions?: ConnectorsClient.RequestOptions,
  ) {
    return super.create(namespace, "provider" in request ? { body: request } : request, requestOptions);
  }
}

export class Supermemory extends SupermemoryClient {
  override get connectors(): Connectors {
    return (this._connectors ??= new Connectors(this._options)) as Connectors;
  }

  /** The profile as a markdown document (`Accept: text/markdown`). `profile()` always returns JSON. */
  async profileMarkdown(namespace: string, request: Api.ProfileRequest = {}, requestOptions?: SupermemoryClient.RequestOptions): Promise<string> {
    const auth = await this._options.authProvider.getAuthRequest();
    const response = await core.fetcher<string>({
      url: core.url.join(
        (await core.Supplier.get(this._options.baseUrl)) ?? (await core.Supplier.get(this._options.environment)) ?? SupermemoryEnvironment.Default,
        `ns/${core.url.encodePathParam(namespace)}/profile`,
      ),
      method: "POST",
      headers: mergeHeaders(auth.headers, this._options.headers, requestOptions?.headers, { Accept: "text/markdown" }),
      contentType: "application/json",
      queryString: core.url.queryBuilder().mergeAdditional(requestOptions?.queryParams).build(),
      requestType: "json",
      body: request,
      responseType: "text",
      timeoutMs: (requestOptions?.timeoutInSeconds ?? this._options.timeoutInSeconds ?? 60) * 1000,
      maxRetries: requestOptions?.maxRetries ?? this._options.maxRetries,
      abortSignal: requestOptions?.abortSignal,
      fetchFn: this._options.fetch,
      logging: this._options.logging,
    });
    if (response.ok) return response.body;
    if (response.error.reason === "status-code") {
      throw new SupermemoryError({ statusCode: response.error.statusCode, body: response.error.body, rawResponse: response.rawResponse });
    }
    return handleNonStatusCodeError(response.error, response.rawResponse, "POST", `/ns/${namespace}/profile`);
  }
}
export { SupermemoryClient };
export type { BaseClientOptions as SupermemoryOptions, BaseRequestOptions as RequestOptions } from "./generated/BaseClient.js";
export * from "./generated/api/index.js";
export { SupermemoryError, SupermemoryTimeoutError } from "./generated/errors/index.js";
export { SupermemoryEnvironment };
export * from "./generated/exports.js";

export default Supermemory;
