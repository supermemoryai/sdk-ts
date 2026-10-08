// Regenerate src/generated from the live v5 OpenAPI spec.
//
//   bun scripts/generate.ts                # fetch the latest spec, then generate
//   SKIP_FETCH=1 bun scripts/generate.ts   # regenerate from the committed fern/openapi.json
//
// Requires Docker: Fern runs its TypeScript generator as a container
// (`fern generate --local`), so no hosted Fern account is needed.
import { $ } from "bun";

const root = new URL("..", import.meta.url).pathname;
process.chdir(root);

const specUrl = process.env.SUPERMEMORY_OPENAPI_URL ?? "https://api.supermemory.ai/v5/openapi";
const fernVersion: string = (await Bun.file("fern/fern.config.json").json()).version;
const sdkVersion: string = (await Bun.file("package.json").json()).version;

if ((await $`docker info`.quiet().nothrow()).exitCode !== 0) {
  console.error("error: a running Docker daemon is required");
  process.exit(1);
}

if (!process.env.SKIP_FETCH) {
  console.log(`==> Fetching ${specUrl}`);
  const res = await fetch(specUrl);
  if (!res.ok) throw new Error(`spec fetch failed: ${res.status} ${res.statusText}`);
  await Bun.write("fern/openapi.json", JSON.stringify(await res.json(), null, 2) + "\n");
}

console.log(`==> Generating supermemory ${sdkVersion} with fern-api@${fernVersion}`);
await $`bunx fern-api@${fernVersion} generate --local --group typescript-sdk --version ${sdkVersion} --force`.env({
  ...process.env,
  FERN_NO_VERSION_REDIRECTION: "true",
});

// Fern reports success even when a config change makes the generator emit
// nothing (and it clears the output dir first), so check explicitly.
if (!(await Bun.file("src/generated/Client.ts").exists())) {
  console.error("error: Fern produced no output in src/generated");
  process.exit(1);
}

// Run metadata embeds the git commit, so it would never diff clean.
await $`rm -rf src/generated/.fern`;

// Fern clears its per-request timer only after fetch resolves; a thrown fetch left a referenced timer that kept Node alive.
const makeRequest = "src/generated/core/fetcher/makeRequest.ts";
const src = await Bun.file(makeRequest).text();
const before = /    const response = await fetchFn\(url, \{\n([\s\S]*?)\n    \}\);\n\n    if \(timeoutAbortId != null\) \{\n        clearTimeout\(timeoutAbortId\);\n    \}\n\n    return response;\n/;
if (!before.test(src)) throw new Error(`${makeRequest}: timer cleanup pattern not found; review the Fern upgrade`);
await Bun.write(makeRequest, src.replace(before, (_, init) => `    try {\n        return await fetchFn(url, {\n${init.replace(/^/gm, "    ")}\n        });\n    } finally {\n        if (timeoutAbortId != null) {\n            clearTimeout(timeoutAbortId);\n        }\n    }\n`));

// Fern aborts its timeout with the string "timeout"; Node's fetch rethrows that string, which is not an Error, so the SDK reported a generic error instead of SupermemoryTimeoutError.
const signals = "src/generated/core/fetcher/signals.ts";
const sig = await Bun.file(signals).text();
const abortLine = "const abortId = setTimeout(() => controller.abort(TIMEOUT), timeoutMs);";
if (!sig.includes(abortLine)) throw new Error(`${signals}: timeout abort pattern not found; review the Fern upgrade`);
await Bun.write(signals, sig.replace(abortLine, 'const abortId = setTimeout(() => controller.abort(new DOMException(TIMEOUT, "AbortError")), timeoutMs);'));

// Fern retries only on status codes; a thrown fetch (connection reset, DNS) was never retried. Aborts and timeouts still are not.
const retries = "src/generated/core/fetcher/requestWithRetries.ts";
const rt = await Bun.file(retries).text();
const loopStart = rt.indexOf("export async function requestWithRetries(");
if (loopStart === -1 || !rt.includes("let response: Response = await requestFn();")) throw new Error(`${retries}: retry loop pattern not found; review the Fern upgrade`);
await Bun.write(
  retries,
  rt.slice(0, loopStart) +
    `export async function requestWithRetries(
    requestFn: () => Promise<Response>,
    maxRetries: number = DEFAULT_MAX_RETRIES,
    abortSignal?: AbortSignal,
): Promise<Response> {
    for (let i = 0; ; ++i) {
        let response: Response;
        try {
            response = await requestFn();
        } catch (error) {
            const aborted = abortSignal?.aborted === true || (error instanceof Error && error.name === "AbortError");
            if (aborted || i >= maxRetries) throw error;
            await new Promise((resolve) => setTimeout(resolve, addSymmetricJitter(Math.min(INITIAL_RETRY_DELAY * 2 ** i, MAX_RETRY_DELAY))));
            continue;
        }
        if (!isRetryableStatusCode(response.status) || i >= maxRetries) return response;
        await new Promise((resolve) => setTimeout(resolve, getRetryDelayFromHeaders(response, i)));
    }
}
`,
);

const fetcherFile = "src/generated/core/fetcher/Fetcher.ts";
const fetcherSrc = await Bun.file(fetcherFile).text();
const callSite = "            args.maxRetries,\n        );";
if (fetcherSrc.split(callSite).length !== 2) throw new Error(`${fetcherFile}: requestWithRetries call site not found once; review the Fern upgrade`);
await Bun.write(fetcherFile, fetcherSrc.replace(callSite, "            args.maxRetries,\n            args.abortSignal,\n        );"));

// Bundlers (esbuild, Convex, Workers, Vite) resolve a dynamic import() with a literal specifier even on a path that never runs, so the Node-only file and stream helpers broke every non-Node bundle. A computed specifier is left as a runtime import; Node still resolves it when an upload actually needs it.
const nodeImport = (name: string) => `(await import(/* webpackIgnore: true */ /* @vite-ignore */ [${[...name].map((c) => JSON.stringify(c)).join(", ")}].join(""))) as typeof import("${name}")`;
for (const [file, name, count] of [
    ["src/generated/core/file/file.ts", "fs", 2],
    ["src/generated/core/form-data-utils/FormDataWrapper.ts", "stream", 1],
] as const) {
    const text = await Bun.file(file).text();
    const literal = `await import("${name}")`;
    if (text.split(literal).length !== count + 1) throw new Error(`${file}: expected ${count} ${literal} call(s); review the Fern upgrade`);
    await Bun.write(file, text.split(literal).join(nodeImport(name)));
}

console.log("==> Done. Review with: git diff --stat");
