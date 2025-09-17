// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Supermemory from 'supermemory';

const client = new Supermemory({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource search', () => {
  // Prism tests are disabled
  test.skip('documents: only required params', async () => {
    const responsePromise = client.search.documents({ q: 'machine learning concepts' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('documents: required and optional params', async () => {
    const response = await client.search.documents({
      q: 'machine learning concepts',
      categoriesFilter: ['technology', 'science'],
      chunkThreshold: 0.5,
      containerTags: ['user_123', 'project_123'],
      docId: 'doc_xyz789',
      documentThreshold: 0.5,
      filters: {
        AND: [
          { key: 'group', negate: false, value: 'jira_users' },
          {
            filterType: 'numeric',
            key: 'timestamp',
            negate: false,
            numericOperator: '>',
            value: '1742745777',
          },
        ],
        OR: [{}],
      },
      includeFullDocs: false,
      includeSummary: false,
      limit: 10,
      onlyMatchingChunks: false,
      rerank: false,
      rewriteQuery: false,
    });
  });

  // Prism tests are disabled
  test.skip('execute: only required params', async () => {
    const responsePromise = client.search.execute({ q: 'machine learning concepts' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('execute: required and optional params', async () => {
    const response = await client.search.execute({
      q: 'machine learning concepts',
      categoriesFilter: ['technology', 'science'],
      chunkThreshold: 0.5,
      containerTags: ['user_123', 'project_123'],
      docId: 'doc_xyz789',
      documentThreshold: 0.5,
      filters: {
        AND: [
          { key: 'group', negate: false, value: 'jira_users' },
          {
            filterType: 'numeric',
            key: 'timestamp',
            negate: false,
            numericOperator: '>',
            value: '1742745777',
          },
        ],
        OR: [{}],
      },
      includeFullDocs: false,
      includeSummary: false,
      limit: 10,
      onlyMatchingChunks: false,
      rerank: false,
      rewriteQuery: false,
    });
  });

  // Prism tests are disabled
  test.skip('memories: only required params', async () => {
    const responsePromise = client.search.memories({ q: 'machine learning concepts' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('memories: required and optional params', async () => {
    const response = await client.search.memories({
      q: 'machine learning concepts',
      containerTag: 'user_123',
      filters: {
        AND: [
          { key: 'group', negate: false, value: 'jira_users' },
          {
            filterType: 'numeric',
            key: 'timestamp',
            negate: false,
            numericOperator: '>',
            value: '1742745777',
          },
        ],
        OR: [{}],
      },
      include: { documents: true, forgottenMemories: false, relatedMemories: true, summaries: true },
      limit: 10,
      rerank: false,
      rewriteQuery: false,
      threshold: 0.5,
    });
  });
});
