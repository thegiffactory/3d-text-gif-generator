var createText = function(font) {
  var text = new THREE.TextGeometry('OLAR', {
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
  var camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1500);
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

var init = function() {
  var scene = new THREE.Scene();
  var rotatingText = null;

  var loader = new THREE.FontLoader();
  loader.load('node_modules/three/examples/fonts/droid/droid_sans_regular.typeface.json', function (font) {
    rotatingText = createText(font)
    scene.add(rotatingText);

    var dirLight = createDirectionalLight();
    scene.add(dirLight);
    var pointLight = createPointLight();
    scene.add(pointLight);
  });

  var camera = createCamera();
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth*0.9, window.innerHeight * 0.9);
  document.body.appendChild(renderer.domElement);

  var render = function() {
    if (rotatingText) {
      rotatingText.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
  }
  animate(render);
}

var animate = function (render) {
  requestAnimationFrame(animate.bind(null, render));
  render();
};

init();
