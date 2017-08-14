const {app: App} = require('electron')

var AuthServer = require('./AuthServer.js');
var WindowController = require('./WindowController.js');

var __mainWindow = null;

function __init() {
  AuthServer.start();

  __mainWindow = WindowController.create('main', {width: 800, height: 600});

  __mainWindow.loadURL("http://localhost:8080/login");
  __mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  __mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    __mainWindow = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
App.on('ready', __init)

// Quit when all windows are closed.
App.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    App.quit()
  }
})

App.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (__mainWindow === null) {
    __init()
  }
})