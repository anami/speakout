import { BaseElement, html } from './base.js';

export class Progress extends BaseElement {
  static properties = {
    progress: {
      type: Number,
      show: true,
      attribute: 'progress',
    },
  };

  constructor() {
    super();
    this.progress = 0;
  }

  render() {
    console.log(this.progress, this.speaking);
    return html` <div class="speech__progress">
      <div
        class="speech__progress-bar"
        style=${'width:' + this.progress + '%'}
      ></div>
    </div>`;
  }
}
customElements.define('progress-bar', Progress);
