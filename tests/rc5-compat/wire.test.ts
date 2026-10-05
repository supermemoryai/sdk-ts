// Runs the same rc.5-shaped calls through the published supermemory@5.0.0-rc.5
// and through this package, with a stubbed fetcher, and asserts that both send
// identical requests and return identical results and errors.
import { describe, expect, test } from "bun:test";
import { HTTPClient as Rc5HTTPClient, Supermemory as Rc5 } from "supermemory-rc5";
import * as Rc5Errors from "supermemory-rc5/models/errors";
import { loadSpec, type Schema } from "../../scripts/surface/spec.ts";
import { HTTPClient, Supermemory } from "../../src/index.ts";

const root = new URL("../..", import.meta.url).pathname;
const spec = await loadSpec(root);

// ------------------------------------------------------------ sample bodies
function sample(schema: Schema, depth = 0): unknown {
  const s = spec.resolve(schema);
  if (depth > 6) return undefined;
  if (s.const !== undefined) return s.const;
  if (Array.isArray(s.enum)) return s.enum[0];
  const variants = s.oneOf ?? s.anyOf;
  if (variants) return sample(variants.find((v: Schema) => spec.resolve(v).type !== "null") ?? variants[0], depth + 1);
  const type = Array.isArray(s.type) ? s.type.find((t: string) => t !== "null") : s.type;
  if (s.properties) {
    const o: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(s.properties as Record<string, Schema>)) {
      const x = sample(v, depth + 1);
      if (x !== undefined) o[k] = x;
    }
    return o;
  }
  switch (type) {
    case "string":
      return s.format === "date-time" ? "2026-01-02T03:04:05.000Z" : typeof s.example === "string" ? s.example : "text";
    case "number":
    case "integer":
      return typeof s.example === "number" ? s.example : 7;
    case "boolean":
      return true;
    case "array":
      return [sample(s.items, depth + 1)].filter((x) => x !== undefined);
  }
  if (s.additionalProperties && typeof s.additionalProperties === "object") return { key: sample(s.additionalProperties, depth + 1) };
  return { any: "value" };
}

function successBody(opId: string) {
  const op = spec.ops.find((o) => o.opId === opId)!;
  return sample(op.success.find((r) => r.contentType === "application/json")!.schema);
}

// ------------------------------------------------------------------ capture
type Wire = { method: string; url: string; headers: Record<string, string>; body: unknown };

async function serialize(req: Request): Promise<Wire> {
  const headers: Record<string, string> = {};
  for (const [k, v] of req.headers) if (k !== "user-agent") headers[k] = k === "content-type" ? v.replace(/boundary=.*/, "boundary=*") : v;
  let body: unknown = null;
  const ct = req.headers.get("content-type") ?? "";
  if (ct.startsWith("multipart/form-data")) {
    const parts: unknown[] = [];
    for (const [k, v] of await req.formData()) {
      parts.push(typeof v === "string" ? [k, v] : [k, { name: v.name, type: v.type, text: await v.text() }]);
    }
    body = parts;
  } else if (req.body) {
    body = await req.text();
  }
  return { method: req.method, url: req.url, headers, body };
}

type Responder = (req: Request, attempt: number) => Response | Promise<Response>;

function client(kind: "rc5" | "new", respond: Responder, opts: Record<string, unknown> = {}) {
  const sent: Wire[] = [];
  let attempt = 0;
  const fetcher = async (input: RequestInfo | URL, init?: RequestInit) => {
    const req = input instanceof Request ? input : new Request(input, init);
    sent.push(await serialize(req.clone()));
    return respond(req, attempt++);
  };
  const options = { apiKey: "sm_test", ...opts };
  const sdk = kind === "rc5"
    ? new Rc5({ ...options, httpClient: new Rc5HTTPClient({ fetcher }) } as any)
    : new Supermemory({ ...options, httpClient: new HTTPClient({ fetcher }) } as any);
  return { sdk: sdk as any, sent };
}

