// Source: README.md @ 4d5333e (block 2)
import { openAsBlob } from "node:fs";
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.documents.uploadFile({
    namespace: "user_alex",
    body: {
      file: await openAsBlob("example.file"),
      supportingContext: "Focus on product decisions, dates, and owners.",
      date: "2026-01-15",
    },
  });

  console.log(result);
}

run();


export {};
