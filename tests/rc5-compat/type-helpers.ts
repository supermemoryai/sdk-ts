// Structural comparison helpers for types.generated.ts.

type Primitive = string | number | boolean | bigint | symbol | null | undefined;
type Opaque = Date | Blob | ArrayBuffer | Uint8Array | ReadableStream<any> | Request | Response | Headers | URL | AbortSignal;

type Base<T> = T extends string ? string : T extends number ? number : T extends boolean ? boolean : T;

/**
 * rc.5 brands unknown open-enum values as `T & { [uniqueSymbol]: "unrecognized" }`.
 * The symbol is unique per declaration, so both packages' brands are reduced to
 * the underlying primitive before comparing.
 */
type Unbrand<T> = T extends Primitive ? ({} extends Omit<T, keyof Base<T>> ? T : Base<T>) : T;

/** Deeply normalizes a type for comparison. */
export type Norm<T, Depth extends unknown[] = []> = Depth["length"] extends 14
  ? T
  : T extends Primitive
  ? Unbrand<T>
  : T extends Opaque
  ? T
  : T extends Promise<infer U>
  ? Promise<Norm<U, [...Depth, 1]>>
  : T extends (...args: infer A) => infer R
  ? (...args: Norm<A, [...Depth, 1]>) => Norm<R, [...Depth, 1]>
  : T extends ReadonlyArray<infer U>
  ? Array<Norm<U, [...Depth, 1]>>
  : // `_`-prefixed members are SDK internals, not public API.
    { [K in keyof T as K extends symbol | `_${string}` | `#${string}` ? never : K]: Norm<T[K], [...Depth, 1]> };

/** True when A and B are assignable to each other after normalization. */
export type Mutual<A, B> = [Norm<A>] extends [Norm<B>] ? ([Norm<B>] extends [Norm<A>] ? true : false) : false;

/** True when B offers everything A does (B may add members, e.g. new endpoint groups). */
export type Superset<A, B> = [Norm<B>] extends [Norm<A>] ? true : false;
