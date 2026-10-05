// Source: docs/sdks/namespaces/README.md @ 4d5333e (block 3)
import { SupermemoryCore } from "supermemory/core.js";
import { namespacesGet } from "supermemory/funcs/namespaces-get.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await namespacesGet(supermemory, {
    namespace: "user_alex",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("namespacesGet failed:", res.error);
  }
}

run();

export {};
