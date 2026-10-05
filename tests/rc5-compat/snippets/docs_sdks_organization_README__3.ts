// Source: docs/sdks/organization/README.md @ 4d5333e (block 3)
import { SupermemoryCore } from "supermemory/core.js";
import { organizationUpdate } from "supermemory/funcs/organization-update.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await organizationUpdate(supermemory, {
    organizationalContext: "Acme Corp builds developer tools for startups.",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("organizationUpdate failed:", res.error);
  }
}

run();

export {};
