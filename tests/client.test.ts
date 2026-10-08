import { afterEach, expect, test } from "bun:test";
import { execFileSync } from "node:child_process";

import DefaultSupermemory, { NotFoundError, Supermemory, SupermemoryError, SupermemoryTimeoutError } from "../src/index.ts";

type Sent = { method: string; url: URL; headers: Headers; body: string };

function stub(status = 200, body: unknown = {}, opts: Record<string, unknown> = { apiKey: "sm_test" }) {
  const sent: Sent[] = [];
  const fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const req = new Request(input, init);
    sent.push({ method: req.method, url: new URL(req.url), headers: req.headers, body: await req.text() });
    return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
  };
  return { sent, client: new Supermemory({ ...opts, fetch: fetch as typeof globalThis.fetch }) };
}

const routes: Array<[string, (c: Supermemory) => Promise<unknown>, string, string, unknown?]> = [
  ["add", (c) => c.add("user_alex", { content: "hi", id: "d1", dreaming: "instant" }), "POST", "/ns/user_alex/document", { content: "hi", id: "d1", dreaming: "instant" }],
  ["search", (c) => c.search("user_alex", { query: "q", searchMode: "chunks", limit: 3, include: { related: true } }), "POST", "/ns/user_alex/search", { query: "q", searchMode: "chunks", limit: 3, include: { related: true } }],
  ["profile", (c) => c.profile("user_alex"), "POST", "/ns/user_alex/profile"],
  ["list", (c) => c.list("user_alex", "documents", { limit: 5, filter: { field: "a", operator: "eq", value: "b" } }), "POST", "/ns/user_alex/list/documents?limit=5", { filter: { field: "a", operator: "eq", value: "b" } }],
  ["documents.get", (c) => c.documents.get("user_alex", "d1", { include: ["chunks", "memories"] }), "GET", "/ns/user_alex/document/d1?include=chunks,memories"],
  ["memories.get", (c) => c.memories.get("user_alex", "m1", { include: ["related"], relatedLimit: 5 }), "GET", "/ns/user_alex/memories/m1?include=related&relatedLimit=5"],
  ["namespaces.list (paged)", (c) => c.namespaces.list({ page: 2, limit: 50 }), "GET", "/ns?page=2&limit=50"],
  ["namespaces.delete (move)", (c) => c.namespaces.delete("user_alex", { moveTo: "archive" }), "DELETE", "/ns/user_alex?moveTo=archive"],
  ["documents.get (no options)", (c) => c.documents.get("user_alex", "d1"), "GET", "/ns/user_alex/document/d1"],
  ["documents.delete", (c) => c.documents.delete("user_alex", { ids: ["d1"] }), "DELETE", "/ns/user_alex/document", { ids: ["d1"] }],
  ["memories.forgetMatching", (c) => c.memories.forgetMatching("user_alex", { query: "x", dryRun: true }), "DELETE", "/ns/user_alex/memories/semantic", { query: "x", dryRun: true }],
  ["namespaces.list", (c) => c.namespaces.list(), "GET", "/ns"],
  ["namespaces.delete", (c) => c.namespaces.delete("user_alex"), "DELETE", "/ns/user_alex"],
  ["organization.update", (c) => c.organization.update({ organizationalContext: null }), "PATCH", "/organization", { organizationalContext: null }],
  ["connectors.listAll", (c) => c.connectors.listAll({ provider: "notion", page: 2 }), "GET", "/connectors?provider=notion&page=2"],
  ["connectors.listAll (no options)", (c) => c.connectors.listAll(), "GET", "/connectors"],
  ["connectors.create", (c) => c.connectors.create("user_alex", { provider: "web-crawler", config: { startUrl: "https://example.com", crawlDepth: 2 } }), "POST", "/ns/user_alex/connectors", { provider: "web-crawler", config: { startUrl: "https://example.com", crawlDepth: 2 } }],
  ["connectors.delete", (c) => c.connectors.delete("user_alex", "c1", { deleteDocuments: false }), "DELETE", "/ns/user_alex/connectors/c1?deleteDocuments=false"],
  ["connectors.get (include)", (c) => c.connectors.get("user_alex", "c1", { include: ["syncs", "picker"], returnUrl: "https://x" }), "GET", "/ns/user_alex/connectors/c1?include=syncs,picker&returnUrl=https%3A%2F%2Fx"],
  ["connectors.sync", (c) => c.connectors.sync("user_alex", "c1"), "POST", "/ns/user_alex/connectors/c1/sync"],
];

