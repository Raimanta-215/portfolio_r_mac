/* === SKYRIM MAP MENU === */

const overlay    = document.getElementById('skyrim-menu-overlay');
const panel      = overlay ? overlay.querySelector('.skm-panel') : null;
const parkourDiv = document.getElementById('parkour');

/* ---------- Ouvrir ---------- */
function openMenu() {
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

/* ---------- Fermer ---------- */
function closeMenu() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';

    // Cacher #parkour aussi
    if (parkourDiv) parkourDiv.style.display = 'none';

    // Signaler à main.js de réinitialiser la caméra
    document.dispatchEvent(new CustomEvent('skyrim:closed'));
}

/* ---------- Auto-ouvrir quand #parkour devient visible ---------- */
if (parkourDiv && overlay) {
    const observer = new MutationObserver(() => {
        if (parkourDiv.style.display !== 'none' && !overlay.classList.contains('open')) {
            openMenu();
        }
    });
    observer.observe(parkourDiv, { attributes: true, attributeFilter: ['style'] });
}

/* ---------- Fermer en cliquant en dehors du panel ---------- */
if (overlay) {
    overlay.addEventListener('click', function (e) {
        if (panel && !panel.contains(e.target)) closeMenu();
    });
}

/* ---------- Fermer avec Échap ---------- */
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('open')) {
        closeMenu();
    }
});