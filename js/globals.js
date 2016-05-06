var clock = new THREE.Clock();

var camera, scene, renderer, cameraMesh;
var controls, interval;

var objects = [];
var velocity = new THREE.Vector3();
var resetGame;

var controlsEnabled = false;
var BOX_COUNT = 40;