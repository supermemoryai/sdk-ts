// Typechecks every rc.5 doc snippet against the published rc.5 sources and
// against this package. A snippet that compiles with rc.5 must compile here.
import { $ } from "bun";

const dir = new URL(".", import.meta.url).pathname;

async function errorsBySnippet(config: string): Promise<Map<string, string[]>> {
  const out = await $`bunx tsc -p ${dir}${config}`.cwd(dir).nothrow().text();
  const errors = new Map<string, string[]>();
  for (const line of out.split("\n")) {
    const m = /^snippets\/([^(]+)\(\d+,\d+\): error (.*)$/.exec(line);
    if (m) errors.set(m[1]!, [...(errors.get(m[1]!) ?? []), m[2]!]);
  }
  return errors;
}

export async function checkSnippets() {
  const [rc5, ours] = await Promise.all([errorsBySnippet("tsconfig.rc5.json"), errorsBySnippet("tsconfig.json")]);
  const total = (await $`ls ${dir}snippets`.text()).trim().split("\n").length;
  const regressions = [...ours].filter(([file]) => !rc5.has(file));
  return { total, brokenInRc5: [...rc5.keys()], regressions };
}

if (import.meta.main) {
  const { total, brokenInRc5, regressions } = await checkSnippets();
  console.log(`${total} snippets; ${brokenInRc5.length} don't compile against rc.5 itself; ${regressions.length} regressions`);
  for (const f of brokenInRc5) console.log(`  rc.5-broken: ${f}`);
  for (const [f, errs] of regressions) console.log(`  REGRESSION ${f}\n    ${errs.join("\n    ")}`);
  process.exit(regressions.length ? 1 : 0);
}
