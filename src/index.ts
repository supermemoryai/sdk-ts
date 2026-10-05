import type * as Api from "./generated/api/index.js";
import { ConnectorsClient } from "./generated/api/resources/connectors/client/Client.js";
import { SupermemoryClient } from "./generated/Client.js";

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
}
export { SupermemoryClient };
export type { BaseClientOptions as SupermemoryOptions, BaseRequestOptions as RequestOptions } from "./generated/BaseClient.js";
export * from "./generated/api/index.js";
export { SupermemoryError, SupermemoryTimeoutError } from "./generated/errors/index.js";
export { SupermemoryEnvironment } from "./generated/environments.js";
export * from "./generated/exports.js";

export default Supermemory;
