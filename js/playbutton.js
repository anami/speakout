import {
  LitElement,
  css,
  html,
} from "https://unpkg.com/lit-element?module";

class PlayButton extends LitElement {
  static properties = {
    playing: { 
      type: Boolean,
      show: true
    }
  }

  constructor() {
    super();
    this.playing = true;
  }

  static styles = css`
  button {
    {
      background-color: #d600ff;
      color: #fff;
      padding: 1rem;
      border-radius: 0.25rem;
      color: #fff;
      text-transform: uppercase;
      padding: 0.25rem 5rem;
      font-weight: normal;
      margin: 0.5rem;
      letter-spacing: 1px;
  }
  }
  button {
    width: 3rem;
    height: 3rem;
    border: 0;
    padding: 0;
    margin: 0;
    border-radius: 50%;
  }
  button[aria-pressed="false"] .pause-icon {
    display: none;
  }

button[aria-pressed="true"] .play-icon {
    display: none;
}
  `;

  render() {
    return html`<button aria-pressed="${ this.playing ? 'true' : 'false'}" aria-label="play">
    <svg viewBox="0 0 100 100">
     <g transform="translate(0 -952.36)">
      <g class="pause-icon" transform="translate(1.0714 .71367)">
       <rect style="fill:#ffffff" ry="2.7614" height="45" width="15" y="979.15" x="53.929"/>
       <rect style="fill:#ffffff" ry="2.7614" height="45" width="15" y="979.15" x="28.929"/>
      </g>
      <path class="play-icon" style="stroke-linejoin:round;fill-rule:evenodd;stroke:#ffffff;stroke-width:5;fill:#ffffff" d="m38.5 982.36v40l35-20z"/>
     </g>
    </svg>
    </button>`;
  }
}

customElements.define('play-button', PlayButton);