module.exports = function() {
  var module = {};

  var ApiData = require('./ApiData.js');
  var ApiHandler = require('./ApiHandler.js');
  var IPC = require('./IPC.js');

  module.onBackendReady = function(arg) {
    ApiHandler.init(arg);
    IPC.setIpcListener('request-playlist-names', () => {
      ApiHandler.fetchPlaylists();
    })
  }

  module.onPlaylistsFetched = function() {
    console.log(ApiData.getPlaylistNames())
    IPC.send('main', 'response-playlist-names', ApiData.getPlaylistNames());
  }

  return module;
}();