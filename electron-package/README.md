# Mac と Windows で package する方法

以下の packager を使う

* electron-packager

package.json の script はこんな感じ

    "package-mac": "electron-packager . --out=release --platform=darwin --arch=x64",
    "package-win": "electron-packager . --out=release --platform=win32 --arch=x64"
    


