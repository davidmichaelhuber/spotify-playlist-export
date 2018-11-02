module.exports = function() {
  var module = {};

  var Request = require('request');

  var ApiOptions = require('./ApiOptions.js');

  module.fetchUserId = function(callback) {
    __getJson(ApiOptions.userId()).then(
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
    __getJson(ApiOptions.playlists()).then(
    (data) => {
      callback(data);
    },
    (error) => {
      console.log("ApiHandler.fetchPlaylists() rejected: " + error);
    }).catch((error) => {
      console.log("ApiHandler.fetchPlaylists() caught: " + error);
    });
  }

  module.fetchTracks = function(url, callback) {
    __getJson(ApiOptions.tracks(url)).then(
    (data) => {
      callback(url, data);
    },
    (error) => {
      console.log("ApiHandler.fetchTracks() rejected: " + error);
      callback(null, null);
    }).catch((error) => {
      console.log("ApiHandler.fetchTracks() caught: " + error);
    });
  }

  /*
  Gets JSON from options.url
  */
  function __getJson(options) {
    return new Promise(function(resolve, reject) {
      var data = new Array();
      function getAllPages() {
        if (!isEmpty(options.url)) {
          Request.get(options, function(error, response, body) {
            if (error || response.statusCode !== 200) {
              reject("ApiHandler.__getJson() failed - " + error);
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