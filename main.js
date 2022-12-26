import './style.css'
import './modules/modal'
import './modules/typingEffect'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Scene } from 'three';


// const pcUrl = new URL('./assets/pc2.glb', import.meta.url);
const pcUrl = new URL('./assets/pc_sem_tela_sem_postit.glb', import.meta.url);
const telaUrl = new URL('./assets/test.glb', import.meta.url)
const postiteEsquerda = new URL('./assets/pstit_esq.glb', import.meta.url)
const postiteDireita = new URL('./assets/pstit_dir.glb', import.meta.url)

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();


let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);

// const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper)

camera.position.set(0, 3, 4);
orbit.update();

// const boxGeometry = new THREE.BoxGeometry();
// const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// const box = new THREE.Mesh(boxGeometry, boxMaterial);
// scene.add(box);
// FAFAFA
const imageHome = './public/home.jpg'
const image = "./public/tecnologias.jpg";
const wardrobeLoader2 = new THREE.TextureLoader().load(image);
const wardrobeLoader = new THREE.TextureLoader().load(imageHome);

const assetLoader = new GLTFLoader();
assetLoader.load(pcUrl.href, (gltf) => {
  const model = gltf.scene;

  scene.add(model);
  model.position.set(0, 0, 0);
  model.rotation.y = -0.5 * Math.PI

  const assetLoaderTela = new GLTFLoader();
  assetLoaderTela.load(telaUrl.href, (gltf) => {
    const modelTela = gltf.scene;
    // console.log(modelTela)
    // console.log(modelTela.getObjectByName('defaultMaterial004').material.map.source)
    // modelTela.getObjectByName('defaultMaterial004').material.color.set(0xf00000)


    scene.add(modelTela);
    scene.getObjectById(25).material.map = wardrobeLoader
    // modelID = model.id;
    // console.log(modelID)
    modelTela.position.set(0, 0, 0);
    modelTela.rotation.y = -0.5 * Math.PI

    const assetLoaderPostEsq = new GLTFLoader();
    assetLoaderPostEsq.load(postiteEsquerda.href, (gltf) => {
      const modelPostiteEsquerda = gltf.scene;
      scene.add(modelPostiteEsquerda);
      modelPostiteEsquerda.position.set(0, 0, 0);
      modelPostiteEsquerda.rotation.y = -0.5 * Math.PI

      const assetLoaderPostDir = new GLTFLoader();
      assetLoaderPostDir.load(postiteDireita.href, (gltf) => {
        const modelPostiteDireita = gltf.scene;
        scene.add(modelPostiteDireita);
        modelPostiteDireita.position.set(0, 0, 0);
        modelPostiteDireita.rotation.y = -0.5 * Math.PI

      }, undefined, (error) => {
        console.log(error);
      })

    }, undefined, (error) => {
      console.log(error);
    })


  }, undefined, (error) => {
    console.log(error);
  })


}, undefined, (error) => {
  console.log(error);
})







// const domEvents

// const planeGeometry = new THREE.PlaneGeometry(60, 60);
// const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x212121 });
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(plane)
// plane.rotation.x = -0.5 * Math.PI;
// plane.position.y = -0.1;

// const gridHelper = new THREE.GridHelper();
// scene.add(gridHelper);



//renderer.render(scene, camera);
renderer.setClearColor(0x222222)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight)

const directionalLight = new THREE.AmbientLight(0xffffff)
scene.add(directionalLight);
directionalLight.position.set(-30, 50, 0);


// const rayCaster = new THREE.Raycaster();


function animate() {
  // box.rotation.x += 0.01;
  // box.rotation.y += 0.01;
  // console.log(box.rotation.x)
  // console.log(intersects)
  renderer.render(scene, camera)

}




window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

document.addEventListener("DOMContentLoaded", function (event) {
  let divLoading = document.getElementById("loading");
  divLoading.parentNode.removeChild(divLoading);
  renderer.setAnimationLoop(animate);

});



const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove(event) {

  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

  window.requestAnimationFrame(render);

}

function render() {

  // update the picking ray with the camera and pointer position
  raycaster.setFromCamera(pointer, camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(scene.children);

  console.log(intersects)
  for (let i = 0; i < intersects.length; i++) {
    // console.log("----")
    console.log(intersects[0].object.id)

    if (intersects[0].object.id == 30) {
      intersects[0].object.material.color.set(0X202020);

      // modelTela.traverse(function (node) {
      //  
      // });

      if (intersects[0].object instanceof THREE.Mesh) {
        // intersects[0].object.material.map = wardrobeLoader2;
        console.log(scene.getObjectById(25).material)
        scene.getObjectById(25).material.map = wardrobeLoader2
      }
      // console.log('projetos e tecnologias')
    }
    if (intersects[0].object.id == 35) {
      intersects[0].object.material.color.set(0X202020);
      // console.log('formação lugares trabalhados')
    }



    // console.log(intersects[0].object.material.color)
    setInterval(() => { intersects[0].object.material.color.set(0Xffffff); }, 200);

  }

  renderer.render(scene, camera);

}

window.addEventListener('mousedown', onPointerMove);

