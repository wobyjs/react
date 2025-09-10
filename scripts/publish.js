import { execSync } from 'child_process';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

console.log('Starting publish process...');

try {
    // Build the library and examples
    console.log('Building library and examples...');
    execSync('pnpm build', { stdio: 'inherit' });

    // Prepare for CodeSandbox deployment
    console.log('Preparing for CodeSandbox deployment...');

    // Create sandbox config for CodeSandbox
    const sandboxConfig = {
        template: 'node',
        title: 'React + Woby Integration',
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

    // Update README with deployment instructions
    const readmePath = 'README.md';
    let readmeContent = readFileSync(readmePath, 'utf8');

    // Check if CodeSandbox section already exists
    if (!readmeContent.includes('## Live Demo')) {
        const liveDemoSection = `
## Live Demo

You can try this demo live on CodeSandbox. To deploy:

1. Create a new GitHub repository with the example files
2. Import the repository to [CodeSandbox](https://codesandbox.io/s/)
3. The example will automatically run with hot module replacement

The examples showcase:
- React components with state management
- Woby components with observable-based reactivity
- React components converted to Web Components
- Communication between all component types
`;

        // Insert before the "Running the Project" section
        readmeContent = readmeContent.replace(
            '## Running the Project',
            `${liveDemoSection}\n## Running the Project`
        );

        writeFileSync(readmePath, readmeContent);
        console.log('Updated README.md with CodeSandbox information');
    }

    // Run npm publish
    console.log('Publishing to npm...');
    execSync('pnpm npmjs', { stdio: 'inherit' });

    console.log('Publish process completed successfully!');
    console.log('\nTo deploy to CodeSandbox:');
    console.log('1. Commit all files to a GitHub repository');
    console.log('2. Go to https://codesandbox.io/s/ and import from GitHub');
    console.log('3. The sandbox will be created automatically with the config');

} catch (error) {
    console.error('Error during publish process:', error.message);
    process.exit(1);
}