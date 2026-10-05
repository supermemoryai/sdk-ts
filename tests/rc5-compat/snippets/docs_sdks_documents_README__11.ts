// Source: docs/sdks/documents/README.md @ 4d5333e (block 11)
import { openAsBlob } from "node:fs";
import { SupermemoryCore } from "supermemory/core.js";
import { documentsReplaceWithFile } from "supermemory/funcs/documents-replace-with-file.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await documentsReplaceWithFile(supermemory, {
    namespace: "user_alex",
    id: "my-doc-123",
    body: {
      file: await openAsBlob("example.file"),
      supportingContext: "Focus on product decisions, dates, and owners.",
      date: "2026-01-15",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("documentsReplaceWithFile failed:", res.error);
  }
}

run();

export {};
