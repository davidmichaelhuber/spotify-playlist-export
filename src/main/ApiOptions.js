module.exports = function() {
  var module = {};

  const PLAYLISTS_LIMIT = 50;
  const PLAYLIST_TRACK_LIMIT = 100;

  var __accessToken = null;
  var __userId = null;

  module.setAccessToken = function(accessToken) {
    __accessToken = accessToken;
  }

  module.setUserId = function(userId) {
    __userId = userId;
  }

  module.userId = function() {
    return {
      url: 'https://api.spotify.com/v1/me',
      headers: { 'Authorization': 'Bearer ' + __accessToken },
      json: true
    }
  };

  module.playlists = function() {
    return {
      url: 'https://api.spotify.com/v1/users/' + __userId + '/playlists?limit=' + PLAYLISTS_LIMIT,
      headers: { 'Authorization': 'Bearer ' + __accessToken },
      json: true
    }
  };

  module.tracks = function(playlistId) {
    return {
      url: 'https://api.spotify.com/v1/users/' + __userId + '/playlists/' + playlistId + '/tracks?limit=' + PLAYLIST_TRACK_LIMIT,
      headers: { 'Authorization': 'Bearer ' + __accessToken },
      json: true
    }
  };

  return module;
}();