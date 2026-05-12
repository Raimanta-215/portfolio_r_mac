import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
// 1. On importe le DRACOLoader
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';


export let roomObject = null;
export let swordMesh = null;
let swordOriginalPosition = new THREE.Vector3();
let swordOriginalRotation = new THREE.Euler();

let swordAnimation = null;

export function animateSwordToPosition(targetPos) {
    if (!swordMesh) return;
    
    // Empêche l'épée de disparaître par erreur
    swordMesh.frustumCulled = false; 
    swordMesh.material.depthTest = false;
    swordMesh.renderOrder = 999;
    
    if (swordAnimation) cancelAnimationFrame(swordAnimation);
    
    const startPos = swordMesh.position.clone();
    const startRot = swordMesh.rotation.clone();
    
    // --- NOUVEAU : ROTATION ABSOLUE ---
    // On n'utilise plus startRot.clone(). On force des angles précis.
    const targetEuler = new THREE.Euler(
        0,                            // Axe X : Généralement 0, ou Math.PI/2 si elle pointe vers le sol
        Math.PI / 4,                  // Axe Y : Tourne l'épée face à la caméra (Ajuste avec -Math.PI/4 ou Math.PI/2 si ce n'est pas le bon côté)
        THREE.MathUtils.degToRad(-35) // Axe Z : Inclinaison à 35 degrés
    );

    // On convertit les rotations en Quaternions
    const startQuat = new THREE.Quaternion().setFromEuler(startRot);
    const targetQuat = new THREE.Quaternion().setFromEuler(targetEuler);
    
    const duration = 1000; // 1 seconde pour le trajet
    const startTime = Date.now();
    
    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        if (progress < 1) {
            // Courbe d'accélération/décélération (easing)
            const easeProgress = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
            
            // 1. Déplacement fluide
            swordMesh.position.lerpVectors(startPos, targetPos, easeProgress);
            
            // 2. Rotation fluide
            swordMesh.quaternion.slerpQuaternions(startQuat, targetQuat, easeProgress);
            
            swordAnimation = requestAnimationFrame(animate);
        } else {
            // UNE FOIS ARRIVÉE : On fixe la position et la rotation de manière exacte
            swordMesh.position.copy(targetPos);
            swordMesh.quaternion.copy(targetQuat);
        }
    };
    
    animate();
}
export function resetSwordPosition() {
    if (swordAnimation) cancelAnimationFrame(swordAnimation);
    if (swordMesh) {
        swordMesh.material.depthTest = true;
        swordMesh.renderOrder = 0;
        // Animer le retour vers la position originale
        const startPos = swordMesh.position.clone();
        const startRot = swordMesh.rotation.clone();
        const duration = 1000; // 1.5 secondes
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Interpolation douce avec easing
            const easeProgress = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
            
            swordMesh.position.lerpVectors(startPos, swordOriginalPosition, easeProgress);
            swordMesh.rotation.x += (swordOriginalRotation.x - startRot.x) * easeProgress / 10;
            swordMesh.rotation.y += (swordOriginalRotation.y - startRot.y) * easeProgress / 10;
            swordMesh.rotation.z += (swordOriginalRotation.z - startRot.z) * easeProgress / 10;
            
            if (progress < 1) {
                swordAnimation = requestAnimationFrame(animate);
            } else {
                // S'assurer que la position finale est exacte
                swordMesh.position.copy(swordOriginalPosition);
                swordMesh.rotation.copy(swordOriginalRotation);
            }
        };
        
        animate();
    }
}

