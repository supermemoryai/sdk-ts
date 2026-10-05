// Typechecks every TypeScript example in README.md and MIGRATION.md against
// this package, so the docs can't drift from the API.
import { $ } from "bun";
import { mkdirSync, rmSync } from "node:fs";
import { prelude } from "./snippet-prelude.ts";

const root = new URL("..", import.meta.url).pathname;
const out = `${root}tests/.docs-snippets/`;
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

let n = 0;
for (const file of ["README.md", "MIGRATION.md"]) {
  const text = await Bun.file(root + file).text();
  for (const [i, m] of [...text.matchAll(/```(?:typescript|ts)\n([\s\S]*?)```/g)].entries()) {
    // Blocks marked `// v4` or `// rc.5` show old APIs and aren't expected to compile.
    if (/^\/\/ (v4|rc\.5)/.test(m[1]!)) continue;
    await Bun.write(`${out}${file.replace(".md", "")}_${i}.ts`, `${prelude(m[1]!)}${m[1]}\nexport {};\n`);
    n++;
  }
}
await Bun.write(
  `${out}tsconfig.json`,
  JSON.stringify({
    compilerOptions: {
      target: "ES2022", lib: ["ES2022", "DOM", "DOM.Iterable"], module: "ESNext", moduleResolution: "Bundler",
      strict: true, noEmit: true, skipLibCheck: true, types: ["node"],
      paths: { supermemory: ["../../src/index.ts"], "supermemory/*": ["../../src/*", "../../src/*/index.ts"] },
    },
    include: ["*.ts"],
  }),
);
const res = await $`bunx tsc -p ${out}tsconfig.json`.cwd(out).nothrow();
console.log(`${n} doc examples typechecked`);
process.exit(res.exitCode);
