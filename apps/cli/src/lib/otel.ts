import type { Span } from '@opentelemetry/api';
import { context, propagation, SpanStatusCode, trace } from '@opentelemetry/api';

const TRACER_NAME = 'supermemory-cli';

let sdkInstance: { shutdown: () => Promise<void> } | null = null;

export async function initOtel(): Promise<void> {
  const endpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
  if (!endpoint) return;

  try {
    // biome-ignore lint/suspicious/noTsIgnore: optional dep not always installed
    // @ts-ignore optional dep
    const { NodeSDK } = await import('@opentelemetry/sdk-node');
    const { OTLPTraceExporter } = await import(
      // biome-ignore lint/suspicious/noTsIgnore: optional dep not always installed
      // @ts-ignore optional dep
      '@opentelemetry/exporter-trace-otlp-http'
    );

    const sdk = new NodeSDK({
      traceExporter: new OTLPTraceExporter({
        url: `${endpoint}/v1/traces`,
      }),
      serviceName: process.env.OTEL_SERVICE_NAME ?? TRACER_NAME,
    });

    sdk.start();
    sdkInstance = sdk;
  } catch {}
}

export async function shutdownOtel(): Promise<void> {
  if (sdkInstance) {
    try {
      await sdkInstance.shutdown();
    } catch {}
  }
}

function getTracer() {
  return trace.getTracer(TRACER_NAME);
}

export async function withSpan<T>(
  name: string,
  attrs: Record<string, string | number | boolean>,
  fn: (span: Span) => Promise<T>,
): Promise<T> {
  const tracer = getTracer();
  return tracer.startActiveSpan(name, { attributes: attrs }, async (span) => {
    try {
      const result = await fn(span);
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (err) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: String(err),
      });
      throw err;
    } finally {
      span.end();
    }
  });
}

export function extractParentContext(): ReturnType<typeof context.active> {
  const traceparent = process.env.TRACEPARENT;
  if (!traceparent) return context.active();

  const carrier = { traceparent };
  return propagation.extract(context.active(), carrier);
}
