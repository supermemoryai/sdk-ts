// Source: MIGRATION.md @ 4d5333e (block 2)
import { Supermemory } from "supermemory";
declare const client: Supermemory; // prelude: names from earlier doc blocks
await client.add({
  namespace: "user_alex",
  body: { content: "Alex prefers morning meetings.", id: "pref-1" },
});

const { results } = await client.search({
  namespace: "user_alex",
  limit: 5,
  body: { query: "when does alex like to meet?" },
});

export {};
