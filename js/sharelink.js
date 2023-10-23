import { BaseElement, html, css } from './base.js';

export class ShareLink extends BaseElement {
  static properties = {
    text: {
      type: String,
      show: true,
    },
  };

  constructor() {
    super();
    this.text = '';
  }

  connectedCallback() {
    super.connectedCallback();
    let baseURI = window.location.href;
    if (window.location.search) {
      baseURI = baseURI.substring(0, baseURI.indexOf('?'));
      this.text = baseURI.substring(baseURI.indexOf('?'));
    }
  }

  render() {
    let baseURI = window.location.href;
    const encodedLink = `${baseURI}?phrase=${encodeURI(
      this.text.toLocaleLowerCase()
    )}`;

    return html`
      <div class="link-section">
        <div>
          <label for="link">Link to your speech:</label>
          <input id="link" type="text" .value=${encodedLink} />
        </div>
      </div>
    `;
  }
}

customElements.define('share-link', ShareLink);
