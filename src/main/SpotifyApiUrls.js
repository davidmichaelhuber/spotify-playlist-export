module.exports = function(accessToken) {
  var module = {};

  const PLAYLIST_LIMIT = 50;
  const TRACK_LIMIT = 100;

  module.playlists = {
    url: 'https://api.spotify.com/v1/me/playlists?limit=' + PLAYLIST_LIMIT,
    headers: { 'Authorization': 'Bearer ' + accessToken },
    json: true
  };

  return module;
};