import { LitElement, html, css } from './base.js';
import { BaseStyle, RoundButton, BaseButton } from './styles.js';

export class StopButton extends LitElement {
  static properties = {
    speaking: {
      type: Boolean,
      show: true,
    },
  };

  static styles = [
    BaseStyle,
    BaseButton,
    RoundButton,
    css`
      button[aria-pressed='false'] .pause-icon {
        display: none;
      }

      button[aria-pressed='true'] .play-icon {
        display: none;
      }
    `,
  ];

  constructor() {
    super();
    this.speaking = true;
  }

  render() {
    return html`<button disabled=${this.speaking} aria-label="stop">
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
              width="45"
              y="979.15"
              x="28.929"
            />
          </g>
        </g>
      </svg>
    </button>`;
  }
}

customElements.define('stop-button', StopButton);
