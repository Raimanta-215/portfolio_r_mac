import * as THREE from 'three';
import { roomObject } from './loader.js';
import { animateSwordToPosition, resetSwordPosition } from './loader.js';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

export const cameraMovement = {
    target: null,
    lookAt: new THREE.Vector3(),
    currentObject: null, //  NOUVEAU : On mémorise la cible actuelle
    currentObjectPosition: new THREE.Vector3() // Position de l'objet cliqué
};

// La liste stricte des objets interactifs
const interactiveObjects = [
    'Object_7', 
    'MonitorOn_MonitorOn_0', 
    'Chassi_Material004_0',
    'Chassi_plastico_preto010_0', // J'ai ajouté tes nouveaux objets
    'Chassi_Acrilico002_0',
    'defaultMaterial007_2',
    'Star_Destroyer_Dark_Gray_0',
    'Star_Destroyer_Light_Gray_0',
    'Plane034_01_-_Default_0',

];

// ✅ NOUVEAU : La fonction centrale qui gère le mouvement
export function focusOnObject(targetName, targetMesh) {
    cameraMovement.currentObject = targetName;
    const targetPos = new THREE.Vector3();
    targetMesh.getWorldPosition(targetPos);
    
    // Mémoriser la position de l'objet
    cameraMovement.currentObjectPosition.copy(targetPos);

    // 1. La caméra REGARDE l'objet
    cameraMovement.lookAt.copy(targetPos);

    // 2. On place la caméra DEVANT l'objet (UN SEUL SWITCH ICI !)
    switch (targetName) {
        case 'Object_7':
            // J'ai mis tes nouvelles coordonnées ici
            cameraMovement.target = new THREE.Vector3(targetPos.x - 2, targetPos.y + 2, targetPos.z - 3);
            break;
        case 'MonitorOn_MonitorOn_0':
            cameraMovement.target = new THREE.Vector3(targetPos.x + 2, targetPos.y + 2, targetPos.z - 5);
            break;
        case 'Chassi_Material004_0':
        case 'Chassi_plastico_preto010_0':
        case 'Chassi_PlasticoPreto018_0':
        case 'Chassi_Acrilico002_0':
        case 'Star_Destroyer_Dark_Gray_0':
        case 'Star_Destroyer_Light_Gray_0':
            cameraMovement.currentObject = 'AcademicProjects';
                
                // 2. LA CAMÉRA : Tu devras ajuster ces chiffres pour cadrer les DEUX objets en même temps
                // Pour l'instant, je mets une position reculée basée sur la position de l'objet cliqué
                cameraMovement.lookAt.set(targetPos.x - 1, targetPos.y, targetPos.z);
                cameraMovement.target = new THREE.Vector3(targetPos.x - 5, targetPos.y + 3, targetPos.z - 8);
        case 'defaultMaterial007_2':
            cameraMovement.target = new THREE.Vector3(targetPos.x - 2, targetPos.y + 2, targetPos.z - 3);
            break;

        case 'Plane034_01_-_Default_0':
            // 1. La caméra se place un peu en recul
            cameraMovement.target = new THREE.Vector3(targetPos.x - 4, targetPos.y + 1.5, targetPos.z - 4);
            
            // 2. Position calculée sur-mesure : 2 unités devant la caméra, et décalée vers la GAUCHE
            const swordDisplayPos = new THREE.Vector3(
                targetPos.x - 3.15, 
                targetPos.y + 1.3, 
                targetPos.z - 2.02
            );
            
            animateSwordToPosition(swordDisplayPos);
            break;
        default:
            console.log(`Cible 3D non gérée pour la caméra : ${targetName}`);
    }
}

export function setupInteractions(scene, camera) {
    window.addEventListener('pointerdown', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        if (roomObject) {
            const intersects = raycaster.intersectObjects(roomObject.children, true);
            
            if (intersects.length > 0) {
                const clickedMesh = intersects[0].object;
                const clickedPos = new THREE.Vector3();
                clickedMesh.getWorldPosition(clickedPos);

                let currentObj = clickedMesh;
                let foundInteractiveName = null;
                let targetMesh = null;

                while (currentObj) {
                    if (interactiveObjects.includes(currentObj.name)) {
                        foundInteractiveName = currentObj.name;
                        targetMesh = currentObj;
                        break;
                    }
                    currentObj = currentObj.parent;
                }

                if (foundInteractiveName && targetMesh) {
                    const targetPos = new THREE.Vector3();
                    targetMesh.getWorldPosition(targetPos);
                    console.log("Cible interactive détectée (Clic 3D) :", foundInteractiveName);
                    console.log("Position de l'objet interactif :", { x: targetPos.x.toFixed(2), y: targetPos.y.toFixed(2), z: targetPos.z.toFixed(2) });
                    // ✅ On appelle la fonction centrale !
                    focusOnObject(foundInteractiveName, targetMesh);
                } else {
                    console.log("Clic ignoré. Objet touché :", clickedMesh.name);
                    console.log("Position :", { x: clickedPos.x.toFixed(2), y: clickedPos.y.toFixed(2), z: clickedPos.z.toFixed(2) });
                }
            }
        }
    });
}