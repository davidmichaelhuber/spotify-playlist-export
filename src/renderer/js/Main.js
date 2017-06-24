(function() {
  const path = require("path");
  var EventBridge = require(path.resolve('src/renderer/js/EventBridge.js'));

  EventBridge.init();
  EventBridge.emit('request-playlist-names');
})();