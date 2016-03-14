# electron のメインプロセスとレンダラープロセスを ipc 通信してみる

## ipcRenderer の仕様

[electron/ipc-renderer.md at master · atom/electron](https://github.com/atom/electron/blob/master/docs/api/ipc-renderer.md)

## ipcMain の仕様

[electron/ipc-main.md at master · atom/electron](https://github.com/atom/electron/blob/master/docs/api/ipc-main.md)

## 考察

ググると、 ipc という npmモジュール を使うサンプルがあるが、どうやら、 0.35 以降で ipc を使うのではなく、 electron が用意しているモジュールを使うように変わったっぽい。

```
以前までは、Mainプロセス用ipcモジュールと、Rendererプロセス用のipcモジュールがありました。
どちらもrequire('ipc')と書いてインポートしてましたが、そのスクリプトがMainプロセスで実行されるか、Rendererプロセスで実行されるかにより、読み込まれるモジュールが変わるという仕様でした。

これが、electronモジュール内に定義された「ipcMain」「ipcRenderer」という名前の別々のクラスとなりました。
また、今までのipcモジュールはduprecatedとなっています。
```

[Electron 0.35.0以降での変更点 - SourceChord](http://sourcechord.hatenablog.com/entry/2015/11/29/131727)
