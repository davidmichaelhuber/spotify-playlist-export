module.exports = function() {
  var module = {};

  var request = require('request');

  var OutputFile = require('./OutputFile.js');
  var SpotifyApiUrls = null;

  var playlists = new Array();
  var trackAmount = 0;
  var trackProgress = 0;

  module.getProgress = function() {
    if (trackProgress <= 0) {
      return 0;
    } else {
      return Math.floor((trackProgress / trackAmount) * 100);
    }
  }

  module.start = function(accessToken) {
    SpotifyApiUrls = require('./SpotifyApiUrls.js')(accessToken);

    processPlaylists().then(() => {
      countTracks();
      if (trackAmount > 0) {
        return OutputFile.create();
      } else {
        return Promise.reject();
      }
    }).then(() => {
      return processTracks();
    }, () => {
    }).then(() => {
    }, () => {
    });
  }

  function processPlaylists() {
    console.log("Start processing playlists...");
    return new Promise(
      function(resolve, reject) {
        callForEachPage(
          SpotifyApiUrls.playlists(),
          (body) => {
            if(body && body.hasOwnProperty("items")) {
              playlists = playlists.concat(body.items);
            }
          },
          () => {
            console.log("Done processing playlists!");
            console.log("Playlist amount: " + playlists.length);
            resolve();
          },
          () => {
            console.log("Failed processing playlists!");
            reject();
          });
      });
  }

  function countTracks() {
    for(var i = 0; i < playlists.length; i++) {
      trackAmount += playlists[i].tracks.total;
    }
  }

  function processTracks() {
    console.log("Start processing tracks...");
    return new Promise(
      function(resolve, reject) {
        processSinglePlaylistsTracks(0);

        function processSinglePlaylistsTracks(currentPlaylist) {
          OutputFile.append("- " + playlists[currentPlaylist].name);
          callForEachPage(
            SpotifyApiUrls.playlists_tracks(playlists[currentPlaylist].tracks.href),
            (body) => {
              if(body && body.hasOwnProperty("items")) {
                for (var i = 0; i < body.items.length; i++) {
                  OutputFile.append("--- " + body.items[i].track.name);
                  trackProgress++;
                }
              }
            },
            () => {
              if (currentPlaylist >= playlists.length - 1) {
                console.log("Done processing tracks!");
                resolve();
              } else {
                processSinglePlaylistsTracks(++currentPlaylist);
              }
            },
            () => {
              console.log("Failed processing tracks!");
              reject();
            });
        }
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

  return module;
}();