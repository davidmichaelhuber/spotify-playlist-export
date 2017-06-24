module.exports = function() {
  var module = {};

  const path = require("path");
  var IPC = require(path.resolve('src/renderer/js/IPC.js'));

  module.onReponsePlaylistNames = function(arg) {
    // Update list
    console.log(arg);
  }

  module.onRequestPlaylistNames = function() {
    IPC.setListener('response-playlist-names', (event, arg) => {
      console.log(arg);
    });
    IPC.send('request-playlist-names');
  }

  return module;
}();