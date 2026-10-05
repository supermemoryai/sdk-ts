// One-off: pins every type name of the published 5.0.0-rc.5 SDK to the spec
// location it describes, by walking rc.5's type declarations in lockstep with
// fern/openapi.json. Output: fern/surface-names.json.
//
//   bun scripts/surface/extract-rc5-names.ts <path to rc.5 src/>
//
// The generator names those locations exactly as rc.5 did; locations added to
// the spec later get rule-based names (see names.ts), so this never needs
// re-running for spec changes.
import ts from "typescript";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { loadSpec, pascal, type Schema, type Spec, unwrapNullable, variantsOf } from "./spec.ts";

const root = new URL("../..", import.meta.url).pathname;
const rc5 = process.argv[2];
if (!rc5) throw new Error("usage: extract-rc5-names.ts <rc5 src dir>");

const spec = await loadSpec(root);

// ------------------------------------------------------------ rc.5 type decls
const decls = new Map<string, ts.TypeNode>();
const walkDir = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walkDir(join(dir, e.name)) : e.name.endsWith(".ts") ? [join(dir, e.name)] : []));
for (const file of walkDir(join(rc5, "models"))) {
  const sf = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
  sf.forEachChild((n) => {
    if (ts.isTypeAliasDeclaration(n) && !n.name.text.endsWith("$Outbound")) decls.set(n.name.text, n.type);
  });
}

// ------------------------------------------------------------------ the walk
const names: Record<string, string> = {};
/** Union member order as rc.5 declared it (spec variant indexes), per union location. */
const order: Record<string, number[]> = {};
const seen = new Set<string>();

const record = (ptr: string, name: string) => {
  if (names[ptr] && names[ptr] !== name) throw new Error(`conflict at ${ptr}: ${names[ptr]} vs ${name}`);
  names[ptr] = name;
};

const refName = (n: ts.TypeNode): string | undefined => {
  if (!ts.isTypeReferenceNode(n)) return;
  const t = n.typeName;
  return ts.isIdentifier(t) ? t.text : t.right.text;
};

const stripNullish = (n: ts.TypeNode): ts.TypeNode[] => {
  if (ts.isUnionTypeNode(n)) return n.types.flatMap(stripNullish);
  if (ts.isLiteralTypeNode(n) && n.literal.kind === ts.SyntaxKind.NullKeyword) return [];
  if (n.kind === ts.SyntaxKind.UndefinedKeyword) return [];
  if (ts.isParenthesizedTypeNode(n)) return stripNullish(n.type);
  return [n];
};

const declOf = (n: ts.TypeNode): ts.TypeNode => {
  const r = refName(n);
  return r && r !== "Array" && decls.has(r) ? declOf(decls.get(r)!) : n;
};

const KEYWORD: Record<number, string> = {
  [ts.SyntaxKind.StringKeyword]: "string",
  [ts.SyntaxKind.NumberKeyword]: "number",
  [ts.SyntaxKind.BooleanKeyword]: "boolean",
};

/** How well a TS union member describes a schema variant (0 = not at all). */
function score(part: ts.TypeNode, variant: Schema): number {
  const v = spec.resolve(variant);
  const d = declOf(part);
  const isUnion = stripNullish(d).length > 1;
  if (isUnion) return variantsOf(spec, v) ? 10 : 0;
  if (ts.isTypeLiteralNode(d)) {
    if (!v.properties) return 0;
    let sc = 1;
    for (const m of d.members) {
      if (!ts.isPropertySignature(m) || !ts.isIdentifier(m.name) || !m.type) continue;
      const prop = v.properties[m.name.text];
      if (!prop) {
        sc -= 1;
        continue;
      }
      sc += 1;
      const p = spec.resolve(prop);
      if (ts.isLiteralTypeNode(m.type) && ts.isStringLiteral(m.type.literal)) {
        const values = p.const !== undefined ? [p.const] : (p.enum ?? []);
        sc += values.includes(m.type.literal.text) ? 5 : -5;
      }
      const opRef = refName(m.type);
      const opDecl = opRef && decls.get(opRef);
      if (opDecl && ts.isTypeReferenceNode(opDecl) && Array.isArray(p.enum)) {
        // ClosedEnum<typeof OperatorN>: compare the enum's values.
        const src = opDecl.getSourceFile().getFullText();
        const values = new RegExp(`export const ${opRef} = \\{([^}]*)\\}`).exec(src)?.[1] ?? "";
        sc += p.enum.every((e: string) => values.includes(`"${e}"`)) ? 3 : -3;
      }
    }
    return Math.max(sc, 0);
  }
  const kw = KEYWORD[d.kind];
  if (kw) return v.type === kw || (kw === "number" && v.type === "integer") ? 2 : 0;
  if (ts.isArrayTypeNode(d) || refName(d) === "Array") return v.type === "array" ? 2 : 0;
  return 1;
}

