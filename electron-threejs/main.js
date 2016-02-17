var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  var Screen = require('screen');
  var size = Screen.getPrimaryDisplay().size; // ディスプレイのサイズを取得する

  // Create the browser window.
  mainWindow = new BrowserWindow({
    left: 0,
    top: 0,

    // Windows ではこの方法がいまのところ確実、これだと padding が発生しない
    width: size.width,   // 最大サイズで表示する
    height: size.height, // 最大サイズで表示する
    //fullscreen: true,   // Mac だとこれで fullscreen になる

    transparent: true,    // 背景を透明にする
    show: true,
    frame: false,
    resizable: false,
    //'always-on-top': true // 一番手前に表示する
  });

  // maximize は挙動がよくわからないので現時点では使わない
  //mainWindow.maximize();

  // loadURL は遅延で実行しても問題ない
  // 何か他からの処理分待ってから、実行するならここでよいかもしれない
  setTimeout(function() {
    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Open the DevTools.
    mainWindow.openDevTools();
  }, 10000);

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});