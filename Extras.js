// ==========================================
// EXTRAS.JS - Améliorations, UI, Thèmes & Sons
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 1. INJECTION DES BOUTONS DU HAUT (CV & FILTRES) & DU SÉLECTEUR DE COULEUR
    // ----------------------------------------------------

    // A. Bouton CV en haut à droite (à côté ou à la place du bouton contact selon ta préférence)
    const topBarContainer = document.createElement('div');
    topBarContainer.style.cssText = `
        position: absolute;
        top: 25px;
        right: 140px;
        z-index: 15;
        display: flex;
        gap: 15px;
        align-items: center;
    `;
    
    const cvBtn = document.createElement('a');
    cvBtn.href = "https://drive.google.com/file/d/1NDAKqytWr7U1Gritd7IpsqdXnHcfKrBD/view?usp=sharing";
    cvBtn.target = "_blank";
    cvBtn.className = "contact-top-btn";
    cvBtn.style.position = "static";
    cvBtn.textContent = "📄 MON CV";
    topBarContainer.appendChild(cvBtn);
    document.body.appendChild(topBarContainer);

    // B. Bouton de filtrage des projets (visible sur la scène des projets ou dans le menu)
    const filterBtn = document.createElement('button');
    filterBtn.id = "globalFilterBtn";
    filterBtn.className = "contact-top-btn";
    filterBtn.style.cssText = `
        position: absolute;
        top: 25px;
        left: 25px;
        z-index: 15;
        display: none; 
    `;
    filterBtn.textContent = "🔍 FILTRER PAR TAG";
    document.body.appendChild(filterBtn);

    // C. Sélecteur de couleur discret en bas à droite
    const colorPickerContainer = document.createElement('div');
    colorPickerContainer.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999;
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(11, 2, 26, 0.8);
        border: 1px solid rgba(0, 240, 255, 0.4);
        padding: 8px 12px;
        border-radius: 8px;
        backdrop-filter: blur(5px);
        font-family: 'Orbitron', sans-serif;
        font-size: 0.75rem;
        color: #00f0ff;
    `;
    colorPickerContainer.innerHTML = `
        <span>HUD THEME:</span>
        <input type="color" id="hudColorPicker" value="#00f0ff" style="cursor: pointer; border: none; width: 24px; height: 24px; background: none;">
    `;
    document.body.appendChild(colorPickerContainer);

    // Logique du sélecteur de couleur (change les bordures et lueurs néon à la volée)
    const colorPicker = document.getElementById('hudColorPicker');
    colorPicker.addEventListener('input', (e) => {
        const val = e.target.value;
        document.documentElement.style.setProperty('--neon-main', val);
        
        // Applique dynamiquement la couleur sur les éléments clés
        const styleDyn = document.getElementById('dynamicThemeStyle') || document.createElement('style');
        styleDyn.id = 'dynamicThemeStyle';
        styleDyn.innerHTML = `
            .contact-top-btn, .back-menu-btn, .project-bubble { border-color: ${val} !important; color: ${val} !important; }
            .project-bubble:hover { box-shadow: 0 0 45px ${val}, inset 0 0 20px rgba(255, 255, 255, 0.8) !important; }
        `;
        document.head.appendChild(styleDyn);
    });


    // ----------------------------------------------------
    // 2. GESTION DES RACCOURCIS CLAVIER & AUDIO CLICS
    // ----------------------------------------------------

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModals = document.querySelectorAll('.video-modal-overlay.active, .char-sheet-modal.active, .project-detail-modal.active, .lightbox-modal.active, .contact-modal.active');
            activeModals.forEach(modal => {
                modal.classList.remove('active');
                if (modal.id === 'videoModal') {
                    const iframe = document.getElementById('youtubeIframe');
                    if (iframe) iframe.src = iframe.src;
                }
                if (modal.id === 'lightboxModal') {
                    const wrapper = document.getElementById('lightboxMediaWrapper');
                    if (wrapper) wrapper.innerHTML = '';
                }
            });
        }
    });

    // Support tactile / mobile
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `body, button, a, .project-bubble, .gallery-media { cursor: auto !important; } #custom-cursor { display: none !important; }`;
        document.head.appendChild(styleTag);
    }

    // Générateur de sons UI rétro (Web Audio API)
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playUiBeep(freq = 587.33, type = 'triangle', duration = 0.06) {
        try {
            if (audioCtx.state === 'suspended') audioCtx.resume();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {}
    }

    // Ajout des sons sur TOUS les clics de boutons, bulles et liens
    document.addEventListener('click', (e) => {
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.project-bubble')) {
            playUiBeep(650, 'triangle', 0.07);
        }
    });


    // ----------------------------------------------------
    // 3. AFFICHAGE CONDITIONNEL DU BOUTON FILTRE (QUAND ON EST DANS LES PROJETS)
    // ----------------------------------------------------
    const observer = new MutationObserver(() => {
        const projectsStage = document.getElementById('projectsStage');
        if (projectsStage && projectsStage.classList.contains('active')) {
            filterBtn.style.display = 'block';
        } else {
            filterBtn.style.display = 'none';
        }
    });
    observer.observe(document.getElementById('projectsStage'), { attributes: true, attributeFilter: ['class'] });

});
