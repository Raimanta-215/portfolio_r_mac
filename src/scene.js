import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Fond noir pour faire ressortir les couleurs du coucher de soleil

scene.fog = new THREE.Fog(0x000000, 25, 40); // 10 = distance à partir de laquelle le brouillard commence à être visibleQ 35 = distance à laquelle le brouillard devient complètement opaque
export const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 1000);
// Essaye ces valeurs pour être "dans" la chambre et voir le sol
camera.position.set(-15, 10, -18); // (x, y, z) - Ajuste selon ta chambre

camera.lookAt(-1 , 4.8, -1.5);
export const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const pixelScale = 0.5;
renderer.domElement.style.width = '100vw';
renderer.domElement.style.height = '100vh';
renderer.domElement.style.imageRendering = 'pixelated';
renderer.setSize(window.innerWidth * pixelScale, window.innerHeight * pixelScale, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
document.body.appendChild(renderer.domElement);


renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.22; // Monte à 2.0 ou 3.0 si tout est trop sombre !


// --- LUMIÈRES : AMBIANCE SOLEIL COUCHANT ---

// 1. La lumière d'ambiance (Les ombres)
// Au coucher du soleil, les ombres ne sont pas noires, mais légèrement bleutées/violacées.
const ambientLight = new THREE.AmbientLight(0x101015, 0.01); 
scene.add(ambientLight);

// // 2. Le Soleil (DirectionalLight)
// // Un bel orange vif (0xff8833) avec une très forte intensité (15)
// const sunLight = new THREE.DirectionalLight(0xff8833, 5); 

// // --- ATTENTION : À TOI DE RÉGLER CES COORDONNÉES ---
// // Position du soleil (Imagine qu'il est loin dehors) (z,y,x)
// sunLight.position.set(50, 30, -50); 

// // Vers où le soleil pointe (Le centre de ta fenêtre ou de ta chambre)
// sunLight.target.position.set(50, 30, 0); 

// scene.add(sunLight);
// scene.add(sunLight.target); // Il faut toujours ajouter la cible d'une DirectionalLight à la scène

// --- CONTRÔLES SOURIS ---
export const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;
controls.enableDamping = true;

controls.target.set(-1, 4.8, -1.5);



// const lightHelper = new THREE.DirectionalLightHelper(sunLight, 5);
// scene.add(lightHelper);

// const axesHelper = new THREE.AxesHelper(20);
// scene.add(axesHelper);

// --- scene.js (suite) ---

// 3. Lumière NÉON BLEU par la fenêtre
// PointLight(couleur, intensité, distance, decay)
const windowBlueLight = new THREE.SpotLight(0x112587, 500, 100, 2);// 👉 AJUSTE CES COORDONNÉES selon la position de ta fenêtre dans ta chambre
windowBlueLight.position.set(-15, 12, -5);
windowBlueLight.target.position.set(-8.06, 4.42, -1.51);
windowBlueLight.castShadow = true;
windowBlueLight.shadow.bias = -0.001; // Évite les petits bugs d'ombres
scene.add(windowBlueLight);

// 4. Lumière NÉON ROUGE par la fenêtre (légèrement décalée pour le contraste)
const windowRedLight = new THREE.SpotLight(0x87115f, 400, 80, 2);
windowRedLight.position.set(-10, 12, -15); 
windowRedLight.castShadow = true;
scene.add(windowRedLight);

// -- HELPERS pour visualiser la position des lumières néons --
// (À enlever une fois que tu as trouvé la bonne position)
//scene.add(new THREE.PointLightHelper(windowBlueLight, 1));
//scene.add(new THREE.PointLightHelper(windowRedLight, 1));


renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Pour des ombres un peu plus jolies