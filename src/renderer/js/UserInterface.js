module.exports = function() {
  var module = {};

  const Path = require("path");

  var File = require(Path.resolve('src/renderer/js/File.js'));
  var Storage = require(Path.resolve('src/renderer/js/Storage.js'));
  var Spotify = require(Path.resolve('src/renderer/js/Spotify.js'));

  var __playlistSelection = document.getElementById('playlist-selection');
  var __menu = document.getElementById('menu');
  var __exportPlaylistNames = document.getElementById('export-playlist-names');
  var __exportSelected = document.getElementById('export-selected');
  var __exportAll = document.getElementById('export-all');

  module.PlaylistSelection = {
    refresh: function() {
      var playlists = Storage.getPlaylists();

      playlists.forEach((playlist) => {
        var li = document.createElement('li');
        var label = document.createElement('label');
        var checkbox = document.createElement('input');

        checkbox.type = "checkbox";
        checkbox.name = "playlist";
        checkbox.value = playlist.id;

        li.classList.add("playlist");

        label.appendChild(checkbox);
        li.appendChild(label);

        label.innerHTML += playlist.name;
        __playlistSelection.appendChild(li);
      })
    }
  }

  module.Menu = {
    init: function() {
      __exportPlaylistNames.onclick = function() {
        File.create().
        then((file) => {
          File.append(file, JSON.stringify(Storage.getPlaylists(), null, 2));
        });
      };
      __exportSelected.onclick = function() {
        console.log("Not implemented yet");
      };
      __exportAll.onclick = function() {
        File.create().
        then((file) => {
          var playlistUrls = new Array();
          Storage.getPlaylists().forEach((playlist) => playlistUrls.push(playlist.tracks.href));

          function fetchAllPlaylists(i) {
            Spotify.fetchTracks(playlistUrls[i])
            .then((tracks) => {
              console.log(tracks);
              tracks.playlistName = Storage.getPlaylists()[i].name;
              File.append(file, JSON.stringify(tracks, null, 2));
              if (i < playlistUrls.length - 1) {
                console.log(i);
                fetchAllPlaylists(++i);
              }
            });
          }

          fetchAllPlaylists(0);
        });
      };
    },
    show: function() {
      __menu.style.display = "block";
    },
    hide: function() {
      __menu.style.display = "none";
    }
  }

  return module;
}();