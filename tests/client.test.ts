// Wire-level checks for the generated client: routes, auth, bodies, errors.
// Requests go through a stub fetch, so these run offline and pin the SDK
// surface that scripts/generate.ts must keep producing.
import { afterEach, expect, test } from "bun:test";
import { execFileSync } from "node:child_process";

import DefaultSupermemory, { NotFoundError, Supermemory, SupermemoryError } from "../src/index.ts";

type Captured = { method: string; url: URL; headers: Headers; body: string | undefined };

function stub(status = 200, body: unknown = {}) {
  const captured: Captured[] = [];
  const fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    captured.push({
      method: init?.method ?? "GET",
      url: new URL(String(input)),
      headers: new Headers(init?.headers),
      body: typeof init?.body === "string" ? init.body : undefined,
    });
    return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
  }) as typeof globalThis.fetch;
  return { captured, client: new Supermemory({ apiKey: "sm_test", fetch, maxRetries: 0 }) };
}

const cases: Array<[string, (c: Supermemory) => Promise<unknown>, string, string]> = [
  ["add", (c) => c.add({ namespace: "user_alex", content: "hi", id: "pref-1" }), "POST", "/ns/user_alex/document"],
  ["search", (c) => c.search({ namespace: "user_alex", query: "hi" }), "POST", "/ns/user_alex/search"],
  ["profile", (c) => c.profile({ namespace: "user_alex" }), "POST", "/ns/user_alex/profile"],
  ["list", (c) => c.list({ namespace: "user_alex", type: "memories" }), "POST", "/ns/user_alex/list/memories"],
  ["documents.get", (c) => c.documents.get({ namespace: "user_alex", id: "doc1" }), "GET", "/ns/user_alex/document/doc1"],
  ["documents.delete", (c) => c.documents.delete({ namespace: "user_alex", ids: ["d"] }), "DELETE", "/ns/user_alex/document"],
  ["documents.batchAdd", (c) => c.documents.batchAdd({ namespace: "user_alex", documents: [{ content: "x" }] }), "POST", "/ns/user_alex/document/batch"],
  ["memories.forget", (c) => c.memories.forget({ namespace: "user_alex", ids: ["m"] }), "DELETE", "/ns/user_alex/memories"],
  ["profiles.getBuckets", (c) => c.profiles.getBuckets({ namespace: "user_alex" }), "GET", "/ns/user_alex/profile/buckets"],
  ["connectors.listProviders", (c) => c.connectors.listProviders(), "GET", "/connectors"],
  ["connectors.list", (c) => c.connectors.list({ namespace: "user_alex" }), "GET", "/ns/user_alex/connectors"],
  ["namespaces.list", (c) => c.namespaces.list(), "GET", "/ns"],
  ["organization.get", (c) => c.organization.get(), "GET", "/organization"],
];

for (const [name, call, method, path] of cases) {
  test(`route: ${name}`, async () => {
    const { captured, client } = stub();
    await call(client);
    expect(captured).toHaveLength(1);
    const [req] = captured;
    expect(req!.method).toBe(method);
    expect(req!.url.host).toBe("api.supermemory.ai");
    expect(req!.url.pathname).toBe(path);
    expect(req!.headers.get("authorization")).toBe("Bearer sm_test");
  });
}

test("body uses API field names; query params stay in the URL", async () => {
  const { captured, client } = stub();
  await client.search({ namespace: "user_alex", query: "meetings", limit: 5, rewriteQuery: true });
  expect(captured[0]!.url.searchParams.get("limit")).toBe("5");
  expect(JSON.parse(captured[0]!.body!)).toEqual({ query: "meetings", rewriteQuery: true });
});

const savedKey = process.env.SUPERMEMORY_API_KEY;
afterEach(() => {
  if (savedKey === undefined) delete process.env.SUPERMEMORY_API_KEY;
  else process.env.SUPERMEMORY_API_KEY = savedKey;
});

test("reads SUPERMEMORY_API_KEY", async () => {
  process.env.SUPERMEMORY_API_KEY = "sm_env";
  const { captured } = stub();
  const fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    captured.push({ method: init?.method ?? "GET", url: new URL(String(input)), headers: new Headers(init?.headers), body: undefined });
    return Response.json({});
  }) as typeof globalThis.fetch;
  await new Supermemory({ fetch }).namespaces.list();
  expect(captured[0]!.headers.get("authorization")).toBe("Bearer sm_env");
});

test("default export is the client", () => {
  expect(DefaultSupermemory).toBe(Supermemory);
});

test("404 throws a typed error", async () => {
  const { client } = stub(404, { error: "not found" });
  const err = await client.documents.get({ namespace: "user_alex", id: "missing" }).catch((e: unknown) => e);
  expect(err).toBeInstanceOf(NotFoundError);
  expect(err).toBeInstanceOf(SupermemoryError);
  expect((err as SupermemoryError).statusCode).toBe(404);
});

test("built package imports from Node ESM and CJS", () => {
  const root = new URL("..", import.meta.url).pathname;
  const esm = execFileSync(
    "node",
    ["--input-type=module", "-e", "import S, { Supermemory } from 'supermemory'; console.log(S === Supermemory && typeof S)"],
    { cwd: root, encoding: "utf8" },
  );
  const cjs = execFileSync(
    "node",
    ["-e", "const m = require('supermemory'); console.log(m.default === m.Supermemory && typeof m.Supermemory)"],
    { cwd: root, encoding: "utf8" },
  );
  expect(esm.trim()).toBe("function");
  expect(cjs.trim()).toBe("function");
});
