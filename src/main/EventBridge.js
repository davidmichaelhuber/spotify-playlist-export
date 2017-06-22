module.exports = function() {
  var module = {};

  var EventBehaviour = null;

  module.init = function () {
    EventBehaviour = require('./EventBehaviour');
  }

  module.emit = function(event, arg) {
    console.log("Event received: " + event);
    console.log("Calling: " + eventNameToFunctionName(event));
    EventBehaviour[eventNameToFunctionName(event)](arg);
  }

  /* **************************************************
  Helper
  ************************************************** */

  function eventNameToFunctionName(event) {
    var indices = getCharacterPositions(event, '-');
    var fn = capitalizeFirst(event);
    fn = capitalizeAfter(fn, indices);
    fn = removeAt(fn, indices)
    fn = 'on' + fn;
    return fn;
  }

  function getCharacterPositions(str, ch) {
    var indices = [];
    for(var i = 0; i < str.length;i++) {
      if (str[i] === ch) indices.push(i);
    }
    return indices;
  }

  function capitalizeFirst(str) {
    return upperCaseAt(str, [0]);
  }

  function capitalizeAfter(str, indices) {
    indices = indices.map((index) => {return ++index;});
    return upperCaseAt(str, indices);
  }

  function upperCaseAt(str, indices) {
    for(var i = 0; i < indices.length; i++) {
      str = str.substr(0, indices[i]) + str.charAt(indices[i]).toUpperCase() + str.substr(indices[i] + 1, str.length);
    }
    return str;
  }

  function removeAt(str, indices) {
    for(var i = 0; i < indices.length; i++) {
      str = str.substr(0, indices[i]) + str.substr(indices[i] + 1, str.length);
      indices = indices.map((index) => {return --index;});
    }
    return str;
  }

  /*
  var ApiData = require('./ApiData.js');
  var ApiHandler = require('./ApiHandler.js');
  // var IPC = require('./IPC.js');
  // ipcMain instead of IPC?
  const {ipcMain} = require('electron');

  module.onRequestPlaylistNamesDone = function() {
    IPC.send('main', 'response-playlist-names', ApiData.getPlaylistNames());
  }

  ipcMain.on("request-playlist-names", () => {
    ApiHandler.fetchPlaylists();
  });
  */

  return module;
}();