# Electron 上で WebGL のパフォーマンスがどれぐらい出るかのテスト

* RamenSprite.js
* RamenMesh.js

の2種類を用意している。

Sprite のほうが圧倒的にパフォーマンスが出る

## THREE.CanvasRenderer を使う場合

```html
<script src="./node_modules/three/examples/js/renderers/Projector.js"></script>
<script src="./node_modules/three/examples/js/renderers/CanvasRenderer.js"></script>
```

これらのモジュールが必要になる
