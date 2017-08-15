(function() {
  const {ipcRenderer: IpcRenderer} = require('electron');
  const Path = require("path");

  var Spotify = require(Path.resolve('src/renderer/js/Spotify.js'));

  Spotify.playlists()
  .then((playlists) => {
    console.log(playlists);
    return Spotify.tracks("5yCMlatWwA4iNGVXlyKTjp");
  })
  .then((tracks) => {
    console.log(tracks);
  });

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