import * as THREE from 'three'; 
import { scene, camera, renderer, controls } from './scene.js';
import { roomObject, loadRoomAndEnvironment, resetSwordPosition } from './loader.js';
import { setupInteractions, cameraMovement } from './interaction.js';
import { setupActionButtons } from './actions.js';
import './win2000.js';
import './win11.js';
import './skyrim.js';
import { DragControls } from 'three/addons/controls/DragControls.js';

// Lancement du téléchargement de la chambre 3D
loadRoomAndEnvironment(scene, camera, renderer);
// Initialisation des clics 
setupInteractions(scene, camera);
setupActionButtons();


const markers = {};
const markersContainer = document.getElementById('markers-container');
// Gestion du redimensionnement
window.addEventListener('resize', () => {
    const pixelScale = 0.5;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth * pixelScale, window.innerHeight * pixelScale, false);
});


const closeInstructionsBtn = document.getElementById('close-instructions');
if (closeInstructionsBtn) {
    closeInstructionsBtn.addEventListener('click', () => {
        const instructionsDiv = document.getElementById('instructions');
        // On la fait disparaître doucement ou d'un coup
        instructionsDiv.style.display = 'none'; 
    });
}
function updateMarkers() {
    // Si on est focus sur un objet (la caméra a zoomé), on cache les marqueurs
    if (cameraMovement.currentObject || !roomObject) {
        markersContainer.style.opacity = '0';
        return;
    } else {
        markersContainer.style.opacity = '1';
    }

    // Liste des objets sur lesquels tu veux un marqueur visuel
    const markerTargets = [
        { name: 'MonitorOn_MonitorOn_0', offset: { x: 0, y: 1, z: 0 } }, // offset pour le mettre au dessus de l'écran
        { name: 'Object_7', offset: { x: 0, y: 0.5, z: 0 } }, // Ordi portable
        { name: 'Chassi_Material004_0', offset: { x: 0, y: 0, z: 0 } }, // Projets académiques
        {name : 'Star_Destroyer_Light_Gray_0', offset: { x: 0, y: 0, z: 0 } }, // Projets académiques (partie 2)
        { name: 'Plane034_01_-_Default_0', offset: { x: 0, y: 0.5, z: 0 } }, // Épée
        { name: 'defaultMaterial007_2', offset: { x: 0, y: 0.5, z: 0 } }
    ];

    markerTargets.forEach(target => {
        const mesh = roomObject.getObjectByName(target.name);
        if (mesh) {
            // Créer le marqueur s'il n'existe pas encore
            if (!markers[target.name]) {
                const el = document.createElement('div');
                el.className = 'interactive-marker';
                markersContainer.appendChild(el);
                markers[target.name] = el;
            }

            // Calculer la position 3D avec l'offset
            const vector = new THREE.Vector3();
            mesh.getWorldPosition(vector);
            vector.x += target.offset.x;
            vector.y += target.offset.y;
            vector.z += target.offset.z;

            // Projeter en 2D sur l'écran
            vector.project(camera);

            // Ne l'afficher que s'il est devant la caméra (vector.z < 1)
            if (vector.z < 1) {
                const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
                const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;
                markers[target.name].style.display = 'block';
                markers[target.name].style.left = `${x}px`;
                markers[target.name].style.top = `${y}px`;
            } else {
                markers[target.name].style.display = 'none';
            }
        }
    });
}

// ✅ FONCTIONS DU MINI-JEU ACADÉMIQUE RÉPARÉES
function resetAcademicMinigame() {
    const allParts = [...legoParts, ...elecParts];
    
    allParts.forEach(part => {
        if (roomObject && window.originalPos && window.originalPos[part.name]) {
            const mesh = roomObject.getObjectByName(part.name);
            if (mesh) {
                mesh.position.copy(window.originalPos[part.name]);
                mesh.userData.hasBeenMoved = false; 
            }
        }
    });

    if (isDragActive && toggleDragBtn) {
        isDragActive = false;
        if (dragControls) dragControls.enabled = false;
        toggleDragBtn.style.background = "#5c95b0"; 
        toggleDragBtn.innerHTML = "Faire la TotoMobile";
        explodeState.lego = false;
        explodeState.elec = false;
        
        // Sécurisation de la récupération des divs
        const ce = document.getElementById('card-elec');
        const cl = document.getElementById('card-lego');
        if(ce) {
            ce.style.display = "flex";
            ce.style.background = "rgba(96, 205, 255, 0.05)";
            ce.innerHTML = "";
        }
        if(cl) {
            cl.style.display = "flex";
            cl.style.background = "rgba(227, 0, 11, 0.05)";
            cl.innerHTML = "";
        }
    }
}

