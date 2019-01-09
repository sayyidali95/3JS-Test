var THREE = window.THREE = require('three');
require('../js/loaders/GLTFLoader');
//set up scene
const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var raycaster = new THREE.Raycaster();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Add cube
var geometry = new THREE.BoxGeometry(1, 1, 1);
var boundingBox = new THREE.SphereGeometry(5, 32, 32);
var material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
var wireframeMat = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x0000ff});
var cube = new THREE.Mesh(geometry, material);
var collisionCube = new THREE.Mesh(boundingBox, wireframeMat);
var clock = new THREE.Clock();
//var model;
scene.add(cube);
scene.add(collisionCube);

camera.position.z = 5;

// create a point light
const pointLight =
  new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 200;
pointLight.intensity = 20;

// add to the scene
scene.add(pointLight);

var loader = new THREE.GLTFLoader();

loader.load( '../models/flameSword2.glb', function ( gltf ) {

    var model = gltf.scene;
    scene.add(model);
    model.scale = (.1, .1, .1);
}, undefined, function ( error ) {

    console.error( error );

} );

var animate = function () {
    requestAnimationFrame(animate);
    var scaler = Math.sin(clock.getElapsedTime());
    cube.rotation.x += 0.01;
    cube.rotation.y += scaler;
    cube.position.x + scaler
    cube.scale.x = 1;
    //model.rotation.x += 0.01;

    renderer.render(scene, camera);
};




animate();