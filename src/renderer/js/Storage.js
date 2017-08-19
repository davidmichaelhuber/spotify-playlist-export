module.exports = function() {
  var module = {};

  var __playlists = null;
  var __tracks = null;

  module.setPlaylists = function(playlists) {
    if (__playlists == null) {
      __playlists = new Array();
    }
    __playlists = playlists;
  }

  module.setTracks = function(tracks) {
    if (__tracks == null) {
      __tracks = new Array();
    }
    __tracks.push(tracks);
  }

  module.getPlaylists = function(playlists) {
    return __playlists;
  }

  return module;
}();