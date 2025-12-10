// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Supermemory, { toFile } from 'supermemory';

const client = new Supermemory({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource documents', () => {
  // Prism tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.documents.update('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('update: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.documents.update(
        'id',
        {
          containerTag: 'user_123',
          containerTags: ['user_123', 'project_123'],
          content: 'This is a detailed article about machine learning concepts...',
          customId: 'mem_abc123',
          metadata: {
            category: 'technology',
            isPublic: true,
            readingTime: 5,
            source: 'web',
            tag_1: 'ai',
            tag_2: 'machine-learning',
          },
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Supermemory.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.documents.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.documents.list(
        {
          containerTags: ['user_123', 'project_123'],
          filters: {
            AND: [
              { filterType: 'metadata', key: 'group', negate: false, value: 'jira_users' },
              {
                filterType: 'numeric',
                key: 'timestamp',
                negate: false,
                numericOperator: '>',
                value: '1742745777',
              },
            ],
          },
          includeContent: false,
          limit: 10,
          order: 'desc',
          page: 1,
          sort: 'createdAt',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Supermemory.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.documents.delete('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('add: only required params', async () => {
    const responsePromise = client.documents.add({ content: 'content' });
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
    const response = await client.documents.add({
      content: 'content',
      containerTag: 'containerTag',
      containerTags: ['string'],
      customId: 'customId',
      metadata: { foo: 'string' },
    });
  });

  // Prism tests are disabled
  test.skip('batchAdd: only required params', async () => {
    const responsePromise = client.documents.batchAdd({
      documents: [{ content: 'This is a detailed article about machine learning concepts...' }],
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
  test.skip('batchAdd: required and optional params', async () => {
    const response = await client.documents.batchAdd({
      documents: [
        {
          content: 'This is a detailed article about machine learning concepts...',
          containerTag: 'user_123',
          containerTags: ['user_123', 'project_123'],
          customId: 'mem_abc123',
          metadata: {
            category: 'technology',
            isPublic: true,
            readingTime: 5,
            source: 'web',
            tag_1: 'ai',
            tag_2: 'machine-learning',
          },
        },
      ],
      containerTag: 'user_123',
      containerTags: ['user_123', 'project_123'],
      content: null,
      metadata: {
        category: 'technology',
        isPublic: true,
        readingTime: 5,
        source: 'web',
        tag_1: 'ai',
        tag_2: 'machine-learning',
      },
    });
  });

  // Prism tests are disabled
  test.skip('deleteBulk', async () => {
    const responsePromise = client.documents.deleteBulk();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('deleteBulk: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.documents.deleteBulk(
        {
          containerTags: ['user_123', 'project_123'],
          ids: ['acxV5LHMEsG2hMSNb4umbn', 'bxcV5LHMEsG2hMSNb4umbn'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Supermemory.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('get', async () => {
    const responsePromise = client.documents.get('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('listProcessing', async () => {
    const responsePromise = client.documents.listProcessing();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('uploadFile: only required params', async () => {
    const responsePromise = client.documents.uploadFile({
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
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
  test.skip('uploadFile: required and optional params', async () => {
    const response = await client.documents.uploadFile({
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
      containerTags: '["user_123", "project_123"]',
      fileType: 'image',
      metadata: '{"category": "technology", "isPublic": true, "readingTime": 5}',
      mimeType: 'mimeType',
    });
  });
});
