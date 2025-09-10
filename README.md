# React + Woby + Web Components Integration

This project demonstrates how to integrate React, Woby, and Web Components in a single application. It shows how React components can be converted to Web Components and used alongside Woby components.

## Features

1. React components with state management
2. Woby components with observable-based reactivity
3. React components converted to Web Components using @r2wc/react-to-web-component
4. Communication between all component types
5. Custom hooks for rendering components ([useWoby](file://d:\temp\react_woby\src\useWoby.ts#L15-L36) and [useReact](file://d:\temp\react_woby\src\useReact.ts#L15-L44))

## Project Structure

- `src/index.ts` - Library entry point exporting integration hooks
- `src/useReact.ts` - Hook for rendering React components in Woby environment
- `src/useWoby.ts` - Hook for rendering Woby components in React environment
- `examples/` - Example implementations and demonstrations
- `examples/react-components/` - React component examples
- `examples/woby-components/` - Woby component examples

## Repository

- **GitHub**: [https://github.com/wongchichong/usereact](https://github.com/wongchichong/usereact)

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

## Library Usage

### Installation

```bash
npm install usereact
```

### useReact Hook

Renders React components within a Woby environment.

```tsx
/** @jsxImportSource woby */
import { useReact } from 'usereact';
import { ReactCounter } from './ReactCounter';

const UseReactExample = () => {
  const reactContainerRef = useReact(ReactCounter, {
    initialValue: 5,
    onValueChange: (value) => {
      console.log('Counter value changed to:', value);
    }
  });

  return (
    <div class="text-center m-2">
      <h2>Woby Env</h2>
      <h3>useReact Hook Examples</h3>
      <div ref={reactContainerRef} />
    </div>
  );
};
```

### useWoby Hook

Renders Woby components within a React environment.

```tsx
import { useWoby } from 'usereact';
import { WobyCounter } from './WobyCounter';

function App() {
  // Use the Woby component hook
  const wobyContainerRef = useWoby(WobyCounter, {});

  return (
    <div>
      <h1>My App</h1>
      <div ref={wobyContainerRef} />
    </div>
  );
}
```

## How It Works

### React to Web Component Conversion

We use `@r2wc/react-to-web-component` to convert React components to Web Components:

```javascript
import r2wc from '@r2wc/react-to-web-component';
import { ReactCounter } from './examples/react-components/ReactCounter';

// Convert the React component to a web component
const ReactCounterWebComponent = r2wc(ReactCounter, {
  props: {
    initialValue: 'number',
    onValueChange: 'function'
  }
});

// Register the custom element
customElements.define('react-counter', ReactCounterWebComponent);
```

### Using the useReact Hook

The [useReact](file://d:\temp\react_woby\src\useReact.ts#L15-L44) hook allows you to render React components dynamically within Woby applications:

```tsx
/** @jsxImportSource woby */
import { useReact } from 'usereact';
import { ReactCounter } from './examples/react-components/ReactCounter';

const UseReactExample = () => {
  // Use the React component hook
  const reactContainerRef = useReact(ReactCounter, {
    initialValue: 10,
    onValueChange: (value) => {
      console.log('Value changed to:', value);
    }
  });

  return (
    <div class="text-center m-2">
      <h2>Woby Env</h2>
      <h3>useReact Hook Examples</h3>
      <div ref={reactContainerRef} />
    </div>
  );
};
```

### Using the useWoby Hook

The [useWoby](file://d:\temp\react_woby\src\useWoby.ts#L15-L36) hook allows you to render Woby components within React:

```tsx
import { useWoby } from 'usereact';
import { WobyCounter } from './examples/woby-components/WobyCounter';

function App() {
  // Use the Woby component hook
  const wobyContainerRef = useWoby(WobyCounter, {});

  return (
    <div>
      <h1>My App</h1>
      <div ref={wobyContainerRef} />
    </div>
  );
}
```

### Using the Web Component

Once registered, the web component can be used in HTML:

```html
<react-counter initial-value="5"></react-counter>
```

Or in React with a ref to handle events:

```tsx
<react-counter 
  ref={webComponentRef}
  initial-value={5}
></react-counter>
```

### Web Component Events

Web components can emit events that can be listened to in JavaScript:

```javascript
const webComponent = document.querySelector('react-counter');
webComponent.addEventListener('valuechange', (event) => {
  console.log('Value changed to:', event.detail);
});
```

## Running the Project

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm run dev
   ```

3. Visit `http://localhost:5173` to see the main demo

4. Visit `http://localhost:5173/web-component-demo.html` to see the standalone web component demo

## Integration Points

- React components use `useState` for state management
- Woby components use observables for reactivity
- Web components bridge the gap between React and vanilla JavaScript
- All component types can communicate through refs and callbacks
- Custom hooks provide a unified interface for rendering different component types

## API Reference

### useReact(component, props?)

Renders a React component in a Woby environment.

**Parameters:**
- `component`: The React component to render
- `props` (optional): Props to pass to the React component

**Returns:**
An observable ref that should be attached to a DOM element.

### useWoby(component, props?)

Renders a Woby component in a React environment.

**Parameters:**
- `component`: The Woby component to render
- `props` (optional): Props to pass to the Woby component

**Returns:**
A ref that should be attached to a DOM element.

## Deployment

See [DEPLOYMENT.md](file://d:\temp\react_woby\DEPLOYMENT.md) for instructions on deploying to CodeSandbox.