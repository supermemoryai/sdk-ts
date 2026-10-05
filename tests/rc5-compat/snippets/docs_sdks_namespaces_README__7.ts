// Source: docs/sdks/namespaces/README.md @ 4d5333e (block 7)
import { SupermemoryCore } from "supermemory/core.js";
import { namespacesDelete } from "supermemory/funcs/namespaces-delete.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await namespacesDelete(supermemory, {
    namespace: "user_alex",
    body: {
      moveTo: "project_archive",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("namespacesDelete failed:", res.error);
  }
}

run();

export {};
