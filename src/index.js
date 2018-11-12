import {Scene, TextGeometry, MeshPhongMaterial, Mesh, Group, Vector3, 
  PerspectiveCamera, DirectionalLight, PointLight, Color, FontLoader, 
  WebGLRenderer} from 'three';
import GIF from 'gif.js';
import DroidSansRegularFont from './droid_sans_regular.typeface.json';
import css from './main.css';


var width = 500;
var height = 500;

var createText = function(font, color, displayText) {
  var text = new TextGeometry(displayText, {
    font: font,
    size: 70,
    height: 20,
    curveSegments: 12
  })
  text.computeBoundingBox();
  var centerOffset = -0.5 * (text.boundingBox.max.x - text.boundingBox.min.x);

  var material = new MeshPhongMaterial({ color: color, flatShading: true });
  var textMesh = new Mesh(text, material);
  textMesh.position.x = centerOffset;

  var group = new Group();
  group.add(textMesh);
  group.position.y = 100;
  return group;
}

var createCamera = function() {
  var cameraTarget = new Vector3(0, 150, 0);
  var camera = new PerspectiveCamera(60, width/height, 0.1, 1500);
  camera.position.set(0, 400, 700);
  camera.lookAt(cameraTarget);
  return camera;
}

var createDirectionalLight = function() {
  var light = new DirectionalLight(0xffffff, 0.125);
  light.position.set(0, 0, 1).normalize();
  return light;
}

var createPointLight = function() {
  var light = new PointLight(0xffffff, 1.5);
  light.position.set(0, 100, 90);
  return light;
}

var renderGif = function (webGlCanvas, rotationFactor, animateFunction) {
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

var init = function(inputText, inputColor, inputSpeed, submitButton) {
  var scene = new Scene();
  scene.background = new Color(0x00FF00);
  var rotatingText = null;
  var rotationFactor = parseInt(inputSpeed.value);

  var loader = new FontLoader();
  var canvas = document.getElementById('3dcanvas');

  var renderer = new WebGLRenderer( { preserveDrawingBuffer: true, antialias: true ,canvas: canvas});
  renderer.setSize(width, height);

  loader.load(DroidSansRegularFont, function (font) {
    rotatingText = createText(font, 0xB22222, '')
    scene.add(rotatingText);

    var dirLight = createDirectionalLight();
    scene.add(dirLight);
    var pointLight = createPointLight();
    scene.add(pointLight);

    submitButton.addEventListener('click', function() {
      scene.remove(rotatingText);
      var color = parseInt(inputColor.value, 16);
      rotationFactor = parseInt(inputSpeed.value);

      rotatingText = createText(font, color, inputText.value)
      scene.add(rotatingText);
      renderer.render(scene, camera);
      renderGif(canvas, rotationFactor, function() {
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
var inputColor = document.getElementById('input-color');
var inputSpeed = document.getElementById('input-speed');
init(inputText, inputColor, inputSpeed,  submitButton);
