import { createInterface } from 'node:readline';

/**
 * Ask for a yes/no confirmation via stdin.
 * Returns true if the user answers "y" (case-insensitive).
 */
export async function confirm(message: string): Promise<boolean> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stderr,
  });
  const answer = await new Promise<string>((resolve) => {
    rl.question(message, resolve);
  });
  rl.close();
  return answer.toLowerCase() === 'y';
}

export async function multiSelect(opts: {
  label: string;
  items: { value: string; label: string; hint?: string }[];
}): Promise<string[]> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stderr,
  });

  function question(prompt: string): Promise<string> {
    return new Promise<string>((resolve) => {
      rl.question(prompt, resolve);
    });
  }

  process.stderr.write(`  ${opts.label}:\n`);
  for (let i = 0; i < opts.items.length; i++) {
    const item = opts.items[i];
    if (!item) continue;
    const hint = item.hint ? ` — ${item.hint}` : '';
    process.stderr.write(`    ${i + 1}. ${item.label}${hint}\n`);
  }

  while (true) {
    const answer = (await question('  Enter selections (e.g. 1,3,5 or 1-5 or "all"): ')).trim();

    if (!answer) {
      rl.close();
      return [];
    }

    if (answer === 'all' || answer === '*') {
      rl.close();
      return opts.items.map((item) => item.value);
    }

    const indices = new Set<number>();
    let valid = true;

    for (const part of answer.split(',')) {
      const trimmed = part.trim();
      const rangeMatch = trimmed.match(/^(\d+)\s*-\s*(\d+)$/);
      if (rangeMatch?.[1] && rangeMatch[2]) {
        const start = Number.parseInt(rangeMatch[1], 10);
        const end = Number.parseInt(rangeMatch[2], 10);
        if (start < 1 || end > opts.items.length || start > end) {
          valid = false;
          break;
        }
        for (let i = start; i <= end; i++) indices.add(i - 1);
      } else {
        const num = Number.parseInt(trimmed, 10);
        if (Number.isNaN(num) || num < 1 || num > opts.items.length) {
          valid = false;
          break;
        }
        indices.add(num - 1);
      }
    }

    if (!valid) {
      process.stderr.write('  Invalid input. Try again.\n');
      continue;
    }

    rl.close();
    return [...indices]
      .sort((a, b) => a - b)
      .map((i) => opts.items[i]?.value)
      .filter((v): v is string => v !== undefined);
  }
}

export interface PromptSession {
  ask(label: string, opts?: { default?: string; hint?: string }): Promise<string>;
  select(
    label: string,
    options: { value: string; label: string; hint?: string }[],
    defaultIndex?: number,
  ): Promise<string>;
  close(): void;
}

export function createPromptSession(): PromptSession {
  const rl = createInterface({
    input: process.stdin,
    output: process.stderr,
  });

  rl.on('close', () => {
    process.exit(0);
  });

  function question(prompt: string): Promise<string> {
    return new Promise<string>((resolve) => {
      rl.question(prompt, resolve);
    });
  }

  return {
    async ask(label, opts) {
      const defaultDisplay = opts?.default ? ` [${opts.default}]` : '';
      const hint = opts?.hint ? ` ${opts.hint}` : '';
      const answer = await question(`  ${label}${defaultDisplay}${hint}: `);
      const trimmed = answer.trim();
      return trimmed || opts?.default || '';
    },

    async select(label, options, defaultIndex = 0) {
      const defaultDisplay = ` [${defaultIndex + 1}]`;
      const defaultOpt = options[defaultIndex];
      process.stderr.write(`  ${label}${defaultDisplay}:\n`);
      for (let i = 0; i < options.length; i++) {
        const opt = options[i];
        if (!opt) continue;
        const hint = opt.hint ? ` — ${opt.hint}` : '';
        process.stderr.write(`    ${i + 1}. ${opt.label}${hint}\n`);
      }
      const answer = await question('  > ');
      const trimmed = answer.trim();

      if (!trimmed) {
        return defaultOpt?.value ?? '';
      }

      const num = Number.parseInt(trimmed, 10);
      if (Number.isNaN(num) || num < 1 || num > options.length) {
        process.stderr.write(`  Invalid selection. Using default: ${defaultOpt?.label}\n`);
        return defaultOpt?.value ?? '';
      }
      return options[num - 1]?.value ?? '';
    },

    close() {
      rl.removeAllListeners('close');
      rl.close();
    },
  };
}
