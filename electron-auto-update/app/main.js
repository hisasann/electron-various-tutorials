const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')




const autoUpdater = require('electron-auto-updater').autoUpdater;

const log = require("electron-log");
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";

autoUpdater.addListener("update-available", function (event) {
  log.info("update-available");
});
autoUpdater.addListener("update-downloaded", function (event, releaseNotes, releaseName, releaseDate, updateURL) {
  log.info("update-downloaded" + releaseName);
  autoUpdater.quitAndInstall();
  return true
});
autoUpdater.addListener("error", function (error) {
  log.info(error);
});
autoUpdater.addListener("checking-for-update", function (event) {
  log.info("checking-for-update");
});
autoUpdater.addListener("update-not-available", function () {
  log.info("update-not-available");
});

autoUpdater.checkForUpdates();




// const autoUpdater = electron.autoUpdater;
// const appVersion = require('./package.json').version;
// const os = require('os').platform();
//
// const updateFeed = os === 'darwin' ?
//  'https://localhost:3000/updates/latest?os=darwin&v=' :
//  'https://localhost:3000/updates/latest?os=win32&v=';
//
// console.log(updateFeed + appVersion);
// autoUpdater.setFeedURL(updateFeed + appVersion);
//
// autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
//  console.log('update-downloaded');
//  autoUpdater.quitAndInstall();
// });



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
