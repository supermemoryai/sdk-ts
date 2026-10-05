// Source: docs/sdks/profiles/README.md @ 4d5333e (block 4)
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.profiles.deleteBuckets({
    namespace: "user_alex",
    body: {
      buckets: [
        "interests",
      ],
    },
  });

  console.log(result);
}

run();

export {};
