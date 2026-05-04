// site.js

const portfolioActivities = [
    {
        id: 1,
        theme: "Infrastructures Réseaux et Systèmes",
        activities: [
            { name: "CISCO Intro to Cybersecurity", type: "Formation (Dist)", hours: 6 },
            { name: "Travail Matériel Réseau (Configuration/Labo)", type: "Technique", hours: 4 }
        ],
        hours: 10,
        description: `
                <h3>Cadre de l’activité</h3>
                <p>Mon intérêt durant mon cursus académique à l'EPHEC s’est fortement penché vers la cybersécurité. C’est pourquoi j’ai décidé de renforcer mes connaissances en suivant la formation certifiante « Introduction to cybersecurity » proposée par CISCO sur leur plateforme e-learning. En complément de cet apprentissage théorique en distanciel, j'ai profité des opportunités offertes par l'école pour configurer du matériel réseau réel (routeurs et switchs) afin de mettre en pratique les concepts vus en cours de Réseau.</p>
                
                <h3>Faits et apprentissage</h3>
                <p>Dans la formation CISCO, j’ai appris à identifier les vulnérabilités d’un réseau et les types d’attaques courantes (DDoS, MITM, Phishing…) de même que les mesures à prendre pour les contrer. Cette partie théorique a été un véritable avant-goût et une introduction au futur cours de Sécurité de BA3, me permettant de comprendre l’importance de la triade CIA : confidentialité, intégrité et disponibilité des données.</p>
                <p>Lors de l’exercice pratique sur matériel physique, j’ai configuré des équipements comme appris au cours de Réseau II. J'ai notamment travaillé sur la mise en place de VLANs et l'accès à Internet via la NAT en toute sécurité. Cette expérience fut cruciale pour passer des concepts abstraits à l’application technique concrète.</p>
                
                <h3>Analyse réflexive et Mise en perspective</h3>
                <p>Avant de réaliser ces activités, je voyais la sécurité comme une simple couche logicielle (antivirus, pare-feu) plutôt que comme un composant structurel du réseau lui-même. L’activité sur matériel m’a aidé à mieux appréhender les interactions complexes entre le matériel physique et les protocoles de sécurité. J’ai réalisé que la moindre erreur de configuration sur un routeur pouvait impacter l’entièreté du réseau et compromettre la sécurité globale de l'entreprise.</p>
                
                <h3>Lien avec le projet professionnel</h3>
                <p>Mon intérêt pour une carrière en cybersécurité se renforce grâce à cet accomplissement. L’obtention du certificat CISCO est un premier pas vers des certifications plus avancées que je compte passer à l'avenir. Je prévois d’utiliser ces compétences lors de mon stage pour assurer une base réseau saine. Enfin, la mise en pratique sur matériel physique m’a permis de clarifier mon projet : bien que je comprenne l'importance de l'infrastructure, je préfère m'orienter vers la couche sécurité plutôt que vers la configuration réseau pure.</p>

                <div class="proof-container">
                    <h4>Preuve de participation :</h4>
                    <img src="img/cert-2.png" alt="Foramtion CISCO" style="width:100%; max-width:400px; border-radius:8px;">
                    <img src="img/cert-1.png" alt="Validation CiSCO" style="width:100%; max-width:400px; border-radius:8px; margin-top:10px;">
                    <img src="img/cert.png" alt="certificat CISCO" style="width:100%; max-width:400px; border-radius:8px; margin-top:10px;">
                    <img src="img/labo.jpg" alt="Labo matériel réseau" style="width:100%; max-width:400px; border-radius:8px; margin-top:10px;">
                </div>
            
                `
    },
    {
        id: 2,
        theme: "Sécurité Informatique",
        activities: [
            { name: "Cyber Challenge Part 1", type: "Challenge", hours: 10 }
        ],
        hours: 10,
        description: `
        <h3>Cadre de l’activité</h3>
        <p>J’ai participé au Cybersecurity Challenge Belgium, une compétition de type Capture The Flag (CTF) pour les phases de qualifications. C’est un événement national majeur qui regroupe les étudiants de toutes les écoles technologiques de Belgique. Mon objectif personnel était de sortir du cadre strictement scolaire et de me situer par rapport aux élèves des autres institutions face à des défis réels en cybersécurité.</p>
        
        <h3>Faits et apprentissage</h3>
        <p>J’ai pu mettre en pratique plusieurs compétences techniques, dont certaines que j’ai dû découvrir "sous le feu de l’action". Le challenge couvrait plusieurs domaines :</p>
        <ul>
            <li><strong>Web Security :</strong> Recherche de failles dans des sites donnés (XSS, SQL injection, etc.).</li>
            <li><strong>Cryptographie :</strong> Déchiffrement de messages codés sous différentes formes en utilisant des outils adaptés.</li>
            <li><strong>Soft Skills :</strong> Gestion du stress lié au temps imparti (10h) et travail en équipe sous pression constante.</li>
        </ul>
        <p>Cette expérience fut une immersion totale dans des thématiques variées de la sécurité offensive et défensive.</p>
        
        <h3>Analyse réflexive</h3>
        <p>Beaucoup de concepts vus en cours m'ont permis de résoudre les défis, notamment pour mieux orienter mes recherches vers la solution. Certains challenges ont été très stressants car la solution semblait évidente, alors que je cherchais parfois trop en profondeur. Cette confrontation directe avec la difficulté m'a permis de découvrir de nombreuses techniques de cybersécurité sur le tas et de mieux comprendre la logique de certaines attaques.</p>
        
        <h3>Mise en perspective et Projet Pro</h3>
        <p>Malgré la difficulté rencontrée pour ce premier CSC, je suis satisfaite d’être arrivée à un niveau honorable. Cette expérience a amplifié mon intérêt pour le secteur de la sécurité informatique. Elle m'a également permis de réaliser qu'il me reste encore beaucoup de compétences à acquérir avant d'atteindre mon objectif professionnel, ce qui me motive à approfondir mes cours de BA3.</p>
        
        <div class="proof-section">
            <p><strong>Preuve de participation :</strong></p>
            <img src="img/csc-1.png" alt="Preuve nominative CSC 2024" style="width:100%; max-width:400px; border-radius:8px; margin-top:10px;">
        </div>
    `    },
    {
        id: 3,
        theme: "Cybersécurité Avancée et CTF",
        activities: [
            { name: "Cyber Challenge Part 2", type: "Challenge", hours: 10 }
        ],
        hours: 10,
        description: `
        <h3>Cadre de l’activité</h3>
        <p>Suite à ma première expérience au CSC, je ne me suis pas arrêtée là. J’ai voulu tester mes connaissances à un niveau supérieur pour approfondir certains domaines techniques et placer la barre plus haut. Contrairement à la phase précédente, ces qualifications se déroulaient individuellement, ce qui a représenté un défi personnel supplémentaire.</p>
        
        <h3>Faits et apprentissage</h3>
        <p>Pour cette session, j'ai tenté de m'attaquer aux challenges les plus complexes plutôt que de me limiter aux épreuves d'introduction. J'ai notamment découvert :</p>
        <ul>
            <li><strong>Reverse Engineering :</strong> Des challenges nécessitant de comprendre le codage en Assembleur et les mécanismes de compilation.</li>
            <li><strong>Autonomie technique :</strong> La résolution individuelle m'a forcée à structurer mes recherches de manière plus rigoureuse.</li>
        </ul>
        <p>Malheureusement, des problèmes liés à l’organisation et à l’opérationnalité de la plateforme technique ne m'ont pas permis d'aller aussi loin que je l'aurais souhaité dans la compétition.</p>
        
        <h3>Analyse réflexive</h3>
        <p>Cette année, j’ai pu aller plus au cœur des challenges et structurer méthodiquement ma recherche de solutions. Le fait de travailler de façon individuelle a changé ma perspective par rapport à l'année précédente ; j'ai dû compter uniquement sur mes propres ressources pour progresser. J'ai appris que la persévérance est une qualité indispensable face à l'échec technique ou aux bugs de plateforme.</p>
        
        <h3>Mise en perspective et Projet Pro</h3>
        <p>Face à ces challenges, je n’ai jamais cessé de persévérer. Cette ténacité me semble être une qualité fondamentale pour exercer dans le métier de la sécurité informatique. Cette expérience confirme mon besoin de développement technique, particulièrement dans la compréhension des couches basses du système (Assembleur), pour atteindre mon objectif professionnel.</p>
        
        <div class="proof-section">
            <p><strong>Preuve nominative :</strong></p>
            <img src="img/cat.png" alt="Preuve participation individuelle CSC" style="width:100%; max-width:400px; border-radius:8px; margin-top:10px;">
            <img src="img/assembleur.png" alt="Challenge Reverse Engineering" style="width:100%; max-width:400px; border-radius:8px; margin-top:10px;">
        </div>
    `    },
    {
        id: 4,
        theme: "Cloud Computing et Services managés",
        activities: [
            { name: "Cloud avec M365 et Azure Infrastructure", type: "Conférence", hours: 2 },
            { name: "Open Source ULB (Logiciels libres)", type: "Conférence", hours: 4 }
        ],
        hours: 6,
description: `
        <h3>Cadre de l’activité</h3>
        <p>Pour diversifier mes types d’apprentissage, j’ai participé à deux événements complémentaires. Le premier était une conférence technique donnée par Kevin Keurvels de la société Axentys, spécialisée dans le support informatique pour professionnels. Le second était le FOSDEM à l'ULB, un rassemblement européen majeur pour les développeurs et passionnés d'Open Source.</p>
        
        <h3>Faits et apprentissage</h3>
        <p>La conférence Axentys m’a permis de comprendre comment les services managés utilisent l’infrastructure Azure et Microsoft 365 pour assurer les activités en entreprise. J’ai découvert des aspects concrets de l’administration Cloud que nous ne voyons pas forcément en profondeur en cours, notamment la gestion des licences et la sécurité des accès.</p>
        <p>Au FOSDEM, j’ai exploré l’univers de l'Open Source via plusieurs stands auprès desquels je me suis informée. En suivant des conférences, j’ai appris comment les outils Open Source peuvent rivaliser avec des outils plus spécialisés et encadrés par des structures propriétaires.</p>
        
        <h3>Analyse réflexive</h3>
        <p>Avant cette activité, ma vision du Cloud se limitait au stockage de fichiers. Ces événements m’ont fait réaliser que le Cloud est une extension des réseaux locaux, qui nécessite une configuration aussi rigide et sérieuse que le matériel physique. Ces expériences m’ont permis de comprendre que l’informatique professionnelle est un équilibre permanent entre différentes solutions et outils, et que cela demande une capacité d’adaptation constante pour le futur.</p>
        
        <h3>Mise en perspective et Projet Pro</h3>
        <p>Bien que ce ne soit pas forcément lié de manière directe au premier abord, ces deux sujets sur l’administration et les outils Open Source m’ont ouvert des portes pour apprendre comment améliorer la sécurité de demain. Cette polyvalence entre outils propriétaires et solutions libres est un atout que je souhaite intégrer à mon projet professionnel.</p>
        
        <div class="proof-section">
            <p><strong>Preuves de participation :</strong></p>
            <img src="img/azur.png" alt="Photo conférence Axentys et FOSDEM" style="width:100%; max-width:400px; border-radius:8px; margin-top:10px;">
            <img src="img/FOSDEM.jpg" alt="Photo conférence Axentys et FOSDEM" style="width:100%; max-width:400px; border-radius:8px; margin-top:10px;">
        </div>
    `    },
    {
        id: 5,
        theme: "Développement et Collaboration Agile",
        activities: [
            { name: "Hackathon (Gestion de projet)", type: "Hackathon", hours: 10 }
        ],
        hours: 10,
description: `
        <h3> Cadre de l’activité</h3>
        <p>J'ai participé au hackathon organisé par l'opérateur télécom "Hey" dans les locaux de BeCentral à Bruxelles. L’événement était centré sur l’intelligence artificielle et l'objectif était de chercher des solutions innovantes à intégrer sur leur plateforme dans un temps limité. La production finale devait comprendre un prototype fonctionnel répondant à une problématique donnée ainsi qu'une présentation professionnelle devant un jury d'experts.</p>
        
        <h3>Faits et apprentissage</h3>
        <p>Durant ces deux jours, j’ai intégré une équipe travaillant sur l'IA au sein de la cybersécurité. J’ai découvert l’existence et le fonctionnement des LLM locaux (Large Language Models) ainsi que leur interaction technique au sein d'un programme. Le projet a été dirigé selon une méthode agile, priorisant le MVP (Minimum Viable Product) sous la supervision de deux mentors. Dans un groupe de 10 personnes, la communication a été le point central de l'activité pour coordonner nos efforts efficacement.</p>
        
        <h3>Analyse réflexive</h3>
        <p>Cette expérience a été un vrai défi personnel. Non seulement je maîtrisais peu le sujet au départ, mais la méthode de travail nous a immergés dans un projet d’entreprise complexe. J’ai réalisé que les IA dépendent entièrement de la qualité des données fournies pour leur apprentissage. Un point crucial que j'ai retenu pour le travail en équipe est la nécessité de définir un leader ayant une vision globale claire pour éviter les erreurs de communication dans un groupe aussi large.</p>
        
        <h3> Mise en perspective et Projet Pro</h3>
        <p>L’IA est aujourd’hui incontournable et ce hackathon m’a permis de tester ma capacité à m’y adapter sans préparation. Son intégration dans la cybersécurité a été un sujet passionnant, prouvant que même dans mon domaine de prédilection, l’IA sera une technologie émergente majeure. Cette activité confirme mon besoin de rester polyvalente face aux évolutions rapides du secteur technologique.</p>
        
        <div class="proof-section">
            <p><strong>Preuve de participation :</strong></p>
            <img src="img/hey.png" alt="Participation au Hackathon Hey à BeCentral" style="width:100%; max-width:400px; border-radius:8px; margin-top:10px;">
            <img src="img/hey.jpg" alt="Participation au Hackathon Hey à BeCentral" style="width:100%; max-width:400px; border-radius:8px; margin-top:10px;">
        </div>
    `    },
    {
        id: 6,
        theme: "Infographie et Technologies Multimédia",
        activities: [
            { name: "Blender 3D", type: "Formation (Dist)", hours: 5 }
        ],
        hours: 5,
description: `
        <h3> Cadre de l’activité</h3>
        <p>J’ai voulu explorer le domaine de la 3D pour la conception même de mon portfolio afin d’exprimer au maximum qui je suis à travers celui-ci. J’ai donc entrepris une formation en autodidacte sur le logiciel Blender en suivant des tutoriels sur YouTube. J’ai complété cet apprentissage par la réalisation d’un projet personnel présent sur ce site.</p>
        
        <h3> Faits et apprentissage</h3>
        <p>Durant cette formation, que j’estime à 5 heures pour maîtriser les outils essentiels, j’ai acquis des compétences techniques spécifiques : la prise en main de l’espace de travail 3D et des raccourcis, la modélisation d’objets par manipulation des points, faces et arêtes, ainsi que l’application des textures et la configuration des rendus. Pour adapter ces modèles à mon site web, j'ai également dû apprendre à utiliser la bibliothèque <strong>Three.js</strong> afin de permettre une interaction dynamique avec mon modèle 3D en ligne.</p>
        
        <h3> Analyse réflexive</h3>
        <p>L’apprentissage en autonomie via YouTube n’est pas en lui-même un défi, cependant, retrouver des vidéos pertinentes et constructives peut s’avérer difficile. Sans cadre imposé, il est facile de se perdre et complexe de résoudre des bugs méconnus. J’ai réalisé que l’infographie est un domaine technique qui demande une patience et une précision mathématique proche des concepts de traitement d’images vus en cours.</p>
        
        <h3>Mise en perspective et Projet Pro</h3>
        <p>Bien que Blender ne se lie pas directement à la cybersécurité, cette discipline développe la créativité et l’innovation, qui sont des atouts majeurs pour la résolution de problèmes dans mon domaine principal. Ma curiosité me pousse à découvrir de nouveaux terrains technologiques, renforçant ma polyvalence en tant qu'informaticienne.</p>
        
        <div class="proof-section">
            <p><strong>Preuve de réalisation :</strong></p>
            <img src="img/blend.png" alt="Modélisation 3D sur Blender" style="width:100%; max-width:400px; border-radius:8px; margin-top:10px;">
            <a href="retro.html" style="display:inline-block; margin-top:10px; padding:10px 20px; background-color:#007BFF; color:white; text-decoration:none; border-radius:5px;">GET /api/my_head/worm</a>
        </div>
    `    },
    {
        id: 7,
        theme: "Soft Skills et Éthique Professionnelle",
        activities: [
            { name: "Conférence Philippe Boxho (Rigueur)", type: "Conférence", hours: 2 },
            { name: "Job Étudiant (Expérience pro)", type: "Expérience", hours: 10 } // Plafonné à 10h
        ],
        hours: 10, 
description: `
        <h3> Cadre de l’activité</h3>
        <p>Dans ce portfolio, je développe mes soft skills plus spécifiquement en dehors des demandes académiques, à travers mes activités extra-scolaires et mon job étudiant. Une passion pour le domaine du morbide m’a menée à assister à la conférence du célèbre médecin légiste Philippe Boxho, centrée sur la rigueur de l’analyse factuelle. En parallèle, mon expérience en tant que jobiste étudiante m’a permis d’aiguiser mon sens de la responsabilité, de la ponctualité et du respect dans le cadre professionnel.</p>
        
        <h3> Faits et apprentissage</h3>
        <p>Ces activités m’ont apporté des savoirs fondamentaux. Durant la conférence de Philippe Boxho, j’ai appris l’importance de ne jamais tirer de conclusions hâtives sans preuves tangibles, une compétence qui s’applique parfaitement à la sécurité informatique pour l'analyse de faits. De plus, mon job étudiant m’a enseigné la culture de la hiérarchie, la gestion du stress et la communication claire au sein d’une équipe pour assurer la qualité du service.</p>
        
        <h3> Analyse réflexive</h3>
        <p>Le lien entre la médecine légale et l’informatique n’est pas évident au premier abord, cependant les démarches d’investigation des crimes suivent des protocoles logiques semblables à ceux de l'informatique. Les faits doivent être observés, isolés, et l'on doit garder son objectivité tant que des preuves concrètes n’ont pas été établies. Mon job étudiant m’a également permis de sortir de ma zone de confort et d’apprendre à fonctionner en société suivant les règles précises du monde du travail.</p>
        
        <h3> Mise en perspective et Projet Pro</h3>
        <p>Ces activités ont renforcé ma maturité d’un point de vue professionnel, confirmant le rôle que je souhaite avoir : éviter d’être une simple technicienne pour devenir une professionnelle capable de trouver des solutions innovantes et fiables. Cette éthique de travail mêle ma curiosité et ma persévérance pour ma future carrière orientée vers la sécurité.</p>
        
        <div class="proof-section">
            <p><strong>Preuve nominative :</strong></p>
            <img src="img/box.jpg" alt="Conférence de Philippe Boxho sur la rigueur d'analyse" style="width:100%; max-width:400px; border-radius:8px; margin-top:10px;">
            <img src="img/picard.jpg" alt="Expérience professionnelle en job étudiant" style="width:100%; max-width:400px; border-radius:8px; margin-top:10px;">
            </div>
    `    }
];

