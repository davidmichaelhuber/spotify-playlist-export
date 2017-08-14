module.exports = function() {
  var module = {};

  module.frontendReady = 'frontend-ready';
  module.fetchPlaylists = 'fetch-playlists';
  module.fetchTracks = 'fetch-tracks';

  return module;
}();