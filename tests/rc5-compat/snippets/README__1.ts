// Source: README.md @ 4d5333e (block 1)
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.add({
    namespace: "user_alex",
    body: {
      content: "Supermemory turns unstructured content into evolving memory.",
      id: "my-doc-123",
      supportingContext: "Focus on product decisions, dates, and owners.",
      metadata: {
        "source": "api-docs",
      },
      date: "2026-01-15",
    },
  });

  console.log(result);
}

run();


export {};
