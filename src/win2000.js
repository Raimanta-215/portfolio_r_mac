
const THEMES = [
"Infrastructures Réseaux & Systèmes",
"Sécurité Informatique",
"Cybersécurité Avancée & CTF",
"Cloud Computing & Services Managés",
"Développement & Collaboration Agile",
"Infographie & Technologies Multimédia",
"Soft Skills & Éthique Professionnelle"
];

let currentIndex = 0;
const totalSlides = THEMES.length;

const track       = document.getElementById('carousel-track');
const currentEl   = document.getElementById('current-slide');
const totalEl     = document.getElementById('total-slides');
const themeNameEl = document.getElementById('slide-theme-name');
const statusEl    = document.getElementById('status-slide-info');
const dotsEl      = document.getElementById('carousel-dots');
const prevBtn     = document.getElementById('prev-slide');
const nextBtn     = document.getElementById('next-slide');

// Initialise les points de navigation
function buildDots() {
dotsEl.innerHTML = '';
for (let i = 0; i < totalSlides; i++) {
    const d = document.createElement('button');
    d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    d.title = THEMES[i];
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
}
}

function updateUI() {
// Déplace le track
track.style.transform = `translateX(-${currentIndex * 100}%)`;

// Met à jour les compteurs
currentEl.textContent = currentIndex + 1;
totalEl.textContent   = totalSlides;
themeNameEl.textContent = THEMES[currentIndex];
statusEl.textContent  = `Thème ${currentIndex + 1}/${totalSlides}`;

// Met à jour les points
document.querySelectorAll('.carousel-dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentIndex);
});

// Active/désactive les boutons aux extrémités
prevBtn.disabled = currentIndex === 0;
nextBtn.disabled = currentIndex === totalSlides - 1;
}

function goTo(index) {
currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
updateUI();
}

prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

// Navigation au clavier (uniquement quand le panel est ouvert)
document.addEventListener('keydown', (e) => {
const panel = document.getElementById('pc-interface');
if (panel && panel.style.display !== 'none') {
    if (e.key === 'ArrowLeft')  goTo(currentIndex - 1);
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
}
});

// Swipe tactile
let touchStartX = 0;
const viewport = document.querySelector('.carousel-viewport');
if (viewport) {
viewport.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
viewport.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
});
}

// Fermeture du panel
const closeBtn = document.getElementById('close-pc');
if (closeBtn) {
closeBtn.addEventListener('click', () => {
    const panel = document.getElementById('pc-interface');
    if (panel) { panel.style.display = 'none'; }
});
}

// Init
buildDots();
updateUI();

// Réinitialise au slide 1 à chaque ouverture du panel
const observer = new MutationObserver(() => {
const panel = document.getElementById('pc-interface');
if (panel && panel.style.display !== 'none') {
    goTo(0);
}
});
const panel = document.getElementById('pc-interface');
if (panel) observer.observe(panel, { attributes: true, attributeFilter: ['style'] });


