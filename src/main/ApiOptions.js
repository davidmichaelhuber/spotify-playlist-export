module.exports = function(accessToken) {
  var module = {};

  const PLAYLISTS_LIMIT = 50;
  const PLAYLIST_TRACK_LIMIT = 100;
  const PLAYLIST_TRACKS_FIELDS = "items(track.name),next";

  module.playlists = function() {
    return {
      url: 'https://api.spotify.com/v1/me/playlists?limit=' + PLAYLISTS_LIMIT,
      headers: { 'Authorization': 'Bearer ' + accessToken },
      json: true
    }
  };

  module.playlistTracks = function(url) {
    return {
      url: url + '?fields=' + PLAYLISTS_TRACKS_FIELDS + '&limit=' + PLAYLISTS_TRACKS_LIMIT,
      headers: { 'Authorization': 'Bearer ' + accessToken },
      json: true
    }
  };

  return module;
};