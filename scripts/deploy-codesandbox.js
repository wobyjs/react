import { execSync } from 'child_process';
import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';

console.log('Preparing CodeSandbox deployment...');

try {
  // Run the prepare script
  execSync('node scripts/prepare-codesandbox.js', { stdio: 'inherit' });

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

  // Update README with CodeSandbox link placeholder
  const readmePath = 'README.md';
  let readmeContent = readFileSync(readmePath, 'utf8');

  // Add CodeSandbox link section if it doesn't exist
  if (!readmeContent.includes('## Live Demo')) {
    const liveDemoSection = `
## Live Demo

[Try it live on CodeSandbox](https://codesandbox.io/s/react-@woby/demo-URL_PLACEHOLDER)

You can experiment with the integration of React, Woby, and Web Components directly in your browser.
`;

    // Insert before the "Running the Project" section
    readmeContent = readmeContent.replace(
      '## Running the Project',
      `${liveDemoSection}\n## Running the Project`
    );

    writeFileSync(readmePath, readmeContent);
    console.log('Updated README.md with CodeSandbox section');
  }

  console.log('Deployment preparation completed successfully!');
  console.log('\nTo deploy to CodeSandbox:');
  console.log('1. Create a new repository with the prepared files');
  console.log('2. Import the repository to CodeSandbox');
  console.log('3. Update the README.md with the actual CodeSandbox URL');

} catch (error) {
  console.error('Error during deployment preparation:', error.message);
  process.exit(1);
}