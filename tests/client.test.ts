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
  ["add", (c) => c.add("user_alex", { content: "hi", id: "d1", dreaming: "instant" }), "POST", "/ns/user_alex/document?dreaming=instant", { content: "hi", id: "d1" }],
  ["search", (c) => c.search("user_alex", { query: "q", searchMode: "chunks", limit: 3 }), "POST", "/ns/user_alex/search?limit=3&searchMode=chunks", { query: "q" }],
  ["profile", (c) => c.profile("user_alex"), "POST", "/ns/user_alex/profile"],
  ["list", (c) => c.list("user_alex", "documents", { limit: 5, filter: { field: "a", operator: "eq", value: "b" } }), "POST", "/ns/user_alex/list/documents?limit=5", { filter: { field: "a", operator: "eq", value: "b" } }],
  ["documents.get", (c) => c.documents.get("user_alex", "d1", { attach: ["chunks"] }), "GET", "/ns/user_alex/document/d1?attach=chunks"],
  ["documents.get (no options)", (c) => c.documents.get("user_alex", "d1"), "GET", "/ns/user_alex/document/d1"],
  ["documents.delete", (c) => c.documents.delete("user_alex", { ids: ["d1"] }), "DELETE", "/ns/user_alex/document", { ids: ["d1"] }],
  ["memories.forgetMatching", (c) => c.memories.forgetMatching("user_alex", { query: "x", dryRun: true }), "DELETE", "/ns/user_alex/memories/semantic", { query: "x", dryRun: true }],
  ["namespaces.list", (c) => c.namespaces.list(), "GET", "/ns"],
  ["namespaces.delete", (c) => c.namespaces.delete("user_alex"), "DELETE", "/ns/user_alex"],
  ["organization.update", (c) => c.organization.update({ organizationalContext: null }), "PATCH", "/organization", { organizationalContext: null }],
  ["connectors.listAll", (c) => c.connectors.listAll({ provider: "notion", page: 2 }), "GET", "/connectors?provider=notion&page=2"],
  ["connectors.listAll (no options)", (c) => c.connectors.listAll(), "GET", "/connectors"],
  ["connectors.create", (c) => c.connectors.create("user_alex", { provider: "web-crawler", config: { startUrl: "https://example.com", crawlDepth: 2 } }), "POST", "/ns/user_alex/connectors", { provider: "web-crawler", config: { startUrl: "https://example.com", crawlDepth: 2 } }],
  ["connectors.delete", (c) => c.connectors.delete("user_alex", "c1", { deleteDocuments: "false" }), "DELETE", "/ns/user_alex/connectors/c1?deleteDocuments=false"],
  ["connectors.sync", (c) => c.connectors.sync("user_alex", "c1"), "POST", "/ns/user_alex/connectors/c1/sync"],
];

for (const [name, call, method, pathAndQuery, body] of routes) {
  test(`${name} -> ${method} ${pathAndQuery}`, async () => {
    const { sent, client } = stub(200, []);
    await call(client).catch(() => undefined); // stub bodies are not real responses; the request is what is checked
    expect(sent).toHaveLength(1);
    expect(sent[0]!.method).toBe(method);
    expect(sent[0]!.url.pathname + sent[0]!.url.search).toBe(pathAndQuery);
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
  const err = await client.namespaces.list({ timeoutInSeconds: 0.01 }).catch((e: unknown) => e);
  expect(err).toBeInstanceOf(SupermemoryTimeoutError);
});

test("a thrown fetch is retried, an abort is not", async () => {
  let calls = 0;
  const flaky = async (input: RequestInfo | URL, init?: RequestInit) => {
    calls++;
    if (calls === 1) throw new TypeError("fetch failed");
    return new Response("[]", { status: 200, headers: { "content-type": "application/json" } });
  };
  const client = new Supermemory({ apiKey: "sm_test", fetch: flaky as typeof globalThis.fetch, maxRetries: 2 });
  expect(await client.namespaces.list()).toEqual([]);
  expect(calls).toBe(2);

  calls = 0;
  const once = new Supermemory({ apiKey: "sm_test", fetch: flaky as typeof globalThis.fetch, maxRetries: 0 });
  const err = await once.namespaces.list().catch((e: unknown) => e);
  expect(err).toBeInstanceOf(SupermemoryError);
  expect(calls).toBe(1);
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
