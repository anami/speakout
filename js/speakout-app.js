import { BaseElement, html, css } from './base.js';
export class SpeakoutApp extends BaseElement {
  static properties = {
    phrase: {},
  };
  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = [
    css`
      :host {
        display: inline-block;
        padding: 10px;
        background: lightgray;
      }
      .planet {
        color: var(--planet-color, blue);
      }
    `,
  ];

  //#region Lifecycle methods

  connectedCallback() {
    super.connectedCallback();
    this.engine = window.speechEngine;
    this.engine.addStateChangeListener(this.onEngineChange.bind(this));
    this.engine.initialise();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.engine.removeStateChangeListener(this.onEngineChange.bind(this));
  }

  //#endregion Lifecycle methods

  onEngineChange(e) {
    console.log(e.detail);
    this.update();
  }

  constructor() {
    super();
    // Define reactive properties--updating a reactive property causes
    // the component to update.
    this.greeting = 'Hello';
    this.planet = 'World';
    this.phrase = 'Welcome to Speakout, type anything here and have fun!';
  }

  onPlayClick(e) {
    this.engine.speak(this.phrase);
  }

  onTextChange(e) {
    this.phrase = e.target.value;
    this.update();
  }

  onPitchChange(e) {
    this.engine.pitch = parseInt(e.target.value);
    this.update();
  }

  onRateChange(e) {
    this.engine.rate = parseInt(e.target.value);
    this.update();
  }

  onVolumeChange(e) {
    this.engine.volume = parseInt(e.target.value);
    this.update();
  }

  onResetClick(e) {
    this.engine.reset();
    this.update();
  }

  onVoiceChange(e) {
    this.engine.setVoiceByName(e.target.value);
  }
  // The render() method is called any time reactive properties change.
  // Return HTML in a string template literal tagged with the `html`
  // tag function to describe the component's internal DOM.
  // Expressions can set attribute values, property values, event handlers,
  // and child nodes/text.
  render() {
    return html`
      <no-speech .show="${!this.engine?.speechAvailable ?? false}"></no-speech>
      <div>
        <options-cog></options-cog>
        <textarea
          .value=${this.phrase}
          @onkeyup=${this.onTextChange}
        ></textarea>
        <div>
          <play-button
            .speaking=${this.engine?.speaking}
            .onplayclick=${this.onPlayClick.bind(this)}
          ></play-button>
          <stop-button .speaking=${this.engine?.speaking}></stop-button>
        </div>
        <progress-bar
          .speaking=${this.engine?.speaking ?? false}
          .progress=${this.engine?.progress ?? 0}
        ></progress-bar>
        <share-link .text=${this.phrase}></share-link>
        <fieldset>
          <legend>Options</legend>
          <div class="speakout-options__section">
            <label>Pitch</label>
            <div>
              <input
                name="pitch"
                type="range"
                min="0"
                max="20"
                @input=${this.onPitchChange.bind(this)}
                .value=${this.engine?.pitch ?? 0}
              />
              <label>${this.engine?.pitch}</label>
            </div>
          </div>
          <div class="speakout-options__section">
            <label>Rate</label>
            <div>
              <input
                name="rate"
                type="range"
                min="10"
                max="100"
                @input=${this.onRateChange.bind(this)}
                .value=${this.engine?.rate ?? 10}
              />
              <label>${this.engine.rate}</label>
            </div>
          </div>
          <div class="speakout-options__section">
            <label>Volume</label>
            <div>
              <input
                name="volume"
                type="range"
                min="0"
                max="10"
                @input=${this.onVolumeChange.bind(this)}
                .value=${this.engine?.volume ?? 0}
              />
              <label>${this.engine.volume}</label>
            </div>
          </div>
          <div>
            <select name="voices" title="Voices" @change=${this.onVoiceChange}>
              ${this.engine?.voices?.map(
                (voice) =>
                  html`<option
                    .value=${voice.voiceURI}
                    ${voice.voiceURI === this.engine?.voice?.voiceURI ?? false
                      ? 'selected'
                      : ''}
                  >
                    ${voice.name}
                  </option>`
              )}
            </select>
          </div>
          <button value="Reset" @click=${this.onResetClick.bind(this)}>
            Reset
          </button>
        </fieldset>
      </div>
    `;
  }
}
customElements.define('speakout-app', SpeakoutApp);