console.log('%c site.js chargé', 'color: #38bdf8; font-weight: bold;');

// --- AFFICHAGE DANS LE TABLEAU ---
document.addEventListener('DOMContentLoaded', () => {
    const body = document.getElementById('table-body');
    const totalElement = document.getElementById('total-hours');
    let totalValide = 0;

    // Injection des activités dans le tableau
    if (body) {
        portfolioActivities.forEach(item => {
            item.activities.forEach(act => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.theme}</td>
                    <td>${act.name}</td>
                    <td>${act.type}</td>
                    <td>${act.hours}h</td>
                `;
                body.appendChild(row);
            });
            
            // Calcul du total en respectant le plafond de 10h par thème
            totalValide += Math.min(item.hours, 10);
        });
    }

    // Affichage du total
    if (totalElement) {
        totalElement.textContent = totalValide + "h";
    }

    // Injecter les analyses réflexives dans les éléments HTML
    portfolioActivities.forEach(item => {
        const reflexionEl = document.getElementById(`contenu-reflexion-${item.id}`);
        if (reflexionEl && item.description) {
            const text = portfolioActivities[item.id - 1]?.description;
            if (text && text.length > 10) {
                reflexionEl.innerHTML = text;
            }
        }
    });

    // Message console
    console.log("%c Port Scan: OK | Firewall: ACTIVE | Connection: SECURE", "color: #00ff00; font-weight: bold; background: #000; padding: 5px;");
});

// --- CHAT GIF BOT ---
document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.createElement('div');
    chatContainer.id = 'chat-bot';
    chatContainer.innerHTML = `
        <a href="retro.html" class="chat-link">
            <div class="chat-message">Passe en mode retro</div>
            <img src="img/gifCat.gif" alt="Chat" class="chat-gif">
        </a>
    `;
    document.body.appendChild(chatContainer);
});

function initProjectSlider() {

    if (typeof Swiper === 'undefined') {

        console.warn('Swiper non chargé.');

        return;

    }



    new Swiper('.mySwiper', {

        slidesPerView: 1,

        spaceBetween: 24,

        loop: true,

        grabCursor: true,

        pagination: {

            el: '.swiper-pagination',

            clickable: true,

        },

        navigation: {

            nextEl: '.swiper-button-next',

            prevEl: '.swiper-button-prev',

        },

    });

}

window.addEventListener('load', initProjectSlider);

