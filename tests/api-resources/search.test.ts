// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Supermemory from 'supermemory';

const client = new Supermemory({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource search', () => {
  // skipped: tests are disabled for the time being
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

  // skipped: tests are disabled for the time being
  test.skip('execute: required and optional params', async () => {
    const response = await client.search.execute({
      q: 'machine learning concepts',
      categoriesFilter: ['technology', 'science'],
      chunkThreshold: 0.5,
      docId: 'doc_xyz789',
      documentThreshold: 0.5,
      filters: {
        AND: [
          { key: 'group', value: 'jira_users', negate: false },
          {
            filterType: 'numeric',
            key: 'timestamp',
            value: '1742745777',
            negate: false,
            numericOperator: '>',
          },
        ],
        OR: [{}],
      },
      includeSummary: false,
      limit: 10,
      onlyMatchingChunks: false,
      rerank: false,
      rewriteQuery: false,
      userId: 'user_123',
    });
  });
});
