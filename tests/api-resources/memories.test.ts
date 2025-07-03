// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Supermemory from 'supermemory';

const client = new Supermemory({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource memories', () => {
  // skipped: tests are disabled for the time being
  test.skip('update: only required params', async () => {
    const responsePromise = client.memories.update('id', {
      content: 'This is a detailed article about machine learning concepts...',
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
  test.skip('update: required and optional params', async () => {
    const response = await client.memories.update('id', {
      content: 'This is a detailed article about machine learning concepts...',
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
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('list', async () => {
    const responsePromise = client.memories.list();
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
      client.memories.list(
        {
          containerTags: ['user_123', 'project_123'],
          filters:
            '{"AND":[{"key":"group","negate":false,"value":"jira_users"},{"filterType":"numeric","key":"timestamp","negate":false,"numericOperator":">","value":"1742745777"}]}',
          limit: 10,
          order: 'desc',
          page: 1,
          sort: 'createdAt',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Supermemory.NotFoundError);
  });

  // skipped: tests are disabled for the time being
  test.skip('delete', async () => {
    const responsePromise = client.memories.delete('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('add: only required params', async () => {
    const responsePromise = client.memories.add({
      content: 'This is a detailed article about machine learning concepts...',
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
  test.skip('add: required and optional params', async () => {
    const response = await client.memories.add({
      content: 'This is a detailed article about machine learning concepts...',
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
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('get', async () => {
    const responsePromise = client.memories.get('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
