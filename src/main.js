import * as THREE from 'three'; // ✅ AJOUT : Indispensable pour utiliser THREE.Vector3 plus bas
import { scene, camera, renderer, controls } from './scene.js';
import { loadRoomAndEnvironment, resetSwordPosition } from './loader.js';
import { setupInteractions, cameraMovement } from './interaction.js';
import { setupActionButtons } from './actions.js';
import './win2000.js';
import './win11.js';
import './skyrim.js';


// ✅ AJOUT : C'est cette ligne qui lance vraiment le téléchargement de la chambre 3D !
loadRoomAndEnvironment(scene, camera, renderer);

// On initialise les clics sur la 3D
setupInteractions(scene, camera);

// On initialise les clics sur les boutons HTML UNE SEULE FOIS ici
setupActionButtons();

// Gestion du redimensionnement
window.addEventListener('resize', () => {
    const pixelScale = 0.5;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth * pixelScale, window.innerHeight * pixelScale, false);
});

// Ajouter des boutons de fermeture aux divs GIF
const gifIds = [ 'academic-projects', 'sword', 'parkour'];
gifIds.forEach(id => {
    const div = document.getElementById(id);
    if (div) {
        // Créer le bouton de fermeture
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '10px';
        closeBtn.style.right = '10px';
        closeBtn.style.backgroundColor = '#ff4444';
        closeBtn.style.color = 'white';
        closeBtn.style.border = 'none';
        closeBtn.style.borderRadius = '5px';
        closeBtn.style.padding = '5px 10px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.fontSize = '16px';
        closeBtn.style.zIndex = '100001';
        closeBtn.addEventListener('click', () => {
            div.style.display = 'none';
            cameraMovement.currentObject = null;
            cameraMovement.target = new THREE.Vector3(-15, 10, -18);
            cameraMovement.lookAt.set(-1, 4.8, -1.5);
            // Réinitialiser l'épée si c'est celle-ci
            if (id === 'sword') {
                resetSwordPosition();
            }
        });
        
        // Pour parkour, ajouter le bouton au .skyrim-window
        const skyrimWindow = div.querySelector('.skyrim-window');
        if (skyrimWindow) {
            skyrimWindow.style.position = 'relative';
            skyrimWindow.appendChild(closeBtn);
        } else {
            // Pour les autres GIFs, ajouter directement au div
            div.appendChild(closeBtn);
        }
    }
});



// ✅ CORRECTION : Gestion propre des deux boutons de fermeture
const closePcBtn = document.getElementById('close-pc');
if (closePcBtn) {
    closePcBtn.addEventListener('click', () => {
        document.getElementById('pc-interface').style.display = 'none';
        
        // ✅ LA CORRECTION EST LÀ : On vide la mémoire pour casser la boucle !
        cameraMovement.currentObject = null; 
        
        cameraMovement.target = new THREE.Vector3(-15, 10, -18); // Retour à la vue globale
        cameraMovement.lookAt.set(-1, 4.8, -1.5);
        resetSwordPosition();
    });
}

const closePortableBtn = document.getElementById('close-portable');
if (closePortableBtn) {
    closePortableBtn.addEventListener('click', () => {
        document.getElementById('portable-interface').style.display = 'none';
        
        // ✅ ON VIDE LA MÉMOIRE ICI AUSSI
        cameraMovement.currentObject = null; 
        
        cameraMovement.target = new THREE.Vector3(-15, 10, -18); // Retour à la vue globale
        cameraMovement.lookAt.set(-1, 4.8, -1.5);
        resetSwordPosition();
    });
}

// --- LOGIQUE DE VUE ÉCLATÉE (HOVER) ---
const explodeState = {
    lego: false,
    elec: false
};

// Objets à séparer pour le Lego (tu peux ajuster les écarts en Y)
const legoParts = [
    { name: 'Star_Destroyer_Light_Gray_0', offset: 0.5 }, // Monte de 0.5
    { name: 'Star_Destroyer_Dark_Gray_0', offset: -0.3 }  // Descend de 0.3
];

// Objets à séparer pour l'électronique
const elecParts = [
    { name: 'Chassi_Acrilico002_0', offset: 0.6 },
    { name: 'Chassi_plastico_preto010_0', offset: 0.2 },
    { name: 'Chassi_Material004_0', offset: -0.2 }
];

// Dictionnaire pour stocker les positions de base
const originalY = {};

