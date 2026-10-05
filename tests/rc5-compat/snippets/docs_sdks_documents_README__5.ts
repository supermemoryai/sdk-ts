// Source: docs/sdks/documents/README.md @ 4d5333e (block 5)
import { SupermemoryCore } from "supermemory/core.js";
import { documentsGet } from "supermemory/funcs/documents-get.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await documentsGet(supermemory, {
    namespace: "user_alex",
    id: "my-doc-123",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("documentsGet failed:", res.error);
  }
}

run();

export {};
