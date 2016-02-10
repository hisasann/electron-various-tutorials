# electron 上で OSC 通信をしてみる

## 使った npm モジュール

[hrfm/node-oscsocket - JavaScript](https://github.com/hrfm/node-oscsocket)

### send

```javascript
sock.send(new osc.OSCMessage('/osc/message/ ,is 100 TextValue'), 10000);
```

### listen

```javascript
let socket = new osc.OSCSocket();
socket.bind({ "port" : 10000 });
socket.on("/osc/message/", (message) => {

});
```


実行するコマンドは、

    npm start
    
と

    webpack --watch
    
    
ほとんどの、 OSC モジュールは **dgram** という node.js のコアモジュールを使っているので、 webpack ごしだと使えない

なので、 index.html で直接 **require** している

```html
<script>
  window.osc = require('oscsocket');
</script>
```

これは、 electron が html ファイルを http 経由ではなく、 **file://** 経由で読み込むため、 node.js のコアモジュールにアクセスできていると思う
