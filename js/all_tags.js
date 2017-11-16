riot.tag2('cog-icon', '<svg id="cog" viewbox="0 0 190 190"><g transform="translate(-84.978 -137.34)"><path d="m166.54 154.03a79.552 79.552 0 0 0 -24.398 8.3666l-.15877 19.304a64.205 64.205 0 0 0 -7.8137 6.906l-19.049-2.1106a79.552 79.552 0 0 0 -11.322 23.204l13.366 13.588a64.205 64.205 0 0 0 -.69232 10.691l-14.797 11.846a79.552 79.552 0 0 0 8.3742 24.396l18.522.15299a64.205 64.205 0 0 0 7.5745 8.7818l-2.0035 18.087a79.552 79.552 0 0 0 23.201 11.325l12.596-12.39a64.205 64.205 0 0 0 12.564 .80967l10.971 13.703a79.552 79.552 0 0 0 24.394 -8.3839l.14162-17.316a64.205 64.205 0 0 0 9.7809 -8.6643l17.099 1.8943a79.552 79.552 0 0 0 11.326 -23.198l-12.178-12.38a64.205 64.205 0 0 0 .62482 -12.807l13.665-10.939a79.552 79.552 0 0 0 -8.3649 -24.401l-18.1-.14936a64.205 64.205 0 0 0 -7.9977 -8.8125l2.0008-18.057a79.552 79.552 0 0 0 -23.207 -11.321l-13.371 13.153a64.205 64.205 0 0 0 -10.93 -.51173l-11.82-14.765zm9.555 37.603a40.912 40.912 0 0 1 10.985 .42848 40.912 40.912 0 0 1 33.231 47.318l-.0366.20788a40.912 40.912 0 0 1 -47.446 33.048 40.912 40.912 0 0 1 -33.109 -47.403 40.912 40.912 0 0 1 36.376 -33.599z" style="stroke-linejoin: round; stroke-linecap: round; stroke-width: 3px;"></path></g></svg>', '', '', function(opts) {
});
riot.tag2('nospeech', '<div class="nospeech"> <div class="nospeech__content"> <h1>:(</h1> <h2>Sorry!</h2> <h3>SpeakOut will not work on this browser</h3> <p>Please try a more modern browser</p> </div> </div>', '', '', function(opts) {
});
riot.tag2('play-button', '<button aria-pressed="{opts.state ? \'true\' : \'false\'}" aria-label="play"> <svg viewbox="0 0 100 100"> <g transform="translate(0 -952.36)"> <g class="pause-icon" transform="translate(1.0714 .71367)"> <rect style="fill:#ffffff" ry="2.7614" height="45" width="15" y="979.15" x="53.929"></rect> <rect style="fill:#ffffff" ry="2.7614" height="45" width="15" y="979.15" x="28.929"></rect> </g> <path class="play-icon" style="stroke-linejoin:round;fill-rule:evenodd;stroke:#ffffff;stroke-width:5;fill:#ffffff" d="m38.5 982.36v40l35-20z"></path> </g> </svg> </button>', '', '', function(opts) {
});
riot.tag2('share-link', '<div class="link-section"> <div> <label for="link">Link to your speech:</label> <input id="link" type="text" riot-value="{encodedLink}"> </div> </div>', '', '', function(opts) {
    this.text = opts.text;
    this.encodedLink = window.location.href;

    this.on('update', function() {
      console.log(opts.text);
      var baseURI = window.location.href;

      if (window.location.search) {
        baseURI = baseURI.substring(0, baseURI.indexOf("?"));
        console.log("baseURI: ", baseURI);
      } else{
        baseURI = window.location.href;
      }

      this.encodedLink = baseURI + "?phrase=" + encodeURI(opts.text.toLowerCase());
    })
});
riot.tag2('speakout-app', '<div class="speakout-app"> <nospeech show="{!speechAvailable}"></nospeech> <div show="{speechAvailable}" class="speakout-app__content"> <textarea riot-value="{text}" onkeyup="{onPhraseKeyUp}" ref="phrase"></textarea> <speakout-progress ref="progress" progress="{progress}" play="{onSpeak}" stop="{onStop}" speaking="{speaking}"> </speakout-progress> <div> <button value="Clear" onclick="{onClear}">Clear</button> </div> <button class="button--options" aria-expanded="{openOptions}" onclick="{onToggleOptions}"> <cog-icon></cog-icon> </button> <fieldset class="speakout-options {openOptionsCss} "> <legend>Options</legend> <div class="speakout-options__section"> <label for="voice">Speaker</label> <div> <select onchange="{onVoiceSelect}" ref="voice" name="voice"> <option each="{voice in voices}" riot-value="{voice.name}">{voice.name + ⁗ - (⁗ + voice.lang + ⁗)⁗}</option> </select> </div> </div> <div class="speakout-options__section"> <label>Pitch</label> <div> <input name="pitch" ref="pitch" type="range" min="0" max="20" oninput="{onPitchChange}" riot-value="{pitchVal}"> <label>{pitch}</label> </div> </div> <div class="speakout-options__section"> <label>Rate</label> <div> <input name="rate" ref="rate" type="range" min="10" max="100" oninput="{onRateChange}" riot-value="{rangeVal}"> <label>{rate}</label> </div> </div> <div class="speakout-options__section"> <label>Volume</label> <div> <input name="volume" ref="volume" type="range" min="0" max="10" oninput="{onVolumeChange}" riot-value="{volVal}"> <label>{volume}</label> </div> </div> <button value="Reset" onclick="{onResetOptions}">Reset</button> </fieldset> <share-link text="{text}" ref="shareLink"></share-link> </div> </div>', '', '', function(opts) {


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

          this.getVoices();
        }

        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
          this.getVoices();
        }

        this.attachUtteranceEventHandlers(this.speechUtterance);

        console.log(window.location.search);
        if (window.location.search) {
          var params = this.parseQueryString(window.location.search.substring(1))
          console.log("params found: ", params);
          this.text = decodeURI(params.phrase);
        }
      }
    });

    this.getVoices = function() {
      this.voices = window.speechSynthesis.getVoices();
      console.log(this.voices);
      this.update();
    }.bind(this)

    this.onUtteranceError = function(e) {
      console.log(e);
    }.bind(this)

    this.onUtteranceBoundary = function(e) {
      var textLength = this.text.length,
          words = this.text.substring(e.charIndex, this.text.length).split(' '),
          partialLength = e.charIndex + words[0].length;

      this.progress = ((partialLength * 100) / textLength);
      this.refs.progress.update();
    }.bind(this)

    this.onUtteranceEnd = function(e) {
      console.log("Finished speaking..");
      this.buttonState = "Speak";
      this.speaking = false;
      window.speechSynthesis.cancel();
      this.update();
    }.bind(this)

    this.onUtteranceStart = function(e) {
      console.log("Starting speaking..");
      this.buttonState = "Stop";
      this.speaking = true;
      this.update();
    }.bind(this)

    this.onUtteranceResume = function(e) {
      console.log("Resume speaking..");
      this.buttonState = "Stop";
      this.speaking = true;
      this.update();
    }.bind(this)

    this.attachUtteranceEventHandlers = function(utterance) {
      utterance.onresume = this.onUtteranceResume;
      utterance.onstart = this.onUtteranceStart;
      utterance.onend = this.onUtteranceEnd;
      utterance.onboundary = this.onUtteranceBoundary;
      utterance.onerror = this.onUtteranceError;
    }.bind(this)

    this.parseQueryString = function( queryString ) {
      var params = {}, queries, temp, i, l;

      queries = queryString.split("&");

      for ( i = 0, l = queries.length; i < l; i++ ) {
          temp = queries[i].split('=');
          params[temp[0]] = temp[1];
      }
      return params;
    }.bind(this);

    this.onToggleOptions = function(e) {
      this.openOptions = !this.openOptions;
      this.openOptionsCss = (this.openOptions) ? "visible" : "";
      this.update();
    }.bind(this)

    this.onResetOptions = function(e) {
      this.refs.voice.selectedIndex = 0;
      this.selectedVoice = this.voices[this.refs.voice.selectedIndex];
      this.pitch = 1.0;
      this.pitchVal = 10;
      this.rate = 1.0;
      this.rateVal = 10;
      this.volume = 1.0;
      this.volVal = 10;
      this.update();
    }.bind(this)

    this.onPitchChange = function(e) {
      this.pitch = this.refs.pitch.value / 10;
      this.update();
    }.bind(this)

    this.onRateChange = function(e) {
      this.rate = this.refs.rate.value / 10;
      this.update();
    }.bind(this)

    this.onVolumeChange = function(e) {
      this.volume = this.refs.volume.value / 10;
      this.update();
    }.bind(this)

    this.onPhraseKeyUp = function(e) {
      this.text = this.refs.phrase.value;
      if (e.which == 13) {
        e.preventDefault();
        this.speak(this.text);
      }

      this.update();
    }.bind(this)

    this.onVoiceSelect = function(e) {
      console.log("voice changed")
      this.selectedVoice = this.voices[this.refs.voice.selectedIndex]
    }.bind(this)

    this.onClear = function(e) {
      this.text = "";
      this.update();
    }.bind(this)

    this.onStop = function(e) {
      window.speechSynthesis.cancel();
      this.progress = 0;
      this.update();
    }.bind(this)

    this.speak = function(phrase) {

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
    }.bind(this)

    this.onSpeak = function(e) {
      this.text = this.refs.phrase.value;
      this.speak(this.text);
    }.bind(this)

});
riot.tag2('speakout-progress', '<play-button onclick="{opts.play}" state="{opts.speaking}"> </play-button> <stop-button onclick="{opts.stop}" state="{opts.speaking}"> </stop-button> <div class="speech__progress"> <div class="speech__progress-bar" riot-style="{⁗width:⁗ + opts.progress + \'%\'}"></div> </div>', '', '', function(opts) {
});
riot.tag2('stop-button', '<button disabled="{opts.speaking}" aria-label="stop"> <svg viewbox="0 0 100 100"> <g transform="translate(0 -952.36)"> <g class="pause-icon" transform="translate(1.0714 .71367)"> <rect style="fill:#ffffff" ry="2.7614" height="45" width="15" y="979.15" x="53.929"></rect> <rect style="fill:#ffffff" ry="2.7614" height="45" width="45" y="979.15" x="28.929"></rect> </g> </g> </svg> </button>', '', '', function(opts) {
});