<!-- Start SDK Example Usage [usage] -->
```typescript
import { Supermemory } from "supermemory";

const supermemory = new Supermemory({
  apiKey: process.env["SUPERMEMORY_API_KEY"] ?? "",
});

async function run() {
  const result = await supermemory.add({
    content: "<value>",
  });

  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->