import { readFileSync, writeFileSync } from 'fs';

// This script updates the README with a CodeSandbox URL
// Usage: node update-readme-codesandbox.js <codesandbox-url>

const args = process.argv.slice(2);
const codesandboxUrl = args[0];

if (!codesandboxUrl) {
    console.log('Usage: node update-readme-codesandbox.js <codesandbox-url>');
    console.log('Example: node update-readme-codesandbox.js https://codesandbox.io/s/example-12345');
    process.exit(1);
}

const readmePath = 'README.md';
let readmeContent = readFileSync(readmePath, 'utf8');

// Check if CodeSandbox section exists
if (readmeContent.includes('## Live Demo')) {
    // Update existing section with the actual URL
    readmeContent = readmeContent.replace(
        /\[Try it live on CodeSandbox\]\(https:\/\/codesandbox\.io\/s\/react-@woby/demo - URL_PLACEHOLDER\) /,
        `[Try it live on CodeSandbox](${codesandboxUrl})`
    );

    // Also update the generic instructions
    const updatedDemoSection = `## Live Demo

[Try it live on CodeSandbox](${codesandboxUrl})

You can experiment with the integration of React, Woby, and Web Components directly in your browser. The demo showcases:

- React components with state management
- Woby components with observable-based reactivity
- React components converted to Web Components
- Communication between all component types
`;

    readmeContent = readmeContent.replace(
        /## Live Demo[\s\S]*?## Running the Project/,
        `${updatedDemoSection}\n## Running the Project`
    );
} else {
    // Add new section with the URL
    const liveDemoSection = `## Live Demo

[Try it live on CodeSandbox](${codesandboxUrl})

You can experiment with the integration of React, Woby, and Web Components directly in your browser. The demo showcases:

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
}

writeFileSync(readmePath, readmeContent);
console.log('README.md updated with CodeSandbox URL:', codesandboxUrl);