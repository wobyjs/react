# Deployment to CodeSandbox

This document explains how to deploy the examples to CodeSandbox.

## Automated Deployment Process

1. Run the deployment preparation script:
   ```bash
   pnpm deploy:full
   ```

2. This will:
   - Build the library and examples
   - Create necessary deployment files (`sandbox.config.json`, `index.html`)
   - Provide instructions for deployment

## Manual Deployment Steps

1. Create a new GitHub repository for the examples

2. Commit all necessary files:
   ```
   git init
   git add .
   git commit -m "Initial commit with React+Woby examples"
   git remote add origin <your-repository-url>
   git push -u origin main
   ```

3. Import to CodeSandbox:
   - Go to [CodeSandbox](https://codesandbox.io/s/)
   - Click "Import Repository"
   - Enter your GitHub repository URL
   - CodeSandbox will automatically detect the configuration and create the sandbox

## Updating the README with CodeSandbox URL

After deployment, update the README with the actual CodeSandbox URL:

```bash
node scripts/update-readme-codesandbox.js https://codesandbox.io/s/your-sandbox-url
```

## Deployment Scripts

- `pnpm deploy:examples` - Prepares just the examples for deployment
- `pnpm deploy:full` - Full deployment preparation including build steps
- `node scripts/update-readme-codesandbox.js <url>` - Updates README with CodeSandbox URL

## What Gets Deployed

The deployment includes:
- All source code in `src/` and `examples/` directories
- Configuration files (`package.json`, `tsconfig.json`, `vite.config.mts`)
- Deployment-specific files (`sandbox.config.json`, `index.html`)
- Built assets in `build/` directory (for the examples)

The CodeSandbox environment will automatically install dependencies and start the development server.