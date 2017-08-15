module.exports = function() {
  var module = {};

  const {ipcRenderer: IpcRenderer} = require('electron');
  const Path = require("path");

  var EventList = require(Path.resolve('src/main/EventList.js'));

  module.playlists = function() {
    return new Promise((resolve, reject) => {
      IpcRenderer.send(EventList.fetchPlaylists);
      IpcRenderer.on(EventList.fetchPlaylists, (event, arg) => {
        resolve(__depaginate(arg));
      });
    });
  }

  module.tracks = function(playlistId) {
    return new Promise((resolve, reject) => {
      IpcRenderer.send(EventList.fetchTracks, playlistId);
      IpcRenderer.on(EventList.fetchTracks, (event, arg) => {
        resolve(__depaginate(arg));
      });
    });
  }

  function __depaginate(pages) {
    var items = new Array();

    pages.forEach((page) => {
      Array.prototype.push.apply(items, Object.values(page.items));
    })

    return items;
  }

  return module;
}();