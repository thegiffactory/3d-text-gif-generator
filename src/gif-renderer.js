import GIF from 'gif.js';

export default function (webGlCanvas, rotationFactor, animateFunction) {
  var w = webGlCanvas.width;
  var h = webGlCanvas.height;
  var tc = document.createElement('canvas');
  tc.width = w;
  tc.height = h;
  var ctx = tc.getContext('2d');

  var gif = new GIF({
    workers: 2,
    workerScript: 'static/gif.worker.bundle.js',
    quality: 10,
    width: w,
    height: h,
    transparent: 0x00FF00
  });

  var rotationSlice = Math.PI / rotationFactor;
  var drawingIterations = (2 * Math.PI) / rotationSlice;
  for (var i = 0; i < drawingIterations; i++) {
    ctx.drawImage(webGlCanvas, 0, 0, w, h);
    gif.addFrame(ctx, {copy: true, delay: 40});
    animateFunction();
  }

  gif.on('finished', function(blob) {
    var img = document.getElementById('result-gif');
    img.src = URL.createObjectURL(blob);
  });
  gif.render()
}
