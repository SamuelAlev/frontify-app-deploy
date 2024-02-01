# Frontify App Deploy GitHub Action

This is a GitHub Action that enables you to deploy your apps to the Frontify Marketplace.

## Usage

### Inputs

This action accepts the following inputs:

-   `instanceDomain`: **(required)** Domain of your Frontify instance
-   `token`: **(required)** Authorization token (can be generated on `<DOMAIN_NAME>/api/oauth-access-token/show`)
-   `path`: **(required)** Path of the app(s) root (support glob pattern)
-   `args`: Extra arguments to pass to the CLI

### Examples

#### Deploy a single app

```yaml
name: Deploy to Frontify Marketplace

on:
    push:
        branches:
            - main

jobs:
    deploy:
        runs-on: ubuntu-latest

        steps:
            - name: Checkout
              uses: actions/checkout@v4

            - name: Use Node.js 20
              uses: actions/setup-node@v4
              with:
                  node-version: '20'
                  cache: 'npm'

            - name: Install dependencies
              run: npm ci

            - name: Deploy to Frontify Marketplace
              uses: samuelalev/frontify-app-deploy-action@v1
              with:
                  path: './path/to/block'
                  token: ${{ secrets.FRONTIFY_TOKEN }}
                  instanceDomain: 'app.frontify.com'
```

#### Deploy multiple apps

This example uses pnpm as a monorepo tool, but you can use any other tool.

```yaml
name: Deploy to Frontify Marketplace

on:
    push:
        branches:
            - main

jobs:
    deploy:
        runs-on: ubuntu-latest

        steps:
            - name: Checkout
              uses: actions/checkout@v4

            - name: Use pnpm
              uses: pnpm/action-setup@v2
              with:
                  version: latest
                  run_install: false

            - name: Use Node.js 20
              uses: actions/setup-node@v4
              with:
                  node-version: '20'
                  cache: 'pnpm'

            - name: Install dependencies
              run: pnpm i --frozen-lockfile

            - name: Deploy to Frontify Marketplace
              uses: samuelalev/frontify-app-deploy-action@v1
              with:
                  path: './packages/*' # Deploy all apps in the packages folder
                  token: ${{ secrets.FRONTIFY_TOKEN }}
                  instanceDomain: 'app.frontify.com'
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
