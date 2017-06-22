module.exports = function() {
  var module = {};

  var EventBridge = require('./EventBridge.js');

  var playlists = null;
  var playlistNames = null;

  module.setPlaylists = function(data) {
    playlists = data;
  }

  module.getPlaylistNames = function() {
    if (playlistNames === null) {
      playlistNames = new Array();
      for(var i = 0; i < playlists.length; i++) {
        var items = playlists[i].items;
        for(var j = 0; j < items.length; j++) {
          playlistNames.push(items[j].name);
        }
      }
    }
    return playlistNames;
  };

  module.getPlaylistTrackNames = function() {

  };

  return module;
}();