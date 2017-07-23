module.exports = function() {
  var module = {};

  const PLAYLISTS_LIMIT = 50;
  const PLAYLIST_TRACK_LIMIT = 100;
  const PLAYLIST_TRACKS_FIELDS = "items(track.name),next";

  var _accessToken = null;

  module.setAccessToken = function(accessToken) {
    _accessToken = accessToken;
  }

  module.playlists = function() {
    return {
      url: 'https://api.spotify.com/v1/me/playlists?limit=' + PLAYLISTS_LIMIT,
      headers: { 'Authorization': 'Bearer ' + _accessToken },
      json: true
    }
  };

  module.playlistTracks = function(url) {
    return {
      url: url + '?fields=' + PLAYLISTS_TRACKS_FIELDS + '&limit=' + PLAYLISTS_TRACKS_LIMIT,
      headers: { 'Authorization': 'Bearer ' + _accessToken },
      json: true
    }
  };

  return module;
}();