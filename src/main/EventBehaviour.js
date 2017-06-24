module.exports = function() {
  var module = {};

  var ApiData = require('./ApiData.js');
  var ApiHandler = require('./ApiHandler.js');
  var IPC = require('./IPC.js');

  module.onBackendReady = function(arg) {
    ApiHandler.init(arg);
    IPC.setListener('request-playlist-names', (event, arg) => {
      ApiHandler.fetchPlaylists();
    })
  }

  module.onPlaylistsFetched = function() {
    IPC.send('main', 'response-playlist-names', ApiData.getPlaylistNames());
  }

  return module;
}();