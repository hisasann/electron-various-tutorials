# Windows 上で Kinect2 を electron から使う方法

以下に記事を書きました。

[kinect2をelectron上で動かすまでの記録 - DJレモンサワーのレモン日記](http://hisasann.github.io/2016/03/02/kinect2-on-electron/)

## kinect2 からのデータをリサイズする方法

こちらのコードが参考になりました。

[kinect2/index.js at master · wouterverweirder/kinect2](https://github.com/wouterverweirder/kinect2/blob/master/examples/color-feed-browser/index.js)

また kinect2 は以下のように kinect2 側からわたってくる値が固定になっているので、この **1920 x 1080** のアスペクト比を壊さないようにリサイズする必要があります。

```javascript
const int 							cDepthWidth  = 512;
const int 							cDepthHeight = 424;
const int 							cColorWidth  = 1920;
const int 							cColorHeight = 1080;
const int 							cInfraredWidth  = 512;
const int 							cInfraredHeight = 424;
```

via [kinect2/Globals.h at master · wouterverweirder/kinect2](https://github.com/wouterverweirder/kinect2/blob/master/src/Globals.h#L31-L36)

