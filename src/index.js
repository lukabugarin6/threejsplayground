import "./style/main.css";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from "gsap";
import * as dat from 'dat.gui';

// Debug

const gui = new dat.GUI();

const parameters = {
  color: 0xffff00,
  spin: () => {
    gsap.to(cube.rotation, {
      duration: 1,
      y: cube.rotation.y + 10
    })
  }
}

gui
    .addColor(parameters,'color')
    .onChange(() => 
    {
      material.color.set(parameters.color)
    })

gui
    .add(parameters, 'spin')

// Cursor

const cursor = {
  x: 0,
  y: 0
}

const canvas = document.querySelector(".webgl");

// const cameraMove = (e) => {
//   cursor.x = e.clientX / sizes.width - 0.5;
//   cursor.y = -(e.clientY / sizes.height - 0.5);

//   console.log(cursor.x)
// }
// window.addEventListener('mousemove', cameraMove)

/**
 * Sizes
 */
const sizes = {};
sizes.width = window.innerWidth;
sizes.height = window.innerHeight;

window.addEventListener("resize", () => {
  // Save sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(sizes.width, sizes.height);
});



/**
 * Environnements
 */
// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const geometry = new THREE.BoxBufferGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({color: parameters.color})

// Object
const cube = new THREE.Mesh(geometry,material);

scene.add(cube);

gui
    .add(cube.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation');

gui 
    .add(cube,'visible')

gui
    .add(material,'wireframe')


// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(sizes.width, sizes.height);

// Clock
const clock = new THREE.Clock();

// gsap.to(cubes.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(cubes.position, { duration: 1, delay: 2, x: 0 });


/**
 * Loop
 */
const loop = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime();

  // Update
  // cube.rotation.y = Math.sin(elapsedTime);

  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(cubes.position);

  // Update controls
  controls.update();
  
  // Render
  renderer.render(scene, camera);

  // Keep looping
  window.requestAnimationFrame(loop);
};
loop();
