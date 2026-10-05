// Source: docs/sdks/namespaces/README.md @ 4d5333e (block 4)
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.namespaces.update({
    namespace: "user_alex",
    body: {
      supportingContext: "This namespace holds Acme Corp support tickets.",
    },
  });

  console.log(result);
}

run();

export {};
