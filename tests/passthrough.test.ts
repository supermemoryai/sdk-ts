import { expect, test } from "bun:test";

import { Supermemory } from "../src/index.ts";

type Sent = { url: string; auth: string | null };

function stubFetch() {
    const sent: Sent[] = [];
    const fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
        const req = new Request(input, init);
        sent.push({ url: req.url, auth: req.headers.get("authorization") });
        return new Response(JSON.stringify({}), {
            status: 200,
            headers: { "content-type": "application/json" },
        });
    };
    return { sent, client: new Supermemory({ apiKey: "sm_test", fetch: fetch as typeof globalThis.fetch }) };
}

test("passthrough fetch resolves relative paths against the default environment and attaches auth", async () => {
    const { sent, client } = stubFetch();
    await client.fetch("/v3/documents");
    expect(sent).toHaveLength(1);
    expect(sent[0].url).toBe("https://api.supermemory.ai/v3/documents");
    expect(sent[0].auth).toBe("Bearer sm_test");
});

test("passthrough fetch still keeps auth off cross-origin absolute URLs", async () => {
    const { sent, client } = stubFetch();
    await client.fetch("https://example.com/other");
    expect(sent).toHaveLength(1);
    expect(sent[0].auth).toBeNull();
});
