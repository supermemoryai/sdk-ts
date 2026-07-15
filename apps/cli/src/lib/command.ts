import type { Span } from '@opentelemetry/api';
import { defineCommand } from 'citty';
import { getConfig } from './api.js';
import { getEnforcedTags, type ResolvedConfig } from './config.js';
import { ValidationError } from './errors.js';
import { withSpan } from './otel.js';
import type { OutputFlags } from './output.js';

const noopSpan = {
  setAttribute: () => noopSpan,
  setAttributes: () => noopSpan,
  addEvent: () => noopSpan,
  setStatus: () => noopSpan,
  updateName: () => noopSpan,
  end: () => {},
  isRecording: () => false,
  recordException: () => {},
  spanContext: () => ({ traceId: '', spanId: '', traceFlags: 0 }),
} as unknown as Span;

export interface CommandContext {
  rawArgs: string[];
  args: Record<string, unknown>;
  flags: OutputFlags;
  config: ResolvedConfig;
  span: Span;
}

export function defineCliCommand(options: {
  meta: { name: string; description: string };
  args?: Record<
    string,
    {
      type: string;
      description?: string;
      required?: boolean;
      default?: unknown;
    }
  >;
  noSpan?: boolean;
  subCommands?: Record<string, ReturnType<typeof defineCommand>>;
  handler: (ctx: CommandContext) => Promise<void>;
}) {
  const allArgs = {
    ...(options.args ?? {}),
    json: {
      type: 'boolean' as const,
      description: 'Force JSON output',
      default: false,
    },
  };

  return defineCommand({
    meta: options.meta,
    args: allArgs,
    ...(options.subCommands ? { subCommands: options.subCommands } : {}),
    async run({ args, rawArgs }) {
      const enforcedTags = getEnforcedTags();
      if (args.tag && enforcedTags.length > 0 && !enforcedTags.includes(args.tag as string)) {
        throw new ValidationError(
          `Cannot use --tag "${args.tag}". Your API key is scoped to: ${enforcedTags.join(', ')}.`,
        );
      }
      const config = getConfig({
        tag: args.tag as string | undefined,
      });
      const flags: OutputFlags = { json: args.json as boolean, output: config.output };

      const runHandler = async (span: Span) => {
        await options.handler({
          args: args as Record<string, unknown>,
          rawArgs,
          flags,
          config,
          span,
        });
      };

      if (options.noSpan) {
        await runHandler(noopSpan);
      } else {
        await withSpan('supermemory.command', { commandName: options.meta.name }, runHandler);
      }
    },
  });
}
