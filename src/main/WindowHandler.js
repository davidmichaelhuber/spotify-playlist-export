module.exports = function(app) {
  var module = {};

  const {BrowserWindow} = require('electron');

  var windows = {};

  module.new = function(name, options) {
    win = new BrowserWindow(options);
    windows[name] = win;
    return win;
  }

  module.get = function(name) {
    return windows[name];
  }

  return module;
}();