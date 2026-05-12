const PROJECTS = [
    { 
        icon: 'https://api.iconify.design/fluent:bot-24-filled.svg?color=%230078d4', 
        name: 'Voiture téléguidée (IoT)', 
        type: 'Electronique', 
        id: 'Projet 1',
        tags: ['MicroPython', 'Web'] 
    },
    { 
        icon: 'https://api.iconify.design/fluent:person-search-24-filled.svg?color=%23d83b01', 
        name: 'Gestion de Détective', 
        type: 'Développement', 
        id: 'Projet 2',
        tags: ['Python', 'MySQL'] 
    },
    { 
        icon: 'https://api.iconify.design/fluent:trophy-24-filled.svg?color=%23ffb900', 
        name: 'Tournoi eSport Web', 
        type: 'Développement', 
        id: 'Projet 3',
        tags: ['MERN', 'VPS'] 
    },
    { 
        icon: 'https://api.iconify.design/fluent:shield-lock-24-filled.svg?color=%236037a3', 
        name: 'Messagerie E2EE', 
        type: 'Développement', 
        id: 'Projet 4',
        tags: ['Kotlin', 'Security'] 
    },
    { 
        icon: 'https://api.iconify.design/fluent:scan-type-24-filled.svg?color=%23107c10',        
        name: 'Identification Clavier', 
        type: 'Infographie', 
        id: 'Projet 5',
        tags: ['OpenCV', 'Image'] 
    },
    { 
        icon: 'https://api.iconify.design/fluent:document-pdf-24-filled.svg?color=%23c42b1c', 
        name: 'Mon_CV.pdf', 
        type: 'Document', 
        id: 'Curriculum Vitae',
        tags: ['PDF', 'Contact', 'Profil'],
        file: 'cv.pdf' // Remplace par le nom exact de ton fichier
    }
];

let sel = -1;

/**
 * Affiche uniquement la grille d'icônes
 */
function renderGrid() {
    const gridContainer = document.getElementById('w11-grid');
    if (!gridContainer) return;

    gridContainer.innerHTML = PROJECTS.map((p, i) => `
        <div onclick="w11Sel(${i})" 
             class="w11-app-card" 
             style="${sel === i ? 'background:rgba(255,255,255,0.15); outline:1px solid rgba(255,255,255,0.3);' : ''}">
            
            <img src="${p.icon}" alt="${p.name}" style="width:42px; height:42px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));">
            
            <span style="font-size:11px; color:#000; text-align:center; line-height:1.2; margin-top:6px; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">
                ${p.name}
            </span>
        </div>
    `).join('');
}

/**
 * Gestion de la sélection d'un projet
 */
window.w11Sel = function(i) {
    sel = i; 
    renderGrid(); // On rafraîchit la grille pour montrer la sélection
    
    const p = PROJECTS[i];
    if (p.type === 'Document' && sel === i) {
        window.open(p.file, '_blank');
    }
    // Mise à jour du panneau de détails à droite
    const detailBox = document.getElementById('w11-detail-sel');
    if (detailBox) {
        detailBox.innerHTML = `
            <strong style="font-size:12px; color:#000;">${p.name}</strong><br>
            <span style="color:#003d5a; font-size:10px; font-weight:600;">${p.type}</span><br>
            <span style="color:#aaa; font-size:9px;">${p.id}</span>
        `;
    }

    // Mise à jour de la barre d'état en bas
    const statusBox = document.getElementById('w11-status-sel');
    if (statusBox) {
        statusBox.textContent = `${p.name} sélectionné`;
    }

    // Mise à jour des tags dans le panneau latéral
    const tagsBox = document.getElementById('w11-detail-tags');
    if (tagsBox) {
        tagsBox.innerHTML = p.tags.map(tag => `
            <div style="font-size:10px; background:rgba(96,205,255,0.1); color:#0057fc; padding:4px 10px; border-radius:4px; border:1px solid rgba(96,205,255,0.2); text-align:center;">
                ${tag}
            </div>
        `).join('');
    }
};

// Horloge Windows 11
function clock() {
    const n = new Date();
    const timeEl = document.getElementById('w11-time');
    const dateEl = document.getElementById('w11-date');
    if (timeEl) timeEl.textContent = n.toLocaleTimeString('fr-BE', { hour: '2-digit', minute: '2-digit' });
    if (dateEl) dateEl.textContent = n.toLocaleDateString('fr-BE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Initialisation
clock();
setInterval(clock, 1000);
renderGrid();

// Gestion du bouton démarrer
const startBtn = document.getElementById('win11-start-btn');
if (startBtn) {
    startBtn.onclick = (e) => {
        e.stopPropagation();
        document.getElementById('win11-startmenu').classList.toggle('open');
    };
}

renderGrid();