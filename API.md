# API Documentation

## Table of Contents
- [useReact](#usereact)
- [useWoby](#usewoby)

## useReact

Renders a React component in a Woby environment.

### Signature
```typescript
export const useReact = <P extends Record<string, any>>(
  component: React.ComponentType<P>,
  props?: P
) => Observable<HTMLDivElement | undefined>
```

### Parameters
| Name | Type | Description |
|------|------|-------------|
| component | `React.ComponentType<P>` | The React component to render |
| props | `P` (optional) | Props to pass to the React component |

### Returns
`Observable<HTMLDivElement | undefined>` - An observable ref that should be attached to a DOM element.

### Example
```tsx
/** @jsxImportSource woby */
import { useReact } from 'your-package-name';
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

### Implementation Details
The hook uses React DOM's `createRoot` API to render the component. It manages the component lifecycle, ensuring proper cleanup when the component unmounts.

## useWoby

Renders a Woby component in a React environment.

### Signature
```typescript
export const useWoby = <P extends Record<string, any>>(
  component: JSX.Component<P>,
  props?: P
) => React.RefObject<HTMLDivElement>
```

### Parameters
| Name | Type | Description |
|------|------|-------------|
| component | `JSX.Component<P>` | The Woby component to render |
| props | `P` (optional) | Props to pass to the Woby component |

### Returns
`React.RefObject<HTMLDivElement>` - A ref that should be attached to a DOM element.

### Example
```tsx
import { useWoby } from 'your-package-name';
import { WobyCounter } from './WobyCounter';

function App() {
  const wobyContainerRef = useWoby(WobyCounter, {});

  return (
    <div>
      <h1>My App</h1>
      <div ref={wobyContainerRef} />
    </div>
  );
}
```

### Implementation Details
The hook creates a container element and uses Woby's `render` and `jsx` functions to render the component. It manages the component lifecycle, ensuring proper cleanup when the component unmounts.