var jsdom = require('jsdom');
var fs    = require('fs');

var dump = [];

jsdom.env({
  url: "https://archive.org/browse.php?collection=etree&field=%2Fmetadata%2Fcreator",
  scripts: ["http://code.jquery.com/jquery.js"],
  done: function (errors, window) {
    var $ = window.$;
    var band = {};
    console.log("Number of bands on Archive");
    var bands = $("ul li");
    var len = bands.length;
    for (var i = 0; i < len; i++) {
      band = {
        name: bands[i].firstChild.innerHTML,
        collection: bands[i].firstChild.href.split('/').slice(-1)[0]
      }
      console.log(band);
      dump.push(band);
    }
    fs.writeFile('index.json', JSON.stringify(dump));
  }
});
