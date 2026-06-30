import { existsSync, readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import chalk from 'chalk';
import { apiRequest, apiRequestFormData } from '../lib/api.js';
import { defineCliCommand } from '../lib/command.js';
import { ValidationError } from '../lib/errors.js';
import { exitWithError, isInputInteractive, type OutputFlags, output } from '../lib/output.js';
import { parseJsonArg } from '../lib/validators.js';

export const addCommand = defineCliCommand({
  meta: {
    name: 'add',
    description: 'Ingest content and extract memories into a container tag',
  },
  args: {
    content: {
      type: 'positional',
      description: 'Text string, file path, or URL',
      required: false,
    },
    tag: {
      type: 'string',
      description: 'Container tag',
    },
    stdin: {
      type: 'boolean',
      description: 'Read content from stdin',
      default: false,
    },
    title: {
      type: 'string',
      description: 'Document title',
    },
    metadata: {
      type: 'string',
      description: 'JSON metadata to attach',
    },
    id: {
      type: 'string',
      description: 'Custom document ID (for idempotency)',
    },
    batch: {
      type: 'boolean',
      description: 'Read JSON array from stdin (batch mode)',
      default: false,
    },
  },
  async handler({ args, flags, config, span }) {
    const tag = (args.tag as string) ?? config.tag;
    if (!tag) {
      throw new ValidationError('Container tag required. Use --tag <name>');
    }

    if (args.stdin || args.batch) {
      const stdinContent = await readStdin();
      if (!stdinContent) {
        exitWithError('validation_error', 'No input received from stdin', flags);
      }

      if (args.batch) {
        return handleBatch(stdinContent, tag, flags);
      }

      return handleTextAdd(stdinContent, tag, args, flags, span);
    }

    if (!args.content) {
      exitWithError(
        'validation_error',
        'Content argument required. Usage: supermemory add <content|file|url>',
        flags,
      );
    }

    const content = args.content as string;

    if (content.startsWith('http://') || content.startsWith('https://')) {
      span.setAttribute('contentType', 'url');
      return handleUrlAdd(content, tag, args, flags);
    }

    const filePath = resolve(content);
    if (existsSync(filePath)) {
      span.setAttribute('contentType', 'file');
      return handleFileAdd(filePath, tag, args, flags);
    }

    span.setAttribute('contentType', 'text');
    return handleTextAdd(content, tag, args, flags, span);
  },
});

async function readStdin(): Promise<string> {
  if (isInputInteractive()) return '';
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf-8').trim();
}

async function handleTextAdd(
  content: string,
  tag: string,
  args: Record<string, unknown>,
  flags: OutputFlags,
  span?: { setAttribute: (k: string, v: string | number) => void },
): Promise<void> {
  const body: Record<string, unknown> = { content };
  body.containerTag = tag;
  if (args.title) body.title = args.title;
  if (args.id) body.customId = args.id;

  const metadata = parseJsonArg(args.metadata as string | undefined, 'metadata');
  if (metadata) body.metadata = metadata;

  const { data } = await apiRequest<{
    id: string;
    status: string;
    containerTag?: string;
  }>('/v3/documents', {
    method: 'POST',
    body,
  });

  span?.setAttribute('documentId', data.id ?? '');

  output(
    data,
    () => {
      const lines = [`${chalk.green('✓')} Added document ${chalk.dim(data.id)} (${data.status ?? 'queued'})`];
      if (data.containerTag || tag) {
        lines.push(`  Tag: ${data.containerTag ?? tag}`);
      }
      return lines.join('\n');
    },
    flags,
  );
}

async function handleUrlAdd(
  url: string,
  tag: string,
  args: Record<string, unknown>,
  flags: OutputFlags,
): Promise<void> {
  const body: Record<string, unknown> = { content: url };
  body.containerTag = tag;
  if (args.title) body.title = args.title;
  if (args.id) body.customId = args.id;

  const metadata = parseJsonArg(args.metadata as string | undefined, 'metadata');
  if (metadata) body.metadata = metadata;

  const { data } = await apiRequest<{
    id: string;
    status: string;
    containerTag?: string;
  }>('/v3/documents', {
    method: 'POST',
    body,
  });

  output(
    data,
    () => {
      const lines = [
        `${chalk.green('✓')} Added URL ${chalk.dim(url)} → ${chalk.dim(data.id)} (${
          data.status ?? 'queued'
        })`,
      ];
      if (data.containerTag || tag) {
        lines.push(`  Tag: ${data.containerTag ?? tag}`);
      }
      return lines.join('\n');
    },
    flags,
  );
}

async function handleFileAdd(
  filePath: string,
  tag: string,
  args: Record<string, unknown>,
  flags: OutputFlags,
): Promise<void> {
  const fileBuffer = readFileSync(filePath);
  const fileName = basename(filePath);
  const blob = new Blob([fileBuffer]);

  const formData = new FormData();
  formData.append('file', blob, fileName);
  formData.append('containerTag', tag);
  if (args.title) formData.append('title', args.title as string);
  if (args.id) formData.append('customId', args.id as string);
  if (args.metadata) {
    parseJsonArg(args.metadata as string, 'metadata');
    formData.append('metadata', args.metadata as string);
  }

  const { data } = await apiRequestFormData<{
    id: string;
    status: string;
    containerTag?: string;
  }>('/v3/documents/file', formData);

  output(
    data,
    () => {
      const lines = [
        `${chalk.green('✓')} Uploaded ${chalk.dim(fileName)} → ${chalk.dim(data.id)} (${
          data.status ?? 'queued'
        })`,
      ];
      if (data.containerTag || tag) {
        lines.push(`  Tag: ${data.containerTag ?? tag}`);
      }
      return lines.join('\n');
    },
    flags,
  );
}

async function handleBatch(stdinContent: string, tag: string, flags: OutputFlags): Promise<void> {
  let items: {
    content: string;
    title?: string;
    metadata?: unknown;
    tag?: string;
    id?: string;
  }[];
  try {
    items = JSON.parse(stdinContent);
    if (!Array.isArray(items)) throw new Error('Expected JSON array');
  } catch {
    return exitWithError('validation_error', 'Invalid JSON array from stdin for batch mode', flags);
  }

  const results: { id: string; status: string }[] = [];

  for (const item of items) {
    const body: Record<string, unknown> = { content: item.content };
    body.containerTag = item.tag ?? tag;
    if (item.title) body.title = item.title;
    if (item.metadata) body.metadata = item.metadata;
    if (item.id) body.customId = item.id;

    const { data } = await apiRequest<{ id: string; status: string }>('/v3/documents', {
      method: 'POST',
      body,
    });
    results.push(data);
  }

  output(
    { results, total: results.length },
    () => `${chalk.green('✓')} Added ${results.length} documents in batch`,
    flags,
  );
}
