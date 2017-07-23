module.exports = function() {
  var module = {};

  const {ipcMain} = require('electron');

  var ApiController = require('./ApiController.js');
  var WindowController = require('./WindowController.js');

  module.subscribeRendererMessages = function() {
    ipcMain.on('main', (event, arg) => {
      console.log('Renderer: ' + arg);
      if(arg == 'get-playlists') {
        ApiController.fetchPlaylists(() => {
          WindowController.get('main').webContents.send('get-playlists', ApiController.getPlaylists());
        });
      }
    });
  }

  return module;
}();