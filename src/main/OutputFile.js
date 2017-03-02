module.exports = function() {
  var module = {};

  const {dialog} = require('electron')
  var fs = require('fs');
  var os = require('os');

  var file = null;

  module.create = function() {
    return new Promise(function(resolve, reject) {
      dialog.showSaveDialog(function (fileName) {
        if (fileName === undefined){
          console.log("File save dialog was canceled by user");
          reject();
        }
        file = fileName;
        fs.writeFile(fileName + ".txt", "", function (err) {
          if(err){
            console.log("An error ocurred creating the file "+ err.message)
            reject();
          }
          console.log(fileName + " has been succesfully created");
          resolve();
        });
      });
    });
  }

  module.append = function(data) {
    fs.appendFile(file + ".txt", data + os.EOL, function (err) {
      if(err) {
        console.log("An error ocurred appending data to the file "+ err.message)
      }
    });
  }

  return module;
}();