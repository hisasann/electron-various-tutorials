# electron のメインプロセス内で画像をキャッシュする仕組みを作ってみる

## サーバーを作って、プロキシさせるパターン

```javascript
var http = require('http')
  , fs = require('fs');

fs.readFile('image.jpg', function(err, data) {
  if (err) throw err; // Fail if the file can't be read.
  http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    res.end(data); // Send the file data to the browser.
  }).listen(8124);
  console.log('Server running at http://localhost:8124/');
});
```

## base64 で返すパターン

```javascript
res.writeHead(200, {'Content-Type': 'text/html'});
res.write('<html><body><img src="data:image/jpeg;base64,')
res.write(new Buffer(data).toString('base64'));
res.end('"/></body></html>');
```

[node.js - nodejs - How to read and output jpg image? - Stack Overflow](http://stackoverflow.com/questions/9540978/nodejs-how-to-read-and-output-jpg-image)

## 考察

基本、このどちらかのパターンになると思う。

electron なので、そのままファイルをリクエストして作成し、 **base64** で返すパターンを作ってみた。
