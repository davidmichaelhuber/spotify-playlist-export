module.exports = function() {
  var module = {};

  const {ipcMain} = require('electron');

  var ApiController = require('./ApiController.js');
  var EventList = require('./EventList.js');
  var WindowController = require('./WindowController.js');

  module.subscribeRendererMessages = function() {
    ipcMain.on(EventList.getPlaylists, (event, arg) => {
      _getPlaylists(arg);
    });

    ipcMain.on(EventList.getTracks, (event, arg) => {
      _getTracks(arg);
    });
  }

  function _getPlaylists(arg) {
    console.log('Renderer triggered event: ' + EventList.getPlaylists);
    ApiController.fetchPlaylists(() => {
      WindowController.send('main', EventList.getPlaylists, ApiController.getPlaylists());
    });
  }

  function _getTracks(arg) {
    console.log('Renderer triggered event: ' + EventList.getTracks);
    ApiController.fetchTracks(arg, (playlistId) => {
      WindowController.send('main', EventList.getTracks, ApiController.getTracks(playlistId));
    });
  }

  return module;
}();