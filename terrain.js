(function() {
  'use strict';

  var makePlaneGeometry = function(width, height, widthSegments, heightSegments) {
    var geometry = new THREE.PlaneGeometry(
      width,
      height,
      widthSegments,
      heightSegments
    );

    var X_OFFSET_DAMPEN = 0.5;
    var Y_OFFSET_DAMPEN = 0.1;
    var Z_OFFSET_DAMPEN = 0.1;

    var randSign = function() {
      return (Math.random() > 0.5) ? 1 : -1;
    };

    for (
      var vertIndex = 0;
      vertIndex < geometry.vertices.length;
      vertIndex++
    ) {
        geometry.vertices[vertIndex].x +=
          Math.random() / X_OFFSET_DAMPEN * randSign();
        geometry.vertices[vertIndex].y +=
          Math.random() / Y_OFFSET_DAMPEN * randSign();
        geometry.vertices[vertIndex].z +=
          Math.random() / Z_OFFSET_DAMPEN * randSign();
    }

    geometry.dynamic = true;
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    geometry.normalsNeedUpdate = true;
    
    return geometry;
  };

  var makePlane = function(geometry) {
    var material = new THREE.MeshBasicMaterial({
      color: 0x00576b,
      wireframe: true
    });
    var plane = new THREE.Mesh(geometry, material);
    
    return plane;
  };

  var makeScene = function(container) {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 100;

    var plane = makePlane(makePlaneGeometry(400, 400, 100, 100));
    scene.add(plane);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    render(scene, camera, renderer);

    function render() {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }

    render();
  };

  makeScene();

}());
