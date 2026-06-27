import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import type { AddressInfo } from 'node:net';
import { arch, hostname, platform } from 'node:os';
import { resolve } from 'node:path';

export async function openBrowser(url: string): Promise<void> {
  const { exec } = await import('node:child_process');
  const os = platform();

  let cmd: string;
  if (os === 'darwin') {
    cmd = `open "${url}"`;
  } else if (os === 'win32') {
    cmd = `start "" "${url}"`;
  } else {
    cmd = `xdg-open "${url}"`;
  }

  return new Promise((res, rej) => {
    exec(cmd, (err) => {
      if (err) rej(err);
      else res();
    });
  });
}

export function getDeviceInfo(): {
  hostname: string;
  os: string;
  cwd: string;
  cliVersion: string;
} {
  return {
    hostname: hostname(),
    os: `${platform()}-${arch()}`,
    cwd: resolve(process.cwd()),
    cliVersion: '0.1.0',
  };
}

export function startOAuthCallbackServer(opts?: { timeoutMs?: number }): Promise<{
  port: number;
  waitForCallback: () => Promise<void>;
  close: () => void;
}> {
  const timeout = opts?.timeoutMs ?? 120_000;

  return new Promise((resolveServer, rejectServer) => {
    let resolveCallback: () => void;
    let rejectCallback: (err: Error) => void;

    const callbackPromise = new Promise<void>((res, rej) => {
      resolveCallback = res;
      rejectCallback = rej;
    });

    let timeoutId: ReturnType<typeof setTimeout>;

    const server = createServer((req: IncomingMessage, res: ServerResponse) => {
      const url = new URL(req.url ?? '/', 'http://localhost');

      if (url.pathname === '/callback') {
        const error = url.searchParams.get('error');

        if (error) {
          res.writeHead(400, { 'Content-Type': 'text/html' });
          res.end(`
<!DOCTYPE html>
<html>
<head><title>Supermemory CLI</title></head>
<body style="font-family: system-ui; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
  <div style="text-align: center;">
    <h1>Authorization Failed</h1>
    <p>${error}</p>
  </div>
</body>
</html>`);
          clearTimeout(timeoutId);
          rejectCallback(new Error(error));
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
<!DOCTYPE html>
<html>
<head><title>Supermemory CLI</title></head>
<body style="font-family: system-ui; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
  <div style="text-align: center;">
    <h1>Connection Authorized!</h1>
    <p>You can close this window and return to the terminal.</p>
  </div>
</body>
</html>`);
          clearTimeout(timeoutId);
          resolveCallback();
        }
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(0, '127.0.0.1', () => {
      const addr = server.address() as AddressInfo | null;
      if (!addr || typeof addr === 'string') {
        rejectServer(new Error('Failed to start callback server'));
        return;
      }

      resolveServer({
        port: addr.port,
        waitForCallback: () => callbackPromise,
        close: () => server.close(),
      });
    });

    timeoutId = setTimeout(() => {
      rejectCallback(new Error('Authorization timed out'));
      server.close();
    }, timeout);
  });
}

export function startCallbackServer(): Promise<{
  port: number;
  waitForCallback: () => Promise<string>;
  close: () => void;
}> {
  return new Promise((resolveServer, rejectServer) => {
    let resolveCallback: (apiKey: string) => void;
    let rejectCallback: (err: Error) => void;

    const callbackPromise = new Promise<string>((res, rej) => {
      resolveCallback = res;
      rejectCallback = rej;
    });

    let timeoutId: ReturnType<typeof setTimeout>;

    const server = createServer((req: IncomingMessage, res: ServerResponse) => {
      const url = new URL(req.url ?? '/', 'http://localhost');

      if (url.pathname === '/callback') {
        const apiKey = url.searchParams.get('apikey');

        if (apiKey) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
<!DOCTYPE html>
<html>
<head><title>Supermemory CLI</title></head>
<body style="font-family: system-ui; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
  <div style="text-align: center;">
    <h1>Authentication Successful</h1>
    <p>You can close this window and return to the terminal.</p>
  </div>
</body>
</html>`);
          clearTimeout(timeoutId);
          resolveCallback(apiKey);
        } else {
          res.writeHead(400, { 'Content-Type': 'text/html' });
          res.end(`
<!DOCTYPE html>
<html>
<head><title>Supermemory CLI</title></head>
<body style="font-family: system-ui; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
  <div style="text-align: center;">
    <h1>Authentication Failed</h1>
    <p>No API key was returned. Please try again.</p>
  </div>
</body>
</html>`);
          clearTimeout(timeoutId);
          rejectCallback(new Error('No API key received from callback'));
        }
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(0, '127.0.0.1', () => {
      const addr = server.address();
      if (!addr || typeof addr === 'string') {
        rejectServer(new Error('Failed to start callback server'));
        return;
      }

      resolveServer({
        port: addr.port,
        waitForCallback: () => callbackPromise,
        close: () => server.close(),
      });
    });

    timeoutId = setTimeout(() => {
      rejectCallback(new Error('Authentication timed out'));
      server.close();
    }, 60 * 1000);
  });
}
