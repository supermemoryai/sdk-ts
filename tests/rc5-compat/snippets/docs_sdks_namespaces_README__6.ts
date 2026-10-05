// Source: docs/sdks/namespaces/README.md @ 4d5333e (block 6)
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.namespaces.delete({
    namespace: "user_alex",
    body: {
      moveTo: "project_archive",
    },
  });

  console.log(result);
}

run();

export {};
