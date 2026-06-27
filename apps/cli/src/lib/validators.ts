import { ValidationError } from './errors.js';

export function parseIntArg(
  value: string | undefined,
  name: string,
  opts?: { min?: number; max?: number },
): number | undefined {
  if (value === undefined) return undefined;
  const n = Number.parseInt(value, 10);
  if (Number.isNaN(n)) {
    throw new ValidationError(`--${name} must be an integer, got "${value}"`);
  }
  if (opts?.min !== undefined && n < opts.min) {
    throw new ValidationError(`--${name} must be at least ${opts.min}, got ${n}`);
  }
  if (opts?.max !== undefined && n > opts.max) {
    throw new ValidationError(`--${name} must be at most ${opts.max}, got ${n}`);
  }
  return n;
}

export function parseFloatArg(
  value: string | undefined,
  name: string,
  opts?: { min?: number; max?: number },
): number | undefined {
  if (value === undefined) return undefined;
  const n = Number.parseFloat(value);
  if (Number.isNaN(n)) {
    throw new ValidationError(`--${name} must be a number, got "${value}"`);
  }
  if (opts?.min !== undefined && n < opts.min) {
    throw new ValidationError(`--${name} must be at least ${opts.min}, got ${n}`);
  }
  if (opts?.max !== undefined && n > opts.max) {
    throw new ValidationError(`--${name} must be at most ${opts.max}, got ${n}`);
  }
  return n;
}

export function parseEnumArg<T extends string>(
  value: string | undefined,
  name: string,
  validValues: readonly T[],
): T | undefined {
  if (value === undefined) return undefined;
  if (!validValues.includes(value as T)) {
    throw new ValidationError(`--${name} must be one of: ${validValues.join(', ')}. Got "${value}"`);
  }
  return value as T;
}

export function parseJsonArg(value: string | undefined, name: string): unknown | undefined {
  if (value === undefined) return undefined;
  try {
    return JSON.parse(value);
  } catch {
    throw new ValidationError(`--${name} must be valid JSON`);
  }
}
