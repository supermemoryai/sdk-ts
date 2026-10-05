// Source: docs/sdks/organization/README.md @ 4d5333e (block 2)
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.organization.update({
    organizationalContext: "Acme Corp builds developer tools for startups.",
  });

  console.log(result);
}

run();

export {};