const json = (status: number, body: unknown, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", ...headers } });

/** Everything observable about an outcome: value, or error class/fields. */
function outcome(r: PromiseSettledResult<unknown>) {
  if (r.status === "fulfilled") return { ok: true, value: r.value };
  const e = r.reason as any;
  return {
    ok: false,
    name: e?.name,
    class: e?.constructor?.name,
    message: e?.message,
    statusCode: e?.statusCode,
    body: e?.body,
    contentType: e?.contentType,
    data: e?.data$,
    cause: e?.cause ? String(e.cause) : undefined,
    rawValue: e?.rawValue,
  };
}

async function compare(call: (sdk: any) => Promise<unknown>, respond: Responder, opts: Record<string, unknown> = {}) {
  const a = client("rc5", respond, opts);
  const b = client("new", respond, opts);
  const [ra, rb] = await Promise.allSettled([call(a.sdk), call(b.sdk)]);
  expect(b.sent).toEqual(a.sent);
  expect(outcome(rb)).toEqual(outcome(ra));
  return { rc5: a, ours: b, result: ra };
}

// -------------------------------------------------------------------- cases
const filter = {
  operator: "and" as const,
  operands: [
    { field: "team", operator: "eq" as const, value: "design" },
    { operator: "or" as const, operands: [{ field: "score", operator: "gte" as const, value: 3 }, { field: "tags", operator: "arrayContains" as const, value: "x" }] },
  ],
};

const calls: Array<[string, string, (sdk: any) => Promise<unknown>]> = [
  ["add", "postNsByNamespaceDocument", (c) => c.add({ namespace: "user alex/ü", taskType: "memory", body: { content: "Alex likes mornings", id: "pref-1", metadata: { a: 1, b: ["x"] }, group: { team: "design" }, supportingContext: "ctx", date: "2026-01-01" } })],
  ["add (minimal)", "postNsByNamespaceDocument", (c) => c.add({ namespace: "user_alex", body: { content: "hi" } })],
  ["search", "postNsByNamespaceSearch", (c) => c.search({ namespace: "user_alex", limit: 5, searchMode: "memories", body: { query: "when?", filter, attach: { documents: true }, rerank: "order", rewriteQuery: true, threshold: 0.5 } })],
  ["search (defaults)", "postNsByNamespaceSearch", (c) => c.search({ namespace: "user_alex", body: { query: "q" } })],
  ["profile", "postNsByNamespaceProfile", (c) => c.profile({ namespace: "user_alex", body: { filter } })],
  ["profile (no body)", "postNsByNamespaceProfile", (c) => c.profile({ namespace: "user_alex" })],
  ["list", "postNsByNamespaceListByType", (c) => c.list({ namespace: "user_alex", type: "memories", page: 2, limit: "20", sort: "updatedAt", order: "asc", body: { filter } })],
  ["list (defaults)", "postNsByNamespaceListByType", (c) => c.list({ namespace: "user_alex", type: "documents" })],
  ["documents.get", "getNsByNamespaceDocumentById", (c) => c.documents.get({ namespace: "user_alex", id: "doc 1", attach: ["memories", "chunks"] })],
  ["documents.update", "patchNsByNamespaceDocumentById", (c) => c.documents.update({ namespace: "user_alex", id: "doc1", dreaming: "instant", body: { content: "new", metadata: { k: true } } })],
  ["documents.delete", "deleteNsByNamespaceDocument", (c) => c.documents.delete({ namespace: "user_alex", body: { ids: ["a", "b"] } })],
  ["documents.batchAdd", "postNsByNamespaceDocumentBatch", (c) => c.documents.batchAdd({ namespace: "user_alex", body: { documents: [{ content: "one", id: "1" }, { content: "two", metadata: { n: 2 } }] } })],
  ["documents.uploadFile (Blob)", "postNsByNamespaceDocumentFile", (c) => c.documents.uploadFile({ namespace: "user_alex", fileType: "text", body: { file: new Blob(["hello"], { type: "text/plain" }), metadata: "{\"a\":1}", supportingContext: "ctx", date: "2026-01-01", group: "{}" } })],
  ["documents.uploadFile (File)", "postNsByNamespaceDocumentFile", (c) => c.documents.uploadFile({ namespace: "user_alex", body: { file: new File(["%PDF"], "notes.pdf", { type: "application/pdf" }) } })],
  ["documents.uploadFile ({fileName, content})", "postNsByNamespaceDocumentFile", (c) => c.documents.uploadFile({ namespace: "user_alex", mimeType: "text/markdown", body: { file: { fileName: "notes.md", content: new TextEncoder().encode("# hi") } } })],
  ["documents.uploadFile (stream)", "postNsByNamespaceDocumentFile", (c) => c.documents.uploadFile({ namespace: "user_alex", body: { file: { fileName: "a.txt", content: new Blob(["streamed"]).stream() } } })],
  ["documents.replaceWithFile", "postNsByNamespaceDocumentFileById", (c) => c.documents.replaceWithFile({ namespace: "user_alex", id: "doc1", body: { file: new File(["x"], "x.txt") } })],
  ["documents.updateFile", "patchNsByNamespaceDocumentFileById", (c) => c.documents.updateFile({ namespace: "user_alex", id: "doc1", taskType: "superrag", body: { file: new File(["y"], "y.txt"), metadata: "{}" } })],
  ["memories.forget", "deleteNsByNamespaceMemories", (c) => c.memories.forget({ namespace: "user_alex", body: { ids: ["m1"] } })],
  ["memories.forgetMatching", "deleteNsByNamespaceMemoriesSemantic", (c) => c.memories.forgetMatching({ namespace: "user_alex", body: { query: "old job", dryRun: true } })],
  ["profiles.getBuckets", "getNsByNamespaceProfileBuckets", (c) => c.profiles.getBuckets({ namespace: "user_alex" })],
  ["profiles.setBuckets", "putNsByNamespaceProfileBuckets", (c) => c.profiles.setBuckets({ namespace: "user_alex", body: { buckets: { work: "Work things" } } })],
  ["profiles.deleteBuckets", "deleteNsByNamespaceProfileBuckets", (c) => c.profiles.deleteBuckets({ namespace: "user_alex", body: { buckets: ["work"] } })],
  ["namespaces.list", "getNs", (c) => c.namespaces.list()],
  ["namespaces.get", "getNsByNamespace", (c) => c.namespaces.get({ namespace: "user_alex" })],
  ["namespaces.update", "patchNsByNamespace", (c) => c.namespaces.update({ namespace: "user_alex", body: { name: "Alex" } })],
  ["namespaces.delete", "deleteNsByNamespace", (c) => c.namespaces.delete({ namespace: "user_alex", body: { moveTo: "archive" } })],
  ["organization.get", "getOrganization", (c) => c.organization.get()],
  ["organization.update", "patchOrganization", (c) => c.organization.update({ organizationalContext: "We build memory." })],
];

describe("identical wire requests and parsed results vs supermemory@5.0.0-rc.5", () => {
  for (const [name, opId, call] of calls) {
    test(name, async () => {
      const { rc5 } = await compare(call, () => json(200, successBody(opId)));
      expect(rc5.sent).toHaveLength(1);
    });
  }
});

describe("response variants", () => {
  test("profile as text/markdown", () =>
    compare((c) => c.profile({ namespace: "user_alex" }), () => new Response("# Alex\n- likes mornings", { status: 200, headers: { "content-type": "text/markdown" } })));
  test("namespaces.delete 202 queued", () =>
    compare((c) => c.namespaces.delete({ namespace: "user_alex" }), () => json(202, { success: true, status: "queued", operationId: "op1", namespace: "user_alex", moveTo: "x" })));
  test("unknown enum values and extra fields", () =>
    compare((c) => c.search({ namespace: "n", body: { query: "q" } }), () => {
      const body = successBody("postNsByNamespaceSearch") as any;
      body.results[0].included.related.parents[0].relation = "brand-new-relation";
      body.unexpected = { field: 1 };
      return json(200, body);
    }));
  test("lax parsing of missing and mistyped fields", () =>
    compare((c) => c.namespaces.get({ namespace: "n" }), () => json(200, { namespace: 123, documentCount: "4" })));
});

describe("errors", () => {
  const add = (c: any) => c.add({ namespace: "n", body: { content: "x" } });
  test("400 validation error body", () => compare(add, () => json(400, { success: false, error: [{ message: "bad", path: ["content", 0] }], data: { content: "x" } })));
  test("400 error body", () => compare(add, () => json(400, { error: "Bad request", details: "nope" })));
  for (const status of [401, 402, 403, 409, 500]) test(`${status} ErrorResponse`, () => compare(add, () => json(status, { error: `status ${status}` })));
  test("404 on documents.get", () => compare((c) => c.documents.get({ namespace: "n", id: "missing" }), () => json(404, { error: "not found" })));
  test("undeclared 418", () => compare(add, () => json(418, { teapot: true })));
  test("502 with HTML", () => compare(add, () => new Response("<html>bad gateway</html>", { status: 502, headers: { "content-type": "text/html" } })));
  test("invalid response body", () => compare(add, () => json(200, { id: 1, status: { nested: true } })));
  test("input validation error", () => compare((c) => c.add({ namespace: "n", body: {} }), () => json(200, {})));
  test("connection error", () => compare(add, () => Promise.reject(new TypeError("fetch failed"))));
  test("errors are the same classes", async () => {
    const { result } = await compare(add, () => json(400, { error: "Bad request" }));
    const err = (result as PromiseRejectedResult).reason;
    expect(err).toBeInstanceOf(Rc5Errors.ErrorResponse);
  });
});

describe("options", () => {
  const search = (c: any, o?: any) => c.search({ namespace: "n", body: { query: "q" } }, o);
  test("serverURL and per-call serverURL", async () => {
    await compare((c) => search(c), () => json(200, successBody("postNsByNamespaceSearch")), { serverURL: "https://example.test/base/" });
    await compare((c) => search(c, { serverURL: "http://localhost:8787" }), () => json(200, successBody("postNsByNamespaceSearch")));
  });
  test("per-call headers and fetchOptions", () =>
    compare((c) => search(c, { headers: { "x-trace": "1" }, fetchOptions: { headers: { "x-ignored": "1" }, cache: "no-store" } }), () => json(200, successBody("postNsByNamespaceSearch"))));
  test("apiKey as async function and Bearer prefix", async () => {
    await compare((c) => search(c), () => json(200, successBody("postNsByNamespaceSearch")), { apiKey: async () => "sm_async" });
    await compare((c) => search(c), () => json(200, successBody("postNsByNamespaceSearch")), { apiKey: "Bearer sm_prefixed" });
  });
  test("retryConfig retries 503 then succeeds", async () => {
    const retryConfig = { strategy: "backoff", backoff: { initialInterval: 1, maxInterval: 5, exponent: 1.1, maxElapsedTime: 2000 }, retryConnectionErrors: true };
    const respond: Responder = (_req, n) => (n < 2 ? json(503, { error: "busy" }, { "retry-after-ms": "1" }) : json(200, successBody("postNsByNamespaceSearch")));
    const { rc5, ours } = await compare((c) => search(c), respond, { retryConfig });
    expect(ours.sent).toHaveLength(3);
    expect(rc5.sent).toHaveLength(3);
  });
  test("no retries by default", async () => {
    const { ours } = await compare((c) => search(c), () => json(503, { error: "busy" }));
    expect(ours.sent).toHaveLength(1);
  });
  test("timeoutMs", () =>
    compare((c) => search(c, { timeoutMs: 20 }), (req) => new Promise((_, reject) => req.signal.addEventListener("abort", () => reject(req.signal.reason)))));
  test("user abort signal", () => {
    const ac = new AbortController();
    setTimeout(() => ac.abort(), 10);
    return compare((c) => search(c, { signal: ac.signal }), (req) => new Promise((_, reject) => req.signal.addEventListener("abort", () => reject(req.signal.reason))));
  });
});

describe("standalone functions", () => {
  test("funcs return the same Result", async () => {
    const { SupermemoryCore: Rc5Core } = await import("supermemory-rc5/core.js");
    const { search: rc5Search } = await import("supermemory-rc5/funcs/search.js");
    const { SupermemoryCore } = await import("../../src/core.ts");
    const { search } = await import("../../src/funcs/search.ts");
    const respond = () => json(200, successBody("postNsByNamespaceSearch"));
    const make = (Core: any, HTTP: any) => {
      const sent: Wire[] = [];
      const core = new Core({ apiKey: "k", httpClient: new HTTP({ fetcher: async (r: Request) => (sent.push(await serialize(r.clone())), respond()) }) });
      return { core, sent };
    };
    const a = make(Rc5Core, Rc5HTTPClient);
    const b = make(SupermemoryCore, HTTPClient);
    const req = { namespace: "n", body: { query: "q" } };
    const [ra, rb] = await Promise.all([rc5Search(a.core, req), search(b.core, req)]);
    expect(rb).toEqual(ra as any);
    expect(b.sent).toEqual(a.sent);
    const [ia, ib] = await Promise.all([rc5Search(a.core, req).$inspect(), search(b.core, req).$inspect()]);
    expect(ib[1].status).toBe(ia[1].status);
  });
});
