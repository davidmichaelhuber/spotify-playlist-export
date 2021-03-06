module.exports = function() {
  var module = {};

  const {BrowserWindow} = require('electron');

  var windows = {};

  module.create = function(name, options) {
    // TODO: Check if window with given name already exists
    windows[name] = new BrowserWindow(options);
    return windows[name];
  }

  module.get = function(name, options) {
    // TODO: Check if window with given name even exists
    return windows[name];
  }

  module.send = function(name, event, data) {
    this.get(name).webContents.send(event, data);
  }

  return module;
}();