var width = 500;
var height = 500;
var rotationFactor = 30;

var createText = function(font, displayText) {
  var text = new THREE.TextGeometry(displayText, {
    font: font,
    size: 70,
    height: 20,
    curveSegments: 12
  })
  text.computeBoundingBox();
  var centerOffset = -0.5 * (text.boundingBox.max.x - text.boundingBox.min.x);

  var material = new THREE.MeshPhongMaterial({ color: 0xB22222, flatShading: true });
  var textMesh = new THREE.Mesh(text, material);
  textMesh.position.x = centerOffset;

  group = new THREE.Group();
  group.add(textMesh);
  group.position.y = 100;
  return group;
}

var createCamera = function() {
  var cameraTarget = new THREE.Vector3(0, 150, 0);
  var camera = new THREE.PerspectiveCamera(60, width/height, 0.1, 1500);
  camera.position.set(0, 400, 700);
  camera.lookAt(cameraTarget);
  return camera;
}

var createDirectionalLight = function() {
  var light = new THREE.DirectionalLight(0xffffff, 0.125);
  light.position.set(0, 0, 1).normalize();
  return light;
}

var createPointLight = function() {
  var light = new THREE.PointLight(0xffffff, 1.5);
  light.position.set(0, 100, 90);
  return light;
}

var renderGif = function (webGlCanvas, animateFunction) {
  var w = webGlCanvas.width;
  var h = webGlCanvas.height;
  var tc = document.createElement('canvas');
  tc.width = w;
  tc.height = h;
  ctx = tc.getContext('2d');

  var gif = new GIF({
    workers: 2,
    workerScript: 'node_modules/gif.js/dist/gif.worker.js',
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

var init = function(inputText, submitButton) {
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x00FF00);
  var rotatingText = null;

  var loader = new THREE.FontLoader();
  var canvas = document.getElementById('3dcanvas');

  var renderer = new THREE.WebGLRenderer( { preserveDrawingBuffer: true, antialias: true ,canvas: canvas});
  renderer.setSize(width, height);

  loader.load('node_modules/three/examples/fonts/droid/droid_sans_regular.typeface.json', function (font) {
    rotatingText = createText(font, '')
    scene.add(rotatingText);

    var dirLight = createDirectionalLight();
    scene.add(dirLight);
    var pointLight = createPointLight();
    scene.add(pointLight);

    submitButton.addEventListener('click', function() {
      scene.remove(rotatingText);
      rotatingText = createText(font, inputText.value)
      scene.add(rotatingText);
      renderer.render(scene, camera);
      renderGif(canvas, function() {
            rotatingText.rotateY(Math.PI/rotationFactor);
            renderer.render(scene, camera);
      });
    });

  });

  var camera = createCamera();

  var render = function() {
        if (rotatingText) {
          rotatingText.rotateY(Math.PI/rotationFactor);
        }
        renderer.render(scene, camera);
  }
  animate(render);
}

var animate = function (render) {
  requestAnimationFrame(animate.bind(null, render));
  render();
};

var submitButton = document.getElementById('submit-button');
var inputText = document.getElementById('input-text');
init(inputText, submitButton);
