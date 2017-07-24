// TODO: Use AngularJS for frontend

(function() {
  const {ipcRenderer} = require('electron');
  const path = require("path");

  var EventList = require(path.resolve('src/main/EventList.js'));

  console.log(EventList.frontendReady);

  ipcRenderer.send(EventList.frontendReady);

  ipcRenderer.on(EventList.getPlaylists, (event, arg) => {
    for(var i = 0; i < arg.length; i++) {
      var a = document.createElement('a');
      var li = document.createElement('li');

      a.setAttribute('href', "#");
      a.setAttribute('data-playlist-id', arg[i].id);
      a.classList.add('playlist-button');
      li.innerHTML = arg[i].name;

      a.onclick = function() {
        console.log(this.getAttribute('data-playlist-id'));
        ipcRenderer.send(EventList.getTracks, this.getAttribute('data-playlist-id'));
      };

      a.appendChild(li);

      document.getElementById('playlists').appendChild(a);
    }
  });
  ipcRenderer.send(EventList.getPlaylists);

})();