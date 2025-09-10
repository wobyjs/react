import { execSync } from 'child_process';
import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';

console.log('Starting full deployment process...');

try {
    // Build everything
    console.log('Building library and examples...');
    execSync('pnpm build', { stdio: 'inherit' });

    // Create deployment files
    console.log('Creating CodeSandbox deployment files...');

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

    // Instructions for manual deployment
    console.log('\n=== DEPLOYMENT INSTRUCTIONS ===');
    console.log('To deploy to CodeSandbox:');
    console.log('1. Create a new GitHub repository');
    console.log('2. Commit all files including the newly created deployment files:');
    console.log('   - sandbox.config.json');
    console.log('   - index.html');
    console.log('   - examples/ directory');
    console.log('   - src/ directory');
    console.log('   - package.json');
    console.log('   - tsconfig.json');
    console.log('   - vite.config.mts');
    console.log('   - Any other necessary files');
    console.log('3. Go to https://codesandbox.io/s/ and import from GitHub');
    console.log('4. After deployment, update the README with the CodeSandbox URL by running:');
    console.log('   node scripts/update-readme-codesandbox.js <your-codesandbox-url>');

    console.log('\nDeployment preparation completed successfully!');

} catch (error) {
    console.error('Error during deployment preparation:', error.message);
    process.exit(1);
}