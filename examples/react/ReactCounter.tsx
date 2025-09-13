import { useState, useEffect } from 'react'

interface ReactCounterProps {
  initialValue?: number
  onValueChange?: (value: number) => void
  // 'initial-value'?: number
}

export const ReactCounter = ({ initialValue = 0, onValueChange, }: ReactCounterProps) => {
  // Handle both React props (camelCase) and web component attributes (kebab-case)
  const actualInitialValue = initialValue || 0

  const [count, setCount] = useState(actualInitialValue)

  useEffect(() => {
    console.log(initialValue, actualInitialValue)
    onValueChange && onValueChange(count)
  }, [count, onValueChange, initialValue])

  useEffect(() => {
    setCount(actualInitialValue)
    onValueChange && onValueChange(actualInitialValue)
  }, [actualInitialValue])

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)

  return (
    <div className="p-5 border border-gray-300 m-2.5">
      <div className="text-center">
        <h3>React Counter Component</h3>
        <p>Count: {count}</p>
        <div className="flex justify-center gap-2">
          <button onClick={increment}>React Increment</button>
          <button onClick={decrement}>React Decrement</button>
        </div>
      </div>
    </div>
  )
}