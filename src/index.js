import * as THREE from 'three';
require('../js/GLTFLoader');

//set up scene
const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};


if (WEBGL.isWebGL2Available()) {
    // Initiate function or other initializations here
    animate();
} else {
    var warning = WEBGL.getWebGL2ErrorMessage();
    document.getElementById('container').appendChild(warning);
}

var canvas = document.createElement( 'canvas' );
var context = canvas.getContext( 'webgl2' );
var renderer = new THREE.WebGLRenderer( { canvas: canvas, context: context } );

var material = new THREE.ShaderMaterial( {
    vertexShader: document.getElementById( 'vs' ).textContent.trim(),
    fragmentShader: document.getElementById( 'fs' ).textContent.trim()
});

var loader = new THREE.GLTFLoader();

loader.load('path/to/model.glb', function (gltf) {

    scene.add(gltf.scene);

}, undefined, function (error) {

    console.error(error);

});

