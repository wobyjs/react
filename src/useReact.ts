/** @jsxImportSource woby */
import React, { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { $, $$, useEffect } from 'woby'

/**
 * A hook that renders a React component in a Woby environment.
 * 
 * This hook creates a container element and renders a React component inside it,
 * allowing React components to be used within Woby applications. The hook handles
 * the lifecycle management using React DOM's createRoot API, ensuring proper cleanup
 * when the component unmounts.
 * 
 * @template P - The props type for the React component
 * @param component - The React component to render
 * @param props - Optional props to pass to the React component
 * @returns An observable ref object that should be attached to a DOM element to render the component into
 * 
 * @example
 * ```tsx
 * /** @jsxImportSource woby *\/
 * import { useReact } from './useReact';
 * import { ReactCounter } from './ReactCounter';
 * 
 * const UseReactExample = () => {
 *   const reactContainerRef = useReact(ReactCounter, {
 *     initialValue: 5,
 *     onValueChange: (value) => {
 *       console.log('Counter value changed to:', value)
 *     }
 *   });
 * 
 *   return (
 *     <div class="text-center m-2">
 *       <h2>Woby Env</h2>
 *       <h3>useReact Hook Examples</h3>
 *       <div ref={reactContainerRef} />
 *     </div>
 *   );
 * };
 * ```
 */
export const useReact = <P extends Record<string, any>>(
    component: React.ComponentType<P>,
    props?: P
) => {
    const containerRef = $<HTMLDivElement>()
    const rootRef = $<ReturnType<typeof createRoot>>()

    useEffect(() => {
        if ($$(containerRef)) {
            // // Clear container
            // $$(containerRef).innerHTML = ''

            // Create root and render component
            const root = createRoot($$(containerRef) as any)
            rootRef(root)
            root.render(createElement(component, props))
        }

        // Cleanup function to unmount component when effect re-runs
        return () => {
            if ($$(rootRef)) {
                $$(rootRef)?.unmount()
            }
        }
    })

    return containerRef
}