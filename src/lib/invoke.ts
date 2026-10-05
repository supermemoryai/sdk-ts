/*
 * Runs one SDK operation: the bridge between the public 5.0.0-rc.5-shaped
 * surface (src/funcs, src/sdk) and the Fern-generated client (src/generated).
 *
 *   1. validate the request with its outbound zod schema (rc.5: SDKValidationError)
 *   2. hand path/query params and the body to the Fern client method, which
 *      routes the call and encodes the URL and JSON body
 *   3. Fern's fetch is replaced by `send`, which builds the final Request the
 *      way rc.5 did (headers, auth, user agent, fetch options, multipart) and
 *      applies rc.5's timeout, retry, HTTPClient hooks and debug logging
 *   4. the raw response is matched against the operation's status/content-type
 *      matchers, producing rc.5's typed results and errors
 *
 * Nothing here is specific to an endpoint; per-operation facts come from the
 * generated OperationSpec in each src/funcs/*.ts.
 */

import * as z from "zod/v4-mini";
import { SupermemoryClient } from "../generated/Client.js";
import {
  ConnectionError,
  InvalidRequestError,
  RequestAbortedError,
  RequestTimeoutError,
  UnexpectedClientError,
} from "../models/errors/http-client-errors.js";
import { APICall, APIPromise } from "../types/async.js";
import { isBlobLike } from "../types/blobs.js";
import { ERR, Result } from "../types/fp.js";
import { isReadableStream } from "../types/streams.js";
import { SDK_METADATA } from "./config.js";
import { appendForm, normalizeBlob } from "./encodings.js";
import { env } from "./env.js";
import { bytesToBlob, getContentTypeFromFileName, readableStreamToArrayBuffer } from "./files.js";
import { isAbortError, isConnectionError, isTimeoutError, matchContentType } from "./http.js";
import { Logger } from "./logger.js";
import * as M from "./matchers.js";
import { combineSignals } from "./primitives.js";
import { retry } from "./retries.js";
import { safeParse } from "./schemas.js";
import { ClientSDK, RequestOptions } from "./sdks.js";

export type OperationSpec = {
  operationID: string;
  method: string;
  path: string;
  /** Method path on the Fern client, e.g. ["documents", "batchAdd"]. */
  fern: string[];
  params: Array<{ name: string; in: string }>;
  body: null | {
    /** "body" when the request nests the payload under `body`; null when the request is the payload. */
    key: string | null;
    contentType: string;
    /** Fern keeps non-object bodies under `body` instead of inlining them. */
    fernWrapped: boolean;
    fileFields?: string[];
  };
  accept: string;
};

// Fern's own timeout must never fire; rc.5's timeoutMs is applied in `send`.
const NO_TIMEOUT_SECONDS = 2_000_000;
// Fern resolves URLs against this; `send` re-bases them onto the real server URL.
const FERN_BASE = "http://fern.invalid";

const gt: unknown = typeof globalThis === "undefined" ? null : globalThis;
const webWorkerLike = typeof gt === "object" && gt != null && "importScripts" in gt && typeof gt["importScripts"] === "function";
const isBrowserLike = webWorkerLike
  || (typeof navigator !== "undefined" && "serviceWorker" in navigator)
  || (typeof window === "object" && typeof window.document !== "undefined");

export function invoke<T, E>(
  client: ClientSDK,
  spec: OperationSpec,
  request: unknown,
  schema: z.ZodMiniType | undefined,
  options: RequestOptions | undefined,
  matchers: Array<M.Matcher<any, any>>,
): APIPromise<Result<T, E>> {
  return new APIPromise($do(client, spec, request, schema, options, matchers)) as APIPromise<Result<T, E>>;
}

