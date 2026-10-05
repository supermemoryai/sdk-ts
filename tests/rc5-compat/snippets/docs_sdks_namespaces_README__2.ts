// Source: docs/sdks/namespaces/README.md @ 4d5333e (block 2)
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.namespaces.get({
    namespace: "user_alex",
  });

  console.log(result);
}

run();

export {};
