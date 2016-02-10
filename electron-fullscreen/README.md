# Mac と Windows で fullscreen されるためのサンプル

## サンプルコード

```javascript
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

    transparent: true,    // 背景を透明にする
    show: true,
    frame: false,
    resizable: false,
    //fullscreen: true,   // Mac だとこれで fullscreen になる
    //'always-on-top': true // 一番手前に表示する
  });

  // maximize は挙動がよくわからないので現時点では使わない
  //mainWindow.maximize();
});
```

Mac で fullscreen できたからといって、 Windows でそうなるとは限らない。

Windows では **width: size.width** を使い、 Mac では **fullscreen: true** でいけそう。
