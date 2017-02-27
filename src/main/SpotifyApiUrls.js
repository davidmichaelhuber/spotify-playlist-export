var SpotifyApiUrls = (function() {
  const PLAYLIST_LIMIT = 50;
  const TRACK_LIMIT = 100;

  var playlists = null;

  function setAll(accessToken) {
    this.playlists = {
      url: 'https://api.spotify.com/v1/me/playlists?limit=' + PLAYLIST_LIMIT,
      headers: { 'Authorization': 'Bearer ' + accessToken },
      json: true
    };
  }

  return function() {
    return {
      setAccessToken: setAll,
      playlists: playlists
    }
  }

})();

module.exports = new SpotifyApiUrls();