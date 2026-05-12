import { roomObject } from './loader.js';
import { focusOnObject } from './interaction.js'; 

export function setupActionButtons() {
    const buttons = document.querySelectorAll('.action-button'); 
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetName = button.getAttribute('data-target');
            // console.log(`Bouton HTML cliqué : ${targetName}`);
            
            if (!roomObject) {
                // console.warn("La chambre n'est pas encore chargée !");
                return;
            }

            const targetMesh = roomObject.getObjectByName(targetName);
            
            if (targetMesh) {
                focusOnObject(targetName, targetMesh);
            } else {
                // console.warn(`Cible 3D inconnue dans la scène : ${targetName}`);
            }
        });
    });
}