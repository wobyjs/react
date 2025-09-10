import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { ReactCounter } from './react-components/ReactCounter'
import { WobyCounter } from './woby-components/WobyCounter'
import { UseReactExample } from './woby-components/useReact.example'
import './index.css'
import { useWoby } from '../src/useWoby'

// Type augmentation for web components
declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'react-counter': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & {
                    'initial-value'?: number
                },
                HTMLElement
            >
        }
    }
}

function App() {
    const [sharedCount, setSharedCount] = useState<number>(0)
    const [reactCount, setReactCount] = useState<number>(0)
    const webComponentRef = useRef<HTMLElement>(null)

    // Use the Woby component hook
    const wobyContainerRef = useWoby(WobyCounter, {})
    const reactContainerRef = useWoby(UseReactExample, {})

    // Handle web component events
    useEffect(() => {
        const handleValueChange = (event: CustomEvent) => {
            console.log('Web component value changed:', event.detail)
        }

        const currentWebComponent = webComponentRef.current
        if (currentWebComponent) {
            currentWebComponent.addEventListener('valuechange', handleValueChange as EventListener)
        }

        return () => {
            if (currentWebComponent) {
                currentWebComponent.removeEventListener('valuechange', handleValueChange as EventListener)
            }
        }
    }, [])

    return (
        <>
            <div className="max-w-[1280px] mx-auto p-8 text-center">
                <div className="flex justify-center items-center gap-8">
                    <a href="https://vite.dev" target="_blank">
                        <img
                            src={viteLogo}
                            className="h-[6em] p-[1.5em] will-change-filter transition-filter duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]"
                            alt="Vite logo"
                        />
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img
                            src={reactLogo}
                            className="h-[6em] p-[1.5em] will-change-filter transition-filter duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa]"
                            alt="React logo"
                        />
                    </a>
                    <a href="https://github.com/wongchichong/woby" target="_blank">
                        <img
                            className="w-[200px] h-[120px]"
                            src='https://github.com/wongchichong/woby/raw/main/resources/banner/png/banner-light-rounded.png'
                        />
                    </a>
                </div>
            </div>
            <h1 className="text-5xl leading-[1.1] text-center">React + Woby Integration</h1>

            <div className="p-8 text-center">
                <h2>Shared Counter: {sharedCount}</h2>
                <p>This value is synchronized between React and Woby components</p>
            </div>

            <div className="flex flex-wrap  text-center">
                <div className="flex-1 min-w-[300px]">
                    <h3>React Env</h3>
                    <ReactCounter
                        initialValue={reactCount}
                        onValueChange={(value) => {
                            setReactCount(value)
                            setSharedCount(value)
                        }}
                    />
                </div>

                <div className="flex-1 min-w-[300px]">
                    <h3>React Env</h3>
                    <div ref={wobyContainerRef} />
                </div>
            </div>

            <div className="flex-1 min-w-[300px] border border-orange-500">
                <div ref={reactContainerRef} />
            </div>

            <div className="p-5 m-2.5 text-center">
                <h3>Web Component Example</h3>
                <p>This React component is also available as a web component:</p>
                <react-counter
                    ref={webComponentRef}
                    initial-value={5}
                >
                </react-counter>
                <div className="mt-2.5 text-center">
                    <button
                        className="rounded-lg border border-transparent px-3 py-2 text-base font-medium bg-gray-900 cursor-pointer transition-colors duration-200 hover:border-[#646cff] focus:outline-4 focus:outline-[#646cff] focus:outline"
                        onClick={() => {
                            if (webComponentRef.current) {
                                // We can interact with the web component directly
                                console.log('Web component properties:', webComponentRef.current)
                            }
                        }}
                    >
                        Inspect Web Component
                    </button>
                </div>
            </div>

            <div className="p-8">
                <h2>How It Works</h2>
                <p>
                    This demo shows how React and Woby components can coexist and communicate in the same application.
                    React components use state management, while Woby components use observables for reactivity.
                </p>
                <ul>
                    <li>React component manages its own state with useState</li>
                    <li>Woby component uses observables for reactive updates</li>
                    <li>Vite is configured to handle both JSX systems</li>
                    <li>React components can be converted to Web Components using @r2wc/react-to-web-component</li>
                </ul>
            </div>
        </>
    )
}

export default App