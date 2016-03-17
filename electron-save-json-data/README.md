# electron で json をどこに保存するかの考察

## localstrage

5MB が max size なので使えない。

## web strage

5MB が max size なので使えない。

## userdata として、 json ファイルを保存してしまう

[jviotti/electron-json-storage: Easily write and read user settings in Electron apps](https://github.com/jviotti/electron-json-storage)

おそらくこれが永続性もありよさそう。
