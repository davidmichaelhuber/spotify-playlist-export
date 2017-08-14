(function() {
  const {ipcRenderer:IpcRenderer} = require('electron');
  const Path = require("path");

  var EventList = require(Path.resolve('src/main/EventList.js'));

  IpcRenderer.on(EventList.fetchPlaylists, (event, arg) => {
    console.log(arg);
  });

  IpcRenderer.on(EventList.fetchTracks, (event, arg) => {
    console.log(arg);
  });

  IpcRenderer.send(EventList.frontendReady);
  IpcRenderer.send(EventList.fetchPlaylists);
  IpcRenderer.send(EventList.fetchTracks, "5yCMlatWwA4iNGVXlyKTjp");

  /*
    console.log(EventList.frontendReady);

    ipcRenderer.send(EventList.frontendReady);

    ipcRenderer.on(EventList.fetchPlaylists, (event, arg) => {
      for(var i = 0; i < arg.length; i++) {
        var a = document.createElement('a');
        var li = document.createElement('li');

        a.setAttribute('href', "#");
        a.setAttribute('data-playlist-id', arg[i].id);
        a.classList.add('playlist-button');
        li.innerHTML = arg[i].name;

        a.onclick = function() {
          console.log(this.getAttribute('data-playlist-id'));
          ipcRenderer.send(EventList.fetchTracks, this.getAttribute('data-playlist-id'));
        };

        a.appendChild(li);

        document.getElementById('playlists').appendChild(a);
      }
    });

    ipcRenderer.on(EventList.fetchTracks, (event, arg) => {
      console.log(arg);
    });

    ipcRenderer.send(EventList.fetchPlaylists);
  */
})();