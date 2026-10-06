# PostNsByNamespaceConnectorsRequestBody


## Supported Types

### `operations.Notion`

```typescript
const value: operations.Notion = {
  provider: "notion",
};
```

### `operations.Gmail`

```typescript
const value: operations.Gmail = {
  provider: "gmail",
};
```

### `operations.Onedrive`

```typescript
const value: operations.Onedrive = {
  provider: "onedrive",
};
```

### `operations.Github`

```typescript
const value: operations.Github = {
  provider: "github",
};
```

### `operations.GoogleDrive`

```typescript
const value: operations.GoogleDrive = {
  provider: "google-drive",
};
```

### `operations.S3`

```typescript
const value: operations.S3 = {
  provider: "s3",
  config: {
    bucket: "<value>",
    region: "<value>",
    accessKeyId: "<id>",
    secretAccessKey: "<value>",
  },
};
```

### `operations.WebCrawler`

```typescript
const value: operations.WebCrawler = {
  provider: "web-crawler",
  config: {
    startUrl: "https://limp-longboat.com",
  },
};
```

### `operations.Granola`

```typescript
const value: operations.Granola = {
  provider: "granola",
  config: {
    apiKey: "<value>",
  },
};
```

