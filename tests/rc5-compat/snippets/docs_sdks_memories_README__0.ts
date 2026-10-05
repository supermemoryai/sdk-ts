// Source: docs/sdks/memories/README.md @ 4d5333e (block 0)
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.memories.forget({
    namespace: "user_alex",
    body: {
      ids: [
        "mem_abc123",
      ],
    },
  });

  console.log(result);
}

run();

export {};
