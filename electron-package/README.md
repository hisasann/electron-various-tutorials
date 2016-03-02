# Mac と Windows で package する方法

以下の packager を使う

* electron-packager

package.json の script はこんな感じ

    "package-mac": "electron-packager . --out=release --platform=darwin --arch=x64",
    "package-win": "electron-packager . --out=release --platform=win32 --arch=x64"
    
その後の Update で **package.js** を入れた。

[via]
[electron-react-boilerplate/package.js at master · chentsulin/electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate/blob/master/package.js)

