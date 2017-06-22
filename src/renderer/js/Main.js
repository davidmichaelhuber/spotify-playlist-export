const {ipcRenderer} = require('electron')

ipcRenderer.send('frontend-ready');

ipcRenderer.send('request-playlist-names');

ipcRenderer.on('response-playlist-names', (event, arg) => {
})

/*
ipcRenderer.on('progress-reply', (event, arg) => {
  console.log("Export progress: " + arg + "%");
  if (arg >= 100) {
    clearInterval(progressUpdateInterval);
  }
})

var progressUpdateInterval = setInterval(() => {
  ipcRenderer.send('progress-request');
}, 500);
*/