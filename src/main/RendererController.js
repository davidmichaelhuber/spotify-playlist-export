module.exports = function() {
  var module = {};

  const {ipcMain: IpcMain} = require('electron');

  var ApiController = require('./ApiController.js');
  var EventList = require('./EventList.js');
  var WindowController = require('./WindowController.js');

  module.subscribeRendererMessages = function() {
    IpcMain.on(EventList.getPlaylists, (event, arg) => {
      __getPlaylists(arg);
    });

    IpcMain.on(EventList.getTracks, (event, arg) => {
      __getTracks(arg);
    });
  }

  function __getPlaylists(arg) {
    console.log('Renderer triggered event: ' + EventList.getPlaylists);
    ApiController.fetchPlaylists(() => {
      WindowController.send('main', EventList.getPlaylists, ApiController.getPlaylists());
    });
  }

  function __getTracks(arg) {
    console.log('Renderer triggered event: ' + EventList.getTracks);
    ApiController.fetchTracks(arg, (playlistId) => {
      WindowController.send('main', EventList.getTracks, ApiController.getTracks(playlistId));
    });
  }

  return module;
}();