function updateCardPosition(meshName, cardId) {
    const mesh = roomObject.getObjectByName(meshName);
    const card = document.getElementById(cardId);

    if (mesh && card && card.style.display !== 'none') {
        const vector = new THREE.Vector3();
        mesh.getWorldPosition(vector);
        vector.project(camera);
        const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;
        card.style.left = `${x}px`;
        card.style.top = `${y}px`;
    }
}

// Gestion propre des boutons PC
const closePcBtn = document.getElementById('close-pc');
if (closePcBtn) {
    closePcBtn.addEventListener('click', () => {
        document.getElementById('pc-interface').style.display = 'none';
        cameraMovement.currentObject = null; 
        cameraMovement.target = new THREE.Vector3(-15, 10, -18); 
        cameraMovement.lookAt.set(-1, 4.8, -1.5);
        resetSwordPosition();
    });
}

const closePortableBtn = document.getElementById('close-portable');
if (closePortableBtn) {
    closePortableBtn.addEventListener('click', () => {
        document.getElementById('portable-interface').style.display = 'none';
        cameraMovement.currentObject = null; 
        cameraMovement.target = new THREE.Vector3(-15, 10, -18); 
        cameraMovement.lookAt.set(-1, 4.8, -1.5);
        resetSwordPosition();
    });
}

// --- LOGIQUE DE VUE ÉCLATÉE ---
const explodeState = { lego: false, elec: false };

const legoParts = [
    { name: 'Star_Destroyer_Light_Gray_0', offset: 2 },
    { name: 'Star_Destroyer_Dark_Gray_0', offset: -2 },
    { name: 'Star_Destroyer_Plastic_0', offset: 7 },
    { name: 'Star_Destroyer_Black_0', offset: -7 },
    { name: 'Star_Destroyer_AquaTransparent_0', offset: 6 },
];

const elecParts = [
    { name: 'Chassi_Acrilico002_0', offset: 2 },
    { name: 'Chassi_plastico_preto010_0', offset: 5 },
    { name: 'Chassi_Material004_0', offset: -3 },
    { name: 'Roda004_Material096_0', offset: 6 },
    { name: 'Chassi_latao003_0', offset: -6 },
    { name: 'Chassi_Jumper_Preto_0002', offset: 10 },
    { name: 'Chassi_Material021_0', offset: -10 },
    { name: 'Roda004_Material097_0', offset: 4 },
    { name: 'Chassi_PCB_topo004_0', offset: -4 },
    { name: 'Chassi_Jumper_laranja_0', offset: 3 },
    { name: 'Chassi_Material001_0', offset: 3 },
    { name: 'Chassi_CAPA_AMARELA003_0', offset: -3 },
    { name: 'Chassi_MetalFosco003_0', offset: 5 },
    { name: 'Chassi_PCB_BASE004_0', offset: -5 },

];

// --- LOGIQUE DE GLISSER-DÉPOSER ---
let dragControls = null;
let draggableMeshes = [];
let isDragActive = false; 

function setupDragControls() {
    if (dragControls || !roomObject) return;

    const allPartNames = [...legoParts, ...elecParts].map(p => p.name);
    allPartNames.forEach(name => {
        const mesh = roomObject.getObjectByName(name);
        if (mesh) draggableMeshes.push(mesh);
    });

    dragControls = new DragControls(draggableMeshes, camera, renderer.domElement);
    dragControls.enabled = false; 

    dragControls.addEventListener('dragstart', function (event) {
        controls.enabled = false; 
        event.object.userData.isBeingDragged = true; 
        
        if (event.object.material) {
            event.object.userData.oldOpacity = event.object.material.opacity || 1;
            event.object.userData.oldTransparent = event.object.material.transparent;
            event.object.material.transparent = true;
            event.object.material.opacity = 0.6; 
        }
    });

    dragControls.addEventListener('dragend', function (event) {
        controls.enabled = true; 
        event.object.userData.isBeingDragged = false;
        event.object.userData.hasBeenMoved = true;

        if (event.object.material) {
            event.object.material.opacity = event.object.userData.oldOpacity;
            event.object.material.transparent = event.object.userData.oldTransparent;
        }
    });
}

