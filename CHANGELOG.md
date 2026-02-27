# Changelog

## 4.15.0 (2026-02-27)

Full Changelog: [v4.14.0...v4.15.0](https://github.com/supermemoryai/sdk-ts/compare/v4.14.0...v4.15.0)

### Features

* **mcp:** add an option to disable code tool ([4cdbe34](https://github.com/supermemoryai/sdk-ts/commit/4cdbe341d1dcfcc35f4c38d8a14e99590e48ff82))


### Bug Fixes

* **mcp:** update prompt ([fd8d956](https://github.com/supermemoryai/sdk-ts/commit/fd8d95644beb2cdbfec34c0d2ef8959377f4b269))


### Chores

* **internal:** fix MCP Dockerfiles so they can be built without buildkit ([fb7d1f6](https://github.com/supermemoryai/sdk-ts/commit/fb7d1f6106de40ff1d85cbe1b0a502b1e0fbacab))
* **internal:** fix MCP Dockerfiles so they can be built without buildkit ([1dd35ca](https://github.com/supermemoryai/sdk-ts/commit/1dd35ca9fc12fa1521f9dac23fc658bee9f4424a))
* **internal:** make MCP code execution location configurable via a flag ([11d9837](https://github.com/supermemoryai/sdk-ts/commit/11d983754ecdcd3e480cf7929c83a15325ff06ad))
* **internal:** move stringifyQuery implementation to internal function ([824e718](https://github.com/supermemoryai/sdk-ts/commit/824e71821992f1fe4ed5f79056b985991276b6d4))

## 4.14.0 (2026-02-24)

Full Changelog: [v4.13.0...v4.14.0](https://github.com/supermemoryai/sdk-ts/compare/v4.13.0...v4.14.0)

### Features

* **api:** api update ([361f385](https://github.com/supermemoryai/sdk-ts/commit/361f38572e0f8659f895a665e144bd3fa7a4f46a))


### Bug Fixes

* **docs/contributing:** correct pnpm link command ([e0c46ad](https://github.com/supermemoryai/sdk-ts/commit/e0c46add9a36d704020ef3fffd08c385e8c4c170))


### Chores

* **internal:** upgrade @modelcontextprotocol/sdk and hono ([57a4564](https://github.com/supermemoryai/sdk-ts/commit/57a4564c65ce3b0284818b34ed8c3df3d16ddffa))

## 4.13.0 (2026-02-20)

Full Changelog: [v4.12.0...v4.13.0](https://github.com/supermemoryai/sdk-ts/compare/v4.12.0...v4.13.0)

### Features

* **api:** api update ([c2bd0a4](https://github.com/supermemoryai/sdk-ts/commit/c2bd0a47042f73f33fe17faaf1900fced7f52e68))


### Bug Fixes

* **mcp:** initialize SDK lazily to avoid failing the connection on init errors ([429e1d7](https://github.com/supermemoryai/sdk-ts/commit/429e1d77d941ea2fa593fb0281c58e77df301387))


### Chores

* **internal:** cache fetch instruction calls in MCP server ([96bdbba](https://github.com/supermemoryai/sdk-ts/commit/96bdbba9d1c268d7a359eff759626ca0350df271))
* **internal:** remove mock server code ([2278d8f](https://github.com/supermemoryai/sdk-ts/commit/2278d8f7467418cd1c3eb9a033e915af2226bc2e))
* **mcp:** correctly update version in sync with sdk ([ce85b9d](https://github.com/supermemoryai/sdk-ts/commit/ce85b9d52c8bfdb67377e593d1b585ed42c121d5))
* update mock server docs ([c7cb202](https://github.com/supermemoryai/sdk-ts/commit/c7cb2024498b6874b188e411ecf71b554082684c))

## 4.12.0 (2026-02-18)

Full Changelog: [v4.11.1...v4.12.0](https://github.com/supermemoryai/sdk-ts/compare/v4.11.1...v4.12.0)

### Features

* **api:** api update ([e9d22b1](https://github.com/supermemoryai/sdk-ts/commit/e9d22b19b3f7eaca0313a03e27a3dca721cba319))


### Chores

* **internal/client:** fix form-urlencoded requests ([28e9418](https://github.com/supermemoryai/sdk-ts/commit/28e9418ebe6b87399d6ff869c98a9fb0eb708095))
* **internal:** allow setting x-stainless-api-key header on mcp server requests ([9ca6413](https://github.com/supermemoryai/sdk-ts/commit/9ca641384c4f8c8da3220cf0973d19305105a262))
* **internal:** avoid type checking errors with ts-reset ([c702b36](https://github.com/supermemoryai/sdk-ts/commit/c702b36141ed73117ce24d4d0527a033f2cda2a8))
* **internal:** improve layout of generated MCP server files ([7210253](https://github.com/supermemoryai/sdk-ts/commit/7210253af774936bb6feb92c5103b7e847f073f1))
* **mcp:** forward STAINLESS_API_KEY to docs search endpoint ([61b2b64](https://github.com/supermemoryai/sdk-ts/commit/61b2b64d5c5d932766e23b63654ca23f246e7925))

## 4.11.1 (2026-02-10)

Full Changelog: [v4.11.0...v4.11.1](https://github.com/supermemoryai/sdk-ts/compare/v4.11.0...v4.11.1)

### Chores

* **internal:** allow basic filtering of methods allowed for MCP code mode ([602094d](https://github.com/supermemoryai/sdk-ts/commit/602094d9fb17fe7dbf081279371f2cac00524464))
* **internal:** always generate MCP server dockerfiles and upgrade associated dependencies ([b6b4ef0](https://github.com/supermemoryai/sdk-ts/commit/b6b4ef0eff3ca5b2c675488e33d048d7470a72b2))

## 4.11.0 (2026-02-09)

Full Changelog: [v4.10.0...v4.11.0](https://github.com/supermemoryai/sdk-ts/compare/v4.10.0...v4.11.0)

### Features

* **api:** api update ([6c5198a](https://github.com/supermemoryai/sdk-ts/commit/6c5198a1c96cf0158d8ab7c8356537f53557911a))

## 4.10.0 (2026-02-09)

Full Changelog: [v4.9.1...v4.10.0](https://github.com/supermemoryai/sdk-ts/compare/v4.9.1...v4.10.0)

### Features

* **api:** api update ([56795da](https://github.com/supermemoryai/sdk-ts/commit/56795dab5050705ac84772bbc201d5b334d4ec9d))


### Chores

* **internal:** add health check to MCP server when running in HTTP mode ([57ae83b](https://github.com/supermemoryai/sdk-ts/commit/57ae83bcab580f996479abc267fe97bc9633c60a))

## 4.9.1 (2026-02-06)

Full Changelog: [v4.9.0...v4.9.1](https://github.com/supermemoryai/sdk-ts/compare/v4.9.0...v4.9.1)

### Bug Fixes

* **client:** avoid removing abort listener too early ([d3af18e](https://github.com/supermemoryai/sdk-ts/commit/d3af18e05bbcc085d7fef21dace557bf07011c7b))

## 4.9.0 (2026-02-05)

Full Changelog: [v4.8.0...v4.9.0](https://github.com/supermemoryai/sdk-ts/compare/v4.8.0...v4.9.0)

### Features

* **api:** manual updates ([7e95e85](https://github.com/supermemoryai/sdk-ts/commit/7e95e854a98cc37ef408013ad3320246dffa557f))
* **mcp:** add initial server instructions ([25f77f5](https://github.com/supermemoryai/sdk-ts/commit/25f77f5f76914ee6d35bfa9593850fabdb26e83c))


### Chores

* **client:** restructure abort controller binding ([801654c](https://github.com/supermemoryai/sdk-ts/commit/801654cf7725cdcb832ac6f1a480ebdf3c8a497c))
* **internal:** refactor flag parsing for MCP servers and add debug flag ([2acc011](https://github.com/supermemoryai/sdk-ts/commit/2acc0115d5c8aa942aae6d31330159b19c508f47))

## 4.8.0 (2026-02-03)

Full Changelog: [v4.7.3...v4.8.0](https://github.com/supermemoryai/sdk-ts/compare/v4.7.3...v4.8.0)

### Features

* **api:** api update ([5bc2867](https://github.com/supermemoryai/sdk-ts/commit/5bc28670e95e942064a5888af86495bb02dd0489))

## 4.7.3 (2026-02-03)

Full Changelog: [v4.7.2...v4.7.3](https://github.com/supermemoryai/sdk-ts/compare/v4.7.2...v4.7.3)

### Bug Fixes

* **client:** avoid memory leak with abort signals ([8101444](https://github.com/supermemoryai/sdk-ts/commit/8101444e17a7a57efd87ac16695f21450a5f4a63))


### Chores

* **client:** do not parse responses with empty content-length ([947bb74](https://github.com/supermemoryai/sdk-ts/commit/947bb74e4a67395b0ba00c8c6078e1dede646714))
* **internal:** support oauth authorization code flow for MCP servers ([50baa3b](https://github.com/supermemoryai/sdk-ts/commit/50baa3b528d002f6a66b292076741890edbbd5fa))

## 4.7.2 (2026-01-29)

Full Changelog: [v4.7.1...v4.7.2](https://github.com/supermemoryai/sdk-ts/compare/v4.7.1...v4.7.2)

### Bug Fixes

* **docs:** fix mcp installation instructions for remote servers ([b255909](https://github.com/supermemoryai/sdk-ts/commit/b255909973db43112fd4d70b03fa97999babf257))


### Chores

* **mcp:** up tsconfig lib version to es2022 ([6024829](https://github.com/supermemoryai/sdk-ts/commit/6024829469e1d106bf675e0a964d64985ecc4fe4))

## 4.7.1 (2026-01-28)

Full Changelog: [v4.7.0...v4.7.1](https://github.com/supermemoryai/sdk-ts/compare/v4.7.0...v4.7.1)

### Bug Fixes

* **mcp:** allow falling back for required env variables ([0ebb99e](https://github.com/supermemoryai/sdk-ts/commit/0ebb99e76e47aa1167c7b212b2760952cd40dabb))


### Chores

* **ci:** upgrade `actions/github-script` ([43e0edb](https://github.com/supermemoryai/sdk-ts/commit/43e0edbad55853b6da58453af046d5e8bc28728a))
* **internal:** codegen related update ([26d72d7](https://github.com/supermemoryai/sdk-ts/commit/26d72d7175ee0a85262cbed7d66086886775a13e))
* **internal:** update lock file ([e7f670f](https://github.com/supermemoryai/sdk-ts/commit/e7f670fc44d6149fa9d725cf9adfe0d9e88b8be0))

## 4.7.0 (2026-01-20)

Full Changelog: [v4.6.0...v4.7.0](https://github.com/supermemoryai/sdk-ts/compare/v4.6.0...v4.7.0)

### Features

* **api:** api update ([89f0158](https://github.com/supermemoryai/sdk-ts/commit/89f01589ccb9c856796ad1326204ab66042cc287))
* **api:** api update ([4300e3f](https://github.com/supermemoryai/sdk-ts/commit/4300e3f07df8c10b544284ddc64b8f5a2e4042b1))


### Chores

* **internal:** update `actions/checkout` version ([05d0b84](https://github.com/supermemoryai/sdk-ts/commit/05d0b84e2ab2386e15d6e0777d64148dc8800b7d))
* **internal:** upgrade babel, qs, js-yaml ([7f8ba56](https://github.com/supermemoryai/sdk-ts/commit/7f8ba56b29453a91d0ca9b01c9713fdf7b895f70))
* **mcp:** add intent param to execute tool ([3893f67](https://github.com/supermemoryai/sdk-ts/commit/3893f671d06249296e87e6f393533731219ac5c8))
* **mcp:** pass intent param to execute handler ([d494071](https://github.com/supermemoryai/sdk-ts/commit/d4940710acaf7ed763eb37085179ec7b3842f806))
* **mcp:** upgrade dependencies ([bea7474](https://github.com/supermemoryai/sdk-ts/commit/bea7474bc438382c861d7cd68ecc506a78512868))

## 4.6.0 (2026-01-14)

Full Changelog: [v4.5.0...v4.6.0](https://github.com/supermemoryai/sdk-ts/compare/v4.5.0...v4.6.0)

### Features

* **api:** api update ([b76de5a](https://github.com/supermemoryai/sdk-ts/commit/b76de5a247e156836990a5c378390e7b86363e67))

## 4.5.0 (2026-01-13)

Full Changelog: [v4.4.0...v4.5.0](https://github.com/supermemoryai/sdk-ts/compare/v4.4.0...v4.5.0)

### Features

* **api:** api update ([a6a6b1d](https://github.com/supermemoryai/sdk-ts/commit/a6a6b1d3a594ef7cbdf5179995ea4efddde6203b))


### Chores

* **internal:** codegen related update ([7c4f9fc](https://github.com/supermemoryai/sdk-ts/commit/7c4f9fce0f8a577e196047b92d76928246ea6a76))
* **internal:** codegen related update ([7608a0d](https://github.com/supermemoryai/sdk-ts/commit/7608a0deed44c7b19451a2cff4d356a6be030bfb))
* **internal:** codegen related update ([9a21ecf](https://github.com/supermemoryai/sdk-ts/commit/9a21ecf17922345cbb7882d20f5a5aec98d76054))
* **internal:** codegen related update ([fc20b52](https://github.com/supermemoryai/sdk-ts/commit/fc20b5203a580abaf2f8cd8be915d65317bf9df4))
* **internal:** configure MCP Server hosting ([2c80d1b](https://github.com/supermemoryai/sdk-ts/commit/2c80d1baee22fe219a7a0476eb481b73f0a8f1e4))

## 4.4.0 (2026-01-09)

Full Changelog: [v4.3.0...v4.4.0](https://github.com/supermemoryai/sdk-ts/compare/v4.3.0...v4.4.0)

### Features

* **api:** api update ([6a21df5](https://github.com/supermemoryai/sdk-ts/commit/6a21df5f5367cadc608d3b63609f3e345755ca34))


### Bug Fixes

* **mcp:** update code tool prompt ([acc57ff](https://github.com/supermemoryai/sdk-ts/commit/acc57ff48332f84a7e3789aed36a30a95360d88c))

## 4.3.0 (2026-01-09)

Full Changelog: [v4.2.3...v4.3.0](https://github.com/supermemoryai/sdk-ts/compare/v4.2.3...v4.3.0)

### Features

* **api:** api update ([440a3c4](https://github.com/supermemoryai/sdk-ts/commit/440a3c4a47589d0bb420bac8df7628c8efd58f82))
* **api:** api update ([c4c787f](https://github.com/supermemoryai/sdk-ts/commit/c4c787fa689962360f27477ba3f08a5a9be5efc2))

## 4.2.3 (2026-01-08)

Full Changelog: [v4.2.2...v4.2.3](https://github.com/supermemoryai/sdk-ts/compare/v4.2.2...v4.2.3)

### Bug Fixes

* **mcp:** fix env parsing ([31952f5](https://github.com/supermemoryai/sdk-ts/commit/31952f541aa02a1e698ef4a4613520a36488246c))

## 4.2.2 (2026-01-07)

Full Changelog: [v4.2.1...v4.2.2](https://github.com/supermemoryai/sdk-ts/compare/v4.2.1...v4.2.2)

### Bug Fixes

* **mcp:** fix options parsing ([b42d492](https://github.com/supermemoryai/sdk-ts/commit/b42d492d4061fa640d7720811954a2cfcaa1183e))


### Chores

* break long lines in snippets into multiline ([55593b3](https://github.com/supermemoryai/sdk-ts/commit/55593b38961a3892294a4c091c7bb77fd095ac89))

## 4.2.1 (2026-01-06)

Full Changelog: [v4.2.0...v4.2.1](https://github.com/supermemoryai/sdk-ts/compare/v4.2.0...v4.2.1)

### Bug Fixes

* **mcp:** correct code tool api output types ([328783f](https://github.com/supermemoryai/sdk-ts/commit/328783f4d00616393c654d7c840feb5a9caa5349))


### Documentation

* prominently feature MCP server setup in root SDK readmes ([e8ec001](https://github.com/supermemoryai/sdk-ts/commit/e8ec00148502cf41b209a83cd4db7d69ee61d128))

## 4.2.0 (2026-01-05)

Full Changelog: [v4.1.0...v4.2.0](https://github.com/supermemoryai/sdk-ts/compare/v4.1.0...v4.2.0)

### Features

* **api:** api update ([2cec205](https://github.com/supermemoryai/sdk-ts/commit/2cec205c2a0fa70cc6544974a6b869d6e978a244))

## 4.1.0 (2025-12-29)

Full Changelog: [v4.0.0...v4.1.0](https://github.com/supermemoryai/sdk-ts/compare/v4.0.0...v4.1.0)

### Features

* **api:** api update ([983ca0b](https://github.com/supermemoryai/sdk-ts/commit/983ca0b89e73272d3f9c25bf2272494b62742de7))

## 4.0.0 (2025-12-19)

Full Changelog: [v3.14.0...v4.0.0](https://github.com/supermemoryai/sdk-ts/compare/v3.14.0...v4.0.0)

### Features

* **api:** api update ([536fb02](https://github.com/supermemoryai/sdk-ts/commit/536fb025735154191e186865b7cfa82521083e72))

## 3.14.0 (2025-12-10)

Full Changelog: [v3.13.0...v3.14.0](https://github.com/supermemoryai/sdk-ts/compare/v3.13.0...v3.14.0)

### Features

* **api:** api update ([fabea15](https://github.com/supermemoryai/sdk-ts/commit/fabea15835df16a52a8b8467f5057dd821e4fa1a))
* **api:** api update ([6fe2255](https://github.com/supermemoryai/sdk-ts/commit/6fe2255a233da702dd5c4541310c83b53bf0912f))
* **api:** manual updates ([74bf6a6](https://github.com/supermemoryai/sdk-ts/commit/74bf6a6fead3cda70c3a880e893018c0f2c5f3b4))
* **api:** manual updates ([fe02134](https://github.com/supermemoryai/sdk-ts/commit/fe0213486e3e411a5fdda356f36362f1fc2eb359))
* **api:** manual updates ([b81eda3](https://github.com/supermemoryai/sdk-ts/commit/b81eda3a90fc573a92cf7c9f3d976d8d4e510533))
* **api:** manual updates ([7f51e4e](https://github.com/supermemoryai/sdk-ts/commit/7f51e4e840e5e4d48be6ea4c69a976d1dd1e7731))

## 3.13.0 (2025-12-10)

Full Changelog: [v3.12.0...v3.13.0](https://github.com/supermemoryai/sdk-ts/compare/v3.12.0...v3.13.0)

### Features

* **api:** manual updates ([34c23ae](https://github.com/supermemoryai/sdk-ts/commit/34c23ae13e2383549177efd8c90aa77a1eadcf79))
* **api:** manual updates ([9aad9ba](https://github.com/supermemoryai/sdk-ts/commit/9aad9baac3a578a99eca1f1586da5425425a5943))

## 3.12.0 (2025-12-09)

Full Changelog: [v3.11.0...v3.12.0](https://github.com/supermemoryai/sdk-ts/compare/v3.11.0...v3.12.0)

### Features

* **api:** manual updates ([5db1034](https://github.com/supermemoryai/sdk-ts/commit/5db10341bce61eb4c14dfb2ea36cd7417dfc8681))

## 3.11.0 (2025-12-09)

Full Changelog: [v3.10.0...v3.11.0](https://github.com/supermemoryai/sdk-ts/compare/v3.10.0...v3.11.0)

### Features

* **api:** api update ([8b15b2e](https://github.com/supermemoryai/sdk-ts/commit/8b15b2e80480cb6c9ef674c38a87cad16917e0e7))


### Bug Fixes

* **mcp:** correct code tool API endpoint ([679b47d](https://github.com/supermemoryai/sdk-ts/commit/679b47dcc3a535a546e4175cc6b79969773107b2))
* **mcp:** return correct lines on typescript errors ([f299338](https://github.com/supermemoryai/sdk-ts/commit/f2993387c7301d20659fc87b49cc1df729df02cd))


### Chores

* **client:** fix logger property type ([17e3bd9](https://github.com/supermemoryai/sdk-ts/commit/17e3bd9e3348dcfd5db3c45e8704dafa560201f2))
* **internal:** codegen related update ([b739d2e](https://github.com/supermemoryai/sdk-ts/commit/b739d2e147344f28b39a9155da5f1e76343eb8a7))
* **internal:** codegen related update ([37449e3](https://github.com/supermemoryai/sdk-ts/commit/37449e3d4165770e88f804628c495a947c45c1ab))
* **internal:** upgrade eslint ([82765af](https://github.com/supermemoryai/sdk-ts/commit/82765afd1dc701528d2686d78bba12f82a586109))

## 3.10.0 (2025-11-27)

Full Changelog: [v3.9.0...v3.10.0](https://github.com/supermemoryai/sdk-ts/compare/v3.9.0...v3.10.0)

### Features

* **api:** api update ([856b654](https://github.com/supermemoryai/sdk-ts/commit/856b654ee6a36f157b6f3293a7e0cc111b38df2c))

## 3.9.0 (2025-11-26)

Full Changelog: [v3.8.0...v3.9.0](https://github.com/supermemoryai/sdk-ts/compare/v3.8.0...v3.9.0)

### Features

* **api:** manual updates ([940b068](https://github.com/supermemoryai/sdk-ts/commit/940b06806de3d609bb0801cce104b22f7033299d))
* **api:** manual updates ([ff15d92](https://github.com/supermemoryai/sdk-ts/commit/ff15d92b91ec2e7b6a199a2fd8d5370555e9b3b7))
* **api:** manual updates ([d02b088](https://github.com/supermemoryai/sdk-ts/commit/d02b08837dc74c91a630e61ee70409bab098782c))
* **api:** manual updates ([a31ae09](https://github.com/supermemoryai/sdk-ts/commit/a31ae09c27f09ed0b24536686c56d4b0386f38c1))
* **api:** manual updates ([5ff6ed1](https://github.com/supermemoryai/sdk-ts/commit/5ff6ed14d0a676cbe13a9b90555635bb6f973a8e))
* **api:** manual updates ([d4edc7f](https://github.com/supermemoryai/sdk-ts/commit/d4edc7f04328a5fcd7ffcc63ecc1df1f6075ceb1))
* **api:** manual updates ([91034cb](https://github.com/supermemoryai/sdk-ts/commit/91034cb9935031ad5db877c67571e1f22cb4ed68))
* **api:** manual updates ([c40f02f](https://github.com/supermemoryai/sdk-ts/commit/c40f02f508f51de9c9b364d4d04e2641012df541))
* **api:** manual updates ([bea6e27](https://github.com/supermemoryai/sdk-ts/commit/bea6e278b1d55a26ff7bc0686648df215e339de5))

## 3.8.0 (2025-11-25)

Full Changelog: [v3.7.0...v3.8.0](https://github.com/supermemoryai/sdk-ts/compare/v3.7.0...v3.8.0)

### Features

* **api:** api update ([29bd70a](https://github.com/supermemoryai/sdk-ts/commit/29bd70a5d1faaf6b0bd1e2d7506f6d6c01328ca9))
* **api:** api update ([482a811](https://github.com/supermemoryai/sdk-ts/commit/482a8111e9ffcd14cce5439e7e9bfa2300621773))
* **api:** api update ([ace4c8b](https://github.com/supermemoryai/sdk-ts/commit/ace4c8b6f94f7a176daf8a4b0de34097da058cab))

## 3.7.0 (2025-11-06)

Full Changelog: [v3.6.0...v3.7.0](https://github.com/supermemoryai/sdk-ts/compare/v3.6.0...v3.7.0)

### Features

* **api:** api update ([fcc686d](https://github.com/supermemoryai/sdk-ts/commit/fcc686dd749fef68f666a36d9a49c56c51cf6527))
* **api:** api update ([09566db](https://github.com/supermemoryai/sdk-ts/commit/09566dbc809169fcb438a52194f510304b8d0479))

## 3.6.0 (2025-10-07)

Full Changelog: [v3.5.0...v3.6.0](https://github.com/supermemoryai/sdk-ts/compare/v3.5.0...v3.6.0)

### Features

* **api:** api update ([81bfd53](https://github.com/supermemoryai/sdk-ts/commit/81bfd5352b4cb8e09098c010fbadcf2f31cb162d))
* **api:** api update ([f43ec83](https://github.com/supermemoryai/sdk-ts/commit/f43ec8376f494f8713874e7126932bc9c999082b))
* **api:** api update ([80bfa4e](https://github.com/supermemoryai/sdk-ts/commit/80bfa4e9b5f8a95ba74d4a043dc6295c8a6054ef))
* **api:** api update ([7c85660](https://github.com/supermemoryai/sdk-ts/commit/7c8566063a558301b83ebca7bfd830a1ce4e8d6b))


### Chores

* **internal:** remove .eslintcache ([1175a1c](https://github.com/supermemoryai/sdk-ts/commit/1175a1c393fb00d556eca9a80546e724c3b83ed5))
* **internal:** use npm pack for build uploads ([c14b460](https://github.com/supermemoryai/sdk-ts/commit/c14b460ba6983c51141b4ca446a907d21e7f67d4))
* **jsdoc:** fix [@link](https://github.com/link) annotations to refer only to parts of the package‘s public interface ([16397d2](https://github.com/supermemoryai/sdk-ts/commit/16397d28274d76703c54c5d7a5abeefbc94e5363))

## 3.5.0 (2025-09-27)

Full Changelog: [v3.4.0...v3.5.0](https://github.com/supermemoryai/sdk-ts/compare/v3.4.0...v3.5.0)

### Features

* **api:** api update ([0563e28](https://github.com/supermemoryai/sdk-ts/commit/0563e2820838618e36994d027266138ff663a1e5))


### Performance Improvements

* faster formatting ([5b0a9dd](https://github.com/supermemoryai/sdk-ts/commit/5b0a9ddb5c7b946d6b8e0449e6a4d1208ece96be))


### Chores

* **internal:** codegen related update ([e0994c6](https://github.com/supermemoryai/sdk-ts/commit/e0994c69fde02a24a601e17bd055acdf5241c9a6))
* **internal:** fix incremental formatting in some cases ([9ff7b43](https://github.com/supermemoryai/sdk-ts/commit/9ff7b43309a2dc22c0ba75ac3ef7af0bc1b319dc))
* **internal:** ignore .eslintcache ([1ea5fb5](https://github.com/supermemoryai/sdk-ts/commit/1ea5fb5ce8344cb39cd38d482042f29556616a56))
* **internal:** remove deprecated `compilerOptions.baseUrl` from tsconfig.json ([93eb1e5](https://github.com/supermemoryai/sdk-ts/commit/93eb1e5b7add0e367ec09d9197e3021f2278630f))

## 3.4.0 (2025-09-21)

Full Changelog: [v3.3.0...v3.4.0](https://github.com/supermemoryai/sdk-ts/compare/v3.3.0...v3.4.0)

### Features

* **api:** manual updates ([4778090](https://github.com/supermemoryai/sdk-ts/commit/47780907d8fd577701d89f8d0524c3a0c5db1c41))

## 3.3.0 (2025-09-21)

Full Changelog: [v3.2.0...v3.3.0](https://github.com/supermemoryai/sdk-ts/compare/v3.2.0...v3.3.0)

### Features

* **api:** api update ([59e1a6b](https://github.com/supermemoryai/sdk-ts/commit/59e1a6bbce83885d202a4aeab808ae77055f7378))

## 3.2.0 (2025-09-21)

Full Changelog: [v3.1.0...v3.2.0](https://github.com/supermemoryai/sdk-ts/compare/v3.1.0...v3.2.0)

### Features

* **api:** api update ([2fd5467](https://github.com/supermemoryai/sdk-ts/commit/2fd5467ed466529163a9a3b4ce27c24ab3b3ffdc))

## 3.1.0 (2025-09-20)

Full Changelog: [v3.0.0-alpha.27...v3.1.0](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.27...v3.1.0)

### Features

* **api:** api update ([290de9a](https://github.com/supermemoryai/sdk-ts/commit/290de9a3602efcf37588ffd2ad21f70201d4bd4c))
* **api:** api update ([6d81959](https://github.com/supermemoryai/sdk-ts/commit/6d8195908aad3dfe3825cb48be754c3fab439248))
* **api:** manual updates ([08bfcf3](https://github.com/supermemoryai/sdk-ts/commit/08bfcf3eb3b38256b464eee8455a3ea06a016842))
* **api:** manual updates ([e3de154](https://github.com/supermemoryai/sdk-ts/commit/e3de154f75866468f20ebc89b32d03c16eb1a83f))


### Chores

* do not install brew dependencies in ./scripts/bootstrap by default ([7484585](https://github.com/supermemoryai/sdk-ts/commit/7484585d8e2972c4ac75c2c593e12eb07f727fb3))

## 3.0.0-alpha.27 (2025-09-15)

Full Changelog: [v3.0.0-alpha.26...v3.0.0-alpha.27](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.26...v3.0.0-alpha.27)

### Features

* **api:** api update ([4fd4c3f](https://github.com/supermemoryai/sdk-ts/commit/4fd4c3fda1bb0b9abc88c35e7d6ed3423242da9f))
* **api:** api update ([931f06e](https://github.com/supermemoryai/sdk-ts/commit/931f06ec191b9265a5b616ad464f13196b5323e8))
* **api:** api update ([1867027](https://github.com/supermemoryai/sdk-ts/commit/1867027fbf09579e83274f56662a9f52bfde7980))
* **api:** api update ([ba68418](https://github.com/supermemoryai/sdk-ts/commit/ba684187bac42ee1c631fda0018759923f1ceb64))
* **api:** api update ([e1af8d2](https://github.com/supermemoryai/sdk-ts/commit/e1af8d2c434a9aef933486a21a9a290b17ce44cd))


### Bug Fixes

* coerce nullable values to undefined ([d3d7567](https://github.com/supermemoryai/sdk-ts/commit/d3d75676732fa48be0847fbbcc542489bc8cff1a))


### Chores

* ci build action ([e1f58f5](https://github.com/supermemoryai/sdk-ts/commit/e1f58f5b24257a252c8e6fc13d9befc25ea42538))
* **internal:** update global Error reference ([5c8e529](https://github.com/supermemoryai/sdk-ts/commit/5c8e529624c921433b81cbcc975acacb5cd9aa2c))

## 3.0.0-alpha.26 (2025-08-26)

Full Changelog: [v3.0.0-alpha.25...v3.0.0-alpha.26](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.25...v3.0.0-alpha.26)

### Features

* **api:** api update ([bea577f](https://github.com/supermemoryai/sdk-ts/commit/bea577f662f0b6d561ac59894c3b3cd40c6ab0ce))
* **api:** api update ([663b6c4](https://github.com/supermemoryai/sdk-ts/commit/663b6c4a0fcafdfe76894570643c34ab5323f040))
* **api:** api update ([b1070e3](https://github.com/supermemoryai/sdk-ts/commit/b1070e3ac26d4a9e0355806bc7dbe17f29c41111))
* **api:** api update ([aa80f8d](https://github.com/supermemoryai/sdk-ts/commit/aa80f8db94fe70e07a94efa9559b1662530faa37))

## 3.0.0-alpha.25 (2025-08-24)

Full Changelog: [v3.0.0-alpha.24...v3.0.0-alpha.25](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.24...v3.0.0-alpha.25)

### Features

* **api:** api update ([76bebff](https://github.com/supermemoryai/sdk-ts/commit/76bebff2a0e9049a5e0dc5e6e5ff368695696a0d))

## 3.0.0-alpha.24 (2025-08-24)

Full Changelog: [v3.0.0-alpha.23...v3.0.0-alpha.24](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.23...v3.0.0-alpha.24)

### Features

* **api:** api update ([d15cac5](https://github.com/supermemoryai/sdk-ts/commit/d15cac59b4a9b9c0b39ffea84cf8126a16894445))
* **api:** api update ([c1967bf](https://github.com/supermemoryai/sdk-ts/commit/c1967bf3a96ddbf100a1ddb829b226a120b95350))
* **mcp:** add code execution tool ([7f46f73](https://github.com/supermemoryai/sdk-ts/commit/7f46f73f34099dddcd536493bf79fd077a7f8bc6))


### Chores

* add package to package.json ([46dddb3](https://github.com/supermemoryai/sdk-ts/commit/46dddb3272e67125c3ec2258ee095769f8b2c846))
* **client:** qualify global Blob ([652941a](https://github.com/supermemoryai/sdk-ts/commit/652941aeb0483c7ee73071c2285c70a4e143d8fc))
* update CI script ([d80ffc7](https://github.com/supermemoryai/sdk-ts/commit/d80ffc75a36ca9e2241db6171956a87b0a3cf251))

## 3.0.0-alpha.23 (2025-08-16)

Full Changelog: [v3.0.0-alpha.22...v3.0.0-alpha.23](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.22...v3.0.0-alpha.23)

### Features

* **api:** api update ([6fcacef](https://github.com/supermemoryai/sdk-ts/commit/6fcacefd52bf47f7c0010e82d3b624ea25ad7e5a))
* **api:** manual updates ([e9ca883](https://github.com/supermemoryai/sdk-ts/commit/e9ca8834d39f14433f9c94fed20d5fef74c62929))
* **api:** manual updates ([c5915df](https://github.com/supermemoryai/sdk-ts/commit/c5915df7f91e604e6a5efe5b80706f696b3b4c7d))
* **api:** manual updates ([aa8a5e2](https://github.com/supermemoryai/sdk-ts/commit/aa8a5e236d59470e935416bf63b7e7184e11a2d5))


### Chores

* **deps:** update dependency @types/node to v20.17.58 ([9c611b7](https://github.com/supermemoryai/sdk-ts/commit/9c611b7ce6d65dd08a105dd0983795b87a84bd94))
* **internal:** codegen related update ([17e1e76](https://github.com/supermemoryai/sdk-ts/commit/17e1e761d3ee39a5a3ebd202de76f50e0c8f3f7d))
* **internal:** formatting change ([9e14ef7](https://github.com/supermemoryai/sdk-ts/commit/9e14ef7d357398e9e64376d219ccb43e4f24e635))

## 3.0.0-alpha.22 (2025-08-10)

Full Changelog: [v3.0.0-alpha.21...v3.0.0-alpha.22](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.21...v3.0.0-alpha.22)

### Features

* **api:** api update ([823e151](https://github.com/supermemoryai/sdk-ts/commit/823e151450a7a204644af24079cd80bbe4df6ebe))
* **api:** api update ([f30aec0](https://github.com/supermemoryai/sdk-ts/commit/f30aec086372d4472906c75745d1d9d830957be7))
* **api:** api update ([3e5d79c](https://github.com/supermemoryai/sdk-ts/commit/3e5d79c99af0310e5e7f5b923c170f7d290448b8))
* **api:** api update ([edee8f4](https://github.com/supermemoryai/sdk-ts/commit/edee8f4681b4894068471fc482e92a59ca62bb69))
* **api:** api update ([cad11a5](https://github.com/supermemoryai/sdk-ts/commit/cad11a54d2cd89eeb26130461f17969e514d49b8))
* **api:** api update ([99d1cc1](https://github.com/supermemoryai/sdk-ts/commit/99d1cc1d4420b17067b4d3e3dd78119a919e69b6))
* **api:** api update ([e303ebb](https://github.com/supermemoryai/sdk-ts/commit/e303ebbc6dd29720a8a5cfc586483ac6fe014534))
* **api:** api update ([e243d83](https://github.com/supermemoryai/sdk-ts/commit/e243d83a3b78d4c905a6035529c46f668ed66d8a))


### Chores

* **internal:** move publish config ([580c9d0](https://github.com/supermemoryai/sdk-ts/commit/580c9d015a3383666dd8ead4533656fa07b8793d))
* **internal:** remove redundant imports config ([fbc02b9](https://github.com/supermemoryai/sdk-ts/commit/fbc02b9a666e33cf99acad1f133eef00010cb18b))
* **internal:** update comment in script ([ecfefab](https://github.com/supermemoryai/sdk-ts/commit/ecfefabdd84e3549097045040c44433f46e800a7))
* **ts:** reorder package.json imports ([0f96de1](https://github.com/supermemoryai/sdk-ts/commit/0f96de171447c17d9810feb946868c04c94414c6))
* update @stainless-api/prism-cli to v5.15.0 ([0c7953d](https://github.com/supermemoryai/sdk-ts/commit/0c7953d18d1cba8097580978acd921d3efcab713))

## 3.0.0-alpha.21 (2025-07-15)

Full Changelog: [v3.0.0-alpha.20...v3.0.0-alpha.21](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.20...v3.0.0-alpha.21)

### Features

* **api:** api update ([0bd1242](https://github.com/supermemoryai/sdk-ts/commit/0bd1242e9b3a5d1a256601893e8c5749dfa65fa9))
* **api:** api update ([78a0aa3](https://github.com/supermemoryai/sdk-ts/commit/78a0aa329038a21b8058f4636bbd31d45fc5db60))


### Chores

* make some internal functions async ([10e868f](https://github.com/supermemoryai/sdk-ts/commit/10e868faf0e82b71faf9077167173a66d7368941))

## 3.0.0-alpha.20 (2025-07-03)

Full Changelog: [v3.0.0-alpha.19...v3.0.0-alpha.20](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.19...v3.0.0-alpha.20)

### Features

* **api:** api update ([32eafab](https://github.com/supermemoryai/sdk-ts/commit/32eafabdd29a946a380060bfc23460f0b4252f3f))
* **api:** api update ([752f9cc](https://github.com/supermemoryai/sdk-ts/commit/752f9cc7631862270e8e92ff5eca955af7f1eba3))
* **api:** api update ([b8d5994](https://github.com/supermemoryai/sdk-ts/commit/b8d5994196c1c9e8a9329925a701b731c7d0cfd7))
* **api:** manual updates ([04c7fc5](https://github.com/supermemoryai/sdk-ts/commit/04c7fc524f8c0cc105315465703a6b7e44ab5e1d))


### Bug Fixes

* **ci:** release-doctor — report correct token name ([7aa5dd7](https://github.com/supermemoryai/sdk-ts/commit/7aa5dd745b83ac35a651cb69d98e245daff78ca9))
* **client:** get fetchOptions type more reliably ([6898034](https://github.com/supermemoryai/sdk-ts/commit/6898034055d576bfca64a37a2bc09c11ac9aec66))


### Chores

* add docs to RequestOptions type ([f0862dd](https://github.com/supermemoryai/sdk-ts/commit/f0862dd4e074b416388a0b092ac6ee31917cc8c6))
* **ci:** only run for pushes and fork pull requests ([be5b494](https://github.com/supermemoryai/sdk-ts/commit/be5b494e86287267ab778bd783bf3565ee29bf92))
* **client:** improve path param validation ([88ce022](https://github.com/supermemoryai/sdk-ts/commit/88ce022028073f694072215b30f37b088ccb5214))

## 3.0.0-alpha.19 (2025-06-24)

Full Changelog: [v3.0.0-alpha.18...v3.0.0-alpha.19](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.18...v3.0.0-alpha.19)

### Features

* **api:** api update ([7f31200](https://github.com/supermemoryai/sdk-ts/commit/7f312003f01cc5e7820d9d7169822b655366ebda))
* **api:** api update ([fd23b75](https://github.com/supermemoryai/sdk-ts/commit/fd23b7509fc43f59b55ca98401b8293b940f748a))
* **api:** api update ([ca755ef](https://github.com/supermemoryai/sdk-ts/commit/ca755efd0450f19b6780b11c5461bba7bac8b72f))
* **client:** add support for endpoint-specific base URLs ([950b6e6](https://github.com/supermemoryai/sdk-ts/commit/950b6e66eb30a3908621bb64250d495b8187eab0))


### Bug Fixes

* **client:** explicitly copy fetch in withOptions ([ea7d42b](https://github.com/supermemoryai/sdk-ts/commit/ea7d42bf3e1cda451d587285a668b163674a34ef))


### Chores

* **ci:** enable for pull requests ([b9d3281](https://github.com/supermemoryai/sdk-ts/commit/b9d32816e77fe57348a5c07fd1b93ab387717753))
* **client:** refactor imports ([ae245a4](https://github.com/supermemoryai/sdk-ts/commit/ae245a4cc035602bc89c5d8d0c1a94827d93ad72))
* **readme:** update badges ([74cd982](https://github.com/supermemoryai/sdk-ts/commit/74cd982784564d11817fb8aaff756128a64e964c))
* **readme:** use better example snippet for undocumented params ([76142a1](https://github.com/supermemoryai/sdk-ts/commit/76142a1abf13c4460d8716060200dc53d5c1b9be))


### Refactors

* **types:** replace Record with mapped types ([687fd59](https://github.com/supermemoryai/sdk-ts/commit/687fd59d82a8ab6b0b287e5c86fb69518008e96a))

## 3.0.0-alpha.18 (2025-06-14)

Full Changelog: [v3.0.0-alpha.17...v3.0.0-alpha.18](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.17...v3.0.0-alpha.18)

### Features

* **api:** api update ([9ef5fe1](https://github.com/supermemoryai/sdk-ts/commit/9ef5fe1468e7da9793ba2bc6ef003ae2c8857a25))
* **api:** api update ([06dc425](https://github.com/supermemoryai/sdk-ts/commit/06dc425be966c335ecf5998ee5c2d3ef28cee8d0))
* **api:** api update ([dc496a0](https://github.com/supermemoryai/sdk-ts/commit/dc496a0676c5d0e69c07952678437c62c02df3e6))
* **api:** api update ([06edf86](https://github.com/supermemoryai/sdk-ts/commit/06edf86a8f38feefb79dd7aa80ee7bec3fc0fe02))
* **api:** manual updates ([4a4cef3](https://github.com/supermemoryai/sdk-ts/commit/4a4cef33d6f755c3dee8b6822c5a25c1829d8f33))


### Bug Fixes

* publish script — handle NPM errors correctly ([5396449](https://github.com/supermemoryai/sdk-ts/commit/53964495de3a856935e20ccfcc24177e09d96f64))


### Chores

* **internal:** add pure annotations, make base APIResource abstract ([6737a66](https://github.com/supermemoryai/sdk-ts/commit/6737a66790ca26b35aae85a92dee4b723f6e908d))

## 3.0.0-alpha.17 (2025-06-09)

Full Changelog: [v3.0.0-alpha.16...v3.0.0-alpha.17](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.16...v3.0.0-alpha.17)

### Features

* **api:** api update ([bc772bf](https://github.com/supermemoryai/sdk-ts/commit/bc772bff86693cf5d7d7be8473a7930b72c91a4c))

## 3.0.0-alpha.16 (2025-06-08)

Full Changelog: [v3.0.0-alpha.15...v3.0.0-alpha.16](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.15...v3.0.0-alpha.16)

### Features

* **api:** api update ([7528bc0](https://github.com/supermemoryai/sdk-ts/commit/7528bc0040c2e76620d4f44c42b8d97b7fe32b26))
* **api:** api update ([e55a165](https://github.com/supermemoryai/sdk-ts/commit/e55a16593baf65c93ff45b2dc21ca27953cced37))
* **api:** api update ([2d7ca84](https://github.com/supermemoryai/sdk-ts/commit/2d7ca84b879a9334cd0f24af473bf432866b7bcf))
* **api:** manual updates ([d0a06cc](https://github.com/supermemoryai/sdk-ts/commit/d0a06cc84a1204d864383c6e99089929113d5dad))


### Chores

* avoid type error in certain environments ([1b90528](https://github.com/supermemoryai/sdk-ts/commit/1b905282353994ffc58207330f541569d5246e06))

## 3.0.0-alpha.15 (2025-06-04)

Full Changelog: [v3.0.0-alpha.14...v3.0.0-alpha.15](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.14...v3.0.0-alpha.15)

### Features

* **api:** api update ([f22f3a3](https://github.com/supermemoryai/sdk-ts/commit/f22f3a3107c34df64dd664f1a6d16ff306da97cf))
* **api:** manual updates ([b182524](https://github.com/supermemoryai/sdk-ts/commit/b1825249387bdf6083077de637a9a695788f3690))


### Chores

* **docs:** use top-level-await in example snippets ([6439032](https://github.com/supermemoryai/sdk-ts/commit/643903245ba0ade9b8cf49251d83ba7c223596d4))
* **internal:** fix readablestream types in node 20 ([5afc052](https://github.com/supermemoryai/sdk-ts/commit/5afc05285db5c116e33e13c91be15d8fded5155b))

## 3.0.0-alpha.14 (2025-06-03)

Full Changelog: [v3.0.0-alpha.13...v3.0.0-alpha.14](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.13...v3.0.0-alpha.14)

### Features

* **api:** api update ([90e15ce](https://github.com/supermemoryai/sdk-ts/commit/90e15cebdbdd0023c3a208bd1c1b39d1a59dbd38))

## 3.0.0-alpha.13 (2025-06-03)

Full Changelog: [v3.0.0-alpha.12...v3.0.0-alpha.13](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.12...v3.0.0-alpha.13)

### Features

* **api:** add delete connection ([474f207](https://github.com/supermemoryai/sdk-ts/commit/474f2071bf3d36faf731c3737ba5298b63a532c4))
* **api:** api update ([be72dd8](https://github.com/supermemoryai/sdk-ts/commit/be72dd8045135b989f7faef4569cda1a23fdfb79))
* **api:** api update ([d1d50f5](https://github.com/supermemoryai/sdk-ts/commit/d1d50f53abca93c20a1dbbcd8b67750504315a97))


### Chores

* adjust eslint.config.mjs ignore pattern ([09c32f9](https://github.com/supermemoryai/sdk-ts/commit/09c32f973441cf06127cd673ec3f9b112ded9fc4))

## 3.0.0-alpha.12 (2025-06-02)

Full Changelog: [v3.0.0-alpha.11...v3.0.0-alpha.12](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.11...v3.0.0-alpha.12)

### Features

* **api:** api update ([edf418a](https://github.com/supermemoryai/sdk-ts/commit/edf418a919884925a9cbc8d07432f4cacea059de))
* **api:** api update ([fda2410](https://github.com/supermemoryai/sdk-ts/commit/fda2410dd8d5a018251ddc5a5940f8e00e74786b))

## 3.0.0-alpha.11 (2025-06-02)

Full Changelog: [v3.0.0-alpha.10...v3.0.0-alpha.11](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.10...v3.0.0-alpha.11)

### Features

* **api:** api update ([454c09d](https://github.com/supermemoryai/sdk-ts/commit/454c09d13536fbf4272daff0f779a3158c9f6cd5))

## 3.0.0-alpha.10 (2025-06-01)

Full Changelog: [v3.0.0-alpha.9...v3.0.0-alpha.10](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.9...v3.0.0-alpha.10)

### Chores

* **deps:** bump eslint-plugin-prettier ([f943ca0](https://github.com/supermemoryai/sdk-ts/commit/f943ca084f67c9b4a09a70043c5b157db12967c3))
* **internal:** update jest config ([58e54b1](https://github.com/supermemoryai/sdk-ts/commit/58e54b1e8a1041448995d4c597794342283b5db3))

## 3.0.0-alpha.9 (2025-05-30)

Full Changelog: [v3.0.0-alpha.8...v3.0.0-alpha.9](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.8...v3.0.0-alpha.9)

### Features

* **api:** api update ([23e5400](https://github.com/supermemoryai/sdk-ts/commit/23e54005be0863fd1617eac329889825cccabfb3))
* **api:** manual updates ([6b3a9a3](https://github.com/supermemoryai/sdk-ts/commit/6b3a9a3dab3a3a7ae14de4c9ee011466957f8914))


### Bug Fixes

* compat with more runtimes ([2fed96b](https://github.com/supermemoryai/sdk-ts/commit/2fed96b90cebb40d6f5a12ab1a85dcb7b82089d2))


### Chores

* improve publish-npm script --latest tag logic ([90c4e9c](https://github.com/supermemoryai/sdk-ts/commit/90c4e9c14ed795fb3d02f3c6ef457b518f45197b))

## 3.0.0-alpha.8 (2025-05-27)

Full Changelog: [v3.0.0-alpha.7...v3.0.0-alpha.8](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.7...v3.0.0-alpha.8)

### Features

* **api:** manual updates ([a3389b4](https://github.com/supermemoryai/sdk-ts/commit/a3389b447f13a76486166b043d827e5bb4ceb0da))
* **api:** manual updates ([cf0a461](https://github.com/supermemoryai/sdk-ts/commit/cf0a461338aea472fa921612d43725ad7ce19b40))

## 3.0.0-alpha.7 (2025-05-25)

Full Changelog: [v3.0.0-alpha.6...v3.0.0-alpha.7](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.6...v3.0.0-alpha.7)

### Features

* **api:** api update ([41f3b9e](https://github.com/supermemoryai/sdk-ts/commit/41f3b9e20ff89d969218646be09f42b68cd10460))

## 3.0.0-alpha.6 (2025-05-25)

Full Changelog: [v3.0.0-alpha.5...v3.0.0-alpha.6](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.5...v3.0.0-alpha.6)

### Features

* **api:** api update ([db77979](https://github.com/supermemoryai/sdk-ts/commit/db779799ded7bfa9f150737f1e497ee83a29851e))

## 3.0.0-alpha.5 (2025-05-25)

Full Changelog: [v3.0.0-alpha.4...v3.0.0-alpha.5](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.4...v3.0.0-alpha.5)

### Features

* **api:** api update ([a89ecb6](https://github.com/supermemoryai/sdk-ts/commit/a89ecb643df3bb6b87b2eb1b967e864071672533))
* **api:** api update ([8d76f1b](https://github.com/supermemoryai/sdk-ts/commit/8d76f1b0656d78d18bc50d5ddcd5e05e23331c26))
* **api:** api update ([5ad7382](https://github.com/supermemoryai/sdk-ts/commit/5ad73826644d8fa5d63302a69343eb3668c259bf))

## 3.0.0-alpha.4 (2025-05-25)

Full Changelog: [v3.0.0-alpha.3...v3.0.0-alpha.4](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.3...v3.0.0-alpha.4)

### Features

* **api:** api update ([b26370f](https://github.com/supermemoryai/sdk-ts/commit/b26370f4de32c5600d3a0cf90d03525f1dbb8ea6))
* **api:** api update ([60986e4](https://github.com/supermemoryai/sdk-ts/commit/60986e4eb3f499141d4d46fe906fd179dcd78157))
* **api:** manual updates ([191a358](https://github.com/supermemoryai/sdk-ts/commit/191a3587a6b251e8078608b7dec973f4485f01f1))

## 3.0.0-alpha.3 (2025-05-24)

Full Changelog: [v3.0.0-alpha.2...v3.0.0-alpha.3](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.2...v3.0.0-alpha.3)

### Features

* **api:** api update ([d87b9a8](https://github.com/supermemoryai/sdk-ts/commit/d87b9a8932d6bf819e4430e5eff9be50b63ec4f8))

## 3.0.0-alpha.2 (2025-05-24)

Full Changelog: [v3.0.0-alpha.1...v3.0.0-alpha.2](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.1...v3.0.0-alpha.2)

### Features

* **api:** api update ([fa3150f](https://github.com/supermemoryai/sdk-ts/commit/fa3150f67cdf931fb7468d4ac1e796a82df37f45))
* **api:** api update ([dd727a6](https://github.com/supermemoryai/sdk-ts/commit/dd727a63fbb8d714d5f3c0d23cc9d11a2d44d940))


### Chores

* **docs:** grammar improvements ([a149e15](https://github.com/supermemoryai/sdk-ts/commit/a149e15641eb6fc988fda49b712a967e8efa1268))

## 3.0.0-alpha.1 (2025-05-17)

Full Changelog: [v3.0.0-alpha.0...v3.0.0-alpha.1](https://github.com/supermemoryai/sdk-ts/compare/v3.0.0-alpha.0...v3.0.0-alpha.1)

### Features

* **api:** api update ([01da5f8](https://github.com/supermemoryai/sdk-ts/commit/01da5f877264e7b0474dd7ca4fa5d0b99e4bfe8a))
* **api:** update via SDK Studio ([af9edfe](https://github.com/supermemoryai/sdk-ts/commit/af9edfe44b9566819b503d0b4c6f325f56609a7d))


### Chores

* **package:** remove engines ([aa5d3ae](https://github.com/supermemoryai/sdk-ts/commit/aa5d3aeeecfda9866aa7fe4936eab52c6ce49e49))

## 3.0.0-alpha.0 (2025-05-11)

Full Changelog: [v0.0.1-alpha.0...v3.0.0-alpha.0](https://github.com/supermemoryai/sdk-ts/compare/v0.0.1-alpha.0...v3.0.0-alpha.0)

### Features

* **api:** update via SDK Studio ([9034522](https://github.com/supermemoryai/sdk-ts/commit/9034522a179d193a0b078f199048b31605279cae))


### Chores

* update SDK settings ([63954fe](https://github.com/supermemoryai/sdk-ts/commit/63954fef6502fbbad202d52f083adf34af7c55f1))
* update SDK settings ([7b6ecb6](https://github.com/supermemoryai/sdk-ts/commit/7b6ecb699ce68c922a6710203c725e2e7dbebd92))
