/*
 * Runtime helper carried over unchanged from the 5.0.0-rc.5 SDK so behaviour is
 * identical. Hand-maintained and independent of the API spec.
 */

const hasOwn = Object.prototype.hasOwnProperty;

export type Params = Partial<Record<string, string | number>>;

export function pathToFunc(
  pathPattern: string,
  options?: { charEncoding?: "percent" | "none" },
): (params?: Params) => string {
  const paramRE = /\{([a-zA-Z0-9_][a-zA-Z0-9_-]*?)\}/g;

  return function buildURLPath(params: Record<string, unknown> = {}): string {
    return pathPattern
      .replace(paramRE, function (_, placeholder) {
        if (!hasOwn.call(params, placeholder)) {
          throw new Error(`Parameter '${placeholder}' is required`);
        }

        const value = params[placeholder];
        if (typeof value !== "string" && typeof value !== "number") {
          throw new Error(
            `Parameter '${placeholder}' must be a string or number`,
          );
        }

        return options?.charEncoding === "percent"
          ? encodeURIComponent(`${value}`)
          : `${value}`;
      })
      .replace(/^\/+/, "");
  };
}
