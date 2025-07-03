// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Supermemory from 'supermemory';

const client = new Supermemory({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource settings', () => {
  // skipped: tests are disabled for the time being
  test.skip('update', async () => {
    const responsePromise = client.settings.update();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('update: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.settings.update(
        {
          excludeItems: 'string',
          filterPrompt: 'filterPrompt',
          googleDriveClientId: 'googleDriveClientId',
          googleDriveClientSecret: 'googleDriveClientSecret',
          googleDriveCustomKeyEnabled: true,
          includeItems: 'string',
          notionClientId: 'notionClientId',
          notionClientSecret: 'notionClientSecret',
          notionCustomKeyEnabled: true,
          onedriveClientId: 'onedriveClientId',
          onedriveClientSecret: 'onedriveClientSecret',
          onedriveCustomKeyEnabled: true,
          shouldLLMFilter: true,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Supermemory.NotFoundError);
  });

  // skipped: tests are disabled for the time being
  test.skip('get', async () => {
    const responsePromise = client.settings.get();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
