// Checks that don't need rc.5 as a reference: endpoints added after rc.5
// (connectors), env-based auth, exports, and the built package in Node.
// Wire parity with rc.5 is covered by tests/rc5-compat/wire.test.ts.
import { afterEach, expect, test } from "bun:test";
import { execFileSync } from "node:child_process";

import DefaultSupermemory, { HTTPClient, Supermemory } from "../src/index.ts";
import { ErrorResponse, SupermemoryError } from "../src/models/errors/index.ts";
import { resetEnv } from "../src/lib/env.ts";

type Sent = { method: string; url: URL; headers: Headers; body: string };

function stub(status = 200, body: unknown = {}, opts: Record<string, unknown> = { apiKey: "sm_test" }) {
  const sent: Sent[] = [];
  const fetcher = async (req: Request) => {
    sent.push({ method: req.method, url: new URL(req.url), headers: req.headers, body: await req.text() });
    return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
  };
  return { sent, client: new Supermemory({ ...opts, httpClient: new HTTPClient({ fetcher }) }) };
}

const connectorCases: Array<[string, (c: Supermemory) => Promise<unknown>, string, string]> = [
  ["listAll", (c) => c.connectors.listAll({ provider: "notion", page: 2 }), "GET", "/connectors"],
  ["list", (c) => c.connectors.list({ namespace: "user_alex" }), "GET", "/ns/user_alex/connectors"],
  ["get", (c) => c.connectors.get({ namespace: "user_alex", id: "c1" }), "GET", "/ns/user_alex/connectors/c1"],
  ["delete", (c) => c.connectors.delete({ namespace: "user_alex", id: "c1" }), "DELETE", "/ns/user_alex/connectors/c1"],
  ["sync", (c) => c.connectors.sync({ namespace: "user_alex", id: "c1" }), "POST", "/ns/user_alex/connectors/c1/sync"],
];

for (const [name, call, method, path] of connectorCases) {
  test(`connectors.${name} routes`, async () => {
    const { sent, client } = stub();
    await call(client).catch(() => undefined); // empty stub bodies may not validate; the request is what's checked
    expect(sent).toHaveLength(1);
    expect(sent[0]!.method).toBe(method);
    expect(sent[0]!.url.pathname).toBe(path);
    expect(sent[0]!.headers.get("authorization")).toBe("Bearer sm_test");
  });
}

test("connectors.create sends the provider config as the body", async () => {
  const { sent, client } = stub(201, {});
  await client.connectors
    .create({ namespace: "user_alex", body: { provider: "web-crawler", config: { startUrl: "https://example.com", crawlDepth: 2 } } })
    .catch(() => undefined);
  expect(sent[0]!.url.pathname).toBe("/ns/user_alex/connectors");
  expect(JSON.parse(sent[0]!.body)).toEqual({ provider: "web-crawler", config: { startUrl: "https://example.com", crawlDepth: 2 } });
});

const savedKey = process.env.SUPERMEMORY_API_KEY;
afterEach(() => {
  if (savedKey === undefined) delete process.env.SUPERMEMORY_API_KEY;
  else process.env.SUPERMEMORY_API_KEY = savedKey;
  resetEnv();
});

test("reads SUPERMEMORY_API_KEY", async () => {
  process.env.SUPERMEMORY_API_KEY = "sm_env";
  resetEnv();
  const { sent, client } = stub(200, [], {});
  await client.namespaces.list();
  expect(sent[0]!.headers.get("authorization")).toBe("Bearer sm_env");
});

test("default and named exports are the same client", () => {
  expect(DefaultSupermemory).toBe(Supermemory);
});

test("404 throws ErrorResponse, a SupermemoryError", async () => {
  const { client } = stub(404, { error: "not found" });
  const err = await client.documents.get({ namespace: "user_alex", id: "missing" }).catch((e: unknown) => e);
  expect(err).toBeInstanceOf(ErrorResponse);
  expect(err).toBeInstanceOf(SupermemoryError);
  expect((err as SupermemoryError).statusCode).toBe(404);
  expect((err as SupermemoryError).body).toBe('{"error":"not found"}');
});

test("built package imports from Node ESM and CJS, including subpaths", () => {
  const root = new URL("..", import.meta.url).pathname;
  const esm = execFileSync(
    "node",
    [
      "--input-type=module",
      "-e",
      `import S, { Supermemory } from "supermemory";
       import { SupermemoryError } from "supermemory/models/errors";
       import { SearchMode } from "supermemory/models/operations";
       import { search } from "supermemory/funcs/search.js";
       import { SupermemoryCore } from "supermemory/core.js";
       console.log(S === Supermemory && typeof SupermemoryError === "function" && SearchMode.Hybrid === "hybrid" && typeof search === "function" && typeof SupermemoryCore);`,
    ],
    { cwd: root, encoding: "utf8" },
  );
  const cjs = execFileSync(
    "node",
    ["-e", `const m = require("supermemory"); const e = require("supermemory/models/errors"); console.log(m.default === m.Supermemory && typeof e.SupermemoryError === "function" && typeof m.Supermemory);`],
    { cwd: root, encoding: "utf8" },
  );
  expect(esm.trim()).toBe("function");
  expect(cjs.trim()).toBe("function");
});
