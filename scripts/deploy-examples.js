import { execSync } from 'child_process';
import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';

console.log('Deploying examples to CodeSandbox...');

try {
    // Build the examples
    console.log('Building examples...');
    execSync('pnpm build:examples', { stdio: 'inherit' });

    // Create a deployment package with just the examples
    console.log('Creating deployment package...');

    // Create sandbox config for CodeSandbox
    const sandboxConfig = {
        template: 'node',
        title: 'React + Woby Integration Demo',
        description: 'Demo of React, Woby, and Web Components integration',
        tags: ['react', 'woby', 'web-components', 'integration'],
        dependencies: {
            "react": "^19.1.1",
            "react-dom": "^19.1.1",
            "woby": "^1.58.24",
            "@r2wc/react-to-web-component": "^2.0.4"
        },
        devDependencies: {
            "typescript": "^5.9.2",
            "vite": "^7.1.2",
            "@types/react": "19.1.10",
            "@types/react-dom": "19.1.7"
        },
        scripts: {
            "dev": "vite",
            "build": "vite build",
            "preview": "vite preview"
        }
    };

    // Write sandbox config
    const projectRoot = resolve('.');
    const sandboxConfigPath = resolve(projectRoot, 'sandbox.config.json');
    writeFileSync(sandboxConfigPath, JSON.stringify(sandboxConfig, null, 2));
    console.log('Created sandbox.config.json');

    // Create a simple index.html for CodeSandbox
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React + Woby Integration</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/examples/main.tsx"></script>
  </body>
</html>`;

    writeFileSync('index.html', indexHtml);
    console.log('Created index.html for CodeSandbox');

    console.log('\nDeployment files created successfully!');
    console.log('\nTo deploy to CodeSandbox:');
    console.log('1. Commit all files to a GitHub repository');
    console.log('2. Go to https://codesandbox.io/s/ and import from GitHub');
    console.log('3. The sandbox will be created automatically with the config');
    console.log('\nAlternatively, you can manually upload the files to CodeSandbox.');

} catch (error) {
    console.error('Error during deployment:', error.message);
    process.exit(1);
}