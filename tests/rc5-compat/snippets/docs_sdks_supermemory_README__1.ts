// Source: docs/sdks/supermemory/README.md @ 4d5333e (block 1)
import { Supermemory } from "supermemory"; // prelude: names from earlier doc blocks
import { SupermemoryCore } from "supermemory/core.js";
import { add } from "supermemory/funcs/add.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await add(supermemory, {
    namespace: "user_alex",
    body: {
      content: "Supermemory turns unstructured content into evolving memory.",
      id: "my-doc-123",
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
    console.log("add failed:", res.error);
  }
}

run();

export {};
