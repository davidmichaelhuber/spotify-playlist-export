module.exports = function() {
  var module = {};

  const {ipcRenderer: IpcRenderer} = require('electron');
  const Path = require("path");

  var EventList = require(Path.resolve('src/main/EventList.js'));

  module.fetchPlaylists = function() {
    return new Promise((resolve, reject) => {
      IpcRenderer.send(EventList.fetchPlaylists);
      IpcRenderer.once(EventList.fetchPlaylists, (event, arg) => {
        resolve(__depaginate(arg));
      });
    });
  }

  module.fetchTracks = function(url) {
    return new Promise((resolve, reject) => {
      IpcRenderer.send(EventList.fetchTracks, url);
      IpcRenderer.once(EventList.fetchTracks, (event, arg) => {
        var items = __depaginate(arg[1]);
        var tracks = {};
        tracks.playlistUrl = arg[0];
        tracks.items = items;
        resolve(tracks);
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