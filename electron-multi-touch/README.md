# マルチタッチをどうハンドリングするかのテスト

[マルチタッチ ウェブブラウザ向けの開発 - HTML5 Rocks](http://www.html5rocks.com/ja/mobile/touch/)

## タッチ イベント

次の 3 つの基本的なタッチ イベントが仕様に示されており、モバイル端末で広く実装されています。

*touchstart: DOM 要素に指が置かれる。

*touchmove: DOM 要素に沿って指がドラッグされる。

*touchend: DOM 要素から指が離れる。

各タッチ イベントには 3 つのタッチのリストがあります。

*touches: 現在画面上にあるすべての指のリスト。

*targetTouches: 現在の DOM 要素上にある指のリスト。

*changedTouches: 現在のイベントに関与している指のリスト。たとえば、touchend イベントでは、離れた指のリストになります。

## サンプルコード

**touch** した指だけの情報を取るなら **changedTouches** がよさそうだ

```javascript
touchStart(event) {
  event.preventDefault();

  console.log('touchStart----------------------------');
  // touch しているすべての座標が取れる
  console.log('touches:', event.touches);
  // touch しているすべての座標が取れる（DOM上）
  console.log('targetTouches: ', event.targetTouches);
  // touchstart した指だけの情報
  console.log('changedTouches: ', event.changedTouches);
}

touchMove(event) {
  event.preventDefault();

  console.log('touchMove');
  // touch しているすべての座標が取れる
  console.log('touches:', event.touches);
  // touch しているすべての座標が取れる（DOM上）
  console.log('targetTouches: ', event.targetTouches);
  // touchmove した指だけの情報
  console.log('changedTouches: ', event.changedTouches);
}

touchEnd(event) {
  event.preventDefault();

  console.log('touchEnd');
  // touch しているすべての座標が取れる
  console.log('touches:', event.touches);
  // touch しているすべての座標が取れる（DOM上）
  console.log('targetTouches: ', event.targetTouches);
  // touchend した指だけの情報
  console.log('changedTouches: ', event.changedTouches);
}
```

