<speakout-app>
  <div class="speakout-app">
    <nospeech show={ !speechAvailable }></nospeech>
    <div show={ speechAvailable } class="speakout-app__content">
      <textarea value={ text } onkeyup={ onPhraseKeyUp } ref="phrase"></textarea>
      <speakout-progress ref="progress" progress={ progress } play={ onSpeak } stop={ onStop } speaking={ speaking }>
      </speakout-progress>
      <div>
        <button value="Clear" onclick={ onClear }>Clear</button>
      </div>
      <button class="button--options" aria-expanded={ openOptions } onclick={ onToggleOptions } >
        <cog-icon></cog-icon>
      </button>
      <fieldset class="speakout-options { openOptionsCss } ">
        <legend>Options</legend>
        <div class="speakout-options__section">
          <label for="voice">Speaker</label>
          <div>
            <select onchange={ onVoiceSelect } ref="voice" name="voice">
              <option each={ voice in voices } value={voice.name}>{ voice.name + " - (" + voice.lang + ")" }</option>
            </select>
          </div>
        </div>
        <div class="speakout-options__section">
          <label>Pitch</label>
          <div>
            <input name="pitch" ref="pitch" type="range" min="0" max="20" oninput={ onPitchChange } value={ pitchVal } />
            <label>{ pitch }</label>
          </div>
        </div>
        <div class="speakout-options__section">
          <label>Rate</label>
          <div>
            <input name="rate" ref="rate" type="range" min="10" max="100" oninput={ onRateChange } value={ rangeVal }/>
            <label>{ rate }</label>
          </div>
        </div>
        <div class="speakout-options__section">
          <label>Volume</label>
          <div>
            <input name="volume" ref="volume" type="range" min="0" max="10" oninput={ onVolumeChange } value={ volVal }/>
            <label>{ volume }</label>
          </div>
        </div>
        <button value="Reset" onclick={ onResetOptions }>Reset</button>
      </fieldset>
      <share-link text={ text } ref="shareLink"></share-link>
    </div>
  </div>

  <script>
    // 16-11-2017 updating for firefox where it cannot reuse an existing speechSynthesisUtterance object.

    this.speaking = false;
    this.speechAvailable = false;
    this.text = "Welcome to SpeakOut! Type anything here and press play. Have fun!";
    this.speechUtterance = null;
    this.voices = null;
    this.selectedVoice = null;
    this.buttonState = "Speak";
    this.pitch = 1.0;
    this.rate = 1.0;
    this.volume = 1.0;
    this.pitchVal = 10;
    this.rateVal = 10;
    this.volVal = 10;
    this.openOptions = false;
    this.openOptionsCss = "";
    this.textLength = 0;
    this.progress = 0;
    
    // initialise before mounting on the page
    this.on("before-mount", function() {
      if (window.speechSynthesis || window.webkitSpeechSynthesis) {
        var self = this;  
        this.speechAvailable = true;
        this.speechUtterance = new SpeechSynthesisUtterance(this.text);

        if ('onvoiceschanged' in window.speechSynthesis) {
          window.speechSynthesis.onvoiceschanged = function() {
            self.getVoices();
          };
        } else {
          // Safari does not have the onvoiceschanged event.
          this.getVoices();
        }

        // firefox does not implement onvoiceschanged event yet.
        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){ 
          this.getVoices();
        }

        this.attachUtteranceEventHandlers(this.speechUtterance);

        // read querystring
        console.log(window.location.search);
        if (window.location.search) {
          var params = this.parseQueryString(window.location.search.substring(1))
          console.log("params found: ", params);
          this.text = decodeURI(params.phrase);
        }
      }
    });

    getVoices() {
      this.voices = window.speechSynthesis.getVoices();
      console.log(this.voices);
      this.update();
    }

    /* speechSynthesisUtterance events */
    onUtteranceError(e) {
      console.log(e);
    }

    onUtteranceBoundary(e) {
      var textLength = this.text.length,
          words = this.text.substring(e.charIndex, this.text.length).split(' '),
          partialLength = e.charIndex + words[0].length;
      
      this.progress = ((partialLength * 100) / textLength);
      this.refs.progress.update();
    }

    onUtteranceEnd(e) {
      console.log("Finished speaking..");
      this.buttonState = "Speak";
      this.speaking = false;
      window.speechSynthesis.cancel();
      this.update();
    }

    onUtteranceStart(e) {
      console.log("Starting speaking..");
      this.buttonState = "Stop";
      this.speaking = true;
      this.update();
    }

    onUtteranceResume(e) {
      console.log("Resume speaking..");
      this.buttonState = "Stop";
      this.speaking = true;
      this.update();
    }

    attachUtteranceEventHandlers(utterance) {
      utterance.onresume = this.onUtteranceResume;
      utterance.onstart = this.onUtteranceStart;
      utterance.onend = this.onUtteranceEnd;
      utterance.onboundary = this.onUtteranceBoundary;
      utterance.onerror = this.onUtteranceError;
    }
    /* end of speechSynthesisUtterance events */

    parseQueryString( queryString ) {
      var params = {}, queries, temp, i, l;
      // Split into key/value pairs
      queries = queryString.split("&");
      // Convert the array of strings into an object
      for ( i = 0, l = queries.length; i < l; i++ ) {
          temp = queries[i].split('=');
          params[temp[0]] = temp[1];
      }
      return params;
    };

    onToggleOptions(e) {
      this.openOptions = !this.openOptions;
      this.openOptionsCss = (this.openOptions) ? "visible" : "";
      this.update();
    }

    onResetOptions(e) {
      this.refs.voice.selectedIndex = 0;
      this.selectedVoice = this.voices[this.refs.voice.selectedIndex];
      this.pitch = 1.0; 
      this.pitchVal = 10;
      this.rate = 1.0;
      this.rateVal = 10;
      this.volume = 1.0;
      this.volVal = 10;
      this.update();
    }

    onPitchChange(e) {
      this.pitch = this.refs.pitch.value / 10;
      this.update();
    }

    onRateChange(e) {
      this.rate = this.refs.rate.value / 10;
      this.update();
    }

    onVolumeChange(e) {
      this.volume = this.refs.volume.value / 10;
      this.update();
    }

    onPhraseKeyUp(e) {
      this.text = this.refs.phrase.value;
      if (e.which == 13) {
        e.preventDefault(); 
        this.speak(this.text);
      }

      this.update();
    }

    onVoiceSelect(e) {
      console.log("voice changed")
      this.selectedVoice = this.voices[this.refs.voice.selectedIndex]
    }

    onClear(e) {
      this.text = "";
      this.update();
    }

    onStop(e) {
      window.speechSynthesis.cancel();
      this.progress = 0;
      this.update();
    }

    speak(phrase) {

      if (window.speechSynthesis.speaking && window.speechSynthesis.paused) {
        console.log("synth is speaking.")
        window.speechSynthesis.resume();
        return;
      } else if (window.speechSynthesis.speaking && window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
      }

      if (phrase.length > 0) {
        window.speechSynthesis.cancel();
        this.speechUtterance = new SpeechSynthesisUtterance(phrase);
        this.attachUtteranceEventHandlers(this.speechUtterance);
        this.speechUtterance.voice = this.selectedVoice || this.speechUtterance.voice;
        this.speechUtterance.pitch = this.pitch;
        this.speechUtterance.rate = this.rate;
        this.speechUtterance.volume = this.volume;
        this.progress = 0;
        console.log(this.speechUtterance);
        window.speechSynthesis.speak(this.speechUtterance);
      }
    }

    onSpeak(e) {
      this.text = this.refs.phrase.value;
      this.speak(this.text);
    }

  </script>
</speakout-app>