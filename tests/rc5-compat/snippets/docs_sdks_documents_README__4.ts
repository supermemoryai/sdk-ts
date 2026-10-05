// Source: docs/sdks/documents/README.md @ 4d5333e (block 4)
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.documents.get({
    namespace: "user_alex",
    id: "my-doc-123",
  });

  console.log(result);
}

run();

export {};
