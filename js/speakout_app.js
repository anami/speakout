riot.tag2('speakout-app', '<textarea riot-value="{text}" onkeyup="{onPhraseKeyUp}" ref="phrase"></textarea> <button riot-value="{buttonState}" onclick="{onSpeak}" disabled="{!speechAvailable}">{buttonState}</button> <speakout-progress ref="progress" progress="{progress}" play="{onSpeak}" speaking="{speaking}"> </speakout-progress> <button class="button--options" aria-expanded="{openOptions}" onclick="{onToggleOptions}"> <cog-icon></cog-icon> </button> <fieldset class="speakout-options {openOptionsCss} "> <legend>Options</legend> <div class="speakout-options__section"> <label for="voice">Speaker</label> <div> <select onchange="{onVoiceSelect}" ref="voice" name="voice"> <option each="{voice in voices}" riot-value="{voice.name}">{voice.name + ⁗ - (⁗ + voice.lang + ⁗)⁗}</option> </select> </div> </div> <div class="speakout-options__section"> <label>Pitch</label> <div> <input name="pitch" ref="pitch" type="range" min="0" max="20" oninput="{onPitchChange}" riot-value="{pitchVal}"> <label>{pitch}</label> </div> </div> <div class="speakout-options__section"> <label>Rate</label> <div> <input name="rate" ref="rate" type="range" min="10" max="100" oninput="{onRateChange}" riot-value="{rangeVal}"> <label>{rate}</label> </div> </div> <div class="speakout-options__section"> <label>Volume</label> <div> <input name="volume" ref="volume" type="range" min="0" max="10" oninput="{onVolumeChange}" riot-value="{volVal}"> <label>{volume}</label> </div> </div> <button value="Reset" onclick="{onResetOptions}">Reset</button> </fieldset>', '', '', function(opts) {
    this.speaking = false;
    this.speechAvailable = false;
    this.text = "Welcome to SpeakOut! Type anything here and press ENTER. Have fun!";
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
        window.speechSynthesis.onvoiceschanged = function() {
          self.voices = window.speechSynthesis.getVoices();
          console.log(self.voices);
          self.update();
        };

        this.speechUtterance.onstart = () => {
          this.buttonState = "Stop";
          this.speaking = true;
          this.update();
        }

        this.speechUtterance.onresume = () => {
          this.buttonState = "Stop";
          this.speaking = true;
          this.update();
        }

        this.speechUtterance.onend = () => {
          this.buttonState = "Speak";
          this.speaking = false;
          this.update();
        }

        this.speechUtterance.onboundary = (event) => {
          var textLength = this.text.length;
          var words = this.text.substring(event.charIndex, this.text.length).split(' ');
          var partialLength = event.charIndex + words[0].length;
          this.progress = ((partialLength * 100) / textLength);
          this.refs.progress.update();

        };
      }
    });

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
      if (e.which == 13) {
        e.preventDefault();
        this.speak(this.refs.phrase.value);
      }
    }.bind(this)

    this.onVoiceSelect = function(e) {
      console.log("voice changed")
      this.selectedVoice = this.voices[this.refs.voice.selectedIndex]
    }.bind(this)

    this.speak = function(phrase) {
      if (window.speechSynthesis.speaking) {
        console.log("synth is speaking.")
        window.speechSynthesis.cancel();
        return;
      }

      window.speechSynthesis.cancel();
      this.speechUtterance.text = phrase;
      this.speechUtterance.voice = this.selectedVoice || this.speechUtterance.voice;
      this.speechUtterance.pitch = this.pitch;
      this.speechUtterance.rate = this.rate;
      this.speechUtterance.volume = this.volume;
      window.speechSynthesis.speak(this.speechUtterance);

    }.bind(this)

    this.onSpeak = function(e) {
      this.text = this.refs.phrase.value;
      this.speak(this.text);
    }.bind(this)

});