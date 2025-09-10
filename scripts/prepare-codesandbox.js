import { writeFileSync, mkdirSync, existsSync, copyFileSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

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
const sandboxConfigPath = join(projectRoot, 'sandbox.config.json');
writeFileSync(sandboxConfigPath, JSON.stringify(sandboxConfig, null, 2));

console.log('Created sandbox.config.json');

// Create a simple package.json for CodeSandbox
const packageJson = {
    name: "react-woby-demo",
    private: true,
    version: "0.0.0",
    type: "module",
    scripts: {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview"
    },
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
    }
};

const packageJsonPath = join(projectRoot, 'package.json');
writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('Created package.json for CodeSandbox');