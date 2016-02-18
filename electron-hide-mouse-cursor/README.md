# Mouse cursor を非表示にする方法の考察

## electron 側に mouse cursor を消す prop などが見当たらないため、 CSS で消してみる

### サンプルコード


```css
body {
  overflow: hidden;
  width: 100%;
  height: 100%;
  cursor: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

body::selection { background: transparent; }
body::-moz-selection { background: transparent; }
```

**Mac** では mouse cursor を動かさないと消えてくれない

この場合は、 AppleScript とかで enter を押すなどしないとうまく消えない

**Windows** も Mac 同様、mouse cursor を動かさないと消えてくれなかった

