module.exports = function() {
  var module = {};

  var ApiHandler = require('./ApiHandler.js');
  var ApiOptions = require('./ApiOptions.js');

  module.init = function(accessToken, callback) {
    ApiOptions.setAccessToken(accessToken);
    ApiHandler.fetchUserId(callback);
  }

  module.fetchPlaylists = function(callback) {
    ApiHandler.fetchPlaylists(callback);
  }

  module.fetchTracks = function(playlistId, callback) {
    ApiHandler.fetchTracks(playlistId, callback);
  }

  return module;
}();