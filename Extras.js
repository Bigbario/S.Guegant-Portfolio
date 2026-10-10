// ==========================================
// EXTRAS.JS - Améliorations, UI, Thèmes & Sons
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // A. BOUTON CV EN HAUT À DROITE
    const topBarContainer = document.createElement('div');
    topBarContainer.style.cssText = `
        position: absolute;
        top: 25px;
        right: 155px;
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


    // B. SÉLECTEUR DE COULEUR DE FOND (DEPLACÉ EN BAS À GAUCHE)
    const colorPickerContainer = document.createElement('div');
    colorPickerContainer.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 999;
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(11, 2, 26, 0.85);
        border: 1px solid rgba(0, 240, 255, 0.4);
        padding: 6px 12px;
        border-radius: 8px;
        backdrop-filter: blur(6px);
        font-family: 'Orbitron', sans-serif;
        font-size: 0.75rem;
        color: #00f0ff;
    `;
    colorPickerContainer.innerHTML = `
        <span>THEME BG:</span>
        <input type="color" id="hudColorPicker" value="#8c1eff" style="cursor: pointer; border: none; width: 22px; height: 22px; background: none;">
    `;
    document.body.appendChild(colorPickerContainer);

    // Fonction de conversion Hex -> RGB pour générer les dégradés
    function hexToRgb(hex) {
        let c = hex.replace('#', '');
        if (c.length === 3) c = c.split('').map(x => x + x).join('');
        const num = parseInt(c, 16);
        return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
    }

    const colorPicker = document.getElementById('hudColorPicker');
    colorPicker.addEventListener('input', (e) => {
        const hex = e.target.value;
        const rgb = hexToRgb(hex);

        const styleDyn = document.getElementById('dynamicThemeStyle') || document.createElement('style');
        styleDyn.id = 'dynamicThemeStyle';
        
        styleDyn.innerHTML = `
            body {
                background-image: 
                    radial-gradient(circle at center, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.35) 0%, rgba(10, 2, 25, 0.95) 75%),
                    linear-gradient(to right, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12) 1px, transparent 1px) !important;
            }
            .menu-btn {
                background: linear-gradient(135deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4), rgba(40, 5, 60, 0.7)) !important;
                border-color: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.7) !important;
                box-shadow: 0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.35), inset 0 0 15px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25) !important;
            }
            .subtitle {
                color: rgb(${Math.min(255, rgb.r + 60)}, ${Math.min(255, rgb.g + 60)}, ${Math.min(255, rgb.b + 60)}) !important;
            }
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


    // D. SON DE CLIC RÉTRO TRÈS DOUX & FEUTRÉ
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playUiBeep() {
        try {
            if (audioCtx.state === 'suspended') audioCtx.resume();
            
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            // Onde sinusoïdale très douce et fréquence basse (style clic feutré UI)
            osc.type = 'sine';
            osc.frequency.setValueAtTime(320, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.04);
            
            // Volume très bas (0.012) pour être agréable
            gain.gain.setValueAtTime(0.012, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.start();
            osc.stop(audioCtx.currentTime + 0.04);
        } catch (e) {}
    }

    document.addEventListener('click', (e) => {
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.project-bubble')) {
            playUiBeep();
        }
    });

});
