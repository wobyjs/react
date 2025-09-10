/** @jsxImportSource woby */
import { useReact } from '../../src/useReact'
import { ReactCounter } from '../react-components/ReactCounter'

// Example component showing how to use the useReact hook
export const UseReactExample = () => {
    // Example 1: Basic usage
    const reactContainerRef = useReact(ReactCounter, {
        initialValue: 5,
        onValueChange: (value) => {
            console.log('Counter value changed to:', value)
        }
    })

    return (
        <div class="text-center m-2">
            <h2>Woby Env</h2>

            <h3>useReact Hook Examples</h3>

            <div ref={reactContainerRef} />

        </div>
    )
}