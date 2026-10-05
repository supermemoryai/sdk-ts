// Loads fern/openapi.json + fern/overlay.yaml into the operation list that the
// public SDK surface (src/models, src/funcs, src/sdk) is generated from.
//
// Every schema object gets a stable JSON-pointer "ptr" so names can be pinned
// per location in fern/surface-names.json.

export type Schema = Record<string, any>;

export type Param = { name: string; in: "path" | "query" | "header"; required: boolean; schema: Schema };

export type Operation = {
  opId: string;
  /** PascalCase operation id, the prefix of every per-operation type name. */
  pascal: string;
  method: string;
  path: string;
  /** SDK group ("documents") or null for root methods (client.add). */
  group: string | null;
  /** SDK method name ("batchAdd"). */
  name: string;
  params: Param[];
  body?: { contentType: string; schema: Schema; required: boolean };
  /** 2xx responses, in spec order. */
  success: Array<{ status: number; contentType: string; schema: Schema }>;
  /** Non-2xx JSON responses, in spec order. */
  errors: Array<{ status: number; schema: Schema }>;
  description?: string;
};

export type Spec = {
  doc: Schema;
  ops: Operation[];
  servers: string[];
  ptr: (s: Schema) => string;
  resolve: (s: Schema) => Schema;
  synthetic: (ptr: string, s: Schema) => Schema;
};

const METHODS = ["get", "post", "put", "patch", "delete"] as const;

const escape = (k: string) => k.replace(/~/g, "~0").replace(/\//g, "~1");

export const pascal = (s: string) =>
  s.replace(/[^A-Za-z0-9]+(.)?/g, (_, c: string | undefined) => (c ? c.toUpperCase() : "")).replace(/^./, (c) => c.toUpperCase());

export const camel = (s: string) => pascal(s).replace(/^./, (c) => c.toLowerCase());

/** The overlay is a list of `{ target: '$.paths["/x"].post', update: {...} }` actions. */
function readOverlay(text: string) {
  const overlay = Bun.YAML.parse(text) as { actions: Array<{ target: string; update?: Schema; remove?: boolean }> };
  const names = new Map<string, { group: string | null; name: string }>();
  const removed = new Set<string>();
  for (const action of overlay.actions) {
    const m = /^\$\.paths\["([^"]+)"\](?:\.(\w+))?$/.exec(action.target);
    if (!m) continue;
    const [, path, method] = m;
    if (action.remove && !method) removed.add(path!);
    const u = action.update;
    if (method && u && u["x-fern-sdk-method-name"]) {
      const g = u["x-fern-sdk-group-name"];
      names.set(`${method} ${path}`, { group: Array.isArray(g) ? (g[0] ?? null) : (g ?? null), name: u["x-fern-sdk-method-name"] });
    }
  }
  return { names, removed };
}

export async function loadSpec(root: string): Promise<Spec> {
  const doc = (await Bun.file(`${root}/fern/openapi.json`).json()) as Schema;
  const { names, removed } = readOverlay(await Bun.file(`${root}/fern/overlay.yaml`).text());

  const ptrs = new WeakMap<object, string>();
  const index = (node: unknown, ptr: string) => {
    if (node && typeof node === "object") {
      if (!ptrs.has(node)) ptrs.set(node, ptr);
      for (const [k, v] of Object.entries(node)) index(v, `${ptr}/${escape(k)}`);
    }
  };
  index(doc, "");

  const ptr = (s: Schema) => {
    const p = ptrs.get(s);
    if (p === undefined) throw new Error(`schema has no pointer: ${JSON.stringify(s).slice(0, 80)}`);
    return p;
  };
  const resolve = (s: Schema): Schema => {
    let cur = s;
    while (cur && typeof cur.$ref === "string") {
      const target = cur.$ref.replace(/^#/, "").split("/").slice(1).reduce((o: any, k: string) => o[k.replace(/~1/g, "/").replace(/~0/g, "~")], doc);
      if (!target) throw new Error(`unresolved $ref ${cur.$ref}`);
      cur = target;
    }
    return cur;
  };
  const synthetic = (p: string, s: Schema) => {
    ptrs.set(s, p);
    return s;
  };

  const ops: Operation[] = [];
  for (const [path, item] of Object.entries(doc.paths as Record<string, Schema>)) {
    if (removed.has(path)) continue;
    for (const method of METHODS) {
      const op = item[method];
      if (!op) continue;
      const surface = names.get(`${method} ${path}`);
      if (!surface) throw new Error(`fern/overlay.yaml has no SDK method name for ${method.toUpperCase()} ${path}`);
      const params: Param[] = (op.parameters ?? []).map((p: Schema) => {
        const r = resolve(p);
        return { name: r.name, in: r.in, required: !!r.required, schema: r.schema };
      });
      let body: Operation["body"];
      if (op.requestBody) {
        const rb = resolve(op.requestBody);
        const [contentType, media] = Object.entries(rb.content as Record<string, Schema>)[0]!;
        body = { contentType, schema: media.schema, required: !!rb.required };
      }
      const success: Operation["success"] = [];
      const errors: Operation["errors"] = [];
      for (const [code, res] of Object.entries(op.responses as Record<string, Schema>)) {
        const r = resolve(res);
        const status = Number(code);
        for (const [contentType, media] of Object.entries((r.content ?? {}) as Record<string, Schema>)) {
          if (status >= 200 && status < 300) success.push({ status, contentType, schema: media.schema });
          else if (contentType === "application/json") errors.push({ status, schema: media.schema });
        }
      }
      ops.push({
        opId: op.operationId,
        pascal: pascal(op.operationId),
        method: method.toUpperCase(),
        path,
        group: surface.group,
        name: surface.name,
        params,
        ...(body ? { body } : {}),
        success,
        errors,
        ...(op.description ? { description: op.description } : {}),
      });
    }
  }

  return { doc, ops, servers: (doc.servers ?? []).map((s: Schema) => s.url), ptr, resolve, synthetic };
}

// ---------------------------------------------------------------- schema shape

/** Splits `anyOf/oneOf [X, {type:null}]` and `type: [T, "null"]` into the non-null part. */
export function unwrapNullable(spec: Spec, schema: Schema): { schema: Schema; nullable: boolean } {
  const s = spec.resolve(schema);
  const variants = s.oneOf ?? s.anyOf;
  if (Array.isArray(variants)) {
    const nonNull = variants.filter((v: Schema) => spec.resolve(v).type !== "null");
    if (nonNull.length !== variants.length) {
      if (nonNull.length === 1) return { schema: nonNull[0], nullable: true };
      return { schema: spec.synthetic(`${spec.ptr(s)}/~nonnull`, { ...s, [s.oneOf ? "oneOf" : "anyOf"]: nonNull }), nullable: true };
    }
  }
  if (Array.isArray(s.type) && s.type.includes("null")) {
    const rest = s.type.filter((t: string) => t !== "null");
    return { schema: spec.synthetic(`${spec.ptr(s)}/~nonnull`, { ...s, type: rest.length === 1 ? rest[0] : rest }), nullable: true };
  }
  return { schema, nullable: false };
}

export function variantsOf(spec: Spec, schema: Schema): Schema[] | undefined {
  const s = spec.resolve(schema);
  const v = s.oneOf ?? s.anyOf;
  return Array.isArray(v) ? v : undefined;
}