export function loadRoomAndEnvironment(scene, camera, renderer) {
// 1. Charger le HDR (On le garde juste pour les petits reflets tamisés)
// 1. Charger le HDR
    const rgbeLoader = new RGBELoader();
    
    // console.log("▶️ Début du chargement du fichier HDRI...");

    rgbeLoader.load(
        'river_alcove_1k.hdr', 
        
        // Fonction 1 : SUCCÈS (Le fichier a été trouvé et lu)
        (texture) => {
            // console.log("✅ HDRI téléchargé avec succès !");
            texture.mapping = THREE.EquirectangularReflectionMapping;
            
            // Applique les reflets sur la chambre
            scene.environment = texture;
            // console.log("✅ scene.environment appliqué (Les meubles vont briller).");
            
            // SI TU VEUX VOIR L'IMAGE EN FOND, remets cette ligne :
            scene.background = texture; 
            // console.log("✅ scene.background appliqué (Tu devrais voir le ciel derrière).");
            
            // On garde l'intensité basse pour ton coucher de soleil
            scene.environmentIntensity = 0.05; 
        },

        // Fonction 2 : PROGRESSION (Pratique pour les gros fichiers)
        (xhr) => {
            // Attention : xhr.total peut être à 0 sur certains serveurs, on gère l'erreur
            if (xhr.total > 0) {
                // console.log(` HDRI en cours : ${Math.round((xhr.loaded / xhr.total) * 100)}%`);
            } else {
                // console.log(` HDRI en cours : ${xhr.loaded} octets téléchargés...`);
            }
        },

        // Fonction 3 : ERREUR (Le plus important pour ton débuggage)
        (error) => {
            console.error(" ERREUR CRITIQUE : Le HDRI n'a pas pu être chargé !");
            console.error("Cause probable : Le fichier s'appelle différemment, n'est pas au bon endroit, ou n'a pas été envoyé sur GitHub.");
            console.error("Détails de l'erreur :", error);
        }
    );
    
    const dracoLoader = new DRACOLoader();
    // On lui donne le lien vers les fichiers de décodage (la même version 0.160.0 que ton Three.js)
    dracoLoader.setDecoderPath('https://unpkg.com/three@0.160.0/examples/jsm/libs/draco/');

    const loader = new GLTFLoader();
    // 3. On attache le décodeur au GLTFLoader
    loader.setDRACOLoader(dracoLoader);

// ✅ ASTUCE 1 : On met une pause de 100ms pour laisser le GIF du chat démarrer
    setTimeout(() => {
        
        loader.load(
            'Chambre.glb', 
            
            // --- 1. FONCTION DE SUCCÈS (Quand c'est fini) ---
            (gltf) => {
                const room = gltf.scene;
                roomObject = gltf.scene; // On stocke la chambre ici
                
                // --- 1. L'ÉCRAN PRINCIPAL (PC) ---
                const monitorMesh = room.getObjectByName('MonitorOn_MonitorOn_0');
                if (monitorMesh) {
                    monitorMesh.material.emissive = new THREE.Color(0xffffff);
                    monitorMesh.material.emissiveMap = monitorMesh.material.map; 
                    monitorMesh.material.emissiveIntensity = 0.75; // Plastique normal

                    // On recrée la lumière juste devant l'écran
                    const pcGlow = new THREE.PointLight(0x88ccff, 20, 10, 3); 
                    pcGlow.position.set(-8.06, 4, -1.4); 
                    pcGlow.castShadow = true;
                    pcGlow.shadow.bias = -0.001;
                    
                    scene.add(pcGlow); 
                }

                // --- 2. LE DEUXIÈME ÉCRAN (Portable) ---
                const laptopMesh = room.getObjectByName('Object_7');
                if (laptopMesh) {
                    laptopMesh.material.emissive = new THREE.Color(0xffffff);
                    if (laptopMesh.material.map) {
                        laptopMesh.material.emissiveMap = laptopMesh.material.map; 
                    }
                    laptopMesh.material.emissiveIntensity = 4;

                    const laptopGlow = new THREE.PointLight(0xcceeff, 5, 8, 3); 
                    // (Ajuste ces coordonnées avec ta touche P si elles ont changé !)
                    laptopGlow.position.set(-4.30, 4.5, -1.3); 
                    laptopGlow.castShadow = true;
                    laptopGlow.shadow.bias = -0.001;

                    scene.add(laptopGlow);
                }
                
                const swordMeshNode = room.getObjectByName('Plane034_01_-_Default_0');
                if (swordMeshNode) {
                    swordMesh = swordMeshNode;
                    // Sauvegarder la position et rotation originales
                    swordOriginalPosition.copy(swordMesh.position);
                    swordOriginalRotation.copy(swordMesh.rotation);
                    swordMesh.material.emissive = new THREE.Color(0xffffff);
                    if (swordMesh.material.map) {
                        swordMesh.material.emissiveMap = swordMesh.material.map;
                    }
                    swordMesh.material.emissiveIntensity = 5;
                }
                const psMesh = room.getObjectByName('defaultMaterial006');
                if (psMesh) {
                    psMesh.material.emissive = new THREE.Color(0xffffff);
                    if (psMesh.material.map) {
                        psMesh.material.emissiveMap = psMesh.material.map;
                    }
                    psMesh.material.emissiveIntensity = 8;
                }
                const mandoMesh = room.getObjectByName('helmet_body_bescar_0');
                if (mandoMesh) {
                    mandoMesh.material.emissive = new THREE.Color(0xffffff);
                    if (mandoMesh.material.map) {
                        mandoMesh.material.emissiveMap = mandoMesh.material.map;
                    }
                    mandoMesh.material.emissiveIntensity = 0.2;
                }
                scene.add(roomObject);
                
                room.traverse((node) => {
                    if (node.isMesh && node.material && node.material.map) {
                        node.castShadow = true;
                        node.receiveShadow = true;

                        // 1. Par défaut, on s'assure que tout est bien MAT (surtout les murs)
                        node.material.roughness = 0.9;
                        
                        if (node.name === 'Plane' || node.name === 'Plane034_01_-_Default_0') {
                            node.material.roughness = 0.7; // Brillant
                            node.material.metalness = 0.7; 
                        }

                        const tex = node.material.map;
                        tex.magFilter = THREE.NearestFilter;
                        tex.minFilter = THREE.NearestFilter;
                        tex.generateMipmaps = false;
                        tex.needsUpdate = true;
                        renderer.initTexture(tex);
                    }

                    if (node.name === 'Cube_3' || node.name === 'Object_2002') {
                    
                    // On supprime tous les reflets (1 = totalement mat, 0 = miroir)
                    node.material.roughness = 1; 
                    node.material.metalness = 0; 
                    
                    // On assombrit la texture elle-même (0.5 divise la luminosité par 2)
                    // Change ce chiffre (ex: 0.3 pour plus sombre, 0.8 pour plus clair)
                    node.material.color.multiplyScalar(0.4); 
                    }
                });
                
                renderer.compile(scene, camera);
                
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => loadingScreen.style.display = 'none', 500);
                }
            },

        );

    }, 10); // Fin du setTimeout de 100 millisecondes
}

