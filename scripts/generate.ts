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

if (process.env.SURFACE_ONLY) {
  const { generateSurface } = await import("./surface/generate.ts");
  await generateSurface(root);
  process.exit(0);
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

// The public SDK surface (models, funcs, sdk classes) on top of src/generated.
const { generateSurface } = await import("./surface/generate.ts");
const { ops, types } = await generateSurface(root);
console.log(`==> Surface: ${ops} operations, ${types} named types`);

console.log("==> Done. Review with: git diff --stat");
