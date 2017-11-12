<speakout-progress>
  <play-button onclick={ opts.play } state={ opts.speaking }>
  </play-button>
  <stop-button onclick={ opts.stop } state={ opts.speaking }>
  </stop-button>
  <div class="speech__progress">
    <div class="speech__progress-bar" style={ "width:" + opts.progress + '%' }></div>
  </div>
  <style>
  </style>
  <script>
    //this.progress = 50;
  </script>
</speakout-progress>