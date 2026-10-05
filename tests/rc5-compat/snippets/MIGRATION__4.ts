// Source: MIGRATION.md @ 4d5333e (block 4)
import { Supermemory } from "supermemory";
declare const client: Supermemory; // prelude: names from earlier doc blocks
const namespaces = ["user_alex", "team_design"];
const responses = await Promise.all(
  namespaces.map((namespace) =>
    client.search({ namespace, body: { query: "roadmap" } }),
  ),
);
const results = responses.flatMap((r) => r.results);

export {};