function walk(schema: Schema, node: ts.TypeNode) {
  const { schema: inner } = unwrapNullable(spec, schema);
  const s = spec.resolve(inner);
  const parts = stripNullish(node);
  if (parts.length === 0) return;

  if (s.format === "binary") {
    for (const p of parts) {
      const r = refName(p);
      if (r && decls.has(r)) record(spec.ptr(s), r);
    }
    return;
  }

  if (parts.length > 1) {
    const variants = variantsOf(spec, s);
    if (!variants) return;
    // Speakeasy reorders union members, so pair them by structure, not position.
    const used = new Set<number>();
    const picked: number[] = [];
    for (const part of parts) {
      let best = -1;
      let bestScore = 0;
      variants.forEach((v, i) => {
        if (used.has(i)) return;
        const sc = score(part, v);
        if (sc > bestScore) [best, bestScore] = [i, sc];
      });
      if (best >= 0) {
        used.add(best);
        picked.push(best);
        walk(variants[best]!, part);
      }
    }
    if (picked.some((v, i) => v !== i)) order[spec.ptr(s)] = picked;
    return;
  }

  const n = parts[0]!;
  const name = refName(n);
  // Binary fields are typed `<Name>File | Blob`; pin the object form's name.
  if (s.format === "binary") {
    for (const p of parts.length > 1 ? parts : stripNullish(n)) {
      const r = refName(p);
      if (r && decls.has(r)) record(spec.ptr(s), r);
    }
    return;
  }
  if (name === "Array" && ts.isTypeReferenceNode(n) && n.typeArguments?.[0] && s.items) return walk(s.items, n.typeArguments[0]);
  if (name && decls.has(name)) {
    // Name the location that carries the structure: the $ref target, or a
    // nullable wrapper's inner schema.
    record(spec.ptr(s), name);
    const key = `${spec.ptr(s)}|${name}`;
    if (seen.has(key)) return;
    seen.add(key);
    return walk(s, decls.get(name)!);
  }
  if (ts.isArrayTypeNode(n) && s.items) return walk(s.items, n.elementType);
  if (ts.isTypeLiteralNode(n)) {
    for (const m of n.members) {
      if (ts.isIndexSignatureDeclaration(m) && s.additionalProperties && typeof s.additionalProperties === "object") walk(s.additionalProperties, m.type);
      if (ts.isPropertySignature(m) && m.type && ts.isIdentifier(m.name)) {
        const prop = s.properties?.[m.name.text];
        if (prop) walk(prop, m.type);
      }
    }
  }
}

// -------------------------------------------------------------------- roots
const funcs = new Map<string, string>();
for (const file of readdirSync(join(rc5, "funcs"))) {
  const src = readFileSync(join(rc5, "funcs", file), "utf8");
  const id = /operationID: "(\w+)"/.exec(src)?.[1];
  if (id) funcs.set(id, src);
}

const virtual = (ptr: string, s: Schema) => spec.synthetic(ptr, s);

