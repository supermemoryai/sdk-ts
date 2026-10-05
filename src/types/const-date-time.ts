/*
 * Runtime helper carried over unchanged from the 5.0.0-rc.5 SDK so behaviour is
 * identical. Hand-maintained and independent of the API spec.
 */

import * as z from "zod/v4-mini";

export function constDateTime(
  val: string,
): z.ZodMiniType<string, unknown> {
  return z.custom<string>((v) => {
    return (
      typeof v === "string" && new Date(v).getTime() === new Date(val).getTime()
    );
  }, `Value must be equivalent to ${val}`);
}