for (const [name, call, method, pathAndQuery, body] of routes) {
  test(`${name} -> ${method} ${pathAndQuery}`, async () => {
    const { sent, client } = stub(200, []);
    await call(client).catch(() => undefined); // stub bodies are not real responses; the request is what is checked
    expect(sent).toHaveLength(1);
    expect(sent[0]!.method).toBe(method);
    // Comma lists and repeated keys are both accepted by the API; compare the parsed set, not the raw string.
    const norm = (u: URL) => `${u.pathname}?${[...u.searchParams].flatMap(([k, v]) => v.split(",").map((x) => `${k}=${x}`)).sort().join("&")}`;
    expect(norm(sent[0]!.url)).toBe(norm(new URL(pathAndQuery, "http://x")));
    expect(sent[0]!.headers.get("authorization")).toBe("Bearer sm_test");
    if (body !== undefined) expect(JSON.parse(sent[0]!.body)).toEqual(body);
  });
}

const savedKey = process.env.SUPERMEMORY_API_KEY;
afterEach(() => {
  if (savedKey === undefined) delete process.env.SUPERMEMORY_API_KEY;
  else process.env.SUPERMEMORY_API_KEY = savedKey;
});

test("reads SUPERMEMORY_API_KEY", async () => {
  process.env.SUPERMEMORY_API_KEY = "sm_env";
  const { sent, client } = stub(200, [], {});
  await client.namespaces.list();
  expect(sent[0]!.headers.get("authorization")).toBe("Bearer sm_env");
});

test("default and named exports are the same client", () => {
  expect(DefaultSupermemory).toBe(Supermemory);
});

test("404 throws NotFoundError, a SupermemoryError", async () => {
  const { client } = stub(404, { error: "not found" });
  const err = await client.documents.get("user_alex", "missing").catch((e: unknown) => e);
  expect(err).toBeInstanceOf(NotFoundError);
  expect(err).toBeInstanceOf(SupermemoryError);
  expect((err as SupermemoryError).statusCode).toBe(404);
  expect((err as SupermemoryError).body).toEqual({ error: "not found" });
});

test("a timed-out request throws SupermemoryTimeoutError", async () => {
  const never = (_input: RequestInfo | URL, init?: RequestInit) =>
    new Promise<Response>((_, reject) => init?.signal?.addEventListener("abort", () => reject(init.signal!.reason)));
  const client = new Supermemory({ apiKey: "sm_test", fetch: never as typeof globalThis.fetch, maxRetries: 0 });
  const err = await client.organization.get({ timeoutInSeconds: 0.01 }).catch((e: unknown) => e);
  expect(err).toBeInstanceOf(SupermemoryTimeoutError);
});

test("a thrown fetch is retried, an abort is not", async () => {
  let calls = 0;
  const flaky = async (input: RequestInfo | URL, init?: RequestInit) => {
    calls++;
    if (calls === 1) throw new TypeError("fetch failed");
    return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
  };
  const client = new Supermemory({ apiKey: "sm_test", fetch: flaky as typeof globalThis.fetch, maxRetries: 2 });
  expect(await client.organization.get()).toEqual({});
  expect(calls).toBe(2);

  calls = 0;
  const once = new Supermemory({ apiKey: "sm_test", fetch: flaky as typeof globalThis.fetch, maxRetries: 0 });
  const err = await once.namespaces.list().catch((e: unknown) => e);
  expect(err).toBeInstanceOf(SupermemoryError);
  expect(calls).toBe(1);
});

test("profileMarkdown returns text that happens to be valid JSON, or empty, unchanged", async () => {
  for (const body of ["123", '"hello"', "", "{}"]) {
    const client = new Supermemory({ apiKey: "sm_test", fetch: (async () => new Response(body, { status: 200, headers: { "content-type": "text/markdown" } })) as typeof globalThis.fetch });
    expect(await client.profileMarkdown("user_alex")).toBe(body);
  }
});

