// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Supermemory from 'supermemory';

const client = new Supermemory({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource memories', () => {
  // Prism tests are disabled
  test.skip('forget: only required params', async () => {
    const responsePromise = client.memories.forget({ containerTag: 'user_123' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('forget: required and optional params', async () => {
    const response = await client.memories.forget({
      containerTag: 'user_123',
      id: 'mem_abc123',
      content: 'John prefers dark mode',
      reason: 'outdated information',
    });
  });

  // Prism tests are disabled
  test.skip('updateMemory: only required params', async () => {
    const responsePromise = client.memories.updateMemory({
      containerTag: 'user_123',
      newContent: 'John now prefers light mode',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('updateMemory: required and optional params', async () => {
    const response = await client.memories.updateMemory({
      containerTag: 'user_123',
      newContent: 'John now prefers light mode',
      id: 'mem_abc123',
      content: 'John prefers dark mode',
      metadata: { foo: 'string' },
    });
  });
});
