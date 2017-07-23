(function() {
  /*
  const path = require("path");
  var EventBridge = require(path.resolve('src/renderer/js/EventBridge.js'));
  */

  const {ipcRenderer} = require('electron');

  ipcRenderer.send('main', 'frontend-ready');

  ipcRenderer.on('get-playlists', (event, arg) => {
    for(var i = 0; i < arg.length; i++) {
      var a = document.createElement('a');
      var li = document.createElement('li');
      a.setAttribute('href', "#");
      a.setAttribute('data-playlist-id', arg[i].id);
      li.innerHTML = arg[i].name;
      a.appendChild(li);
      document.getElementById('playlists').appendChild(a);
    }
  });
  ipcRenderer.send('main', 'get-playlists');

})();