const toggleDragBtn = document.getElementById('toggle-drag-btn');
if (toggleDragBtn) {
    toggleDragBtn.addEventListener('click', () => {
        isDragActive = !isDragActive; 
        if (dragControls) dragControls.enabled = isDragActive;

        const ce = document.getElementById('card-elec');
        const cl = document.getElementById('card-lego');

        if (isDragActive) {
            explodeState.lego = false;
            explodeState.elec = false;
            
            toggleDragBtn.style.background = "#872e1e"; 
            toggleDragBtn.innerHTML = "Prendre une pause";

            // DISPARITION TOTALE POUR NE PAS GÊNER
            if(ce) ce.style.display = "none";
            if(cl) cl.style.display = "none";
        } else {
            explodeState.lego = false;
            explodeState.elec = false;

            toggleDragBtn.style.background = "#5c95b0"; 
            toggleDragBtn.innerHTML = "Faire la TotoMobile";

            // RÉAPPARITION EN MODE STANDBY
            if(ce) {
                ce.style.display = "flex";
                ce.style.background = "rgba(96, 205, 255, 0.05)";
                ce.innerHTML = "";
            }
            if(cl) {
                cl.style.display = "flex";
                cl.style.background = "rgba(227, 0, 11, 0.05)";
                cl.innerHTML = "";
            }        
        }
    });
}

// ✅ CORRECTION DES ÉVÉNEMENTS HOVER POUR GARDER LE CENTRAGE CSS
const cardElec = document.getElementById('card-elec');
if (cardElec) {
    cardElec.addEventListener('mouseenter', () => { 
        if(!isDragActive) {
            explodeState.elec = true; 
            cardElec.style.transform = "translate(-50%, -50%) scale(1.05)"; 
            cardElec.style.background = "rgba(96, 205, 255, 0.4)";
            cardElec.innerHTML = '<span style="color: rgba(96, 205, 255, 0.9); font-size: 30px;">−</span>';
        }
    });
    cardElec.addEventListener('mouseleave', () => { 
        if(!isDragActive) {
            explodeState.elec = false; 
            cardElec.style.transform = "translate(-50%, -50%) scale(1)"; 
            cardElec.style.background = "rgba(96, 205, 255, 0.05)";
            cardElec.innerHTML = '';
        }
    });
}

const cardLego = document.getElementById('card-lego');
if (cardLego) {
    cardLego.addEventListener('mouseenter', () => { 
        if(!isDragActive) {
            explodeState.lego = true; 
            cardLego.style.transform = "translate(-50%, -50%) scale(1.05)"; 
            cardLego.style.background = "rgba(227, 0, 11, 0.4)";
            cardLego.innerHTML = '<span style="color: rgba(227, 0, 11, 0.9); font-size: 30px;">−</span>';
        }
    });
    cardLego.addEventListener('mouseleave', () => { 
        if(!isDragActive) {
            explodeState.lego = false; 
            cardLego.style.transform = "translate(-50%, -50%) scale(1)"; 
            cardLego.style.background = "rgba(227, 0, 11, 0.05)";
            cardLego.innerHTML = '';
        }
    });
}

const closeAcademicBtn = document.getElementById('close-academic');
if (closeAcademicBtn) {
    closeAcademicBtn.addEventListener('click', () => {
        document.getElementById('academic-projects').style.display = 'none';
        resetAcademicMinigame();
        cameraMovement.currentObject = null;
        cameraMovement.target = new THREE.Vector3(-15, 10, -18);
        cameraMovement.lookAt.set(-1, 4.8, -1.5);
    });
}

