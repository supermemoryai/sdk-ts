// Source: docs/sdks/documents/README.md @ 4d5333e (block 7)
import { Supermemory } from "supermemory"; // prelude: names from earlier doc blocks
import { SupermemoryCore } from "supermemory/core.js";
import { documentsUpdate } from "supermemory/funcs/documents-update.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await documentsUpdate(supermemory, {
    namespace: "user_alex",
    id: "my-doc-123",
    body: {
      content: "Supermemory turns unstructured content into evolving memory.",
      supportingContext: "Focus on product decisions, dates, and owners.",
      metadata: {
        "source": "api-docs",
      },
      date: "2026-01-15",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("documentsUpdate failed:", res.error);
  }
}

run();

export {};
