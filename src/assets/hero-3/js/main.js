import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

import shoes from "../3d-model/shoes/scene.gltf";
let camera, scene, renderer, mixer,controls;
var clock = new THREE.Clock();

init();

function init() {
    const container = document.getElementById('3d-model-shoes');
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(container.clientWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    container.appendChild(renderer.domElement);


    scene = new THREE.Scene();

    const light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);
    const light1 = new THREE.PointLight()
    light1.position.set(5, 5, 5)
    light1.castShadow = true
    scene.add(light1)

    const light2 = new THREE.PointLight()
    light2.position.set(-2.5, 5, 5)
    light2.castShadow = true
    scene.add(light2)


    // camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10);
    // camera.position.z = 1;

    const fov = 45;
    const aspect = 1;  // the canvas default
    const near = 0.1;
    const far = 100;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 20);

    controls = new OrbitControls(camera, renderer.domElement);
    // controls.target.set( 0, - 0.2, - 0.2 );
	// controls.update();
    // //controls.update() must be called after any manual changes to the camera's transform
    // camera.position.set(0, 20, 100);
    // controls.update();
	// window.addEventListener( 'resize', onWindowResize(container), false );


    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/js/libs/draco/');
    loader.setDRACOLoader(dracoLoader);

    // Load a glTF resource
    loader.load(
        // resource URL
        shoes,
        // called when the resource is loaded
        function (gltf) {
            gltf.scene.scale.set(60,60,60) // scale here
            gltf.scene.rotation.x = 0;
            gltf.scene.rotation.y = 300;
            gltf.scene.rotation.z = 0.3;

            gltf.scene.position.x = 3;
            gltf.scene.position.y = 0.7;


            // scene.add(gltf.scene);
            // gltf.scene.traverse( function ( child ) {
            //     if ( child.isMesh ) {
            //         child.geometry.center(); // center here
            //     }
            // });
            scene.add( gltf.scene );


        },
        // called while loading is progressing
        function (xhr) {

            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        },
        // called when loading has errors
        function (error) {

            console.log('An error happened');

        }
    );
   

}

// function onWindowResize(container) {

// 	camera.aspect = container.clientWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();

// 	renderer.setSize( container.clientWidth, window.innerHeight );

// }

function animation(time) {
    // mesh.rotation.x = time / 2000;
    // mesh.rotation.y = time / 1000;
    renderer.render(scene, camera);

}