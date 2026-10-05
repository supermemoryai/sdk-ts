// Source: docs/sdks/namespaces/README.md @ 4d5333e (block 5)
import { SupermemoryCore } from "supermemory/core.js";
import { namespacesUpdate } from "supermemory/funcs/namespaces-update.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await namespacesUpdate(supermemory, {
    namespace: "user_alex",
    body: {
      supportingContext: "This namespace holds Acme Corp support tickets.",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("namespacesUpdate failed:", res.error);
  }
}

run();

export {};
