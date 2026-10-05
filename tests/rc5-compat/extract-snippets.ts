// Turns every TypeScript snippet in the 5.0.0-rc.5 docs (README, USAGE,
// MIGRATION, FUNCTIONS, docs/, examples/) into a compile-only test under
// tests/rc5-compat/snippets/. Run once from a clone with rc.5 in history:
//
//   bun tests/rc5-compat/extract-snippets.ts [rev=4d5333e]
import { $ } from "bun";
import { mkdirSync, rmSync } from "node:fs";
import { prelude } from "../snippet-prelude.ts";

const rev = process.argv[2] ?? "4d5333e";
const out = new URL("./snippets/", import.meta.url).pathname;
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const files = (await $`git ls-tree -r --name-only ${rev}`.text())
  .split("\n")
  .filter((f) => /^(README|USAGE|MIGRATION|FUNCTIONS)\.md$|^docs\/.*\.md$|^examples\/.*\.ts$/.test(f));

let n = 0;
for (const file of files) {
  const text = await $`git show ${rev}:${file}`.text();
  const blocks = file.endsWith(".ts")
    ? [text]
    : [...text.matchAll(/```(?:typescript|ts)\n([\s\S]*?)```/g)].map((m) => m[1]!);
  blocks.forEach((code, i) => {
    const name = `${file.replace(/\.(md|ts)$/, "").replace(/[^A-Za-z0-9]+/g, "_")}__${i}.ts`;
    // Each snippet is its own module so top-level names don't collide.
    const head = prelude(code);
    Bun.write(`${out}${name}`, `// Source: ${file} @ ${rev} (block ${i})\n${head}${code}\nexport {};\n`);
    n++;
  });
}
console.log(`wrote ${n} snippets from ${files.length} files`);
