// Source: docs/sdks/supermemory/README.md @ 4d5333e (block 3)
import { SupermemoryCore } from "supermemory/core.js";
import { search } from "supermemory/funcs/search.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await search(supermemory, {
    namespace: "user_alex",
    body: {
      query: "what are the API rate limits",
      threshold: 0.5,
      rerank: "order",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("search failed:", res.error);
  }
}

run();

export {};
