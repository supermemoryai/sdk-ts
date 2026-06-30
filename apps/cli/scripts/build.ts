import { rename } from 'node:fs/promises';
import { $ } from 'bun';

await $`bun build src/index.ts --outdir dist --target node --format cjs --define 'import.meta.env=process.env'`;

await rename('dist/index.js', 'dist/index.cjs');

const content = await Bun.file('dist/index.cjs').text();
await Bun.write('dist/index.cjs', `#!/usr/bin/env node\n${content}`);

const { exitCode } = await $`node dist/index.cjs --version`.quiet().nothrow();
if (exitCode !== 0) {
  console.error('smoke test failed');
  process.exit(1);
}
