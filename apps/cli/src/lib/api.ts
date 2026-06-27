import { type ResolvedConfig, resolveConfig } from './config.js';
import { AuthError, httpErrorToCliError } from './errors.js';
import { withSpan } from './otel.js';

export interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined>;
}

export interface ApiResponse<T = unknown> {
  ok: boolean;
  status: number;
  data: T;
}

let cachedConfig: ResolvedConfig | null = null;

export function getConfig(flags?: { tag?: string }): ResolvedConfig {
  if (!cachedConfig) {
    cachedConfig = resolveConfig(flags);
  }
  return cachedConfig;
}

export function clearConfigCache(): void {
  cachedConfig = null;
}

export async function apiRequest<T = unknown>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<ApiResponse<T>> {
  const config = getConfig();

  if (!config.apiKey) {
    throw new AuthError('Not authenticated. Run `supermemory login` first or set SUPERMEMORY_API_KEY.');
  }

  const { method = 'GET', body, headers = {}, query } = options;

  let url = `${config.apiUrl}${path}`;
  if (query) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) {
        params.set(key, String(value));
      }
    }
    const qs = params.toString();
    if (qs) url += `?${qs}`;
  }

  const reqHeaders: Record<string, string> = {
    'x-api-key': config.apiKey,
    ...headers,
  };

  if (body && !reqHeaders['content-type']) {
    reqHeaders['content-type'] = 'application/json';
  }

  return withSpan('supermemory.api_call', { method, path, url }, async (span) => {
    const start = Date.now();

    const response = await fetch(url, {
      method,
      headers: reqHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    const latency = Date.now() - start;
    span.setAttribute('statusCode', response.status);
    span.setAttribute('latencyMs', latency);

    let data: T;
    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      data = (await response.json()) as T;
    } else {
      data = (await response.text()) as T;
    }

    if (!response.ok) {
      throw httpErrorToCliError(
        response.status,
        typeof data === 'object' && data !== null ? (data as { error?: string; message?: string }) : null,
      );
    }

    return { ok: true, status: response.status, data };
  });
}

export async function apiRequestFormData<T = unknown>(
  path: string,
  formData: FormData,
): Promise<ApiResponse<T>> {
  const config = getConfig();

  if (!config.apiKey) {
    throw new AuthError('Not authenticated. Run `supermemory login` first or set SUPERMEMORY_API_KEY.');
  }

  const apiKey = config.apiKey;
  const url = `${config.apiUrl}${path}`;

  return withSpan('supermemory.api_call', { method: 'POST', path, url }, async (span) => {
    const start = Date.now();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
      },
      body: formData,
    });

    const latency = Date.now() - start;
    span.setAttribute('statusCode', response.status);
    span.setAttribute('latencyMs', latency);

    let data: T;
    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      data = (await response.json()) as T;
    } else {
      data = (await response.text()) as T;
    }

    if (!response.ok) {
      throw httpErrorToCliError(
        response.status,
        typeof data === 'object' && data !== null ? (data as { error?: string; message?: string }) : null,
      );
    }

    return { ok: true, status: response.status, data };
  });
}

export async function validateApiKey(
  apiKey: string,
  apiUrl: string,
): Promise<{
  user: { email: string; name: string };
  org: { id: string; name: string; slug: string };
  plan: string;
  scope: {
    type: 'full' | 'scoped';
    permission?: 'read' | 'write';
    tag?: string;
    tags?: string[];
    rateLimit?: number;
    expires?: string;
  };
}> {
  const response = await fetch(`${apiUrl}/v3/session`, {
    headers: { 'x-api-key': apiKey },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new AuthError('Invalid API key.');
    }
    throw httpErrorToCliError(response.status, null);
  }

  const data = (await response.json()) as Record<string, unknown>;

  return {
    user: (data.user ?? { email: 'unknown', name: 'Unknown' }) as {
      email: string;
      name: string;
    },
    org: (data.org ?? { id: '', name: '', slug: '' }) as {
      id: string;
      name: string;
      slug: string;
    },
    plan: (data.plan as string) ?? 'free',
    scope: (data.scope as {
      type: 'full' | 'scoped';
      permission?: 'read' | 'write';
      tag?: string;
      tags?: string[];
      rateLimit?: number;
      expires?: string;
    }) ?? { type: 'full', permission: 'write' },
  };
}
