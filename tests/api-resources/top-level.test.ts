// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Supermemory from 'supermemory';

const client = new Supermemory({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('top level methods', () => {
  // Prism tests are disabled
  test.skip('add: only required params', async () => {
    const responsePromise = client.add({ content: 'content' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('add: required and optional params', async () => {
    const response = await client.add({
      content: 'content',
      containerTag: 'containerTag',
      containerTags: ['string'],
      customId: 'customId',
      entityContext: 'entityContext',
      metadata: { foo: 'string' },
    });
  });

  // Prism tests are disabled
  test.skip('profile: only required params', async () => {
    const responsePromise = client.profile({ containerTag: 'containerTag' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('profile: required and optional params', async () => {
    const response = await client.profile({
      containerTag: 'containerTag',
      q: 'q',
      threshold: 0,
    });
  });
});
