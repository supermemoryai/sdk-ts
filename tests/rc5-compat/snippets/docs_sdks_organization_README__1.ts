// Source: docs/sdks/organization/README.md @ 4d5333e (block 1)
import { SupermemoryCore } from "supermemory/core.js";
import { organizationGet } from "supermemory/funcs/organization-get.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await organizationGet(supermemory);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("organizationGet failed:", res.error);
  }
}

run();

export {};
