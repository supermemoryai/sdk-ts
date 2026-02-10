import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.add',
    fullyQualifiedName: 'add',
    httpMethod: 'post',
    httpPath: '/v3/documents',
  },
  {
    clientCallName: 'client.profile',
    fullyQualifiedName: 'profile',
    httpMethod: 'post',
    httpPath: '/v4/profile',
  },
  {
    clientCallName: 'client.memories.forget',
    fullyQualifiedName: 'memories.forget',
    httpMethod: 'delete',
    httpPath: '/v4/memories',
  },
  {
    clientCallName: 'client.memories.updateMemory',
    fullyQualifiedName: 'memories.updateMemory',
    httpMethod: 'patch',
    httpPath: '/v4/memories',
  },
  {
    clientCallName: 'client.documents.update',
    fullyQualifiedName: 'documents.update',
    httpMethod: 'patch',
    httpPath: '/v3/documents/{id}',
  },
  {
    clientCallName: 'client.documents.list',
    fullyQualifiedName: 'documents.list',
    httpMethod: 'post',
    httpPath: '/v3/documents/list',
  },
  {
    clientCallName: 'client.documents.delete',
    fullyQualifiedName: 'documents.delete',
    httpMethod: 'delete',
    httpPath: '/v3/documents/{id}',
  },
  {
    clientCallName: 'client.documents.add',
    fullyQualifiedName: 'documents.add',
    httpMethod: 'post',
    httpPath: '/v3/documents',
  },
  {
    clientCallName: 'client.documents.batchAdd',
    fullyQualifiedName: 'documents.batchAdd',
    httpMethod: 'post',
    httpPath: '/v3/documents/batch',
  },
  {
    clientCallName: 'client.documents.deleteBulk',
    fullyQualifiedName: 'documents.deleteBulk',
    httpMethod: 'delete',
    httpPath: '/v3/documents/bulk',
  },
  {
    clientCallName: 'client.documents.get',
    fullyQualifiedName: 'documents.get',
    httpMethod: 'get',
    httpPath: '/v3/documents/{id}',
  },
  {
    clientCallName: 'client.documents.listProcessing',
    fullyQualifiedName: 'documents.listProcessing',
    httpMethod: 'get',
    httpPath: '/v3/documents/processing',
  },
  {
    clientCallName: 'client.documents.uploadFile',
    fullyQualifiedName: 'documents.uploadFile',
    httpMethod: 'post',
    httpPath: '/v3/documents/file',
  },
  {
    clientCallName: 'client.search.documents',
    fullyQualifiedName: 'search.documents',
    httpMethod: 'post',
    httpPath: '/v3/search',
  },
  {
    clientCallName: 'client.search.execute',
    fullyQualifiedName: 'search.execute',
    httpMethod: 'post',
    httpPath: '/v3/search',
  },
  {
    clientCallName: 'client.search.memories',
    fullyQualifiedName: 'search.memories',
    httpMethod: 'post',
    httpPath: '/v4/search',
  },
  {
    clientCallName: 'client.settings.update',
    fullyQualifiedName: 'settings.update',
    httpMethod: 'patch',
    httpPath: '/v3/settings',
  },
  {
    clientCallName: 'client.settings.get',
    fullyQualifiedName: 'settings.get',
    httpMethod: 'get',
    httpPath: '/v3/settings',
  },
  {
    clientCallName: 'client.connections.create',
    fullyQualifiedName: 'connections.create',
    httpMethod: 'post',
    httpPath: '/v3/connections/{provider}',
  },
  {
    clientCallName: 'client.connections.list',
    fullyQualifiedName: 'connections.list',
    httpMethod: 'post',
    httpPath: '/v3/connections/list',
  },
  {
    clientCallName: 'client.connections.configure',
    fullyQualifiedName: 'connections.configure',
    httpMethod: 'post',
    httpPath: '/v3/connections/{connectionId}/configure',
  },
  {
    clientCallName: 'client.connections.deleteByID',
    fullyQualifiedName: 'connections.deleteByID',
    httpMethod: 'delete',
    httpPath: '/v3/connections/{connectionId}',
  },
  {
    clientCallName: 'client.connections.deleteByProvider',
    fullyQualifiedName: 'connections.deleteByProvider',
    httpMethod: 'delete',
    httpPath: '/v3/connections/{provider}',
  },
  {
    clientCallName: 'client.connections.getByID',
    fullyQualifiedName: 'connections.getByID',
    httpMethod: 'get',
    httpPath: '/v3/connections/{connectionId}',
  },
  {
    clientCallName: 'client.connections.getByTag',
    fullyQualifiedName: 'connections.getByTag',
    httpMethod: 'post',
    httpPath: '/v3/connections/{provider}/connection',
  },
  {
    clientCallName: 'client.connections.import',
    fullyQualifiedName: 'connections.import',
    httpMethod: 'post',
    httpPath: '/v3/connections/{provider}/import',
  },
  {
    clientCallName: 'client.connections.listDocuments',
    fullyQualifiedName: 'connections.listDocuments',
    httpMethod: 'post',
    httpPath: '/v3/connections/{provider}/documents',
  },
  {
    clientCallName: 'client.connections.resources',
    fullyQualifiedName: 'connections.resources',
    httpMethod: 'get',
    httpPath: '/v3/connections/{connectionId}/resources',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
