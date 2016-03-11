(function(){
  var Kinect2 = require('kinect2');
  var kinect = new Kinect2();

  var colorCanvas = document.getElementById('colorCanvas');

  var ImageBufferRendererWebgl = require('./image-buffer-renderer-webgl.js');
  var colorRenderer = new ImageBufferRendererWebgl(colorCanvas);

  function processImageData(imageBuffer, width, height) {

    if (colorRenderer.isProcessing || (width <= 0) || (height <= 0)) {
      // Don't start processing new data when we are in the middle of
      // processing data already.
      // Also, Only do work if image data to process is of the expected size
      return;
    }

    colorRenderer.isProcessing = true;
    colorRenderer.processImageData(imageBuffer, width, height);
    colorRenderer.isProcessing = false;
  }

  function getClosestBodyIndex(bodies) {
    var closestZ = Number.MAX_VALUE;
    var closestBodyIndex = -1;
    for(var i = 0; i < bodies.length; i++) {
      if(bodies[i].tracked && bodies[i].joints[Kinect2.JointType.spineMid].cameraZ < closestZ) {
        closestZ = bodies[i].joints[Kinect2.JointType.spineMid].cameraZ;
        closestBodyIndex = i;
      }
    }
    return closestBodyIndex;
  }

  // compression is used as a factor to resize the image
  // the higher this number, the smaller the image
  // make sure that the width and height (1920 x 1080) are dividable by this number
  // also make sure the canvas size in the html matches the resized size
  var compression = 2;

  var origWidth = 1920;
  var origHeight = 1080;
  var origLength = 4 * origWidth * origHeight;
  var compressedWidth = origWidth / compression;
  var compressedHeight = origHeight / compression;

  // setup to canvas size
  console.log(compressedWidth, compressedHeight);

  var resizedLength = 4 * compressedWidth * compressedHeight;
  //we will send a smaller image (1 / 10th size) over the network
  var resizedBuffer = new Buffer(resizedLength);
  var compressing = false;

  var trackedBodyIndex = -1;
  var emptyPixels = new Uint8Array(1920 * 1080 * 4);

  if(kinect.open()) {
    kinect.on('multiSourceFrame', function(frame){
      var data = undefined;

      var closestBodyIndex = getClosestBodyIndex(frame.body.bodies);
      if(closestBodyIndex !== trackedBodyIndex) {
        if(closestBodyIndex > -1) {
          kinect.trackPixelsForBodyIndices([closestBodyIndex]);
        } else {
          kinect.trackPixelsForBodyIndices(false);
          //clear canvas
          processImageData(emptyPixels.buffer, colorCanvas.width, colorCanvas.height);
        }
      }
      else {
        if(closestBodyIndex > -1) {
          if(frame.bodyIndexColor.bodies[closestBodyIndex].buffer) {
            //processImageData(frame.bodyIndexColor.bodies[closestBodyIndex].buffer, colorCanvas.width, colorCanvas.height);
            data = frame.bodyIndexColor.bodies[closestBodyIndex].buffer;
          }
        }
      }
      trackedBodyIndex = closestBodyIndex;

      if (!data) {
        return;
      }

      if(!compressing) {
        compressing = true;
        //data is HD bitmap image, which is a bit too heavy to handle in our browser
        //only send every x pixels over to the browser
        var y2 = 0;
        for(var y = 0; y < origHeight; y+=compression) {
          y2++;
          var x2 = 0;
          for(var x = 0; x < origWidth; x+=compression) {
            var i = 4 * (y * origWidth + x);
            var j = 4 * (y2 * compressedWidth + x2);
            resizedBuffer[j] = data[i];
            resizedBuffer[j+1] = data[i+1];
            resizedBuffer[j+2] = data[i+2];
            resizedBuffer[j+3] = data[i+3];
            x2++;
          }
        }

        processImageData(resizedBuffer, colorCanvas.width, colorCanvas.height);
        compressing = false;
      }
    });

    kinect.openMultiSourceReader({
      frameTypes: Kinect2.FrameType.bodyIndexColor | Kinect2.FrameType.body
    });
  }
})();
