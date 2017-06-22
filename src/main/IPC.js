module.exports = function() {
  var module = {};

  const {ipcMain} = require('electron');

  var ApiData = require('./ApiData.js');
  var ApiHandler = require('./ApiHandler.js');
  var WindowHandler = require('./WindowHandler.js');

  ipcMain.on('request-playlist-names', (event, arg) => {

    //console.log(ApiData);
    //console.log(ApiHandler);
    console.log(WindowHandler);

    /* ApiHandler.fetchPlaylists() not working
    The reason for this not working is a circular
    dependency between ApiHandler and IPC */
    //require('./ApiHandler.js').fetchPlaylists();
  });

  module.onRequestPlaylistNamesDone = function() {
    WindowHandler.get("main").webContents.send('response-playlist-names', ApiData.getPlaylistNames());
  }

  return module;
}();