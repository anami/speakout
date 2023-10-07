// import { html } from 'https://unpkg.com/lit?module';
// import { component, useState } from 'https://unpkg.com/haunted/haunted.js';
import { html, component, useState } from 'https://cdn.pika.dev/haunted';

function App() {
  const [count, setCount] = useState(0);
  return html`
    <h2>Using lighterhtml!</h2>
    <div>Count: ${count}</div>
    <button part="button" @click=${() => setCount(count + 1)}>Increment</button>
  `;
}

customElements.define('speakout-app', component(App));