// Source: docs/sdks/supermemory/README.md @ 4d5333e (block 6)
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.list({
    namespace: "user_alex",
    type: "memories",
    page: 1,
    limit: 10,
    sort: "createdAt",
  });

  console.log(result);
}

run();

export {};
