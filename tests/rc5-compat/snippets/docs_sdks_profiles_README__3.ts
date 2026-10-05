// Source: docs/sdks/profiles/README.md @ 4d5333e (block 3)
import { SupermemoryCore } from "supermemory/core.js";
import { profilesSetBuckets } from "supermemory/funcs/profiles-set-buckets.js";

// Use `SupermemoryCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const supermemory = new SupermemoryCore({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const res = await profilesSetBuckets(supermemory, {
    namespace: "user_alex",
    body: {
      buckets: {
        "interests": "Topics the subject actively follows",
      },
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("profilesSetBuckets failed:", res.error);
  }
}

run();

export {};
