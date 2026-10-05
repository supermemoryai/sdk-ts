// Source: docs/sdks/supermemory/README.md @ 4d5333e (block 7)
import { SupermemoryCore } from "supermemory/core.js";
import { list } from "supermemory/funcs/list.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await list(supermemory, {
    namespace: "user_alex",
    type: "memories",
    page: 1,
    limit: 10,
    sort: "createdAt",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("list failed:", res.error);
  }
}

run();

export {};
