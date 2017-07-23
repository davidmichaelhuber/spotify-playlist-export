module.exports = function() {
  var module = {};

  const {BrowserWindow} = require('electron');

  var windows = {};

  module.create = function(name, options) {
    // TODO: Check if window with given name already exists
    windows[name] = new BrowserWindow(options);
  }

  module.get = function(name, options) {
    // TODO: Check if window with given name even exists
    return windows[name];
  }

  return module;
}();