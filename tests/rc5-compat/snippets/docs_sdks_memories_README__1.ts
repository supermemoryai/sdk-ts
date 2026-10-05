// Source: docs/sdks/memories/README.md @ 4d5333e (block 1)
import { SupermemoryCore } from "supermemory/core.js";
import { memoriesForget } from "supermemory/funcs/memories-forget.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await memoriesForget(supermemory, {
    namespace: "user_alex",
    body: {
      ids: [
        "mem_abc123",
      ],
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("memoriesForget failed:", res.error);
  }
}

run();

export {};
