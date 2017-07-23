module.exports = function() {
  var module = {};

  var playlists = null;
  var playlistsCompressed = null;

  module.setPlaylists = function(data) {
    playlists = data;
  }

  module.getPlaylists = function() {
    if (playlistsCompressed === null) {
      playlistsCompressed = new Array();
    }

    for(var i = 0; i < playlists.length; i++) {
      var items = playlists[i].items;
      for(var j = 0; j < items.length; j++) {
        playlistsCompressed.push({
          id: items[j].id,
          name: items[j].name
        });
      }
    }
    return playlistsCompressed;
  };

  module.getPlaylistTrackNames = function() {

  };

  return module;
}();