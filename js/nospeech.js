import {
  LitElement,
  html,
} from "https://unpkg.com/lit-element?module";

class NoSpeech extends LitElement {
  static properties = {
    show: {
      type: Boolean,
      attribute: 'show'
    }
  }

  constructor() {
    super()
    this.show = false;
  }

  render() {
    console.log(this.show);
    return this.show ? html`<div class="nospeech">
      <div class="nospeech__content">
        <h1>:(</h1>
        <h2>Sorry!</h2>
        <h3>SpeakOut will not work on this browser</h3>
        <p>Please try a more modern browser</p>
      </div>
    </div>` : html``
  }
}
customElements.define('no-speech', NoSpeech);