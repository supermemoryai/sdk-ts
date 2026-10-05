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

console.log("==> Done. Review with: git diff --stat");
