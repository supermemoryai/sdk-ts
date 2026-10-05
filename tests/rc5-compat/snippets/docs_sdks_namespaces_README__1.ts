// Source: docs/sdks/namespaces/README.md @ 4d5333e (block 1)
import { SupermemoryCore } from "supermemory/core.js";
import { namespacesList } from "supermemory/funcs/namespaces-list.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await namespacesList(supermemory);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("namespacesList failed:", res.error);
  }
}

run();

export {};
