module.exports = function() {
  var module = {};

  var ApiData = require('./ApiData.js');
  var ApiHandler = require('./ApiHandler.js');
  var ApiOptions = require('./ApiOptions.js');

  module.init = function(accessToken, callback) {
    ApiOptions.setAccessToken(accessToken);
    ApiHandler.fetchUserId(callback);
  }

  module.fetchPlaylists = function(callback) {
    ApiHandler.fetchPlaylists(callback);
  }

  module.getPlaylists = function() {
    return ApiData.getPlaylists();
  }

  module.fetchTracks = function(playlistId, callback) {
    ApiHandler.fetchTracks(playlistId, callback);
  }

  module.getTracks = function(playlistId) {
    return ApiData.getTracks(playlistId);
  }

  return module;
}();