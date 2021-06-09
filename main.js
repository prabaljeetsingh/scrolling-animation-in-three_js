import './style.css'

import * as THREE from 'three';
import { Camera, Color } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new THREE.TorusGeometry( 10, 3,16, 100)

const material = new THREE.MeshStandardMaterial({
  color:0x33ccff });

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(5,5,5);
scene.add(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
         const geometry = new THREE.SphereGeometry(0.25, 24, 24);
         const material = new THREE.MeshStandardMaterial({color:0xffffff})
         const star = new THREE.Mesh(geometry, material);

         const [x,y,z]= Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(200));

         star.position.set(x,y,z);
         scene.add(star);
}
Array(500).fill().forEach(addStar);
const spaceTexture = new THREE.TextureLoader().load('photo1.jpg');
scene.background = spaceTexture; 

const moonTexture = new THREE.TextureLoader().load('photo3.jpg')
const normalTexture = new THREE.TextureLoader().load('NormalMap.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(7,15,15),
  new THREE.MeshStandardMaterial({ 
    map:moonTexture,
    normalMap: normalTexture
  })
)
scene.add(moon);
moon.position.z = -30;
moon.position.setX(10);

const planetTexture = new THREE.TextureLoader().load('photo5.jpg')
const normalTexture1 = new THREE.TextureLoader().load('NormalMap.jpg')
const planet = new THREE.Mesh(
  new THREE.SphereGeometry(7,15,15),
  new THREE.MeshStandardMaterial({ 
    map: planetTexture,
    normalMap: normalTexture1
  })
)
scene.add(planet);
planet.position.z = -50;
planet.position.setX(-50);

const planetTexture1 = new THREE.TextureLoader().load('photo6.jpg')
const normalTexture2 = new THREE.TextureLoader().load('NormalMap.jpg')
const planet1 = new THREE.Mesh(
  new THREE.SphereGeometry(7,15,15),
  new THREE.MeshStandardMaterial({ 
    map: planetTexture1,
    normalMap: normalTexture2
  })
)
scene.add(planet1);
planet1.position.z = -50;
planet1.position.setX(50);

// renderer.render( scene, camera);

function moveCamera(){
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;

    planet.rotation.x += 0.05;
    planet.rotation.y += 0.075;
    planet.rotation.z += 0.05;

    planet1.rotation.x += 0.05;
    planet1.rotation.y += 0.075;
    planet1.rotation.z += 0.05;
}

document.body.onscroll = moveCamera
function animate() {

  requestAnimationFrame( animate );
  torus.rotation.x += 0.01
  torus.rotation.y += 0.01
  torus.rotation.z += 0.01

  controls.update();

  renderer.render(scene,camera)

}
animate()
