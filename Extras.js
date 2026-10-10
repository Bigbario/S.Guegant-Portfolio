// ==========================================
// EXTRAS.JS - Améliorations, UI, Thèmes & Sons
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // A. AJOUT DU BOUTON CV EN HAUT À DROITE
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


    // B. SÉLECTEUR DE COULEUR EN BAS À DROITE
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

    const colorPicker = document.getElementById('hudColorPicker');
    colorPicker.addEventListener('input', (e) => {
        const val = e.target.value;
        const styleDyn = document.getElementById('dynamicThemeStyle') || document.createElement('style');
        styleDyn.id = 'dynamicThemeStyle';
        styleDyn.innerHTML = `
            .contact-top-btn, .back-menu-btn, .project-bubble { border-color: ${val} !important; color: ${val} !important; }
            .project-bubble:hover { box-shadow: 0 0 45px ${val}, inset 0 0 20px rgba(255, 255, 255, 0.8) !important; }
        `;
        document.head.appendChild(styleDyn);
    });


    // C. RACCOURCI CLAVIER (ÉCHAP)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModals = document.querySelectorAll('.video-modal-overlay.active, .char-sheet-modal.active, .project-detail-modal.active, .lightbox-modal.active, .contact-modal.active');
            activeModals.forEach(modal => {
                modal.classList.remove('active');
                if (modal.id === 'videoModal') {
                    const iframe = document.getElementById('youtubeIframe');
                    if (iframe) iframe.src = iframe.src;
                }
            });
        }
    });


    // D. SONS RÉTRO AU CLIC
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playUiBeep() {
        try {
            if (audioCtx.state === 'suspended') audioCtx.resume();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = 650;
            gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.07);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.07);
        } catch (e) {}
    }

    document.addEventListener('click', (e) => {
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.project-bubble')) {
            playUiBeep();
        }
    });

});
