(function() {
  const {ipcRenderer: IpcRenderer} = require('electron');
  const Path = require("path");

  var Spotify = require(Path.resolve('src/renderer/js/Spotify.js'));
  var Storage = require(Path.resolve('src/renderer/js/Storage.js'));
  var UserInterface = require(Path.resolve('src/renderer/js/UserInterface.js'));

  Spotify.fetchPlaylists()
  .then((playlists) => {
    Storage.setPlaylists(playlists);
    UserInterface.PlaylistSelection.refresh();
    UserInterface.Menu.init();
    UserInterface.Menu.show();
  })
})();