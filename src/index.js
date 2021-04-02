import "./style/main.css";
import * as THREE from "three";
import gsap from "gsap";

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

const cubes = new THREE.Group();

// Test
const cube = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1, 1, 1),
  new THREE.MeshNormalMaterial()
);
const cube2 = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1, 1, 1),
  new THREE.MeshNormalMaterial()
);
const cube3 = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1, 1, 1),
  new THREE.MeshNormalMaterial()
);
const cube4 = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1, 1, 1),
  new THREE.MeshNormalMaterial()
);

cubes.add(cube);
cubes.add(cube2);
cubes.add(cube3);
cubes.add(cube4);

scene.add(cubes);


// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl"),
});
renderer.setPixelRatio(window.devicePixelRatio);
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
  cube.rotation.y = Math.sin(elapsedTime);
  cube2.rotation.x = Math.sin(elapsedTime);
  cube3.rotation.x = Math.sin(elapsedTime);
  cube3.rotation.z = Math.sin(elapsedTime);
  cube4.rotation.y = Math.sin(elapsedTime);
  cube4.rotation.z = Math.sin(elapsedTime);

//   camera.lookAt(cubes.position);

  // Render
  renderer.render(scene, camera);

  // Keep looping
  window.requestAnimationFrame(loop);
};
loop();
