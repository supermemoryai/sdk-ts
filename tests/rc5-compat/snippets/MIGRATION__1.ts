// Source: MIGRATION.md @ 4d5333e (block 1)
import { Supermemory } from "supermemory"; // prelude: names from earlier doc blocks
const client = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"], // still the default env var
});

export {};
