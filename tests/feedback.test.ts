import { expect, test } from "bun:test";
import { BadGatewayError, Supermemory, SupermemoryError } from "../src/index.ts";

const request = { type: "bug" as const, title: "Synthetic report", description: "Offline test" };

for (const options of [
  {},
  { maxRetries: 3 },
  { requestOptions: { maxRetries: 3 } },
  { maxRetries: 3, requestOptions: { maxRetries: 3 } },
  { requestOptions: { maxRetries: 0 } },
]) {
  test(`feedback 502 is not retried with ${JSON.stringify(options)}`, async () => {
    const sent: Request[] = [];
    const body = { error: "delivery-uncertain" };
    const client = new Supermemory({
      apiKey: "sm_test",
      baseUrl: "https://fixture.invalid",
      maxRetries: "maxRetries" in options ? options.maxRetries : undefined,
      fetch: (async (url: RequestInfo | URL, init?: RequestInit) => {
        sent.push(new Request(url, init));
        return new Response(JSON.stringify(body), {
          status: 502,
          headers: { "content-type": "application/json", "x-request-id": "synthetic" },
        });
      }) as typeof globalThis.fetch,
    });

    const error = await client.feedback.postFeedback(
      request,
      "requestOptions" in options ? options.requestOptions : undefined,
    ).catch((error: unknown) => error);

    expect(error).toBeInstanceOf(BadGatewayError);
    expect(error).toBeInstanceOf(SupermemoryError);
    expect((error as BadGatewayError).statusCode).toBe(502);
    expect((error as BadGatewayError).body).toEqual(body);
    expect((error as BadGatewayError).rawResponse?.headers.get("x-request-id")).toBe("synthetic");
    expect(sent).toHaveLength(1);
    expect(sent[0]!.method).toBe("POST");
    expect(sent[0]!.url).toBe("https://fixture.invalid/feedback");
    expect(Object.fromEntries(sent[0]!.headers)).toEqual({
      accept: "*/*",
      authorization: "Bearer sm_test",
      "content-type": "application/json",
      "x-fern-language": "JavaScript",
      "x-fern-runtime": "bun",
      "x-fern-runtime-version": Bun.version,
    });
    expect(await sent[0]!.text()).toBe(JSON.stringify(request));
  });
}

test("feedback accepts a 202 response and preserves its raw response", async () => {
  let calls = 0;
  const client = new Supermemory({
    auth: false,
    baseUrl: "https://fixture.invalid",
    fetch: (async (_url: RequestInfo | URL, init?: RequestInit) => {
      calls++;
      expect(new Headers(init?.headers).has("authorization")).toBe(false);
      return new Response('{"id":"fb_test","remaining":2}', {
        status: 202,
        headers: { "content-type": "application/json" },
      });
    }) as typeof globalThis.fetch,
  });
  const response = await client.feedback.postFeedback(request).withRawResponse();
  expect(response.data).toEqual({ id: "fb_test", remaining: 2 });
  expect(response.rawResponse.status).toBe(202);
  expect(calls).toBe(1);
});

test("feedback does not retry an uncertain connection failure", async () => {
  let calls = 0;
  const client = new Supermemory({
    apiKey: "sm_test",
    maxRetries: 3,
    fetch: (async (_url: RequestInfo | URL, _init?: RequestInit): Promise<Response> => {
      calls++;
      throw new TypeError("fetch failed");
    }) as typeof globalThis.fetch,
  });
  const error = await client.feedback.postFeedback(request, { maxRetries: 3 }).catch((error: unknown) => error);
  expect(error).toBeInstanceOf(SupermemoryError);
  expect(calls).toBe(1);
});

test("organization GET still retries a transient 502", async () => {
  let calls = 0;
  const client = new Supermemory({
    apiKey: "sm_test",
    fetch: (async (_url: RequestInfo | URL, _init?: RequestInit) => {
      calls++;
      return new Response(calls === 1 ? '{"error":"transient"}' : '{"organizationalContext":null,"namespaceCount":1}', {
        status: calls === 1 ? 502 : 200,
        headers: { "content-type": "application/json" },
      });
    }) as typeof globalThis.fetch,
  });
  expect(await client.organization.get()).toEqual({ organizationalContext: null, namespaceCount: 1 });
  expect(calls).toBe(2);
});
