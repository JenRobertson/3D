import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import gltfPath from './assets/models/Box.gltf';
 
const loader = new GLTFLoader();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
scene.background = new THREE.Color( 0xff0000 );
camera.position.z = 10;

function addBasicCube(){
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x8417a6 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    return cube;
}

let importedModel;

function addImportedModel(model){
    loader.load( gltfPath, function ( loadedObject ) {
        scene.add( loadedObject.scene );
        importedModel = loadedObject.scene;
    }, undefined, function ( error ) {
        console.error( error );
    } );
}

const cube = addBasicCube();
addImportedModel();

var animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    if(importedModel){
        // console.log(importedModel);
        importedModel.position.x-=0.01;
        importedModel.rotation.y += 0.01
        importedModel.rotation.x += 0.01
    }

    renderer.render( scene, camera );
};

animate();



