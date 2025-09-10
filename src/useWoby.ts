/** @jsxImportSource woby */
import { useEffect, useRef } from 'react'
import { render, jsx, type JSX } from 'woby'

/**
 * A React hook that renders a Woby component inside a React application.
 * 
 * This hook creates a container element and renders a Woby component inside it,
 * allowing Woby components to be used within React applications. The hook handles
 * the lifecycle management, ensuring proper cleanup when the component unmounts.
 * 
 * @template P - The props type for the Woby component
 * @param component - The Woby component to render
 * @param props - Optional props to pass to the Woby component
 * @returns A ref object that should be attached to a DOM element to render the component into
 * 
 * @example
 * ```tsx
 * import { useWoby } from './useWoby';
 * import { WobyCounter } from './WobyCounter';
 * 
 * function App() {
 *   const containerRef = useWoby(WobyCounter, { initialValue: 5 });
 *   
 *   return (
 *     <div>
 *       <h1>My App</h1>
 *       <div ref={containerRef} />
 *     </div>
 *   );
 * }
 * ```
 */
export const useWoby = <P extends Record<string, any>>(
  component: JSX.Component<P>,
  props?: P
) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      // Clear container
      containerRef.current.innerHTML = ''

      // Create Woby element using Woby's jsx function directly
      // This ensures it's created with Woby's JSX runtime regardless of the file context
      const element = jsx(component, props)

      render(element, containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [component, props])

  return containerRef
}