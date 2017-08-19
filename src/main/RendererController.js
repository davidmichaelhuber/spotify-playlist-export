module.exports = function() {
  var module = {};

  const {ipcMain: IpcMain} = require('electron');

  var ApiController = require('./ApiController.js');
  var EventList = require('./EventList.js');
  var WindowController = require('./WindowController.js');

  module.subscribeRendererMessages = function() {
    IpcMain.on(EventList.fetchPlaylists, (event, arg) => {
      __fetchPlaylists();
    });

    IpcMain.on(EventList.fetchTracks, (event, arg) => {
      __fetchTracks(arg);
    });
  }

  function __fetchPlaylists() {
    console.log('Renderer triggered event: ' + EventList.fetchPlaylists);
    ApiController.fetchPlaylists((data) => {
      WindowController.send(
        'main',
        EventList.fetchPlaylists,
        data);
    });
  }

  function __fetchTracks(url) {
    console.log('Renderer triggered event: ' + EventList.fetchTracks + " url: " + url);
    ApiController.fetchTracks(url, (url, data) => {
      WindowController.send(
        'main',
        EventList.fetchTracks,
        [url, data]);
    });
  }

  return module;
}();