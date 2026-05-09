import * as THREE from 'three'; // ✅ AJOUT : Indispensable pour utiliser THREE.Vector3 plus bas
import { scene, camera, renderer, controls } from './scene.js';
import { loadRoomAndEnvironment } from './loader.js';
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
const gifIds = ['parkour', 'lego', 'elec', 'sword'];
gifIds.forEach(id => {
    const div = document.getElementById(id);
    if (!div) return;

    // Pour parkour, la fermeture est gérée par skyrim.js via l'overlay
    // On écoute juste l'event custom pour resetter la caméra
    if (id === 'parkour') return;

    // Créer le bouton de fermeture pour les autres GIFs
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
    });
    div.appendChild(closeBtn);
});

// Reset caméra quand l'overlay Skyrim se ferme (Échap ou clic dehors)
document.addEventListener('skyrim:closed', () => {
    cameraMovement.currentObject = null;
    cameraMovement.target = new THREE.Vector3(-15, 10, -18);
    cameraMovement.lookAt.set(-1, 4.8, -1.5);
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
            // On stoppe le mouvement
            cameraMovement.target = null; 
        }
    }

    renderer.render(scene, camera);
}

animate();