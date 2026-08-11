<!-- Start SDK Example Usage [usage] -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  bearerAuth: process.env["SUPERMEMORY_BEARER_AUTH"] ?? "",
});

async function run() {
  const result = await supermemory.ingest.addDocument({
    content: "<value>",
  });

  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->