# Windows で electron 上でシリアル通信をする

## serialport-electron

serialport-electron 系の npmモジュール が多々あるが、いまいち動くのがない。

* [ddm/node-serialport: Node.js package to access serial ports for reading and writing OR Welcome your robotic JavaScript overlords. Better yet, program them!](https://github.com/ddm/node-serialport)
* [usefulthink/node-serialport: UNMAINTAINED fork of voodootikigod/serialport that will build against the electron runtime.](https://github.com/usefulthink/node-serialport)

なので、これらは使わないことにした。

## electron-prebuilt の再考

そもそも、いままで **electron-rebuild** を使っていた気になっていたが、実行できていなかった気がする。

コマンドラインから、

    ./node_modules/.bin/electron-rebuild

or

    ./node_modules/.bin/electron-rebuild.cmd

を実行してみてはいただ、一瞬で終わっていた、そして一瞬で終わるような作業ではない気がしていたので、

npm script として実行してみたところ、結構な時間がかかるようになった。

つまり、ちゃんと実行されるようなった。

おそらく、 nodist 経由で node.js を入れているとか、関係しているのかもしれない。

つまり、 npm script 外での実行権限がない。

なので、以下のように、 npm script で実行すると、ちゃんとビルドされる。

[Tracking Electron support · Issue #538 · voodootikigod/node-serialport](https://github.com/voodootikigod/node-serialport/issues/538)

    "build": "./node_modules/.bin/electron-rebuild",
    "build2": "electron-rebuild -v 0.36.9 -p -f -m ./ -w serialport -e node_modules/electron-prebuilt",

ただし、これだけでは動かず以下のエラーが出た。

    Uncaught Error: Cannot find module 'app-name\node_modules\serialport\build\Release\node-v47-win32-ia32\serialport.node'

なので、実際にこのファイルがあるか見に行くと、

    node_modules/serialport/build/Release/electron-v0.36-win32-ia32

と、ディレクトリ名が違うので、

    node_modules/serialport/build/Release/node-v47-win32-ia32

のように書き換えてあげる必要がある。

このやり方は、以下のページを参考にした。

[Using node-serialport in an electron app](http://meow.noopkat.com/using-node-serialport-in-an-electron-app/)

## electron-rebuild の引数について

忘れそうなので、ここに貼っておく。

```javascript
const yargs = require('yargs')
  .usage('Usage: electron-rebuild --version [version] --module-dir [path]')
  .help('h')
  .alias('h', 'help')
  .describe('v', 'The version of Electron to build against')
  .alias('v', 'version')
  .describe('n', 'The NODE_MODULE_VERSION to compare against (process.versions.modules)')
  .alias('n', 'node-module-version')
  .describe('f', 'Force rebuilding modules, even if we would skip it otherwise')
  .alias('f', 'force')
  .describe('a', "Override the target architecture to something other than your system's")
  .alias('a', 'arch')
  .describe('m', 'The path to the node_modules directory to rebuild')
  .alias('m', 'module-dir')
  .describe('w', 'A specific module to build')
  .alias('w', 'which-module')
  .describe('e', 'The path to electron-prebuilt')
  .alias('e', 'electron-prebuilt-dir')
  .describe('p', 'Enable the ugly (and hopefully not needed soon enough) node-pre-gyp path fixer')
  .alias('p', 'pre-gyp-fix')
  .describe('c', 'The npm command to run')
  .alias('c', 'command')
  .epilog('Copyright 2015');
```

[electron-rebuild/cli.js at master · electronjs/electron-rebuild](https://github.com/electronjs/electron-rebuild/blob/master/src/cli.js)
