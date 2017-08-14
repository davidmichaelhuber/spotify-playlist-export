module.exports = function() {
  var module = {};

  var Request = require('request');

  var ApiOptions = require('./ApiOptions.js');

  var playlists = null;

  module.fetchUserId = function(callback) {
    getJson(ApiOptions.userId()).then(
    (data) => {
      ApiOptions.setUserId(data[0].id);
      callback();
    },
    (error) => {
      console.log("ApiHandler.fetchUserId() rejected: " + error);
    }).catch((error) => {
      console.log("ApiHandler.fetchUserId() caught: " + error);
    });
  }

  module.fetchPlaylists = function(callback) {
    getJson(ApiOptions.playlists()).then(
    (data) => {
      callback(data);
    },
    (error) => {
      console.log("ApiHandler.fetchPlaylists() rejected: " + error);
    }).catch((error) => {
      console.log("ApiHandler.fetchPlaylists() caught: " + error);
    });
  }

  module.fetchTracks = function(playlistId, callback) {
    getJson(ApiOptions.tracks(playlistId)).then(
    (data) => {
      callback(playlistId, data);
    },
    (error) => {
      console.log("ApiHandler.fetchTracks() rejected: " + error);
    }).catch((error) => {
      console.log("ApiHandler.fetchTracks() caught: " + error);
    });
  }

  /*
  Gets JSON from options.url
  */
  var getJson = function(options) {
    return new Promise(function(resolve, reject) {
      var data = new Array();
      function getAllPages() {
        if (!isEmpty(options.url)) {
          Request.get(options, function(error, response, body) {
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