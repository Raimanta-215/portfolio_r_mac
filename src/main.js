import * as THREE from 'three'; // ✅ AJOUT : Indispensable pour utiliser THREE.Vector3 plus bas
import { scene, camera, renderer, controls } from './scene.js';
import { loadRoomAndEnvironment } from './loader.js';
import { setupInteractions, cameraMovement } from './interaction.js';
import { setupActionButtons } from './actions.js';
import './win2000.js';
import './win11.js';

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
            else if (cameraMovement.currentObject === 'Plane034_01_-_Default_0') {
                const win11Interface = document.getElementById('win11-interface');
                if (win11Interface) win11Interface.style.display = 'flex';
            }
            
            // On stoppe le mouvement
            cameraMovement.target = null; 
        }
    }

    renderer.render(scene, camera);
}

animate();