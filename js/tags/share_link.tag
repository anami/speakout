<share-link>
  <div class="link-section">
    <div>
      <label for="link">Link to your speech:</label> 
      <input id="link" type="text" value={ encodedLink }>
    </div>
  </div>
  <script>
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
  </script>

</share-link>