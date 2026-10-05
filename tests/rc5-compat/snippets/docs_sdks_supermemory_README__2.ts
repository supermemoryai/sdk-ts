// Source: docs/sdks/supermemory/README.md @ 4d5333e (block 2)
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.search({
    namespace: "user_alex",
    body: {
      query: "what are the API rate limits",
      threshold: 0.5,
      rerank: "order",
    },
  });

  console.log(result);
}

run();

export {};
