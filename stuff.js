var createText = function(font) {
  var text = new THREE.TextGeometry('OLAR', {
    font: font,
    size: 70,
    height: 20,
    curveSegments: 12
  })
  text.computeBoundingBox();
  var centerOffset = -0.5 * ( text.boundingBox.max.x - text.boundingBox.min.x );

  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 , wireframe: true} );
  var textMesh = new THREE.Mesh(text, material);
  textMesh.position.x = centerOffset;

  group = new THREE.Group();
  group.add(textMesh);
  group.position.y = 100;
  return group;
}

var createCamera = function() {
  var cameraTarget = new THREE.Vector3( 0, 150, 0 );
  var camera = new THREE.PerspectiveCamera( 30, window.innerWidth/window.innerHeight, 0.1, 1500 );
  camera.position.set( 0, 400, 700 );
  camera.lookAt(cameraTarget);
  return camera;
}

var init = function() {
  var scene = new THREE.Scene();
  var rotatingText = null;

  var loader = new THREE.FontLoader();
  loader.load('node_modules/three/examples/fonts/optimer_regular.typeface.json', function (font) {
    rotatingText = createText(font)
    scene.add(rotatingText);
  });

  var camera = createCamera();
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth *0.9 , window.innerHeight * 0.9);
  document.body.appendChild( renderer.domElement );

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
