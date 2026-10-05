// Source: MIGRATION.md @ 4d5333e (block 6)
import { Supermemory } from "supermemory"; // prelude: names from earlier doc blocks
const client = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"],
  retryConfig: {
    strategy: "backoff",
    backoff: { initialInterval: 500, maxInterval: 60000, exponent: 1.5, maxElapsedTime: 3600000 },
    retryConnectionErrors: true,
  },
});

export {};
