module.exports = function() {
  var module = {};

  var request = require('request');

  var ApiData = require('./ApiData.js');
  var ApiOptions = null;
  var File = require('./File.js');
  var IPC = require('./IPC.js');

  var playlists = null;

  module.init = function(accessToken) {
    ApiOptions = require('./ApiOptions.js')(accessToken);
  }

  module.fetchPlaylists = function() {
    getJson(ApiOptions.playlists()).then(
    (data) => {
      ApiData.setPlaylists(data);
      IPC.onRequestPlaylistNamesDone();
    },
    (error) => {
      console.log("ApiHandler.fetchPlaylists() rejected: " + error);
    }).catch((error) => {
      console.log("ApiHandler.fetchPlaylists() caught: " + error);
    });
  }

  module.fetchPlaylistTracks = function(playlist) {

  }

  /*
  Gets JSON from options.url
  */
  var getJson = function(options) {
    return new Promise(function(resolve, reject) {
      var data = new Array();
      function getAllPages() {
        if (!isEmpty(options.url)) {
          request.get(options, function(error, response, body) {
            if (error || response.statusCode !== 200) {
              reject("ApiHandler.getJson() failed - " + error);
            }
            data.push(body);
            options.url = body.next;
            getAllPages();
          });
        } else {
          resolve(data);
        }
      }
      getAllPages();
    });
  };

  /* **************************************************
  Helper
  ************************************************** */

  function isEmpty(str) {
    return (!str || 0 === str.length);
  }

  return module;
}();