test("profileMarkdown maps a 404 to NotFoundError-compatible SupermemoryError", async () => {
  const client = new Supermemory({ apiKey: "sm_test", fetch: (async () => new Response('{"error":"nope"}', { status: 404, headers: { "content-type": "application/json" } })) as typeof globalThis.fetch, maxRetries: 0 });
  const err = await client.profileMarkdown("user_alex").catch((e: unknown) => e);
  expect(err).toBeInstanceOf(SupermemoryError);
  expect((err as SupermemoryError).statusCode).toBe(404);
});

test("fetch passthrough on a default client resolves relative paths and sends auth to the default host", async () => {
  const { sent, client } = stub();
  await client.fetch("/v3/settings");
  await client.fetch("https://api.supermemory.ai/v3/settings");
  expect(sent.map((s) => s.url.href)).toEqual(["https://api.supermemory.ai/v3/settings", "https://api.supermemory.ai/v3/settings"]);
  expect(sent.map((s) => s.headers.get("authorization"))).toEqual(["Bearer sm_test", "Bearer sm_test"]);
});


test("fetch passthrough does not send auth to another host", async () => {
  const { sent, client } = stub();
  await client.fetch("https://example.com/x");
  expect(sent[0].url.href).toBe("https://example.com/x");
  expect(sent[0].headers.get("authorization")).toBeNull();
});


test("an abort with a custom reason is not retried", async () => {
  let calls = 0;
  const ac = new AbortController();
  const aborting = (_input: RequestInfo | URL, init?: RequestInit) => {
    calls++;
    ac.abort(new Error("user cancelled"));
    return Promise.reject(init?.signal?.reason ?? new Error("user cancelled"));
  };
  const client = new Supermemory({ apiKey: "sm_test", fetch: aborting as typeof globalThis.fetch, maxRetries: 2 });
  const t0 = Date.now();
  const err = await client.organization.get({ abortSignal: ac.signal }).catch((e: unknown) => e);
  expect(err).toBeInstanceOf(SupermemoryError);
  expect(calls).toBe(1);
  expect(Date.now() - t0).toBeLessThan(500);
});

test("profileMarkdown sends Accept: text/markdown and returns the text", async () => {
  const sent: Request[] = [];
  const md = async (input: RequestInfo | URL, init?: RequestInit) => {
    sent.push(new Request(input, init));
    return new Response("# Alex\n\n- prefers mornings", { status: 200, headers: { "content-type": "text/markdown" } });
  };
  const client = new Supermemory({ apiKey: "sm_test", fetch: md as typeof globalThis.fetch });
  expect(await client.profileMarkdown("user_alex")).toBe("# Alex\n\n- prefers mornings");
  expect(sent[0]!.headers.get("accept")).toBe("text/markdown");
  expect(sent[0]!.url.endsWith("/ns/user_alex/profile")).toBe(true);
});

test("Node exits after a failed request (no timer left behind)", () => {
  const root = new URL("..", import.meta.url).pathname;
  const out = execFileSync(
    "node",
    [
      "--input-type=module",
      "-e",
      `import { Supermemory } from "supermemory";
       const client = new Supermemory({ apiKey: "x", fetch: () => { throw new TypeError("fetch failed"); } });
       try { await client.namespaces.list(); } catch (e) { console.log(e.constructor.name); }`,
    ],
    { cwd: root, encoding: "utf8", timeout: 5000 },
  );
  expect(out.trim()).toBe("SupermemoryError");
});

test("built package imports from Node ESM and CJS", () => {
  const root = new URL("..", import.meta.url).pathname;
  const esm = execFileSync(
    "node",
    ["--input-type=module", "-e", `import S, { Supermemory, SupermemoryError, NotFoundError } from "supermemory"; console.log(S === Supermemory && typeof SupermemoryError === "function" && typeof NotFoundError === "function" && typeof Supermemory);`],
    { cwd: root, encoding: "utf8" },
  );
  const cjs = execFileSync(
    "node",
    ["-e", `const m = require("supermemory"); console.log(m.default === m.Supermemory && typeof m.SupermemoryError === "function" && typeof m.Supermemory);`],
    { cwd: root, encoding: "utf8" },
  );
  expect(esm.trim()).toBe("function");
  expect(cjs.trim()).toBe("function");
});
