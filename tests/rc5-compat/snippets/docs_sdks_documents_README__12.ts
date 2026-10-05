// Source: docs/sdks/documents/README.md @ 4d5333e (block 12)
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.documents.updateFile({
    namespace: "user_alex",
    id: "my-doc-123",
    body: {
      supportingContext: "Focus on product decisions, dates, and owners.",
      date: "2026-01-15",
    },
  });

  console.log(result);
}

run();

export {};
