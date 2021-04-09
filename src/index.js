import './style/main.css'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Canvas
const canvas = document.querySelector('.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
const material = new THREE.MeshBasicMaterial();

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5,16,16),
  material
)

sphere.position.x = -1.5

const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1,1),
  material
)

scene.add(sphere,plane)

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.width, sizes.height)

/**
 * Loop
 */
const loop = () =>
{

    controls.update();

    // Render
    renderer.render(scene, camera)

    // Keep looping
    window.requestAnimationFrame(loop)
}
loop()