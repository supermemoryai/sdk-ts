// Source: README.md @ 4d5333e (block 5)
import { Supermemory } from "supermemory";
import * as errors from "supermemory/models/errors";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  try {
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
  } catch (error) {
    // The base class for HTTP error responses
    if (error instanceof errors.SupermemoryError) {
      console.log(error.message);
      console.log(error.statusCode);
      console.log(error.body);
      console.log(error.headers);

      // Depending on the method different errors may be thrown
      if (error instanceof errors.ErrorResponse) {
        console.log(error.data$.error); // string
        console.log(error.data$.details); // string
      }
    }
  }
}

run();


export {};
