/*
 * Runtime helper carried over unchanged from the 5.0.0-rc.5 SDK so behaviour is
 * identical. Hand-maintained and independent of the API spec.
 */

export function isReadableStream<T = Uint8Array>(
  val: unknown,
): val is ReadableStream<T> {
  if (typeof val !== "object" || val === null) {
    return false;
  }

  // Check for the presence of methods specific to ReadableStream
  const stream = val as ReadableStream<Uint8Array>;

  // ReadableStream has methods like getReader, cancel, and tee
  return (
    typeof stream.getReader === "function" &&
    typeof stream.cancel === "function" &&
    typeof stream.tee === "function"
  );
}
