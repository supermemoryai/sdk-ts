// dist/cjs is CommonJS while the package root is "type": "module".
await Bun.write("dist/cjs/package.json", JSON.stringify({ type: "commonjs" }) + "\n");
