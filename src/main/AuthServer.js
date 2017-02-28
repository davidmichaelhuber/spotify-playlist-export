module.exports = function() {
  var module = {};

  var express = require('express');
  var request = require('request');
  var querystring = require('querystring');
  var cookieParser = require('cookie-parser');

  var SpotifyApiCom = require('./SpotifyApiCom.js');

  var client_id = process.env.CLIENT_ID;
  var client_secret = process.env.CLIENT_SECRET;
  var redirect_uri = 'http://localhost:8080/callback';

  var stateKey = 'spotify_auth_state';
  var app = express();

  module.start = function() {
    setRoutes();
    console.log('Listening on 8080');
    app.listen(8080);
  }

  function setRoutes() {
    app.use(express.static(__dirname + '/public'))
       .use(cookieParser());

    app.get('/login', function(req, res) {
      var state = generateRandomString(16);
      res.cookie(stateKey, state);

      var scope = 'playlist-read-private playlist-read-collaborative';
      res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state
        }));
    });

    app.get('/callback', function(req, res) {
      var code = req.query.code || null;
      var state = req.query.state || null;
      var storedState = req.cookies ? req.cookies[stateKey] : null;

      if (state === null || state !== storedState) {
        res.redirect('/#' +
          querystring.stringify({
            error: 'state_mismatch'
          }));
      } else {
        res.clearCookie(stateKey);
        var authOptions = {
          url: 'https://accounts.spotify.com/api/token',
          form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
          },
          headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
          },
          json: true
        };

        request.post(authOptions, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            var access_token = body.access_token,
                refresh_token = body.refresh_token;
            console.log("Access Token received, redirect to /export/?accessToken=...");
            res.redirect('/export/?accessToken=' + access_token);
          } else {
            console.log("Access Token not received, redirect to /error/?msg=...");
            res.redirect('/error/?msg=access_token_not_received')
          }
        });
      }
    });

    app.get('/refresh_token', function(req, res) {
      var refresh_token = req.query.refresh_token;
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
          grant_type: 'refresh_token',
          refresh_token: refresh_token
        },
        json: true
      };

      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var access_token = body.access_token;
          res.send({
            'access_token': access_token
          });
        }
      });
    });

    app.get('/error', function(req, res) {
      res.send('Error message: ' + req.query.msg)
    });

    app.get('/export', function(req, res) {
      res.send('Authentication Success')
      console.log(req.query.accessToken);
      SpotifyApiCom.start(req.query.accessToken);
    });
  }

  function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  return module;
}();