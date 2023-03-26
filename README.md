# Frontify App Deploy GitHub Action

This is a GitHub Action that enables you to deploy your apps to the Frontify Marketplace.

## Usage

### Inputs

This action accepts the following inputs:

-   `instanceDomain`: **(required)** Domain of your Frontify instance
-   `token`: **(required)** Authorization token (can be generated on `<DOMAIN_NAME>/api/oauth-access-token/show`)
-   `path`: **(required)** Path of the app(s) root (support glob pattern)
-   `args`: Extra arguments to pass to the CLI

### Example

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
              uses: actions/checkout@v3

            - name: Use Node.js 18
              uses: actions/setup-node@v3
              with:
                  node-version: '18'
                  cache: 'npm'

            - name: Install dependencies
              run: npm ci

            - name: Deploy to Frontify Marketplace
              uses: samuelalev/frontify-app-deploy-action@v1
              with:
                  instanceDomain: 'app.frontify.com'
                  token: ${{ secrets.FRONTIFY_TOKEN }}
                  path: './path/to/block'
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
