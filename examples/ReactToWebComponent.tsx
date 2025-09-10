import r2wc from '@r2wc/react-to-web-component'
import { ReactCounter } from './react-components/ReactCounter'

// Convert the React component to a web component
const ReactCounterWebComponent = r2wc(ReactCounter, {
    props: {
        //one way from attr to react component only
        initialValue: 'number',
        onValueChange: 'function'
    }
})

// Register the custom element
customElements.define('react-counter', ReactCounterWebComponent)

// Export for manual usage if needed
export default ReactCounterWebComponent