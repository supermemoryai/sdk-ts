// Source: MIGRATION.md @ 4d5333e (block 7)
import { Supermemory } from "supermemory";
declare const apiKey: any;
declare const request: any; // prelude: names from earlier doc blocks
const client = new Supermemory({ apiKey, timeoutMs: 30_000 });
await client.add(request, { timeoutMs: 5_000 });

export {};
