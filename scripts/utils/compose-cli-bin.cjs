#!/usr/bin/env node

const fs = require('node:fs');

const [templatePath, cliBundlePath, outputPath] = process.argv.slice(2);

if (!templatePath || !cliBundlePath || !outputPath) {
  console.error('usage: compose-cli-bin <template> <cli-bundle> <output>');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');
const cliBundle = fs.readFileSync(cliBundlePath, 'utf8');
const marker = '\nvar __create = Object.create;';
const markerIndex = template.indexOf(marker);

if (markerIndex === -1) {
  throw new Error(`Could not find bundled CLI marker in ${templatePath}`);
}

const localLauncher = template.slice(0, markerIndex).trimEnd();
const cliWithoutShebang = cliBundle.replace(/^#!.*\r?\n/, '').trimStart();

fs.writeFileSync(outputPath, `${localLauncher}\n${cliWithoutShebang}`, 'utf8');
fs.chmodSync(outputPath, 0o755);
