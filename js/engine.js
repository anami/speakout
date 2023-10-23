class SpeechEngine {
  constructor() {
    console.log('constructor');
    this.eventTarget = new EventTarget();
  }

  // functions
  initialise() {
    this.progress = 0;
    this.voices = [];
    this.voice = undefined;
    this.selectedVoiceIndex = -1;
    this.speechAvailable = false;
    this.text = '';
    this.rate = 1.0;
    this.pitch = 1.0;
    this.volume = 1.0;
    this.speaking = false;
    // event target to dispatch events

    if (window.speechSynthesis || window.webkitSpeechSynthesis) {
      this.speechAvailable = true;

      if ('onvoiceschanged' in window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.voices = window.speechSynthesis.getVoices();
          this.fireEvent('initialised');
        };
      } else {
        // Safari does not have the onvoiceschanged event
        this.voices = window.speechSynthesis.getVoices();
        this.fireEvent('initialised');
      }

      // Firefox does not implement onvoiceschanged
      if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        this.voices = window.speechSynthesis.getVoices();
        this.fireEvent('initialised');
      }

      // read querystring
      if (window.location.search) {
        const params = this.parseQueryString(
          window.location.search.substring(1)
        );
        console.log('params found: ', params);
        this.text = decodeURI(params.phrase);
      }
    }
  }

  setVoiceByName(name) {
    const selectedVoice = this.voices.find((v) => v.name === name);
    this.voice = selectedVoice;
  }

  fireEvent(eventName) {
    this.eventTarget.dispatchEvent(
      new CustomEvent('statechange', {
        detail: {
          pitch: this.pitch,
          progress: this.progress,
          voices: this.voices,
          selectedVoiceIndex: this.selectedVoiceIndex,
          speechAvailable: this.speechAvailable,
          isSpeaking: this.speaking,
          text: this.text,
          rate: this.rate,
          event: eventName,
        },
      })
    );
  }

  speak(phrase) {
    if (window.speechSynthesis.speaking && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      this.speaking = true;
      this.fireEvent('resume');
      return;
    } else if (
      window.speechSynthesis.speaking &&
      !window.speechSynthesis.paused
    ) {
      window.speechSynthesis.pause();
      this.speaking = false;
      this.fireEvent('pause');
    }

    if (phrase.length > 0) {
      window.speechSynthesis.cancel();
      this.speechUtterance = new SpeechSynthesisUtterance(phrase);
      this.attachUtteranceEventHandlers(this.speechUtterance);
      this.speechUtterance.voice = this.voice || this.speechUtterance.voice;
      this.speechUtterance.pitch = this.pitch;
      this.speechUtterance.rate = this.rate;
      this.speechUtterance.volume = this.volume;
      this.progress = 0;
      console.log(this.speechUtterance);
      window.speechSynthesis.speak(this.speechUtterance);
    }
  }

  addStateChangeListener(listener) {
    console.log(this.eventTarget);
    this.eventTarget.addEventListener('statechange', listener);
  }

  removeStateChangeListener(listener) {
    this.eventTarget.removeEventListener('statechange', listener);
  }

  onUtteranceError(e) {
    console.log(e);
    this.fireEvent('speech-error');
  }

  onUtteranceEnd(e) {
    this.speaking = false;
    window.speechSynthesis.cancel();
    this.fireEvent('speech-end');
  }

  onUtteranceStart(e) {
    console.log(this);
    this.speaking = true;
    this.fireEvent('speech-start');
  }

  onUtteranceResume(e) {
    this.speaking = true;
    this.fireEvent('speech-resume');
  }

  onUtteranceBoundary(e) {
    const text = e.utterance.text;
    const textLength = text.length;
    const words = text.substring(e.charIndex, text.length).split(' ');
    const partialLength = e.charIndex + words[0].length;

    this.progress = (partialLength * 100) / textLength;
    this.fireEvent('speech-progress');
  }

  attachUtteranceEventHandlers(utterance) {
    if (utterance) {
      utterance.onresume = this.onUtteranceResume.bind(this);
      utterance.onstart = this.onUtteranceStart.bind(this);
      utterance.onend = this.onUtteranceEnd.bind(this);
      utterance.onboundary = this.onUtteranceBoundary.bind(this);
      utterance.onerror = this.onUtteranceError.bind(this);
    }
  }

  reset() {
    this.selectedVoice = this.voices[0];
    this.voice = this.voices[0];
    this.pitch = 1.0;
    this.pitchVal = 10;
    this.rate = 1.0;
    this.rateVal = 10;
    this.volume = 1.0;
    this.volVal = 10;
  }
}

window.speechEngine = new SpeechEngine();
