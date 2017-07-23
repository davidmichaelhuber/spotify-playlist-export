module.exports = function() {
  var module = {};

  var ApiData = require('./ApiData.js');
  var ApiHandler = require('./ApiHandler.js');
  var ApiOptions = require('./ApiOptions.js');

  module.init = function(accessToken) {
    ApiOptions.setAccessToken(accessToken);
  }

  module.fetchPlaylists = function(callback) {
    ApiHandler.fetchPlaylists(callback);
  }

  module.getPlaylists = function() {
    return ApiData.getPlaylists();
  }

  return module;
}();