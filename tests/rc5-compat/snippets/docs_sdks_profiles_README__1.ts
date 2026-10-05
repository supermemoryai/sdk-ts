// Source: docs/sdks/profiles/README.md @ 4d5333e (block 1)
import { SupermemoryCore } from "supermemory/core.js";
import { profilesGetBuckets } from "supermemory/funcs/profiles-get-buckets.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await profilesGetBuckets(supermemory, {
    namespace: "user_alex",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("profilesGetBuckets failed:", res.error);
  }
}

run();

export {};
