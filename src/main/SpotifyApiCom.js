var SpotifyApiCom = (function() {
  var request = require('request');

  var SpotifyApiUrls = require('./SpotifyApiUrls.js');

  var playlists = new Array();
  var trackCount = 0;

  function getPlaylists() {
    return new Promise(
      function(resolve, reject) {
        callForEachPage(
          SpotifyApiUrls.playlists,
          (body) => {
            if(body && body.hasOwnProperty("items")) {
              playlists = playlists.concat(body.items);
            }
          },
          () => {
            resolve();
          },
          () => {
            reject();
          });
      });
  }

  /* Calls call after each received page, done after last page was received */
  function callForEachPage(options, call, done, failed) {
    request.get(options, function(error, response, body) {
      if(body) {
        if (response && response.statusCode !== 200) {
          console.log("Error - API response status code: " + response.statusCode);
          failed();
        }
        call(body);
        if(body.hasOwnProperty("next") && body.next != null) {
          options.url = body.next;
          callForEachPage(options, call, done, error);
        } else {
          done();
        }
      } else {
        failed();
      }
    });
  }

  return function() {
    return {
      start: function(accessToken) {
        SpotifyApiUrls.setAccessToken(accessToken);

        console.log("Start loading playlists...");
        getPlaylists().then(() => {
          console.log("Done loading playlists!");
          console.log("Playlist amount: " + playlists.length);
          return getPlaylists();
        }, () => {
          console.log("Failed loading playlists!");
          return Promise.reject();
        }).then(() => {
          console.log("Start loading tracks...");
        });
      }
    }
  }
})();

module.exports = new SpotifyApiCom();

/*
function createFile(callback, res) {
  dialog.showSaveDialog(function (fileName) {
    if (fileName === undefined){
      console.log("File save dialog was canceled by user");
      res.redirect('/error/?msg=file_save_dialog_canceled')
    }
    fs.writeFile(fileName, "", function (err) {
    if(err){
      console.log("An error ocurred creating the file "+ err.message)
    }
      console.log("The file has been succesfully saved");
    });
  });
}
*/