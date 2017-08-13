module.exports = function() {
  var module = {};

  var playlists = null;
  var playlistsCompressed = null;
  var playlistTracksDict = null;

  module.setPlaylists = function(data) {
    playlists = data;
  }

  module.setTracks = function(playlistId, data) {
    if (playlistTracksDict == null) {
      playlistTracksDict = new Array();
    }
    playlistTracksDict.push({
      playlistId: playlistId,
      tracks: data
    });
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

  module.getTracks = function(playlistId) {
    for (var i = 0; i < playlistTracksDict.length; i++) {
      if (playlistTracksDict[i].playlistId == playlistId) {
        return playlistTracksDict[i].tracks;
      }
    }
  }

  return module;
}();