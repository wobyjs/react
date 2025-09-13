/** @jsxImportSource woby */
import { $ } from 'woby'

export const WobyCounter = () => {
  const count = $(0)

  const increment = () => {
    count(count() + 1)
  }

  const decrement = () => {
    count(count() - 1)
  }

  return (
    <div class="p-5 border border-gray-300 m-2.5">
      <div class="text-center">
        <h3>Woby Counter Component</h3>
        <p>Count: {count}</p>
        <div class="flex justify-center gap-2">
          <button onClick={increment}>Woby Increment</button>
          <button onClick={decrement}>Woby Decrement</button>
        </div>
      </div>
    </div>
  )
}