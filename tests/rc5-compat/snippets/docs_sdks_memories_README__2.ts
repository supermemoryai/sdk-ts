// Source: docs/sdks/memories/README.md @ 4d5333e (block 2)
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.memories.forgetMatching({
    namespace: "user_alex",
    body: {
      query: "everything about the old pricing plans",
      dryRun: true,
    },
  });

  console.log(result);
}

run();

export {};