async function $do(
  client: ClientSDK,
  spec: OperationSpec,
  request: unknown,
  schema: z.ZodMiniType | undefined,
  options: RequestOptions | undefined,
  matchers: Array<M.Matcher<any, any>>,
): Promise<[Result<unknown, unknown>, APICall]> {
  let payload: any = undefined;
  if (schema) {
    const parsed = safeParse(request, (value) => z.parse(schema, value), "Input validation failed");
    if (!parsed.ok) return [parsed, { status: "invalid" }];
    payload = parsed.value;
  }

  const base = options?.serverURL ?? client._baseURL ?? "";
  if (!base) return [ERR(new InvalidRequestError("No base URL provided for operation")), { status: "invalid" }];

  // ---- the Fern call: params flat, body inlined (or under `body`)
  const fernRequest: Record<string, unknown> = {};
  for (const p of spec.params) {
    if (payload?.[p.name] !== undefined) fernRequest[p.name] = payload[p.name];
  }
  const body = spec.body ? (spec.body.key ? payload?.[spec.body.key] : payload) : undefined;
  let multipart: FormData | undefined;
  if (spec.body && body !== undefined) {
    if (spec.body.contentType === "multipart/form-data") {
      multipart = await toFormData(body, spec.body.fileFields ?? []);
      for (const [k, v] of multipart) if (!(k in fernRequest)) fernRequest[k] = v;
    } else if (spec.body.fernWrapped) {
      fernRequest.body = body;
    } else {
      Object.assign(fernRequest, body);
    }
  }

  const call: { request?: Request; response?: Response; error?: unknown } = {};

  const send = async (url: string, init: RequestInit): Promise<Response> => {
    try {
      const req = await buildRequest(client, spec, options, base, new URL(url), {
        body: multipart ?? (spec.body && body === undefined ? null : init.body ?? null),
      });
      call.request = req;
      const res = await doRequest(client, req, options);
      call.response = res;
      return res.clone();
    } catch (err) {
      call.error = err;
      throw err;
    }
  };

  const fern = new SupermemoryClient({
    baseUrl: FERN_BASE,
    apiKey: "-", // auth is applied by `send`
    fetch: send as typeof fetch,
    maxRetries: 0,
    timeoutInSeconds: NO_TIMEOUT_SECONDS,
  });
  let target: any = fern;
  for (const key of spec.fern.slice(0, -1)) target = target[key];
  const method = spec.fern[spec.fern.length - 1]!;
  const args = spec.params.length || spec.body ? [fernRequest, { maxRetries: 0 }] : [{ maxRetries: 0 }];
  // Fern's own result is not used: rc.5 semantics are applied to the raw response below.
  await target[method](...args).catch(() => undefined);

  if (call.error !== undefined || !call.response) {
    const err = call.error;
    const mapped = err instanceof InvalidRequestError || err instanceof UnexpectedClientError
      ? err
      : isAbortError(err)
      ? new RequestAbortedError("Request aborted by client", { cause: err })
      : isTimeoutError(err)
      ? new RequestTimeoutError("Request timed out", { cause: err })
      : isConnectionError(err)
      ? new ConnectionError("Unable to make request", { cause: err })
      : new UnexpectedClientError("Unexpected HTTP client error", { cause: err });
    return [ERR(mapped), call.request ? { status: "request-error", request: call.request } : { status: "invalid" }];
  }

  const response = call.response;
  const req = call.request!;
  const [result] = await M.match<unknown, unknown>(...matchers)(response, req, {
    extraFields: { HttpMeta: { Response: response, Request: req } },
  });
  return [result, { status: "complete", request: req, response }];
}

/** rc.5's multipart encoding: file fields first, then the rest alphabetically. */
async function toFormData(body: Record<string, unknown>, fileFields: string[]): Promise<FormData> {
  const fd = new FormData();
  for (const key of fileFields) {
    const file = body[key] as any;
    if (file == null) continue;
    if (isBlobLike(file)) {
      const blob = await normalizeBlob(file);
      const name = "name" in file ? (file.name as string) : undefined;
      appendForm(fd, key, blob, name);
    } else {
      const contentType = getContentTypeFromFileName(file.fileName) || "application/octet-stream";
      const content = isReadableStream(file.content) ? await readableStreamToArrayBuffer(file.content) : file.content;
      appendForm(fd, key, bytesToBlob(content, contentType), file.fileName);
    }
  }
  for (const key of Object.keys(body).filter((k) => !fileFields.includes(k)).sort()) {
    if (body[key] !== undefined) appendForm(fd, key, body[key]);
  }
  return fd;
}

/** Builds the outgoing Request exactly as rc.5's ClientSDK._createRequest did. */
async function buildRequest(
  client: ClientSDK,
  spec: OperationSpec,
  options: RequestOptions | undefined,
  base: string | URL,
  fernURL: URL,
  { body }: { body: BodyInit | null },
): Promise<Request> {
  const baseURL = new URL(base);
  baseURL.pathname = baseURL.pathname.replace(/\/+$/, "") + "/";
  // Relative to the server URL, so a base path (https://host/base/) is kept.
  const reqURL = new URL(fernURL.pathname.replace(/^\/+/, ""), baseURL);
  if (!reqURL.search && baseURL.search) reqURL.search = baseURL.search;
  reqURL.hash = "";
  // rc.5 emits query parameters in alphabetical order (repeated keys stay together, in order).
  const query = fernURL.search
    .slice(1)
    .split("&")
    .filter(Boolean)
    .map((pair, i) => ({ pair, key: pair.split("=")[0]!, i }))
    .sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : a.i - b.i))
    .map((x) => x.pair)
    .join("&");
  const finalQuery = [query].reduce(mergeQuery, reqURL.search.slice(1));
  if (finalQuery) reqURL.search = `?${finalQuery}`;

  const headers = new Headers();
  if (spec.body && spec.body.contentType !== "multipart/form-data") headers.set("Content-Type", spec.body.contentType);
  headers.set("Accept", spec.accept);

  const apiKey = await resolveApiKey(client);
  if (apiKey) headers.set("Authorization", apiKey.slice(0, 7).toLowerCase() === "bearer " ? apiKey : `Bearer ${apiKey}`);
  headers.set("cookie", headers.get("cookie") || "");

  const userHeaders = new Headers(options?.headers ?? options?.fetchOptions?.headers);
  for (const [k, v] of userHeaders) headers.set(k, v);
  if (!isBrowserLike) headers.set("user-agent", client._options.userAgent ?? SDK_METADATA.userAgent);

  const fetchOptions: Omit<RequestInit, "method" | "body"> = { ...options?.fetchOptions, ...options };
  if (body instanceof ReadableStream) Object.assign(fetchOptions, { duplex: "half" });

  return new Request(reqURL, { ...fetchOptions, body, headers, method: spec.method });
}

