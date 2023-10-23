import { BaseElement, html } from './base.js';

class PlayButton extends BaseElement {
  static properties = {
    speaking: {
      type: Boolean,
      show: true,
    },
    onplayclick: {
      type: Function,
      show: true,
    },
  };

  constructor() {
    super();
    this.speaking = true;
    this.onplayclick = null;
  }

  onClick(e) {
    console.log('click');
    console.log(this.onplayclick);
    this.onplayclick?.(e);
  }

  render() {
    console.log('spk: ', this.speaking);

    return html`<button
      aria-pressed="${this.speaking ? 'true' : 'false'}"
      aria-label="play"
      @click=${this.onClick}
    >
      <svg viewBox="0 0 100 100">
        <g transform="translate(0 -952.36)">
          <g class="pause-icon" transform="translate(1.0714 .71367)">
            <rect
              style="fill:#ffffff"
              ry="2.7614"
              height="45"
              width="15"
              y="979.15"
              x="53.929"
            />
            <rect
              style="fill:#ffffff"
              ry="2.7614"
              height="45"
              width="15"
              y="979.15"
              x="28.929"
            />
          </g>
          <path
            class="play-icon"
            style="stroke-linejoin:round;fill-rule:evenodd;stroke:#ffffff;stroke-width:5;fill:#ffffff"
            d="m38.5 982.36v40l35-20z"
          />
        </g>
      </svg>
    </button>`;
  }
}

customElements.define('play-button', PlayButton);