for (const op of spec.ops) {
  const src = funcs.get(op.opId);
  if (!src) continue; // added after rc.5 (connectors)

  // Request: `{ ...params, body }`, or the body itself when there are no params.
  const reqName = `${op.pascal}Request`;
  if (decls.has(reqName)) {
    const props: Schema = {};
    for (const p of op.params) props[p.name] = p.schema;
    if (op.body) props.body = op.body.schema;
    const reqSchema = op.params.length ? virtual(`op:${op.opId}:request`, { type: "object", properties: props }) : op.body!.schema;
    record(spec.ptr(reqSchema), reqName);
    walk(reqSchema, decls.get(reqName)!);
  }

  // Responses: the type each M.json / M.text matcher parses into.
  const successNames = new Set<string>();
  for (const m of src.matchAll(/M\.(json|text)\(\s*(\d+),\s*(z\.array\()?operations\.(\w+)\$inboundSchema/g)) successNames.add(m[4]!);
  const [respName] = successNames;
  if (respName) {
    const schemas = op.success.map((r) => (r.contentType.startsWith("text/") ? virtual(`op:${op.opId}:response:${r.status}:text`, { type: "string" }) : r.schema));
    const respSchema = schemas.length === 1 ? schemas[0]! : virtual(`op:${op.opId}:response`, { oneOf: schemas });
    const isArray = new RegExp(`z\\.array\\(operations\\.${respName}\\$`).test(src);
    const target = isArray ? spec.resolve(respSchema).items : respSchema;
    record(spec.ptr(target), respName);
    walk(target, decls.get(respName)!);
  }

  // Errors: per-status error unions (e.g. PostNsByNamespaceSearchBadRequest).
  for (const m of src.matchAll(/M\.jsonErr\(\s*(\d+),\s*errors\.(\w+)\$inboundSchema/g)) {
    const status = Number(m[1]);
    const name = m[2]!;
    const err = op.errors.find((e) => e.status === status);
    if (!err || !decls.has(name)) continue;
    record(spec.ptr(err.schema), name);
    walk(err.schema, decls.get(name)!);
  }
}

// Error classes carry their fields in `<Name>Data`.
for (const [name] of decls) {
  const m = /^(\w+)Data$/.exec(name);
  const component = m && spec.doc.components?.schemas?.[m[1]!];
  if (component) {
    record(spec.ptr(component), m[1]!);
    walk(component, decls.get(name)!);
  }
}

// Unions of primitives (`Page = string | number`) are exported as aliases but
// written inline where used, so the walk never reaches them. Match them to the
// one union-of-primitives location whose label ends the name.
const isPrimitiveUnion = (sch: Schema) => {
  const v = variantsOf(spec, sch);
  return !!v && v.every((x) => ["string", "number", "integer", "boolean", "array"].includes(spec.resolve(x).type));
};
const candidates: Array<{ ptr: string; label: string; op: string }> = [];
const visited = new Set<string>();
const collect = (sch: Schema, label: string, op: string) => {
  if (!sch || typeof sch !== "object") return;
  const s = spec.resolve(sch);
  const key = `${spec.ptr(s)}|${label}|${op}`;
  if (visited.has(key)) return;
  visited.add(key);
  if (isPrimitiveUnion(s)) candidates.push({ ptr: spec.ptr(s), label, op });
  for (const [k, v] of Object.entries((s.properties ?? {}) as Record<string, Schema>)) collect(v, pascal(k), op);
  if (s.items) collect(s.items, label, op);
  if (s.additionalProperties && typeof s.additionalProperties === "object") collect(s.additionalProperties, label, op);
  for (const v of variantsOf(spec, s) ?? []) collect(v, label, op);
};
for (const op of spec.ops) {
  op.params.forEach((p) => collect(p.schema, pascal(p.name), op.pascal));
  if (op.body) collect(op.body.schema, "", op.pascal);
  op.success.forEach((r) => collect(r.schema, "", op.pascal));
}
for (const c of Object.values(spec.doc.components?.schemas ?? {})) collect(c as Schema, "", "");
const pinned = new Set(Object.values(names));
for (const [name, node] of decls) {
  if (pinned.has(name) || !ts.isUnionTypeNode(node) || node.types.some((t) => refName(t) && refName(t) !== "Array")) continue;
  const hits = [...new Map(candidates.filter((c) => c.label && (name === c.label || name === c.op + c.label) && !names[c.ptr]).map((c) => [c.ptr, c])).values()];
  const scoped = hits.filter((c) => name === c.op + c.label);
  const pick = scoped.length === 1 ? scoped : hits.length === 1 ? hits : [];
  if (pick[0]) record(pick[0].ptr, name);
}

const unmatched = [...decls.keys()].filter((n) => !Object.values(names).includes(n) && !/Data$/.test(n));
await Bun.write(join(root, "fern/surface-names.json"), JSON.stringify({ names: Object.fromEntries(Object.entries(names).sort()), order, unmatched }, null, 2) + "\n");
console.log(`pinned ${Object.keys(names).length} names; unmatched: ${unmatched.join(", ") || "none"}`);