async function resolveApiKey(client: ClientSDK): Promise<string | undefined> {
  const sec = client._options.apiKey;
  const key = sec == null ? undefined : typeof sec === "function" ? await sec() : sec;
  return key ?? env().SUPERMEMORY_API_KEY;
}

function mergeQuery(current: string, additions: string): string {
  if (!additions) return current;
  const additionKeys = new Set(additions.split("&").filter((p) => p !== "").map((p) => p.split("=")[0] ?? ""));
  const kept = current.split("&").filter((p) => p !== "" && !additionKeys.has(p.split("=")[0] ?? ""));
  return [...kept, additions].join("&");
}

/** rc.5's ClientSDK._do: per-attempt timeout, retries, HTTPClient hooks, logging. */
async function doRequest(client: ClientSDK, request: Request, options: RequestOptions | undefined): Promise<Response> {
  const fetchOptions = { ...options?.fetchOptions, ...options };
  const timeoutMs = options?.timeoutMs || client._options.timeoutMs || -1;
  const perAttemptTimeout = !fetchOptions.signal && timeoutMs > 0 ? timeoutMs : undefined;
  const logger = client._logger;

  return retry(
    async () => {
      const cloned = request.clone();
      let attempt = cloned;
      if (perAttemptTimeout != null) {
        const timeoutSignal = AbortSignal.timeout(perAttemptTimeout);
        const combined = combineSignals(cloned.signal, timeoutSignal) ?? timeoutSignal;
        attempt = new Request(cloned, { signal: combined });
      }
      await logRequest(logger, attempt).catch((e) => logger?.log("Failed to log request:", e));
      const response = await client._httpClient.request(attempt);
      await logResponse(logger, response, attempt).catch((e) => logger?.log("Failed to log response:", e));
      return response;
    },
    {
      config: options?.retries || client._options.retryConfig || { strategy: "none" },
      statusCodes: options?.retryCodes || ["429", "500", "502", "503", "504"],
    },
  );
}

const jsonLikeContentTypeRE = /^(application|text)\/([^+]+\+)*json.*/;
const jsonlLikeContentTypeRE = /^(application|text)\/([^+]+\+)*(jsonl|x-ndjson)\b.*/;

async function logRequest(logger: Logger | undefined, req: Request) {
  if (!logger) return;
  const contentType = req.headers.get("content-type");
  const ct = contentType?.split(";")[0] || "";
  logger.group(`> Request: ${req.method} ${req.url}`);
  logger.group("Headers:");
  for (const [k, v] of req.headers.entries()) logger.log(`${k}: ${v}`);
  logger.groupEnd();
  logger.group("Body:");
  switch (true) {
    case jsonLikeContentTypeRE.test(ct):
      logger.log(await req.clone().json());
      break;
    case ct.startsWith("text/"):
      logger.log(await req.clone().text());
      break;
    case ct === "multipart/form-data": {
      const body = await req.clone().formData();
      for (const [k, v] of body) logger.log(`${k}: ${v instanceof Blob ? "<Blob>" : v}`);
      break;
    }
    default:
      logger.log(`<${contentType}>`);
      break;
  }
  logger.groupEnd();
  logger.groupEnd();
}

async function logResponse(logger: Logger | undefined, res: Response, req: Request) {
  if (!logger) return;
  const contentType = res.headers.get("content-type");
  const ct = contentType?.split(";")[0] || "";
  logger.group(`< Response: ${req.method} ${req.url}`);
  logger.log("Status Code:", res.status, res.statusText);
  logger.group("Headers:");
  for (const [k, v] of res.headers.entries()) logger.log(`${k}: ${v}`);
  logger.groupEnd();
  logger.group("Body:");
  switch (true) {
    case matchContentType(res, "application/json") || (jsonLikeContentTypeRE.test(ct) && !jsonlLikeContentTypeRE.test(ct)):
      logger.log(await res.clone().json());
      break;
    case matchContentType(res, "application/jsonl") || jsonlLikeContentTypeRE.test(ct):
    case matchContentType(res, "text/event-stream"):
      logger.log(`<${contentType}>`);
      break;
    case matchContentType(res, "text/*"):
      logger.log(await res.clone().text());
      break;
    case matchContentType(res, "multipart/form-data"): {
      const body = await res.clone().formData();
      for (const [k, v] of body) logger.log(`${k}: ${v instanceof Blob ? "<Blob>" : v}`);
      break;
    }
    default:
      logger.log(`<${contentType}>`);
      break;
  }
  logger.groupEnd();
  logger.groupEnd();
}
