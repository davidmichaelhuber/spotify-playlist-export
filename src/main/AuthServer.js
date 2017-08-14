module.exports = function() {
  var module = {};

  var Express = require('express');
  var Request = require('request');
  var Querystring = require('querystring');
  var CookieParser = require('cookie-parser');
  var Path = require('path');

  var ApiController = require('./ApiController.js');
  var RendererController = require('./RendererController.js');

  var __clientId = process.env.CLIENT_ID;
  var __clientSecret = process.env.CLIENT_SECRET;
  var __redirectUri = 'http://localhost:8080/callback';

  var __stateKey = 'spotify_auth_state';
  var __app = Express();

  module.start = function() {
    __setRoutes();
    console.log('Listening on 8080');
    __app.listen(8080);
  }

  function __setRoutes() {
    __app.use(Express.static(__dirname + '/public'))
       .use(CookieParser());

    __app.use(Express.static(__dirname + '/../renderer'));

    __app.get('/login', function(req, res) {
      var state = __generateRandomString(16);
      res.cookie(__stateKey, state);

      var scope = 'playlist-read-private playlist-read-collaborative';
      res.redirect('https://accounts.spotify.com/authorize?' +
        Querystring.stringify({
          response_type: 'code',
          client_id: __clientId,
          scope: scope,
          redirect_uri: __redirectUri,
          state: state
        }));
    });

    __app.get('/callback', function(req, res) {
      var code = req.query.code || null;
      var state = req.query.state || null;
      var storedState = req.cookies ? req.cookies[__stateKey] : null;

      if (state === null || state !== storedState) {
        res.redirect('/#' +
          Querystring.stringify({
            error: 'state_mismatch'
          }));
      } else {
        res.clearCookie(__stateKey);
        var authOptions = {
          url: 'https://accounts.spotify.com/api/token',
          form: {
            code: code,
            redirect_uri: __redirectUri,
            grant_type: 'authorization_code'
          },
          headers: {
            'Authorization': 'Basic ' + (new Buffer(__clientId + ':' + __clientSecret).toString('base64'))
          },
          json: true
        };

        Request.post(authOptions, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            var access_token = body.access_token,
                refresh_token = body.refresh_token;
            res.redirect('/export/?accessToken=' + access_token);
          } else {
            res.redirect('/error/?msg=access_token_not_received')
          }
        });
      }
    });

    __app.get('/refresh_token', function(req, res) {
      var refresh_token = req.query.refresh_token;
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(__clientId + ':' + __clientSecret).toString('base64')) },
        form: {
          grant_type: 'refresh_token',
          refresh_token: refresh_token
        },
        json: true
      };

      Request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var access_token = body.access_token;
          res.send({
            'access_token': access_token
          });
        }
      });
    });

    __app.get('/error', function(req, res) {
      res.send('Error message: ' + req.query.msg)
    });

    __app.get('/export', function(req, res) {
      ApiController.init(req.query.accessToken, () => {
        // Back-end is ready for API communication, load front-end
        // User input will control further execution
        RendererController.subscribeRendererMessages();
        res.sendFile(Path.resolve(__dirname + '/../renderer/html/main.html'));
      });
    });
  }

  function __generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  return module;
}();