module.exports = function() {
  var module = {};

  const {ipcMain} = require('electron');

  var WindowHandler = require('./WindowHandler.js');

  module.setListener = function(channel, callback) {
    ipcMain.on(channel, (event, arg) => {
      callback(event, arg);
    });
  }

  module.send = function(win, ch, arg) {
    WindowHandler.get(win).webContents.send(ch, arg);
  }

  return module;
}();