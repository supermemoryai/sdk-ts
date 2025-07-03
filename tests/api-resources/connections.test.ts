// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Supermemory from 'supermemory';

const client = new Supermemory({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource connections', () => {
  // skipped: tests are disabled for the time being
  test.skip('create', async () => {
    const responsePromise = client.connections.create('notion');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('create: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.connections.create(
        'notion',
        {
          containerTags: ['string'],
          documentLimit: 1,
          metadata: { foo: 'string' },
          redirectUrl: 'redirectUrl',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Supermemory.NotFoundError);
  });

  // skipped: tests are disabled for the time being
  test.skip('list', async () => {
    const responsePromise = client.connections.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.connections.list(
        { containerTags: ['user_123', 'project_123'] },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Supermemory.NotFoundError);
  });

  // skipped: tests are disabled for the time being
  test.skip('deleteByID', async () => {
    const responsePromise = client.connections.deleteByID('connectionId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('deleteByProvider: only required params', async () => {
    const responsePromise = client.connections.deleteByProvider('notion', {
      containerTags: ['user_123', 'project_123'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('deleteByProvider: required and optional params', async () => {
    const response = await client.connections.deleteByProvider('notion', {
      containerTags: ['user_123', 'project_123'],
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('getByID', async () => {
    const responsePromise = client.connections.getByID('connectionId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('getByTags: only required params', async () => {
    const responsePromise = client.connections.getByTags('notion', {
      containerTags: ['user_123', 'project_123'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('getByTags: required and optional params', async () => {
    const response = await client.connections.getByTags('notion', {
      containerTags: ['user_123', 'project_123'],
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('import', async () => {
    const responsePromise = client.connections.import('notion');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('import: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.connections.import(
        'notion',
        { containerTags: ['user_123', 'project_123'] },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Supermemory.NotFoundError);
  });

  // skipped: tests are disabled for the time being
  test.skip('listDocuments', async () => {
    const responsePromise = client.connections.listDocuments('notion');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('listDocuments: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.connections.listDocuments(
        'notion',
        { containerTags: ['user_123', 'project_123'] },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Supermemory.NotFoundError);
  });
});
