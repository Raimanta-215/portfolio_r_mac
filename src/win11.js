

const THEMES = [
    { icon:'🖧', name:'Infrastructures Réseaux & Systèmes',   hours:10, type:'technique',  tags:['Cisco IOS','VLAN','NAT','CIA Triad'] },
    { icon:'🔐', name:'Sécurité Informatique',                 hours:10, type:'challenge',  tags:['CTF','XSS','SQL Injection','Crypto'] },
    { icon:'🕵️', name:'Cybersécurité Avancée & CTF',           hours:10, type:'challenge',  tags:['OSINT','Forensics','Kali Linux','Burp Suite'] },
    { icon:'☁️', name:'Cloud Computing & Services Managés',     hours: 9, type:'formation',  tags:['AWS','Azure','Docker','Terraform'] },
    { icon:'💻', name:'Développement & Collaboration Agile',   hours: 8, type:'experience', tags:['Git','Scrum','Python','API REST'] },
    { icon:'🎨', name:'Infographie & Technologies Multimédia', hours: 7, type:'formation',  tags:['Photoshop','Figma','CSS','UX Design'] },
    { icon:'🤝', name:'Soft Skills & Éthique',                 hours: 7, type:'conference', tags:['RGPD','Communication','Leadership'] },
];
let sel = -1, grid = false;

function renderList() {
    document.getElementById('w11-tbody').innerHTML = THEMES.map((t,i) =>
        `<tr class="${sel===i?'sel':''}" onclick="w11Sel(${i})" style="cursor:pointer;">
            <td>${t.icon} ${t.name}</td>
            <td><span class="w11-pill ${t.type}">${t.type}</span></td>
            <td>${t.hours}h</td>
            <td>${t.tags.slice(0,2).map(g=>`<span style="font-size:9px;background:rgba(0,0,0,0.06);padding:1px 5px;border-radius:3px;margin-right:2px;">${g}</span>`).join('')}</td>
        </tr>`
    ).join('');
}
function renderGrid() {
    document.getElementById('w11-grid').innerHTML = THEMES.map((t,i) =>
        `<div onclick="w11Sel(${i})" style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:7px 3px;border-radius:4px;cursor:pointer;${sel===i?'background:rgba(0,120,212,0.14);outline:1.5px solid rgba(0,120,212,0.4);':''}transition:background 0.1s;" onmouseover="if(${sel}!=${i})this.style.background='rgba(0,120,212,0.08)'" onmouseout="if(${sel}!=${i})this.style.background=''">
            <span style="font-size:30px;">${t.icon}</span>
            <span style="font-size:10px;color:#1a1a1a;text-align:center;line-height:1.3;">${t.name.length>20?t.name.substring(0,20)+'…':t.name}</span>
        </div>`
    ).join('');
}
window.w11Sel = function(i) {
    sel = i; renderList(); renderGrid();
    const t = THEMES[i];
    document.getElementById('w11-detail-sel').innerHTML = `<strong style="font-size:10px;">${t.name}</strong><br><span style="color:#666;font-size:9px;">${t.hours}h validées</span>`;
    document.getElementById('w11-status-sel').textContent = `"${t.name}" sélectionné`;
    document.getElementById('w11-detail-tags').innerHTML = t.tags.map(g=>`<div style="font-size:9px;background:rgba(0,120,212,0.10);color:#005a9e;padding:2px 6px;border-radius:4px;">${g}</div>`).join('');
};
window.w11SetView = function(g) {
    grid = g;
    document.getElementById('w11-view-list').style.display = g ? 'none' : 'block';
    document.getElementById('w11-view-grid').style.display = g ? 'block' : 'none';
    document.getElementById('w11-view-toggle').textContent = g ? '☰ Vue liste' : '⊞ Vue grille';
};
document.getElementById('w11-view-toggle').onclick = function() { w11SetView(!grid); };

function clock() {
    const n = new Date();
    document.getElementById('w11-time').textContent = n.toLocaleTimeString('fr-BE',{hour:'2-digit',minute:'2-digit'});
    document.getElementById('w11-date').textContent = n.toLocaleDateString('fr-BE',{day:'2-digit',month:'2-digit',year:'numeric'});
}
clock(); setInterval(clock, 10000);

document.getElementById('win11-start-btn').onclick = function(e) {
    e.stopPropagation();
    document.getElementById('win11-startmenu').classList.toggle('open');
};
document.getElementById('win11-root').addEventListener('click', function() {
    document.getElementById('win11-startmenu').classList.remove('open');
});
// document.getElementById('close-portable').onclick = function() {
//     document.getElementById('portable-interface').style.display = 'none';
// };

renderList(); renderGrid();
