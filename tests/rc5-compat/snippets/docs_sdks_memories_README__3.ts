// Source: docs/sdks/memories/README.md @ 4d5333e (block 3)
import { SupermemoryCore } from "supermemory/core.js";
import { memoriesForgetMatching } from "supermemory/funcs/memories-forget-matching.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await memoriesForgetMatching(supermemory, {
    namespace: "user_alex",
    body: {
      query: "everything about the old pricing plans",
      dryRun: true,
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("memoriesForgetMatching failed:", res.error);
  }
}

run();

export {};
