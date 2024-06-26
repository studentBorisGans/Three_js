// https://www.youtube.com/watch?v=_OwJV2xL8M8
import * as THREE from 'three';
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
// import { l } from 'vite/dist/node/types.d-aGj9QkWt';

const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83',
  // roughness:
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0, 10, 10)
light.intensity = 20
scene.add(light)

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 20
scene.add(camera)



const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)


// controls

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5




// resizing
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height
  renderer.setSize(sizes.width, sizes.height)
  
})





const loop = () => {
  controls.update();
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop);
}
loop()