// --- BOUCLE D'ANIMATION ---
function animate() {
    requestAnimationFrame(animate);
    controls.update();

    if (cameraMovement.target) {
        camera.position.lerp(cameraMovement.target, 0.05);
        controls.target.lerp(cameraMovement.lookAt, 0.05);

        if (camera.position.distanceTo(cameraMovement.target) < 0.1) {
            if (cameraMovement.currentObject === 'MonitorOn_MonitorOn_0') {
                const pcInterface = document.getElementById('pc-interface');
                if (pcInterface) pcInterface.style.display = 'flex';
            }
            else if (cameraMovement.currentObject === 'Object_7') {
                const portableInterface = document.getElementById('portable-interface');
                if (portableInterface) portableInterface.style.display = 'flex';
            }
            else if (cameraMovement.currentObject === 'defaultMaterial007_2') {
                const parkourInterface = document.getElementById('parkour');
                if (parkourInterface) parkourInterface.style.display = 'flex';
            }
            else if (cameraMovement.currentObject === 'AcademicProjects') {
                const academicInterface = document.getElementById('academic-projects');
                if (academicInterface) academicInterface.style.display = 'block';
                
                // ✅ ARRIVÉE CAMÉRA : ON ÉTEINT TOUT PROPREMENT
                explodeState.lego = false;
                explodeState.elec = false;

                const ce = document.getElementById('card-elec');
                const cl = document.getElementById('card-lego');
                if(ce) {
                    ce.style.background = "rgba(96, 205, 255, 0.05)";
                    ce.innerHTML = '';
                }
                if(cl) {
                    cl.style.background = "rgba(227, 0, 11, 0.05)";
                    cl.innerHTML = '';
                }

                setupDragControls();
            }
            else if (cameraMovement.currentObject === 'Plane034_01_-_Default_0') {
                const swordInterface = document.getElementById('sword');
                if (swordInterface) swordInterface.style.display = 'flex';
            }
            cameraMovement.target = null; 
        }
    }

    if (roomObject) {
        if (!window.originalPos) window.originalPos = {};

        legoParts.forEach(part => {
            const mesh = roomObject.getObjectByName(part.name);
            if (mesh && !mesh.userData.isBeingDragged && !mesh.userData.hasBeenMoved) {
                    if (!window.originalPos[part.name]) window.originalPos[part.name] = mesh.position.clone();
                    const targetY = explodeState.lego ? window.originalPos[part.name].y + part.offset : window.originalPos[part.name].y;
                    
                    mesh.position.x += (window.originalPos[part.name].x - mesh.position.x) * 0.1;
                    mesh.position.y += (targetY - mesh.position.y) * 0.1;
                    mesh.position.z += (window.originalPos[part.name].z - mesh.position.z) * 0.1;
                }
        });

        elecParts.forEach(part => {
            const mesh = roomObject.getObjectByName(part.name);
            if (mesh && !mesh.userData.isBeingDragged && !mesh.userData.hasBeenMoved) {
                    if (!window.originalPos[part.name]) window.originalPos[part.name] = mesh.position.clone();
                    const targetX = explodeState.elec ? window.originalPos[part.name].x + part.offset : window.originalPos[part.name].x;
                    
                    mesh.position.x += (targetX - mesh.position.x) * 0.1;
                    mesh.position.y += (window.originalPos[part.name].y - mesh.position.y) * 0.1;
                    mesh.position.z += (window.originalPos[part.name].z - mesh.position.z) * 0.1;
                }
        });

        if (document.getElementById('academic-projects').style.display === 'block') {
            updateCardPosition('Star_Destroyer_Light_Gray_0', 'card-lego');
            updateCardPosition('Chassi_Acrilico002_0', 'card-elec');
        }
    }


    updateMarkers();
    renderer.render(scene, camera);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const interfaces = [
            'pc-interface', 
            'portable-interface', 
            'parkour', 
            'academic-projects',
            'sword'
        ];
        
        interfaces.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });

        resetSwordPosition();
        resetAcademicMinigame();

        cameraMovement.currentObject = null;
        cameraMovement.target = new THREE.Vector3(-15, 10, -18);
        cameraMovement.lookAt.set(-1, 4.8, -1.5);
        
        document.dispatchEvent(new CustomEvent('skyrim:closed'));
    }
});

camera.lookAt(-1 , 4.8, -1.5); // S'assure que la caméra regarde le centre de la pièce dès le départ


animate();