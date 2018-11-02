module.exports = function() {
  var module = {};

  const dialog = require('electron').remote.dialog
  var fs = require('fs');
  var os = require('os');

  module.create = function() {
    return new Promise(function(resolve, reject) {
      dialog.showSaveDialog(function (file) {
        if (file === undefined){
          console.log("File save dialog was canceled by user");
          reject();
        }
        fs.writeFile(file + ".txt", "", function (err) {
          if(err){
            console.log("An error ocurred creating the file "+ err.message)
            reject();
          }
          console.log(file + " has been succesfully created");
          resolve(file);
        });
      });
    });
  }

  module.append = function(file, data) {
    fs.appendFile(file + ".txt", data + os.EOL, function (err) {
      if(err) {
        console.log("An error ocurred appending data to the file "+ err.message)
      }
    });
  }

  return module;
}();