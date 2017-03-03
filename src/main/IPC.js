module.exports = function() {
  var module = {};

  const {ipcMain} = require('electron');

  var SpotifyApiCom = require('./SpotifyApiCom.js');

  ipcMain.on('progress-request', (event, arg) => {
    event.sender.send('progress-reply', SpotifyApiCom.getProgress());
  })

}();