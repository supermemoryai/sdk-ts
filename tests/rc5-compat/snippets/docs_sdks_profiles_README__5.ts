// Source: docs/sdks/profiles/README.md @ 4d5333e (block 5)
import { SupermemoryCore } from "supermemory/core.js";
import { profilesDeleteBuckets } from "supermemory/funcs/profiles-delete-buckets.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await profilesDeleteBuckets(supermemory, {
    namespace: "user_alex",
    body: {
      buckets: [
        "interests",
      ],
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("profilesDeleteBuckets failed:", res.error);
  }
}

run();

export {};
