// Source: docs/sdks/organization/README.md @ 4d5333e (block 0)
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.organization.get();

  console.log(result);
}

run();

export {};
