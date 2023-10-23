import {
  LitElement,
  html,
  css,
  svg,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@3.0.0/all/lit-all.min.js';

class BaseElement extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`<h1>Inherit from this class and override render!</h1>`;
  }

  // no Shadow DOM
  createRenderRoot() {
    return this;
  }
}

export { BaseElement, LitElement, html, css, svg };
