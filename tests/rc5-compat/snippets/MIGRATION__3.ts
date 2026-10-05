// Source: MIGRATION.md @ 4d5333e (block 3)
import { Supermemory } from "supermemory";
declare const client: Supermemory; // prelude: names from earlier doc blocks
const [{ profile }, { results }] = await Promise.all([
  client.profile({ namespace: "user_alex" }),
  client.search({ namespace: "user_alex", body: { query: "upcoming meetings" } }),
]);

export {};