// Écouteurs de survol sur la carte Électronique
const cardElec = document.getElementById('card-elec');
if (cardElec) {
    cardElec.addEventListener('mouseenter', () => { explodeState.elec = true; cardElec.style.transform = "scale(1.05)"; });
    cardElec.addEventListener('mouseleave', () => { explodeState.elec = false; cardElec.style.transform = "scale(1)"; });
}

// Écouteurs de survol sur la carte Lego
const cardLego = document.getElementById('card-lego');
if (cardLego) {
    cardLego.addEventListener('mouseenter', () => { explodeState.lego = true; cardLego.style.transform = "scale(1.05)"; });
    cardLego.addEventListener('mouseleave', () => { explodeState.lego = false; cardLego.style.transform = "scale(1)"; });
}

// Bouton fermer spécial Projets Académiques
const closeAcademicBtn = document.getElementById('close-academic');
if (closeAcademicBtn) {
    closeAcademicBtn.addEventListener('click', () => {
        document.getElementById('academic-projects').style.display = 'none';
        cameraMovement.currentObject = null;
        cameraMovement.target = new THREE.Vector3(-15, 10, -18);
        cameraMovement.lookAt.set(-1, 4.8, -1.5);
    });
}
// Boucle d'animation
function animate() {
    requestAnimationFrame(animate);
    controls.update();

    if (cameraMovement.target) {
        camera.position.lerp(cameraMovement.target, 0.05);
        controls.target.lerp(cameraMovement.lookAt, 0.05);

        // QUAND LA CAMÉRA ARRIVE À DESTINATION
        if (camera.position.distanceTo(cameraMovement.target) < 0.1) {
            console.log("Arrivé devant :", cameraMovement.currentObject);
            
            // On affiche la page web par dessus
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
            else if (cameraMovement.currentObject === 'Star_Destroyer_Dark_Gray_0' || cameraMovement.currentObject === 'Star_Destroyer_Light_Gray_0') {
                const starDestroyerInterface = document.getElementById('lego');
                if (starDestroyerInterface) starDestroyerInterface.style.display = 'flex';
            }
            else if (cameraMovement.currentObject === 'Chassi_Material004_0' || cameraMovement.currentObject === 'Chassi_plastico_preto010_0' || cameraMovement.currentObject === 'Chassi_PlasticoPreto018_0' || cameraMovement.currentObject === 'Chassi_Acrilico002_0') {
                const chassiInterface = document.getElementById('elec');
                if (chassiInterface) chassiInterface.style.display = 'flex';
            }
            else if (cameraMovement.currentObject === 'Plane034_01_-_Default_0') {
                const swordInterface = document.getElementById('sword');
                if (swordInterface) swordInterface.style.display = 'flex';
            }
            // On stoppe le mouvement
            cameraMovement.target = null; 
        }
    }

    if (roomObject) {
        // Animation Lego
        legoParts.forEach(part => {
            const mesh = roomObject.getObjectByName(part.name);
            if (mesh) {
                // Sauvegarde la position d'origine au premier passage
                if (originalY[part.name] === undefined) originalY[part.name] = mesh.position.y;
                
                // Calcule la cible (position d'origine + offset si survolé, sinon position d'origine)
                const targetY = explodeState.lego ? originalY[part.name] + part.offset : originalY[part.name];
                
                // Déplacement fluide (Lerp)
                mesh.position.y += (targetY - mesh.position.y) * 0.1;
            }
        });

        // Animation Électronique
        elecParts.forEach(part => {
            const mesh = roomObject.getObjectByName(part.name);
            if (mesh) {
                if (originalY[part.name] === undefined) originalY[part.name] = mesh.position.y;
                const targetY = explodeState.elec ? originalY[part.name] + part.offset : originalY[part.name];
                mesh.position.y += (targetY - mesh.position.y) * 0.1;
            }
        });

    renderer.render(scene, camera);
}
// ✅ AJOUT : Réinitialisation de la vue avec la touche Échap
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        // Cacher toutes les interfaces actives
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

        // Réinitialiser l'épée
        resetSwordPosition();

        // ✅ RE-SET CAMÉRA : Identique aux boutons closeBtn
        cameraMovement.currentObject = null;
        cameraMovement.target = new THREE.Vector3(-15, 10, -18);
        cameraMovement.lookAt.set(-1, 4.8, -1.5);
        
        // Si tu utilises toujours l'overlay Skyrim dans skyrim.js
        document.dispatchEvent(new CustomEvent('skyrim:closed'));
    }
});




animate();

