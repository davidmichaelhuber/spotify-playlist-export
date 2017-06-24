module.exports = function() {
  var module = {};

  const {ipcRenderer} = require('electron');

  module.setListener = function(channel, callback) {
    ipcRenderer.on(channel, (event, arg) => {
      callback(event, arg);
    });
  }

  module.send = function(ch, arg) {
    ipcRenderer.send(ch, arg);
  }

  return module;
}();