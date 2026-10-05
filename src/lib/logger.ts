/*
 * Runtime helper carried over unchanged from the 5.0.0-rc.5 SDK so behaviour is
 * identical. Hand-maintained and independent of the API spec.
 */

export interface Logger {
  group(label?: string): void;
  groupEnd(): void;
  log(message: any, ...args: any[]): void;
}
