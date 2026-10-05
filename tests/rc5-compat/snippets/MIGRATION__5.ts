// Source: MIGRATION.md @ 4d5333e (block 5)
declare const client: Supermemory; // prelude: names from earlier doc blocks
// v4
import Supermemory from "supermemory";
try {
  await client.search.memories({ q: "..." });
} catch (err) {
  if (err instanceof Supermemory.RateLimitError) { /* back off */ }
}

// v5
import { SupermemoryError } from "supermemory/models/errors";
try {
  await client.search({ namespace: "user_alex", body: { query: "..." } });
} catch (err) {
  if (err instanceof SupermemoryError) {
    err.statusCode;   // e.g. 429
    err.body;         // raw body text
    err.rawResponse;  // the fetch Response
  }
}

export {};
