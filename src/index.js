import './style/main.css'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from 'dat.gui';

// Debug
const gui = new dat.GUI();

// Textures
const textureLoader = new THREE.TextureLoader();

const brickTexture = textureLoader.load('/brick.jpg');
const brick2Texture = textureLoader.load('/brick2.jpg');
const brickAlphaTexture = textureLoader.load('/brickAlpha.jpg');
const brickAmbientTexture = textureLoader.load('/brickAmbient.jpg');
const brickHeightTexture = textureLoader.load('/brickHeight.jpg');
const brickMetalTexture = textureLoader.load('/brickMetal.jpg');
const brickRoughnessTexture = textureLoader.load('/brickRoughness.jpg');
const metalTexture = textureLoader.load('/metal.jpg');
const matcapTexture = textureLoader.load('/matcaps/1.png');

// Fonts
const fontLoader = new THREE.FontLoader()

// fontLoader.load(
//   '/fonts/helvetiker_regular.typeface.json',
//   (font) => {
//     const textGeometry = new THREE.TextBufferGeometry(
//       'Hello Three.js',
//       {
//         font,
//         size: 0.5,
//         height: 0.2,
//         curveSegments: 12,
//         bevelEnabled: true,
//         bevelThickness: 0.03,
//         bevelSize: 0.02,
//         bevelOffset: 0,
//         bevelSegments: 5
//       }
//     )
//     // textGeometry.computeBoundingBox();
//     // textGeometry.translate(
//     //   - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
//     //   - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
//     //   - (textGeometry.boundingBox.max.z - 0.03) * 0.5,
//     // )
//     textGeometry.center();

//     const material = new THREE.MeshMatcapMaterial({matcap:matcapTexture})
//     const text = new THREE.Mesh(textGeometry,material);
//     scene.add(text);

//     const donutGeometry = new THREE.TorusBufferGeometry(0.3,0.2,20,45);

//     for(let i = 0;i<100;i++) {
    
//       const donut = new THREE.Mesh(donutGeometry,material);

//       donut.position.x = (Math.random() - 0.5) * 10;
//       donut.position.y = (Math.random() - 0.5) * 10;
//       donut.position.z = (Math.random() - 0.5) * 10;

//       donut.rotation.x = Math.random() * Math.PI
//       donut.rotation.y = Math.random() * Math.PI

//       const scale = Math.random();

//       donut.scale.set(scale,scale,scale)

//       scene.add(donut)
//     }
//   }
// );

// Canvas
const canvas = document.querySelector('.webgl');

// Scene
const scene = new THREE.Scene();

// Aces Helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

// Objects
// const material = new THREE.MeshBasicMaterial();
// material.map = brick2Texture;

const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// const material = new THREE.MeshStandardMaterial();
// material.map = brickTexture;
// material.aoMap = brickAlphaTexture;
// material.normalMap = brick2Texture;

gui.add(material, 'metalness').min(0).max(1).step(0.0001);
gui.add(material, 'roughness').min(0).max(1).step(0.0001);

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5,16,16),
  material
)

sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))


sphere.position.x = -1.5;

const cube = new THREE.Mesh(
  new THREE.BoxBufferGeometry(.85,.85,.85),
  material
)

const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(4.5,4.5),
  material
)

plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))
plane.rotation.x = Math.PI / 2
plane.rotation.y = Math.PI
plane.position.y  = -0.75

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.3,0.2,16,32),
  material
)



torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))

torus.position.x = 1.5;

scene.add(sphere,cube,torus,plane)

// Lights
const ambientLight = new THREE.AmbientLight(0xff0000,0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff,.75);
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight);


/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 2
camera.position.y = 1.25
camera.position.z = 4

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

const clock = new THREE.Clock();

/**
 * Loop
 */
const loop = () =>
{
    const elapsedTime = clock.getElapsedTime();

    // Update objects

    sphere.rotation.y = Math.sin(elapsedTime) / 3
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = Math.PI;
    cube.rotation.x = 0.15 * elapsedTime
    // torus.rotation.x = 0.15 * elapsedTime

    // Update controls

    controls.update();

    // Render
    renderer.render(scene, camera)

    // Keep looping
    window.requestAnimationFrame(loop)
}
loop()