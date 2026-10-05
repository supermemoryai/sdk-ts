// Doc examples are often fragments that use names from earlier blocks
// (`client`, `Supermemory`, `request`). Declares just the missing ones.
export function prelude(code: string): string {
  const out: string[] = [];
  const defines = (id: string) => new RegExp(`(import[^;]*\\b${id}\\b|(const|let|class|function) ${id}\\b)`).test(code);
  if (/\bSupermemory\b/.test(code) && !defines("Supermemory")) out.push('import { Supermemory } from "supermemory";');
  if (/\bclient\./.test(code) && !defines("client")) {
    if (!out.length && !defines("Supermemory")) out.push('import { Supermemory } from "supermemory";');
    out.push("declare const client: Supermemory;");
  }
  for (const id of ["apiKey", "request"]) {
    if (new RegExp(`\\b${id}\\b`).test(code) && !defines(id) && !new RegExp(`${id}:`).test(code.replace(new RegExp(`\\{ ${id} \\}`, "g"), ""))) {
      out.push(`declare const ${id}: any;`);
    }
  }
  return out.length ? `${out.join("\n")} // prelude: names from earlier doc blocks\n` : "";
}
